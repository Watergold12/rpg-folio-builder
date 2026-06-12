// ============ DATA ============
const NAV = [
  { id: "profile", label: "Profile" },
  { id: "stats", label: "Stats" },
  { id: "quests", label: "Quests" },
  { id: "skilltree", label: "Skill Tree" },
  { id: "inventory", label: "Inventory" },
  { id: "journey", label: "Journey" },
  { id: "achievements", label: "Trophies" },
  { id: "contact", label: "Contact" },
];

const SOFT_SKILLS = [
  { name: "Creativity", value: 80 },
  { name: "Problem Solving", value: 70 },
  { name: "Teamwork", value: 60 },
  { name: "Communication", value: 70 },
];

const TECH_SKILLS = [
  { name: "Python", icon: "🐍", lv: 6, pct: 75 },
  { name: "Java", icon: "☕", lv: 5, pct: 62 },
  { name: "React", icon: "⚛️", lv: 7, pct: 88 },
  { name: "Git", icon: "🌿", lv: 5, pct: 60 },
  { name: "HTML/CSS", icon: "🎨", lv: 8, pct: 95 },
  { name: "SQL", icon: "🗄️", lv: 4, pct: 48 },
];

const QUESTS = [
  { id: "001", title: "Weather Dashboard", difficulty: 2, reward: "React XP",
    description: "A clean, responsive weather dashboard fetching live data from OpenWeather. Search any city and view a 5-day forecast.",
    tech: ["React", "Tailwind", "OpenWeather API"],
    challenges: "Handling rate limits and gracefully degrading the UI when the API is unavailable.",
    github: "#", demo: "#" },
  { id: "002", title: "Task Manager", difficulty: 3, reward: "Full Stack XP",
    description: "A full-stack task manager with drag-and-drop boards, labels, and due-date reminders.",
    tech: ["React", "Node.js", "PostgreSQL"],
    challenges: "Designing a flexible schema for nested tasks and optimistic UI updates.",
    github: "#" },
  { id: "003", title: "Portfolio Site", difficulty: 2, reward: "Design XP",
    description: "This very portfolio — an RPG-themed single-page site with custom animations and immersive UI.",
    tech: ["HTML", "CSS", "JS"],
    challenges: "Keeping the theme cohesive without slipping into kitsch.",
    github: "#", demo: "#" },
  { id: "004", title: "Hospital Monitor App", difficulty: 4, reward: "IoT XP",
    description: "A real-time monitoring dashboard for hospital wards, surfacing patient vitals and alerts.",
    tech: ["React", "WebSockets", "Python"],
    challenges: "Building reliable real-time pipelines and meaningful alert thresholds.",
    github: "#" },
];

const INVENTORY = [
  { id: "i1", icon: "🎓", name: "College Degree", rarity: "Epic", date: "2024", description: "B.Tech in Computer Science — years of grinding XP across countless lectures and labs." },
  { id: "i2", icon: "🏆", name: "Hackathon Participant", rarity: "Rare", date: "2023", description: "Survived a 36-hour hackathon and shipped a working prototype with the party." },
  { id: "i3", icon: "📜", name: "Python Project Award", rarity: "Rare", date: "2023", description: "Recognized for a standout Python project demonstrating clean architecture." },
  { id: "i4", icon: "⚔️", name: "First Open Source Contribution", rarity: "Common", date: "2022", description: "Merged the first PR — a small fix that earned the Contributor badge." },
];

const JOURNEY = [
  { icon: "🏘️", name: "Starter Village", desc: 'First "Hello, World!"', state: "past" },
  { icon: "🌲", name: "Python Forest", desc: "Learned Python & OOP", state: "past" },
  { icon: "🏰", name: "Java Kingdom", desc: "Data Structures & Algorithms", state: "past" },
  { icon: "⚛️", name: "React City", desc: "Frontend Development", state: "past" },
  { icon: "🌐", name: "Web Dev Realm", desc: "Full Stack Projects", state: "past" },
  { icon: "🏔️", name: "Full Stack Mountain", desc: "Current — leveling up daily", state: "current" },
];

const ACHIEVEMENTS = [
  { icon: "⚛️", title: "Built First React Project", desc: "Shipped a working SPA from scratch.", date: "2023", xp: 100 },
  { icon: "🐍", title: "Completed Python Course", desc: "Mastered fundamentals to OOP.", date: "2022", xp: 80 },
  { icon: "🖥️", title: "Created Portfolio Website", desc: "Launched this very site.", date: "2024", xp: 120 },
  { icon: "🏆", title: "Participated in Hackathon", desc: "Built and pitched in 36 hours.", date: "2023", xp: 150 },
  { icon: "🚀", title: "Deployed First Live App", desc: "Pushed code that the world can reach.", date: "2023", xp: 90 },
];

const SKILL_NODES = [
  { id: "root", label: "PRG", unlocked: true, tip: "Programming — the trunk of your skill tree", col: 0, row: 2 },
  { id: "py", label: "PY", unlocked: true, tip: "Python — clean, expressive, versatile", col: 1, row: 0, parent: "root" },
  { id: "py-oop", label: "OOP", unlocked: true, tip: "Object-Oriented Programming in Python", col: 2, row: 0, parent: "py" },
  { id: "py-api", label: "API", unlocked: true, tip: "Designing & consuming REST APIs", col: 3, row: 0, parent: "py-oop" },
  { id: "java", label: "JV", unlocked: true, tip: "Java — strong typing, JVM ecosystem", col: 1, row: 2, parent: "root" },
  { id: "java-col", label: "COL", unlocked: true, tip: "Java Collections framework", col: 2, row: 2, parent: "java" },
  { id: "java-sw", label: "SW", unlocked: true, tip: "Swing UI development", col: 3, row: 2, parent: "java-col" },
  { id: "react", label: "RX", unlocked: true, tip: "React — component-driven UIs", col: 1, row: 4, parent: "root" },
  { id: "react-hk", label: "HK", unlocked: true, tip: "React Hooks", col: 2, row: 4, parent: "react" },
  { id: "react-rt", label: "RT", unlocked: true, tip: "Client-side routing", col: 3, row: 4, parent: "react-hk" },
  { id: "next", label: "?", unlocked: false, tip: "Locked — keep grinding to unlock", col: 4, row: 2, parent: "py-api" },
];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

// ============ NAV ============
const navWrap = document.getElementById("hud-links");
navWrap.innerHTML = NAV.map((n) => `<a href="#${n.id}" class="hud-link" data-nav="${n.id}">${n.label}</a>`).join("");

// ============ HERO XP ============
setTimeout(() => { document.getElementById("hero-xp").style.width = "75%"; }, 600);

// ============ STATS ============
document.getElementById("soft-skills").innerHTML = SOFT_SKILLS.map((s) => `
  <div class="skill-row">
    <div class="skill-head"><span class="name">${esc(s.name)}</span><span class="pct">${s.value}%</span></div>
    <div class="xp-track"><div class="xp-fill" data-fill="${s.value}"></div></div>
  </div>
`).join("");

document.getElementById("tech-skills").innerHTML = TECH_SKILLS.map((s) => `
  <div class="game-card tech-card">
    <div class="tech-head">
      <div class="tech-left"><span class="tech-icon">${s.icon}</span><span class="tech-name">${esc(s.name)}</span></div>
      <span class="tech-lv">Lv.${s.lv}</span>
    </div>
    <div class="xp-track"><div class="xp-fill" data-fill="${s.pct}"></div></div>
  </div>
`).join("");

// ============ QUESTS ============
document.getElementById("quest-grid").innerHTML = QUESTS.map((q) => `
  <article class="game-card quest-card">
    <div class="quest-id">QUEST #${q.id}</div>
    <div class="quest-divider"></div>
    <h3 class="quest-title">${esc(q.title)}</h3>
    <dl class="quest-stats">
      <div class="stat"><dt>Difficulty</dt><dd class="c-gold">${stars(q.difficulty)}</dd></div>
      <div class="stat"><dt>Reward</dt><dd class="c-primary">${esc(q.reward)}</dd></div>
      <div class="stat"><dt>Status</dt><dd class="text-green">✓ COMPLETED</dd></div>
    </dl>
    <button class="btn-game btn-quest" data-quest="${q.id}">[ Open Quest Details ]</button>
  </article>
`).join("");

// ============ SKILL TREE ============
(function () {
  const colW = 110, rowH = 80, padX = 30, padY = 30;
  const width = 5 * colW + padX * 2;
  const height = 5 * rowH + padY * 2;
  const pos = (n) => ({ x: padX + n.col * colW + 22, y: padY + n.row * rowH + 22 });

  const canvas = document.getElementById("skill-tree-canvas");
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.style.minWidth = width + "px";

  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("width", width); svg.setAttribute("height", height);
  svg.style.position = "absolute"; svg.style.inset = "0"; svg.style.pointerEvents = "none";

  SKILL_NODES.filter((n) => n.parent).forEach((n) => {
    const p = SKILL_NODES.find((x) => x.id === n.parent);
    const a = pos(p), b = pos(n);
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
    line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
    line.setAttribute("stroke", n.unlocked ? "#4f9eff" : "#2a2a40");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-dasharray", n.unlocked ? "0" : "5 5");
    line.setAttribute("opacity", n.unlocked ? "0.7" : "0.5");
    svg.appendChild(line);
  });
  canvas.appendChild(svg);

  SKILL_NODES.forEach((n) => {
    const p = pos(n);
    const el = document.createElement("div");
    el.className = "tree-node " + (n.unlocked ? "unlocked" : "locked");
    el.style.left = (p.x - 22) + "px";
    el.style.top = (p.y - 22) + "px";
    el.innerHTML = `${n.unlocked ? esc(n.label) : "🔒"}<div class="tree-tooltip">${esc(n.tip)}</div>`;
    canvas.appendChild(el);
  });
})();

// ============ INVENTORY ============
document.getElementById("inventory-grid").innerHTML = INVENTORY.map((it) => `
  <button class="inv-slot ${it.rarity.toLowerCase()}" data-item="${it.id}">
    <div class="inv-icon">${it.icon}</div>
    <div class="inv-name">${esc(it.name)}</div>
    <div class="inv-rarity ${it.rarity.toLowerCase()}">${it.rarity}</div>
  </button>
`).join("");

// ============ JOURNEY ============
document.getElementById("journey-list").innerHTML = JOURNEY.map((j, i) => `
  <li class="journey-item" style="animation-delay:${i * 0.1}s">
    <div class="journey-icon ${j.state}">${j.icon}</div>
    <div class="game-card journey-card${j.state === "locked" ? " locked" : ""}">
      <div class="journey-head">
        <h3 class="journey-name">${esc(j.name)}</h3>
        ${j.state === "current" ? '<span class="current-tag">📍 CURRENT</span>' : ""}
      </div>
      <p class="journey-desc">${esc(j.desc)}</p>
    </div>
  </li>
`).join("");

// ============ ACHIEVEMENTS ============
document.getElementById("achievements-grid").innerHTML = ACHIEVEMENTS.map((a, i) => `
  <div class="game-card ach-card" style="animation-delay:${i * 0.08}s">
    <div class="ach-row">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-body">
        <div class="ach-head">
          <h3 class="ach-title">${esc(a.title)}</h3>
          <span class="ach-xp">+${a.xp} XP</span>
        </div>
        <p class="ach-desc">${esc(a.desc)}</p>
        <p class="ach-date">Unlocked: ${esc(a.date)}</p>
      </div>
    </div>
  </div>
`).join("");

// ============ MODAL ============
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

function openModal(html) {
  modalBody.innerHTML = html;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}
modal.addEventListener("click", (e) => { if (e.target.matches("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

document.addEventListener("click", (e) => {
  const qBtn = e.target.closest("[data-quest]");
  if (qBtn) {
    const q = QUESTS.find((x) => x.id === qBtn.dataset.quest);
    if (!q) return;
    openModal(`
      <div class="modal-id">QUEST #${q.id}</div>
      <h3 class="modal-title">${esc(q.title)}</h3>
      <p style="margin-bottom:1rem">${esc(q.description)}</p>
      <div class="modal-section">
        <h4 class="modal-h4">TECH STACK</h4>
        <div class="tech-chips">${q.tech.map((t) => `<span class="tech-chip">${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="modal-section">
        <h4 class="modal-h4">CHALLENGES</h4>
        <p style="color:var(--muted-foreground);font-size:0.875rem">${esc(q.challenges)}</p>
      </div>
      <div style="margin-bottom:1.5rem;font-family:var(--font-mono);font-size:0.875rem">
        <span style="color:var(--muted-foreground)">Difficulty: </span><span class="c-gold">${stars(q.difficulty)}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
        ${q.github ? `<a href="${q.github}" target="_blank" rel="noreferrer" class="btn-game">⎇ GitHub</a>` : ""}
        ${q.demo ? `<a href="${q.demo}" target="_blank" rel="noreferrer" class="btn-game gold">▶ Live Demo</a>` : ""}
      </div>
    `);
    return;
  }
  const iBtn = e.target.closest("[data-item]");
  if (iBtn) {
    const it = INVENTORY.find((x) => x.id === iBtn.dataset.item);
    if (!it) return;
    openModal(`
      <div style="display:flex;gap:1.25rem;margin-bottom:1.25rem">
        <div style="font-size:3.75rem">${it.icon}</div>
        <div>
          <h3 class="modal-title" style="margin:0">${esc(it.name)}</h3>
          <span class="inv-rarity ${it.rarity.toLowerCase()}" style="display:inline-block;margin-top:0.5rem">${it.rarity}</span>
        </div>
      </div>
      <div class="cert-placeholder">
        <div style="font-size:3rem;opacity:0.5">📜</div>
        <p style="font-family:var(--font-mono);font-size:0.75rem;color:var(--muted-foreground)">Certificate placeholder</p>
      </div>
      <p style="margin-bottom:0.75rem">${esc(it.description)}</p>
      <p style="font-family:var(--font-mono);font-size:0.875rem;color:var(--muted-foreground)">Earned: <span class="c-gold">${esc(it.date)}</span></p>
    `);
  }
});

// ============ INTERSECTION OBSERVERS ============
// Fill bars and reveal animations
const fillObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll("[data-fill]").forEach((el) => {
      el.style.width = el.dataset.fill + "%";
    });
    fillObserver.unobserve(e.target);
  });
}, { threshold: 0.18 });
document.querySelectorAll("[data-observe='stats']").forEach((el) => fillObserver.observe(el));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const sel = e.target.dataset.observe === "journey" ? ".journey-item" : ".ach-card";
    e.target.querySelectorAll(sel).forEach((el) => el.classList.add("in"));
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll("[data-observe='journey'], [data-observe='achievements']").forEach((el) => revealObserver.observe(el));

// Active nav section
const links = Array.from(document.querySelectorAll(".hud-link"));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.dataset.nav === e.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
NAV.forEach((n) => {
  const el = document.getElementById(n.id);
  if (el) sectionObserver.observe(el);
});

// ============ TOAST ============
const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.add("hidden"), 4500);
}

// ============ CONTACT FORM ============
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  showToast("Achievement Unlocked! — Message Sent (+25 XP)");
});

// ============ KONAMI ============
(function () {
  const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let i = 0;
  const overlay = document.getElementById("konami");
  document.addEventListener("keydown", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === seq[i]) {
      i++;
      if (i === seq.length) {
        overlay.classList.remove("hidden");
        confetti();
        setTimeout(() => overlay.classList.add("hidden"), 3500);
        i = 0;
      }
    } else {
      i = k === seq[0] ? 1 : 0;
    }
  });
  overlay.addEventListener("click", () => overlay.classList.add("hidden"));
})();

// ============ CONFETTI ============
function confetti() {
  const wrap = document.getElementById("confetti");
  wrap.innerHTML = "";
  wrap.classList.remove("hidden");
  const colors = ["#4f9eff","#f0c040","#7c5cbf","#e8eaf6"];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = Math.random() * 100 + "%";
    p.style.background = colors[i % colors.length];
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.animation = `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards`;
    wrap.appendChild(p);
  }
  setTimeout(() => wrap.classList.add("hidden"), 4500);
}

// ============ IDLE DETECTION ============
(function () {
  let timer, shown = false;
  const reset = () => {
    clearTimeout(timer);
    if (shown) return;
    timer = setTimeout(() => {
      if (shown) return;
      shown = true;
      showToast("💬 You've been idle. The Town Elder grows impatient...");
    }, 60000);
  };
  ["mousemove","keydown","scroll","touchstart"].forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
  reset();
})();

// ============ BOTTOM REACHED ============
(function () {
  let shown = false;
  window.addEventListener("scroll", () => {
    if (shown) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
      shown = true;
      showToast("✓ Achievement Unlocked — Thanks for Visiting: +50 XP");
    }
  }, { passive: true });
})();
