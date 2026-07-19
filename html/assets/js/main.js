/* ==========================================================
   data/*.json을 불러와 페이지의 [data-render] 영역을 채웁니다.
   - 콘텐츠 수정은 data/ 폴더의 JSON 파일만 편집하면 됩니다.
   ========================================================== */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function loadJSON(name) {
  const res = await fetch(`data/${name}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`data/${name}.json 로드 실패 (HTTP ${res.status})`);
  return res.json();
}

function showLoadError(container) {
  container.innerHTML =
    '<p class="load-error">데이터를 불러오지 못했습니다..</p>';
}

/* ---- News (홈) ---- */

// 뉴스 텍스트의 "[텍스트](https://...)" 패턴을 링크로 변환 (그 외는 전부 이스케이프)
function linkify(text) {
  return esc(text).replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2">$1</a>'
  );
}

function renderNews(container, items) {
  container.innerHTML = `<ul class="news">${items
    .map(
      (n) =>
        `<li><span class="date">${esc(n.date)}</span><span>${linkify(n.text)}</span></li>`
    )
    .join("")}</ul>`;
}

/* ---- Publications ---- */

function renderPublications(container, data) {
  const minYear = data.min_display_year || 0;
  const items = data.items.filter((p) => p.year >= minYear);
  const years = [...new Set(items.map((p) => p.year))].sort((a, b) => b - a);
  container.innerHTML = years
    .map((y) => {
      const pubs = items
        .filter((p) => p.year === y)
        .map(
          (p) => `<div class="pub">
  <div class="venue">${esc(p.venue)}</div>
  <div class="title">${esc(p.title)}</div>
  ${p.authors ? `<div class="authors">${esc(p.authors)}</div>` : ""}
</div>`
        )
        .join("");
      return `<h2>${y}</h2>${pubs}`;
    })
    .join("");
}

/* ---- Members ---- */

function memberBlock(m) {
  // "links" 배열(여러 개) 또는 "link" 단일 객체(기존 형식) 모두 지원.
  // url과 label이 모두 있는 항목만 표시 — 미기재/빈 값이면 링크 영역 자체를 만들지 않음.
  const links = (m.links || (m.link ? [m.link] : [])).filter(
    (l) => l && l.url && l.label
  );
  const linksHtml = links.length
    ? `<p class="links">${links
        .map((l) => `<a href="${esc(l.url)}">[${esc(l.label)}]</a>`)
        .join(" ")}</p>`
    : "";
  return `<div class="member">
  <p class="name">${esc(m.name)}${m.name_en ? ` <span class="en">${esc(m.name_en)}</span>` : ""}</p>
  ${m.role ? `<p class="role">${esc(m.role)}</p>` : ""}
  ${m.email ? `<p class="contact">${esc(m.email)}</p>` : ""}
  ${linksHtml}
</div>`;
}

// "students" → "Students", "visiting_scholar" → "Visiting Scholar" (한글 키는 그대로)
function sectionTitle(key) {
  return key.replace(/[_-]+/g, " ").replace(/(^|\s)[a-z]/g, (c) => c.toUpperCase());
}

function renderMembers(container, data) {
  // members.json에 적힌 순서대로 섹션 생성.
  // researcher 등 새 키를 추가하면 제목과 함께 자동으로 렌더링됩니다 (빈 배열은 건너뜀).
  const sections = Object.entries(data)
    .filter(([, list]) => Array.isArray(list) && list.length)
    .map(
      ([key, list]) =>
        `<h2>${esc(sectionTitle(key))}</h2>${list.map(memberBlock).join("")}`
    )
    .join("");
  container.innerHTML =
    sections +
    '<p class="recruit">함께 연구할 학생을 모집하고 있습니다. — <a href="about.html#join">지원 안내 보기</a></p>';
}

/* ---- Others ---- */

function renderOthers(container, data) {
  const awards = (data.awards || [])
    .map(
      (a) =>
        `<li><span class="year">${esc(a.year)}</span><span class="what"><strong>${esc(a.title)}</strong> <span class="note">· ${esc(a.event)}</span></span></li>`
    )
    .join("");
  const projects = (data.projects || [])
    .map(
      (p) => `<div class="proj">
  <div class="title">${esc(p.title)}</div>
  <div class="meta">${esc(p.sponsor)} · <span class="mono">${esc(p.period)}</span></div>
</div>`
    )
    .join("");
  container.innerHTML =
    `<h2>Awards</h2><ul class="rows">${awards}</ul>` +
    `<h2>Research Projects</h2>${projects}`;
}

/* ---- 부트스트랩 ---- */

const RENDERERS = {
  news: ["news", renderNews],
  publications: ["publications", renderPublications],
  members: ["members", renderMembers],
  others: ["others", renderOthers],
};

document.querySelectorAll("[data-render]").forEach(async (container) => {
  const entry = RENDERERS[container.dataset.render];
  if (!entry) return;
  const [file, render] = entry;
  try {
    render(container, await loadJSON(file));
  } catch (err) {
    console.error(err);
    showLoadError(container);
  }
});
