/* ==========================================================
   data/*.json을 불러와 페이지의 [data-render] 영역을 채웁니다.
   - 콘텐츠 수정은 data/ 폴더의 JSON 파일만 편집하면 됩니다.
   ========================================================== */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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

function renderNews(container, items) {
  container.innerHTML = `<ul class="news">${items
    .map(
      (n) =>
        `<li><span class="date">${esc(n.date)}</span><span>${esc(n.text)}</span></li>`
    )
    .join("")}</ul>`;
}

/* ---- Publications ---- */

function highlightAuthors(authors, names) {
  let out = esc(authors);
  for (const name of names || []) {
    out = out
      .split(esc(name))
      .join(`<span class="me">${esc(name)}</span>`);
  }
  return out;
}

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
  ${p.authors ? `<div class="authors">${highlightAuthors(p.authors, data.highlight)}</div>` : ""}
</div>`
        )
        .join("");
      return `<h2>${y}</h2>${pubs}`;
    })
    .join("");
}

/* ---- Members ---- */

function memberBlock(m) {
  return `<div class="member">
  <p class="name">${esc(m.name)}${m.name_en ? ` <span class="en">${esc(m.name_en)}</span>` : ""}</p>
  ${m.role ? `<p class="role">${esc(m.role)}</p>` : ""}
  ${m.email ? `<p class="contact">${esc(m.email)}</p>` : ""}
  ${m.link ? `<p class="links"><a href="${esc(m.link.url)}">[${esc(m.link.label)}]</a></p>` : ""}
</div>`;
}

function renderMembers(container, data) {
  let html = `<h2>Faculty</h2>${(data.faculty || []).map(memberBlock).join("")}`;
  html += "<h2>Students</h2>";
  if (data.students && data.students.length) {
    html += data.students.map(memberBlock).join("");
  } else {
    html +=
      '<p>함께 연구할 학생을 모집하고 있습니다. — <a href="about.html#join">지원 안내 보기</a></p>';
  }
  if (data.alumni && data.alumni.length) {
    html += `<h2>Alumni</h2>${data.alumni.map(memberBlock).join("")}`;
  }
  container.innerHTML = html;
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
