import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevQuest — RPG Developer Portfolio" },
      { name: "description", content: "Level 5 Full Stack Developer. Explore quests, skills, achievements, and contact the Town Elder." },
      { property: "og:title", content: "DevQuest — RPG Developer Portfolio" },
      { property: "og:description", content: "Level 5 Full Stack Developer. Explore quests, skills, achievements." },
    ],
  }),
  component: Index,
});

// ============ DATA ============

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

type Quest = {
  id: string; title: string; difficulty: number; reward: string;
  description: string; tech: string[]; challenges: string; github?: string; demo?: string;
};

const QUESTS: Quest[] = [
  {
    id: "001", title: "Weather Dashboard", difficulty: 2, reward: "React XP",
    description: "A clean, responsive weather dashboard fetching live data from OpenWeather. Search any city and view a 5-day forecast.",
    tech: ["React", "Tailwind", "OpenWeather API"],
    challenges: "Handling rate limits and gracefully degrading the UI when the API is unavailable.",
    github: "#", demo: "#",
  },
  {
    id: "002", title: "Task Manager", difficulty: 3, reward: "Full Stack XP",
    description: "A full-stack task manager with drag-and-drop boards, labels, and due-date reminders.",
    tech: ["React", "Node.js", "PostgreSQL"],
    challenges: "Designing a flexible schema for nested tasks and optimistic UI updates.",
    github: "#",
  },
  {
    id: "003", title: "Portfolio Site", difficulty: 2, reward: "Design XP",
    description: "This very portfolio — an RPG-themed single-page site with custom animations and immersive UI.",
    tech: ["React", "TanStack", "CSS"],
    challenges: "Keeping the theme cohesive without slipping into kitsch.",
    github: "#", demo: "#",
  },
  {
    id: "004", title: "Hospital Monitor App", difficulty: 4, reward: "IoT XP",
    description: "A real-time monitoring dashboard for hospital wards, surfacing patient vitals and alerts.",
    tech: ["React", "WebSockets", "Python"],
    challenges: "Building reliable real-time pipelines and meaningful alert thresholds.",
    github: "#",
  },
];

type InvItem = {
  id: string; icon: string; name: string; rarity: "Common" | "Rare" | "Epic";
  date: string; description: string;
};

const INVENTORY: InvItem[] = [
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

// ============ HOOKS ============

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

// ============ COMPONENTS ============

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[100] game-card px-5 py-4 max-w-sm glow-blue flicker">
      <p className="font-display text-sm tracking-wider text-foreground">{msg}</p>
    </div>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="game-card max-w-2xl w-full p-6 md:p-8 glow-blue flicker" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-muted-foreground hover:text-primary font-mono text-xl leading-none">✕</button>
        {children}
      </div>
    </div>
  );
}

// ============ SECTIONS ============

function HudNav({ active }: { active: string }) {
  return (
    <nav className="hud-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 pr-4 border-r border-border mr-2 shrink-0">
          <span className="text-primary text-lg">⚔</span>
          <span className="font-display font-bold tracking-widest text-sm text-foreground">DEVQUEST</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`hud-link ${active === n.id ? "active" : ""}`}>
              {n.label}
            </a>
          ))}
        </div>
        <div className="ml-auto hidden md:flex items-center gap-3 shrink-0 font-mono text-xs text-muted-foreground">
          <span>HP <span className="text-primary">100/100</span></span>
          <span>MP <span className="text-secondary">85/100</span></span>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [xp, setXp] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setXp(75), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <section id="profile" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 scanlines overflow-hidden">
      <div className="relative z-10 max-w-2xl w-full game-card p-6 md:p-10 flicker glow-blue brackets">
        <div className="text-center mb-6">
          <div className="ascii-frame text-xs mb-2">══════════════════════════════════════</div>
          <div className="font-display font-bold tracking-[0.3em] text-primary text-lg md:text-xl">⚔  CHARACTER PROFILE  ⚔</div>
          <div className="ascii-frame text-xs mt-2">══════════════════════════════════════</div>
        </div>
        <dl className="font-mono text-sm md:text-base space-y-2 mb-6">
          <Row k="Name" v={<span className="cursor-blink text-foreground">Aarav Kumar</span>} />
          <Row k="Class" v={<span className="text-primary">Full Stack Developer</span>} />
          <Row k="Level" v={<span className="text-gold">5</span>} />
          <Row k="Guild" v="Computer Science Student" />
          <Row k="Origin" v="Coimbatore, India" />
        </dl>
        <div className="ascii-frame text-xs mb-3">══════════════════════════════════════</div>
        <div className="mb-2 font-mono text-xs flex justify-between text-muted-foreground">
          <span>XP</span><span className="text-gold">750 / 1000</span>
        </div>
        <div className="xp-track mb-6"><div className="xp-fill" style={{ width: `${xp}%` }} /></div>
        <div className="ascii-frame text-xs mb-6">══════════════════════════════════════</div>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a href="#quests" className="btn-game">[ View Quests ]</a>
          <a href="#contact" className="btn-game">[ Contact NPC ]</a>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex">
      <dt className="text-muted-foreground w-24">{k}</dt>
      <dd className="text-foreground">: {v}</dd>
    </div>
  );
}

function StatsSection() {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section id="stats" className="px-4 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">📊 Character Stats</h2></div>
      <div ref={ref} className="grid md:grid-cols-2 gap-8">
        <div className="game-card p-6">
          <h3 className="font-display tracking-widest text-primary mb-6 text-lg">SOFT SKILLS</h3>
          <div className="space-y-5">
            {SOFT_SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-2 font-mono text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <span className="text-primary">{s.value}%</span>
                </div>
                <div className="xp-track"><div className="xp-fill" style={{ width: seen ? `${s.value}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="game-card p-6">
          <h3 className="font-display tracking-widest text-primary mb-6 text-lg">TECHNICAL SKILLS</h3>
          <div className="grid grid-cols-2 gap-4">
            {TECH_SKILLS.map((s) => (
              <div key={s.name} className="game-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-display font-semibold text-foreground">{s.name}</span>
                  </div>
                  <span className="font-mono text-xs text-gold border border-[color:var(--gold)] px-2 py-0.5 rounded-sm">Lv.{s.lv}</span>
                </div>
                <div className="xp-track"><div className="xp-fill" style={{ width: seen ? `${s.pct}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestsSection({ onOpen }: { onOpen: (q: Quest) => void }) {
  return (
    <section id="quests" className="px-4 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">📜 Quest Log — Completed Missions</h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {QUESTS.map((q) => (
          <article key={q.id} className="game-card p-5 flex flex-col">
            <div className="font-mono text-xs text-muted-foreground mb-1">QUEST #{q.id}</div>
            <div className="border-t border-border my-2" />
            <h3 className="font-display text-xl text-foreground mb-3">{q.title}</h3>
            <dl className="font-mono text-sm space-y-1 mb-4">
              <div className="flex justify-between"><dt className="text-muted-foreground">Difficulty</dt><dd className="text-gold">{"★".repeat(q.difficulty)}{"☆".repeat(5 - q.difficulty)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Reward</dt><dd className="text-primary">{q.reward}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="text-[#5dd39e]">✓ COMPLETED</dd></div>
            </dl>
            <button onClick={() => onOpen(q)} className="btn-game mt-auto text-xs">[ Open Quest Details ]</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillTree() {
  type Node = { id: string; label: string; unlocked: boolean; tip: string; col: number; row: number; parent?: string };
  const nodes: Node[] = [
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
  const colW = 110;
  const rowH = 80;
  const padX = 30;
  const padY = 30;
  const width = 5 * colW + padX * 2;
  const height = 5 * rowH + padY * 2;
  const pos = (n: Node) => ({ x: padX + n.col * colW + 22, y: padY + n.row * rowH + 22 });
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="skilltree" className="px-4 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">🌳 Skill Tree</h2></div>
      <div className="game-card p-6 overflow-x-auto">
        <div className="relative mx-auto" style={{ width, height, minWidth: width }}>
          <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
            {nodes.filter(n => n.parent).map((n) => {
              const p = nodes.find(x => x.id === n.parent)!;
              const a = pos(p), b = pos(n);
              return (
                <line key={n.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={n.unlocked ? "#4f9eff" : "#2a2a40"}
                  strokeWidth={2}
                  strokeDasharray={n.unlocked ? "0" : "5 5"}
                  opacity={n.unlocked ? 0.7 : 0.5}
                />
              );
            })}
          </svg>
          {nodes.map((n) => {
            const p = pos(n);
            return (
              <div key={n.id}
                className={`tree-node ${n.unlocked ? "unlocked" : "locked"} absolute`}
                style={{ left: p.x - 22, top: p.y - 22 }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                {n.unlocked ? n.label : "🔒"}
                {hover === n.id && (
                  <div className="absolute z-30 left-1/2 -translate-x-1/2 top-full mt-2 game-card px-3 py-2 text-xs font-mono text-foreground whitespace-nowrap glow-blue">
                    {n.tip}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InventorySection({ onOpen }: { onOpen: (i: InvItem) => void }) {
  return (
    <section id="inventory" className="px-4 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">🎒 Inventory — Equipped Items</h2></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {INVENTORY.map((it) => (
          <button key={it.id} onClick={() => onOpen(it)} className={`inv-slot ${it.rarity.toLowerCase()}`}>
            <div className="text-4xl mb-3">{it.icon}</div>
            <div className="font-display font-semibold text-sm text-foreground mb-2">{it.name}</div>
            <div className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border ${
              it.rarity === "Epic" ? "text-epic border-[color:var(--epic)]" :
              it.rarity === "Rare" ? "text-rare border-[color:var(--rare)]" :
              "text-common border-[color:var(--common)]"
            }`}>{it.rarity}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

function JourneySection() {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section id="journey" className="px-4 py-24 max-w-4xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">🗺️ Developer Journey</h2></div>
      <div ref={ref} className="relative">
        <div className="absolute left-8 top-2 bottom-2 border-l-2 border-dashed border-primary/40" />
        <ol className="space-y-6">
          {JOURNEY.map((j, i) => {
            const locked = j.state === "locked";
            const current = j.state === "current";
            return (
              <li key={i} className={`reveal ${seen ? "in" : ""} relative pl-20`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`absolute left-0 top-1 w-16 h-16 flex items-center justify-center text-3xl rounded-sm border ${
                  current ? "border-primary bg-primary/10 pulse-current" :
                  locked ? "border-border bg-muted/40 opacity-40" :
                  "border-primary/40 bg-primary/5 glow-blue"
                }`}>{j.icon}</div>
                <div className={`game-card p-4 ${locked ? "opacity-40" : ""}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-lg text-foreground">{j.name}</h3>
                    {current && <span className="font-mono text-[10px] text-primary border border-primary px-2 py-0.5 tracking-widest">📍 CURRENT</span>}
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">{j.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section id="achievements" className="px-4 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">🏆 Achievements Unlocked</h2></div>
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className={`game-card shimmer-hover p-5 border-[color:var(--gold)]/40 reveal ${seen ? "in" : ""}`} style={{ animationDelay: `${i * 0.08}s`, borderColor: "rgba(240,192,64,0.4)" }}>
            <div className="flex items-start gap-4">
              <div className="text-4xl shrink-0">{a.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg text-foreground truncate">{a.title}</h3>
                  <span className="font-mono text-xs text-gold border border-[color:var(--gold)] px-2 py-0.5 shrink-0">+{a.xp} XP</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{a.desc}</p>
                <p className="font-mono text-xs text-muted-foreground">Unlocked: {a.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ onSent }: { onSent: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
    onSent();
  };
  return (
    <section id="contact" className="px-4 py-24 max-w-3xl mx-auto">
      <div className="text-center mb-12"><h2 className="section-title">📨 Speak With The Elder</h2></div>
      <div className="game-card p-6 md:p-8 mb-6 relative glow-purple">
        <div className="text-center mb-4">
          <div className="ascii-frame text-xs mb-1">╔══════════════════════════╗</div>
          <div className="font-display font-bold tracking-widest text-secondary">║       🧙 TOWN ELDER       ║</div>
          <div className="ascii-frame text-xs mt-1">╚══════════════════════════╝</div>
        </div>
        <p className="font-mono text-foreground text-center leading-relaxed">
          "Ah, traveler... You seek a developer for your quest?"<br />
          <span className="text-muted-foreground">"Speak your request, and I shall relay it."</span>
        </p>
      </div>
      <form onSubmit={submit} className="game-card p-6 md:p-8 space-y-5">
        <Field label="Your Name, Adventurer">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#0a0a14] border border-border focus:border-primary focus:outline-none px-4 py-3 font-mono text-foreground transition-colors" />
        </Field>
        <Field label="Your Scroll Address (Email)">
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#0a0a14] border border-border focus:border-primary focus:outline-none px-4 py-3 font-mono text-foreground transition-colors" />
        </Field>
        <Field label="Describe Your Quest">
          <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-[#0a0a14] border border-border focus:border-primary focus:outline-none px-4 py-3 font-mono text-foreground transition-colors resize-none" />
        </Field>
        <button type="submit" className="btn-game gold w-full">⚔ Send Quest Request</button>
      </form>
      <footer className="mt-12 text-center font-mono text-xs text-muted-foreground">
        <p>© DevQuest — Forged with ⚔ in Coimbatore</p>
      </footer>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block font-display tracking-widest text-xs text-primary mb-2 uppercase">{label}</span>
      {children}
    </label>
  );
}

function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  const pieces = Array.from({ length: 80 });
  const colors = ["#4f9eff", "#f0c040", "#7c5cbf", "#e8eaf6"];
  return (
    <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
      {pieces.map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `-10px`,
          width: "8px", height: "14px",
          background: colors[i % colors.length],
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards`,
        }} />
      ))}
    </div>
  );
}

function KonamiOverlay({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [show, onClose]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="game-card p-10 text-center glow-gold flicker max-w-md mx-4">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="font-display text-2xl text-gold tracking-widest mb-2">ACHIEVEMENT UNLOCKED</h3>
        <p className="font-mono text-foreground">Secret Explorer</p>
        <p className="font-mono text-gold text-2xl mt-3">+50 XP</p>
      </div>
    </div>
  );
}

// ============ MAIN ============

function Index() {
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [activeItem, setActiveItem] = useState<InvItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [konami, setKonami] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [active, setActive] = useState("profile");
  const idleShown = useRef(false);
  const bottomShown = useRef(false);

  // Active section
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Konami
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) {
        i++;
        if (i === seq.length) {
          setKonami(true);
          setConfetti(true);
          setTimeout(() => setConfetti(false), 4500);
          i = 0;
        }
      } else {
        i = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Idle
  useEffect(() => {
    let timer: number;
    const reset = () => {
      window.clearTimeout(timer);
      if (idleShown.current) return;
      timer = window.setTimeout(() => {
        if (idleShown.current) return;
        idleShown.current = true;
        setToast("💬 You've been idle. The Town Elder grows impatient...");
      }, 60000);
    };
    ["mousemove", "keydown", "scroll", "touchstart"].forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => {
      window.clearTimeout(timer);
      ["mousemove", "keydown", "scroll", "touchstart"].forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, []);

  // Bottom reached
  useEffect(() => {
    const onScroll = () => {
      if (bottomShown.current) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        bottomShown.current = true;
        setToast("✓ Achievement Unlocked — Thanks for Visiting: +50 XP");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <HudNav active={active} />
      <main className="pt-14">
        <Hero />
        <StatsSection />
        <QuestsSection onOpen={setActiveQuest} />
        <SkillTree />
        <InventorySection onOpen={setActiveItem} />
        <JourneySection />
        <AchievementsSection />
        <ContactSection onSent={() => setToast("Achievement Unlocked! — Message Sent (+25 XP)")} />
      </main>

      <Modal open={!!activeQuest} onClose={() => setActiveQuest(null)}>
        {activeQuest && (
          <div>
            <div className="font-mono text-xs text-muted-foreground">QUEST #{activeQuest.id}</div>
            <h3 className="font-display text-2xl text-foreground mt-1 mb-4">{activeQuest.title}</h3>
            <p className="text-foreground mb-4">{activeQuest.description}</p>
            <div className="mb-4">
              <h4 className="font-display tracking-widest text-primary text-sm mb-2">TECH STACK</h4>
              <div className="flex flex-wrap gap-2">
                {activeQuest.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-primary border border-primary/50 bg-primary/10 px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-display tracking-widest text-primary text-sm mb-2">CHALLENGES</h4>
              <p className="text-muted-foreground text-sm">{activeQuest.challenges}</p>
            </div>
            <div className="mb-6 font-mono text-sm">
              <span className="text-muted-foreground">Difficulty: </span>
              <span className="text-gold">{"★".repeat(activeQuest.difficulty)}{"☆".repeat(5 - activeQuest.difficulty)}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {activeQuest.github && <a href={activeQuest.github} className="btn-game" target="_blank" rel="noreferrer">⎇ GitHub</a>}
              {activeQuest.demo && <a href={activeQuest.demo} className="btn-game gold" target="_blank" rel="noreferrer">▶ Live Demo</a>}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!activeItem} onClose={() => setActiveItem(null)}>
        {activeItem && (
          <div>
            <div className="flex items-start gap-5 mb-5">
              <div className="text-6xl">{activeItem.icon}</div>
              <div>
                <h3 className="font-display text-2xl text-foreground">{activeItem.name}</h3>
                <span className={`inline-block mt-2 font-mono text-xs uppercase tracking-widest px-2 py-0.5 border ${
                  activeItem.rarity === "Epic" ? "text-epic border-[color:var(--epic)]" :
                  activeItem.rarity === "Rare" ? "text-rare border-[color:var(--rare)]" :
                  "text-common border-[color:var(--common)]"
                }`}>{activeItem.rarity}</span>
              </div>
            </div>
            <div className="aspect-video bg-[#0a0a14] border border-border flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-5xl mb-2 opacity-50">📜</div>
                <p className="font-mono text-xs text-muted-foreground">Certificate placeholder</p>
              </div>
            </div>
            <p className="text-foreground mb-3">{activeItem.description}</p>
            <p className="font-mono text-sm text-muted-foreground">Earned: <span className="text-gold">{activeItem.date}</span></p>
          </div>
        )}
      </Modal>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      <KonamiOverlay show={konami} onClose={() => setKonami(false)} />
      <Confetti show={confetti} />
    </>
  );
}
