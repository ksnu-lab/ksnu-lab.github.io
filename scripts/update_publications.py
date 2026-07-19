#!/usr/bin/env python3
"""Google Scholar 프로필에서 논문 목록을 가져와 html/data/publications.json을 갱신합니다.

사용법:
    pip install scholarly
    python scripts/update_publications.py              # 새 논문을 JSON에 추가
    python scripts/update_publications.py --dry-run    # 추가될 내용만 출력 (파일 수정 없음)
    python scripts/update_publications.py --fill       # 새 논문의 저널/저자 상세까지 조회 (느림)

동작 방식:
- 기존 JSON 항목은 절대 수정하지 않습니다 (한글 저자 표기 등 수동 편집 보존).
- Scholar에만 있는 논문을 찾아 추가합니다. 중복 판단은 제목 정규화(영숫자/한글만, 소문자) 비교.
- 국내 논문은 Scholar에 영문 제목으로 등록된 경우가 많습니다. 이때는 JSON 항목에
  "scholar_title": "영문 제목" 필드를 넣어 두면 중복으로 인식합니다 (웹페이지에는 표시 안 됨).
- 새 항목의 type은 제목·저널에 한글이 포함되면 domestic, 아니면 international로 추정합니다.
- min_display_year, highlight 등 설정 키는 그대로 유지됩니다.
  (min_display_year 미만 논문도 JSON에는 저장되며, 웹페이지 표시만 제외됩니다.)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

DEFAULT_JSON = Path(__file__).resolve().parent.parent / "html" / "data" / "publications.json"
DEFAULT_SCHOLAR_ID = "GsyOeIsAAAAJ"  # 권동근 교수 Google Scholar ID


def norm_title(title: str) -> str:
    """제목 비교용 정규화: 소문자화 후 영숫자·한글만 남김."""
    return re.sub(r"[^0-9a-z가-힣]", "", title.lower())


def has_hangul(text: str) -> bool:
    return any("가" <= ch <= "힣" for ch in text)


def authors_to_str(bib_author: str) -> str:
    """scholarly의 'A and B and C' 형식을 'A, B, C'로 변환."""
    return ", ".join(a.strip() for a in bib_author.split(" and ") if a.strip())


def guess_venue(bib: dict) -> str:
    for key in ("journal", "conference", "booktitle"):
        if bib.get(key):
            venue = str(bib[key]).strip()
            break
    else:
        # citation 필드는 "IEEE Access, 2021" 형태 — 뒤쪽 연도 부분 제거
        venue = re.sub(r",?\s*\d{4}\s*$", "", str(bib.get("citation", "")).strip())
    # 뒤에 붙는 권·호·쪽수 흔적 제거: "... 29 (3 …", "..., 442-445" 등
    venue = re.sub(r"\s+\d+\s*\(.*$", "", venue)
    venue = re.sub(r",\s*[\d\s–-]+$", "", venue)
    return venue.strip().rstrip(",")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Google Scholar에서 논문을 가져와 publications.json을 갱신합니다."
    )
    parser.add_argument("--scholar-id", default=DEFAULT_SCHOLAR_ID,
                        help=f"Google Scholar 사용자 ID (기본값: {DEFAULT_SCHOLAR_ID})")
    parser.add_argument("--json", type=Path, default=DEFAULT_JSON,
                        help=f"publications.json 경로 (기본값: {DEFAULT_JSON})")
    parser.add_argument("--dry-run", action="store_true",
                        help="파일을 수정하지 않고 추가될 논문만 출력")
    parser.add_argument("--fill", action="store_true",
                        help="새 논문마다 상세 정보(저널·전체 저자)를 추가 조회 (논문당 요청 1회, 느림)")
    args = parser.parse_args()

    try:
        from scholarly import scholarly
    except ImportError:
        sys.exit("scholarly 패키지가 필요합니다. 설치:  pip install scholarly")

    if not args.json.exists():
        sys.exit(f"JSON 파일을 찾을 수 없습니다: {args.json}")

    data = json.loads(args.json.read_text(encoding="utf-8"))
    items: list[dict] = data.setdefault("items", [])
    existing_titles = {norm_title(p["title"]) for p in items}
    existing_titles |= {norm_title(p["scholar_title"]) for p in items if p.get("scholar_title")}

    print(f"Google Scholar 프로필({args.scholar_id}) 조회 중...")
    try:
        author = scholarly.search_author_id(args.scholar_id)
        author = scholarly.fill(author, sections=["publications"])
    except Exception as err:  # 네트워크 차단, 캡차 등
        sys.exit(f"Scholar 조회 실패: {err}\n"
                 "잠시 후 다시 시도하거나, 네트워크 환경을 바꿔 실행해 보세요.")

    publications = author.get("publications", [])
    print(f"프로필에서 논문 {len(publications)}건 발견. 기존 JSON에는 {len(items)}건 있음.\n")

    added: list[dict] = []
    for pub in publications:
        bib = pub.get("bib", {})
        title = str(bib.get("title", "")).strip()
        if not title or norm_title(title) in existing_titles:
            continue

        # --fill 옵션이 있거나, 목록 뷰에 저자 정보가 없으면 상세 조회
        if args.fill or not bib.get("author"):
            try:
                pub = scholarly.fill(pub)
                bib = pub.get("bib", {})
            except Exception as err:
                print(f"  [경고] 상세 조회 실패({err}) — 기본 정보로 추가: {title}")

        try:
            year = int(bib.get("pub_year"))
        except (TypeError, ValueError):
            print(f"  [건너뜀] 연도 정보 없음: {title}")
            continue

        venue = guess_venue(bib)
        item = {
            "year": year,
            "type": "domestic" if has_hangul(title + venue) else "international",
            "title": title,
            "authors": authors_to_str(str(bib.get("author", ""))),
            "venue": venue,
        }
        items.append(item)
        existing_titles.add(norm_title(title))
        added.append(item)
        print(f"  [추가] {year} · {venue or '(저널 미상)'} — {title}")

    if not added:
        print("추가할 새 논문이 없습니다. JSON은 그대로 둡니다.")
        return

    # 연도 내림차순 정렬 (같은 연도 안에서는 기존 순서 유지)
    items.sort(key=lambda p: -int(p["year"]))

    if args.dry_run:
        print(f"\n(dry-run) 새 논문 {len(added)}건 — 파일은 수정하지 않았습니다.")
        return

    args.json.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"\n새 논문 {len(added)}건 추가 완료 → {args.json}")
    print("추가된 항목의 저자 표기(한글명 등)와 venue를 확인해 필요하면 직접 다듬어 주세요.")


if __name__ == "__main__":
    main()
