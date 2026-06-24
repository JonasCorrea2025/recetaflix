/* ================= CaseirinhosFLIX — app ================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const brandHTML = `<span class="brand"><span class="case">Receta</span><span class="flix">FLIX</span></span>`;
  const AUTH_KEY = "cf_auth_v1";
  const PROG_KEY = "cf_progress_v1";

  /* ---------- progress (continue watching) ---------- */
  const getProg = () => { try { return JSON.parse(localStorage.getItem(PROG_KEY)) || {}; } catch { return {}; } };
  const setProg = (modId, idx) => { const p = getProg(); p[modId] = { idx, t: Date.now() }; localStorage.setItem(PROG_KEY, JSON.stringify(p)); };

  /* ---------- AUTH GATE ---------- */
  function showGate() {
    const g = $("#gate");
    g.innerHTML = `
      <div class="gate-card">
        ${brandHTML}
        <div class="sub">Área de miembros · ${esc(CONFIG.instructor)}</div>
        <form id="gateForm">
          <label for="pw">Contraseña de acceso</label>
          <input id="pw" type="password" autocomplete="current-password" placeholder="Ingresá tu contraseña" />
          <div class="err" id="gateErr"></div>
          <button class="btn btn-primary" type="submit">Entrar ▸</button>
        </form>
        <div class="gate-foot">¿Problemas para entrar? <a href="${esc(CONFIG.supportWhatsapp)}" target="_blank" style="color:var(--gold)">Escribinos por WhatsApp</a></div>
      </div>`;
    g.classList.remove("hidden");
    $("#gateForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const val = $("#pw").value.trim();
      if (val === CONFIG.password) {
        sessionStorage.setItem(AUTH_KEY, "1");
        g.classList.add("hidden");
        boot();
      } else {
        $("#gateErr").textContent = "Contraseña incorrecta. Probá de nuevo.";
        $("#pw").select();
      }
    });
    setTimeout(() => $("#pw") && $("#pw").focus(), 60);
  }

  /* ---------- NAV ---------- */
  function renderNav() {
    const initial = CONFIG.instructor.trim()[0] || "M";
    $("#nav").innerHTML = `
      <div class="brand" data-link="#/home"><span class="case">Receta</span><span class="flix">FLIX</span></div>
      <nav class="links">
        <a data-link="#/home" data-route="home">Inicio</a>
        <a data-link="#/modulos" data-route="modulos">Módulos</a>
        <a data-link="#/materiales" data-route="materiales">Materiales</a>
        <a data-link="#/comunidad" data-route="comunidad">Comunidad</a>
      </nav>
      <div class="spacer"></div>
      <div class="avatar" title="${esc(CONFIG.instructor)}">${esc(initial)}</div>`;
    $("#nav").classList.remove("hidden");
    document.querySelectorAll("[data-link]").forEach((el) => el.addEventListener("click", () => (location.hash = el.getAttribute("data-link"))));
  }
  function setActiveNav(route) {
    document.querySelectorAll("#nav .links a").forEach((a) => a.classList.toggle("active", a.dataset.route === route));
  }

  /* ---------- CARD helpers ---------- */
  const moduleCard = (m, i) => `
    <div class="card" data-link="#/leccion/${m.id}/0">
      <div class="thumb" style="background-image:url('${m.thumb}')"></div>
      <span class="num">${i + 1}</span>
      <div class="body"><div class="tag">${esc(m.tag)}</div><h3>${esc(m.title)}</h3>
        <div class="meta">${m.lessons.length} lecciones</div></div>
    </div>`;

  const continueCard = (m, idx) => {
    const pct = Math.round(((idx + 1) / m.lessons.length) * 100);
    return `<div class="card wide" data-link="#/leccion/${m.id}/${idx}">
      <div class="thumb" style="background-image:url('${m.thumb}')"></div>
      <span class="pill">▶ Seguir viendo</span>
      <div class="body"><div class="tag">${esc(m.title)}</div>
        <h3>${esc(m.lessons[idx].title)}</h3>
        <div class="prog"><i style="width:${pct}%"></i></div></div>
    </div>`;
  };

  const matCard = (it) => `
    <div class="card" data-link="#/materiales">
      <div class="thumb" style="background-image:url('${it.thumb}')"></div>
      <span class="pill">PDF</span>
      <div class="body"><h3>${esc(it.title)}</h3><div class="meta">${it.pages} págs · Descargable</div></div>
    </div>`;

  /* ---------- VIEWS ---------- */
  function viewHome() {
    setActiveNav("home");
    const prog = getProg();
    const cont = Object.entries(prog).sort((a, b) => b[1].t - a[1].t)
      .map(([id, v]) => { const m = MODULES.find((x) => x.id === id); return m ? continueCard(m, Math.min(v.idx, m.lessons.length - 1)) : ""; }).join("");
    const recetarios = MATERIALS[0].items.concat(MATERIALS[2].items.slice(0, 3));
    const negocio = MATERIALS[1].items;
    return `
      <section class="hero">
        <div class="bg" style="background-image:url('${CONFIG.hero.bgThumb}')"></div>
        <div class="scrim"></div>
        <div class="content">
          <span class="badge">${esc(CONFIG.hero.badge)}</span>
          <h1>${esc(CONFIG.hero.title)}</h1>
          <p>${esc(CONFIG.hero.subtitle)}</p>
          <div class="actions">
            <button class="btn btn-play" data-link="#/leccion/${CONFIG.hero.ctaModule}/0">▶ Empezar ahora</button>
            <button class="btn btn-ghost" data-link="#/materiales">⤓ Ver materiales</button>
          </div>
        </div>
      </section>
      <div class="section">
        ${cont ? `<div class="row-head"><h2>Seguir viendo</h2></div><div class="row">${cont}</div>` : ""}
        <div class="row-head"><h2>Módulos del curso</h2><span class="more">${MODULES.length} módulos</span></div>
        <div class="row">${MODULES.map(moduleCard).join("")}</div>
        <div class="row-head"><h2>Recetarios y bonus</h2><span class="more" data-link="#/materiales" style="cursor:pointer">Ver todos ›</span></div>
        <div class="row">${recetarios.map(matCard).join("")}</div>
        <div class="row-head"><h2>Negocio y ganancias</h2></div>
        <div class="row">${negocio.map(matCard).join("")}</div>
      </div>`;
  }

  function viewModulos() {
    setActiveNav("modulos");
    return `<div class="intro"><h1>Módulos del curso</h1><p>Seguí el orden o entrá directo a lo que necesités. Tu progreso se guarda solo.</p></div>
      <div class="section"><div class="row" style="flex-wrap:wrap">${MODULES.map(moduleCard).join("")}</div></div>`;
  }

  function playerHTML(lesson) {
    const v = lesson.video;
    if (v && v.type === "youtube") return `<div class="player"><iframe src="https://www.youtube.com/embed/${esc(v.id)}?rel=0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`;
    if (v && v.type === "mp4") return `<div class="player"><video controls preload="metadata" src="${esc(v.src)}"></video></div>`;
    return `<div class="player"><div class="soon-box"><div class="ic">🎬</div><div class="t">Próximamente</div>
      <div class="s">Esta clase se está preparando. Mientras tanto, descargá los materiales del módulo.</div></div></div>`;
  }

  function viewLeccion(modId, idx) {
    setActiveNav("modulos");
    const m = MODULES.find((x) => x.id === modId);
    if (!m) return viewHome();
    idx = Math.max(0, Math.min(idx, m.lessons.length - 1));
    const ls = m.lessons[idx];
    setProg(m.id, idx);
    const linked = (ls.materials || []).map((sl) => MATERIAL_BY_SLUG[sl]).filter(Boolean);
    const linkedHTML = linked.length ? `<div class="linked"><h3>Materiales de esta clase</h3>${linked.map((it) => `
        <a href="${it.file}" download><img src="${it.thumb}" alt=""><div class="x"><b>${esc(it.title)}</b><span>${it.pages} págs · PDF</span></div></a>`).join("")}</div>` : "";
    const list = m.lessons.map((l, i) => `
      <div class="li ${i === idx ? "active" : ""}" data-link="#/leccion/${m.id}/${i}">
        <div class="n">${i + 1}</div>
        <div class="x"><b>${esc(l.title)}</b><span>${esc(l.duration)}</span></div>
        ${l.video ? "" : '<span class="soon">Pronto</span>'}
      </div>`).join("");
    return `<div class="page">
      <a class="back" data-link="#/home">‹ Volver al inicio</a>
      <div class="mod-head">
        <img class="poster" src="${m.thumb}" alt="">
        <div><div class="tag">${esc(m.tag)} · Módulo ${MODULES.indexOf(m) + 1}</div>
          <h1>${esc(m.title)}</h1><p>${esc(m.desc)}</p></div>
      </div>
      <div class="lesson-layout">
        <div>
          ${playerHTML(ls)}
          <div class="lesson-desc"><h2>${esc(ls.title)} <span style="color:var(--muted);font-weight:500;font-size:.9rem">· ${esc(ls.duration)}</span></h2>
            <p>${esc(ls.desc || "")}</p></div>
          ${linkedHTML}
        </div>
        <div class="lesson-list"><div class="lh">Lecciones · ${m.title}</div>${list}</div>
      </div>
    </div>`;
  }

  function viewMateriales() {
    setActiveNav("materiales");
    const groups = MATERIALS.map((g) => `
      <div class="mat-group"><h2>${esc(g.cat)}</h2>
        <div class="mat-grid">${g.items.map((it) => `
          <div class="mat">
            <div class="thumb" style="background-image:url('${it.thumb}')"></div>
            <div class="b"><h3>${esc(it.title)}</h3><div class="meta">${it.pages} páginas · Español</div>
              <a class="dl" href="${it.file}" download>⤓ Descargar PDF</a></div>
          </div>`).join("")}</div>
      </div>`).join("");
    return `<div class="intro"><h1>Materiales y bonus</h1><p>Todos tus recetarios y planillas en español, listos para descargar e imprimir.</p></div>
      <div class="page" style="padding-top:6px">${groups}</div>`;
  }

  function viewComunidad() {
    setActiveNav("comunidad");
    return `<div class="comm">
      <div class="big">💬</div><h1>Comunidad ${brandHTML}</h1>
      <p>Sumate al grupo, compartí tus productos, resolvé dudas y conseguí ideas para vender más todos los días.</p>
      <div class="btns">
        <a class="btn btn-primary" style="width:auto;margin:0" href="${esc(CONFIG.whatsappGroup)}" target="_blank">Entrar al grupo de WhatsApp</a>
        <a class="btn btn-ghost" href="${esc(CONFIG.instagram)}" target="_blank">Seguir en Instagram</a>
      </div></div>`;
  }

  /* ---------- ROUTER ---------- */
  function router() {
    const h = location.hash || "#/home";
    const parts = h.replace(/^#\//, "").split("/");
    let html;
    if (parts[0] === "leccion") html = viewLeccion(parts[1], parseInt(parts[2] || "0", 10));
    else if (parts[0] === "modulos") html = viewModulos();
    else if (parts[0] === "materiales") html = viewMateriales();
    else if (parts[0] === "comunidad") html = viewComunidad();
    else html = viewHome();
    const app = $("#app");
    app.innerHTML = html + footerHTML();
    bindLinks(app);
    window.scrollTo(0, 0);
  }
  const footerHTML = () => `<footer>${brandHTML}<div>© ${new Date().getFullYear()} · ${esc(CONFIG.instructor)} · Todos los derechos reservados.</div>
    <div style="margin-top:6px">Prohibida la reproducción o distribución sin autorización.</div></footer>`;
  function bindLinks(root) {
    root.querySelectorAll("[data-link]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); location.hash = el.getAttribute("data-link"); }));
  }

  /* ---------- BOOT ---------- */
  function boot() {
    renderNav();
    window.addEventListener("hashchange", router);
    window.addEventListener("scroll", () => $("#nav").classList.toggle("solid", window.scrollY > 30));
    if (!location.hash) location.hash = "#/home";
    router();
  }
  function init() {
    if (sessionStorage.getItem(AUTH_KEY) === "1") { $("#gate").classList.add("hidden"); boot(); }
    else showGate();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
