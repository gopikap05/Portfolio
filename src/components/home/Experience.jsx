import { useState, useRef, useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Same advice as before: move these into `../../data/experience.js` if you like.
// `start` / `end` drive the proportional career strip (end: null = still working).
const experienceData = [
  {
    id: "exp-3",
    label: "Emilda · Full-time",
    role: "Frontend Developer",
    company: "Emilda Solutions Pvt Ltd",
    type: "Full-time",
    ceo: "Paul Arasu",
    location: "India",
    workMode: "Work From Office",
    start: "2024-05-01",
    end: "2025-01-01",
    duration: "May 2024 — Jan 2025",
    description:
      "A web development agency delivering custom digital solutions for clients across healthcare, e-commerce, and enterprise sectors globally.",
    tags: ["WordPress", "Webflow", "SEO", "Cross-browser"],
    bullets: [
      "Built and maintained client websites using WordPress and Webflow — UI development, API integrations, and third-party services",
      "Delivered 3 international projects: Vitalis Healthcare (B2B, US), Bricor (e-commerce, US), and PearlD3 (AI ERP, Saudi Arabia)",
      "Handled SEO, page speed optimisation, and cross-browser compatibility across all deliverables",
      "Worked in an agile team environment, shipping production-ready websites on client timelines",
    ],
  },
  {
    id: "exp-2",
    label: "Emilda · Freelance",
    role: "Frontend Developer",
    company: "Emilda Solutions Pvt Ltd",
    type: "Freelance",
    ceo: "Paul Arasu",
    location: "Hosur, Tamil Nadu, India",
    workMode: "Work From Home",
    start: "2025-01-01",
    end: "2025-03-01",
    duration: "Jan 2025 — Mar 2025",
    description:
      "Continued freelance collaboration with Emilda Solutions after the full-time engagement, delivering client websites independently.",
    tags: ["WordPress", "Webflow", "Performance"],
    bullets: [
      "Built and delivered client websites independently, managing projects from brief to deployment",
      "Developed the TwoFeathers Home Care website — a responsive, accessible site focused on clean navigation and service clarity",
      "Optimised page performance and UI across deliverables, applying WordPress and Webflow best practices",
    ],
  },
  {
    id: "exp-1",
    label: "HFWL Technologies",
    role: "Frontend Developer",
    company: "HFWL Technologies",
    type: "Full-time",
    ceo: "Shaji Nair",
    location: "Arlington, Virginia, United States",
    workMode: "Work From Home",
    start: "2025-03-01",
    end: null,
    duration: "Mar 2025 — Present",
    description:
      "A health-tech startup building AI-powered products across nutrition, wellness, and clinical care — including HFWL Technologies, one of its flagship products.",
    tags: ["WP Bricks", "SEO", "Google Analytics", "Clarity", "React"],
    bullets: [
      "Solely own and maintain 6 product websites (HFWL Technologies, NouriqAi, KliniqAi, HFWL, KalariAi, EndoCPM) built with WP Bricks",
      "Handle end-to-end SEO meta tags, on-page optimisation, and site structure across all 6 products",
      "Integrated Google Site Kit, Google Analytics, and Microsoft Clarity for traffic and behaviour tracking",
      "Collaborate with the frontend team and tech lead on internal React portals — lifestyle dashboards and billing systems",
    ],
  },
];

const educationData = [
  {
    id: "edu-1",
    label: "Karunya",
    school: "Karunya Institute of Technology and Sciences",
    degree: "Bachelor's degree, Electrical, Electronics and Communications Engineering",
    start: "2019-06-01",
    end: "2023-05-01",
    duration: "Jun 2019 — May 2023",
    grade: "Grade: 7.07",
  },
];

const MONTH_MS = 1000 * 60 * 60 * 24 * 30.44;
const monthsBetween = (start, end) =>
  Math.max(1, Math.round(((end ? new Date(end) : new Date()) - new Date(start)) / MONTH_MS));
const formatSpan = (m) => {
  const y = Math.floor(m / 12);
  const r = m % 12;
  if (!y) return `${r} mo`;
  return r ? `${y} yr ${r} mo` : `${y} yr`;
};

function Experience() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("work");
  const [active, setActive] = useState(experienceData.length - 1); // newest, on the right
  const dirRef = useRef(1);
  const panelRef = useRef(null);
  const tabRefs = useRef([]);

  const items = useMemo(
    () => experienceData.map((e) => ({ ...e, months: monthsBetween(e.start, e.end) })),
    []
  );
  const totalMonths = useMemo(() => items.reduce((s, e) => s + e.months, 0), [items]);
  const current = items[active];

  const select = (i) => {
    if (i === active) return;
    dirRef.current = i > active ? 1 : -1;
    setActive(i);
  };
  const step = (d) => {
    const n = Math.min(items.length - 1, Math.max(0, active + d));
    select(n);
    tabRefs.current[n]?.focus();
  };

  // Cursor spotlight on the panel — written straight to CSS vars, no re-renders
  const onMove = (e) => {
    const r = panelRef.current?.getBoundingClientRect();
    if (!r) return;
    panelRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    panelRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, items.length);
  }, [items.length]);

  if (!items.length) return null;

  const slide = {
    initial: (d) => ({ opacity: 0, x: reduce ? 0 : d * 48 }),
    animate: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: reduce ? 0 : d * -48 }),
  };

  return (
    <>
      <style>{`
        .xp-section {
          width: 100%;
          background-color: var(--theme-bg-primary);
          color: var(--theme-text-primary);
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }
        .xp-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          border: 1px solid var(--theme-border-hover);
          border-radius: 999px;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--theme-text-secondary);
          margin-bottom: 24px;
        }

        /* ---------- top bar: tenure + tabs ---------- */
        .xp-top {
          display: flex; justify-content: space-between; align-items: flex-end;
          flex-wrap: wrap; gap: 24px; margin-bottom: clamp(32px, 5vw, 56px);
        }
        .xp-total { font-size: 14px; color: var(--theme-text-secondary); max-width: 280px; line-height: 1.5; }
        .xp-total strong { color: var(--theme-text-primary); font-size: 22px; font-weight: 700; display: block; }
        .xp-switch {
          display: inline-flex; padding: 4px; gap: 4px;
          border: 1px solid var(--theme-border); border-radius: 999px;
          background: var(--theme-bg-card);
        }
        .xp-switch button {
          position: relative; border: 0; background: transparent; cursor: pointer;
          padding: 8px 18px; border-radius: 999px;
          font: 500 13px 'DM Sans', sans-serif; color: var(--theme-text-secondary);
          display: inline-flex; align-items: center; gap: 8px;
          transition: color .25s ease;
        }
        .xp-switch button[aria-selected="true"] { color: #fff; }
        .xp-switch .xp-pill {
          position: absolute; inset: 0; border-radius: 999px; background: #ff3b3b; z-index: 0;
        }
        .xp-switch span.xp-label { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; }

        /* ---------- career strip ---------- */
        .xp-strip { display: flex; gap: 6px; margin-bottom: 28px; }
        .xp-seg {
          appearance: none; background: none; border: 0; padding: 0; cursor: pointer;
          text-align: left; min-width: 72px; color: inherit; font-family: inherit;
          display: flex; flex-direction: column; gap: 12px;
        }
        .xp-bar {
          position: relative; height: 12px; border-radius: 999px; overflow: hidden;
          background: var(--theme-border);
          transition: transform .3s ease, background .3s ease;
        }
        .xp-seg:hover .xp-bar { background: var(--theme-border-hover); }
        .xp-bar-fill {
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(90deg, #ff3b3b, #ff8c3b);
        }
        .xp-bar.live::after {
          content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 28px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55));
          animation: xp-sweep 2.2s ease-in-out infinite;
        }
        @keyframes xp-sweep { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        .xp-seg-name { font-size: 13px; font-weight: 600; color: var(--theme-text-secondary); transition: color .25s ease; line-height: 1.3; }
        .xp-seg-span { font-size: 12px; color: var(--theme-text-secondary); opacity: .75; }
        .xp-seg[aria-selected="true"] .xp-seg-name { color: var(--theme-text-primary); }
        .xp-seg:focus-visible, .xp-switch button:focus-visible, .xp-nav button:focus-visible {
          outline: 2px solid #ff3b3b; outline-offset: 4px; border-radius: 8px;
        }

        /* ---------- detail panel ---------- */
        .xp-panel {
          --mx: 50%; --my: 0px;
          position: relative; overflow: hidden;
          border: 1px solid var(--theme-border); border-radius: 28px;
          background: var(--theme-bg-card);
          padding: clamp(24px, 4vw, 48px);
          min-height: 420px;
        }
        .xp-panel::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(420px circle at var(--mx) var(--my), rgba(255,59,59,.10), transparent 70%);
        }
        .xp-ghost {
          position: absolute; right: clamp(16px, 3vw, 40px); top: clamp(4px, 1vw, 16px);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 16vw, 12rem); line-height: 1; letter-spacing: 4px;
          color: transparent; -webkit-text-stroke: 1px var(--theme-border-hover);
          pointer-events: none; user-select: none; white-space: nowrap;
        }
        .xp-grid {
          position: relative; display: grid; gap: clamp(28px, 4vw, 56px);
          grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
        }
        .xp-role { font-size: clamp(22px, 3vw, 30px); font-weight: 700; line-height: 1.15; }
        .xp-company { font-size: 16px; font-weight: 500; color: #ff3b3b; margin-top: 6px; }
        .xp-when { font-size: 13px; color: var(--theme-text-secondary); margin-top: 6px; }
        .xp-desc { font-size: 14px; line-height: 1.7; opacity: .85; margin: 20px 0; max-width: 46ch; }
        .xp-facts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
        .xp-fact { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--theme-text-secondary); }
        .xp-fact svg { font-size: 16px; color: #ff3b3b; flex-shrink: 0; }
        .xp-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .xp-chip {
          font-size: 12px; padding: 5px 12px; border-radius: 999px;
          border: 1px solid var(--theme-border); color: var(--theme-text-secondary);
          transition: border-color .25s ease, color .25s ease;
        }
        .xp-chip:hover { border-color: #ff3b3b; color: var(--theme-text-primary); }

        .xp-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
        .xp-item {
          position: relative; padding: 16px 0 16px 28px;
          border-top: 1px solid var(--theme-border);
          font-size: 14px; line-height: 1.65; opacity: .85;
          transition: opacity .25s ease, padding-left .25s ease;
        }
        .xp-item:last-child { border-bottom: 1px solid var(--theme-border); }
        .xp-item::before {
          content: ''; position: absolute; left: 0; top: 24px;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--theme-border-hover);
          transition: background .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .xp-list:hover .xp-item { opacity: .45; }
        .xp-list .xp-item:hover { opacity: 1; padding-left: 36px; }
        .xp-item:hover::before { background: #ff3b3b; transform: scale(1.3); box-shadow: 0 0 0 4px rgba(255,59,59,.15); }

        .xp-nav { position: relative; display: flex; align-items: center; justify-content: space-between; margin-top: 32px; gap: 16px; }
        .xp-nav-count { font-size: 12px; color: var(--theme-text-secondary); }
        .xp-nav-btns { display: flex; gap: 8px; }
        .xp-nav button {
          width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
          border: 1px solid var(--theme-border); background: transparent; color: var(--theme-text-primary);
          display: inline-flex; align-items: center; justify-content: center;
          transition: border-color .25s ease, background .25s ease, color .25s ease;
        }
        .xp-nav button:hover:not(:disabled) { border-color: #ff3b3b; background: #ff3b3b; color: #fff; }
        .xp-nav button:disabled { opacity: .3; cursor: default; }

        .xp-edu-grade {
          display: inline-block; margin-top: 16px; font-size: 12px; padding: 5px 12px;
          border-radius: 999px; border: 1px solid var(--theme-border); color: var(--theme-text-secondary);
        }

        @media (max-width: 860px) {
          .xp-grid { grid-template-columns: 1fr; }
          .xp-ghost { top: auto; bottom: -8px; right: 12px; opacity: .6; }
        }
        @media (max-width: 560px) {
          .xp-seg { min-width: 56px; }
          .xp-seg-name { font-size: 12px; }
          .xp-panel { border-radius: 20px; min-height: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .xp-bar.live::after { animation: none; }
          .xp-item, .xp-item::before { transition: none; }
        }
      `}</style>

      <Box className="xp-section">
        <Box
          sx={{
            maxWidth: "1440px",
            width: "100%",
            mx: "auto",
            px: "clamp(20px, 5%, 96px)",
            pt: { xs: "80px", sm: "100px", md: "120px" },
            pb: { xs: "80px", sm: "100px", md: "120px" },
          }}
        >
          <div className="xp-tag">
            <WorkOutlineIcon sx={{ fontSize: "14px" }} />
            Experience
          </div>

          <Typography
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2.5rem, 8vw, 4rem)", md: "clamp(3rem, 5vw, 5rem)" },
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "3px",
              color: "var(--theme-text-primary)",
              mb: { xs: 3, md: 4 },
            }}
          >
            Where I've Worked
          </Typography>

          <div className="xp-top">
            <div className="xp-total">
              <strong>{formatSpan(totalMonths)}</strong>
              building for the web across {items.length} roles. Pick one to see what I did.
            </div>

            <div className="xp-switch" role="tablist" aria-label="Section">
              {[
                { id: "work", label: "Work", icon: <WorkOutlineIcon sx={{ fontSize: 16 }} /> },
                { id: "edu", label: "Education", icon: <SchoolOutlinedIcon sx={{ fontSize: 16 }} /> },
              ].map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="xp-pill"
                      className="xp-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="xp-label">
                    {t.icon}
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "work" ? (
              <motion.div
                key="work"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Career strip: bar width = time spent. Oldest → newest. */}
                <div
                  className="xp-strip"
                  role="tablist"
                  aria-label="Roles, oldest to newest"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
                    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
                  }}
                >
                  {items.map((exp, i) => {
                    const on = i === active;
                    return (
                      <button
                        key={exp.id}
                        ref={(el) => (tabRefs.current[i] = el)}
                        className="xp-seg"
                        role="tab"
                        aria-selected={on}
                        tabIndex={on ? 0 : -1}
                        onClick={() => select(i)}
                        style={{ flex: `${exp.months} 1 0` }}
                      >
                        <span className={`xp-bar ${!exp.end ? "live" : ""}`}>
                          {on && (
                            <motion.span
                              layoutId="xp-fill"
                              className="xp-bar-fill"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </span>
                        <span>
                          <span className="xp-seg-name">{exp.label}</span>
                          <br />
                          <span className="xp-seg-span">{formatSpan(exp.months)}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="xp-panel" ref={panelRef} onMouseMove={onMove} role="tabpanel">
                  <AnimatePresence mode="wait" custom={dirRef.current} initial={false}>
                    <motion.div
                      key={current.id}
                      custom={dirRef.current}
                      variants={slide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="xp-ghost" aria-hidden="true">
                        {formatSpan(current.months)}
                      </div>

                      <div className="xp-grid">
                        <div>
                          <div className="xp-role">{current.role}</div>
                          <div className="xp-company">{current.company}</div>
                          <div className="xp-when">
                            {current.type} · {current.duration}
                          </div>

                          <p className="xp-desc">{current.description}</p>

                          <div className="xp-facts">
                            <div className="xp-fact">
                              <PlaceOutlinedIcon />
                              {current.location}
                            </div>
                            <div className="xp-fact">
                              <LaptopMacOutlinedIcon />
                              {current.workMode}
                            </div>
                            {current.ceo && (
                              <div className="xp-fact">
                                <PersonOutlineIcon />
                                CEO: {current.ceo}
                              </div>
                            )}
                          </div>

                          <div className="xp-chips">
                            {current.tags.map((t) => (
                              <span className="xp-chip" key={t}>{t}</span>
                            ))}
                          </div>
                        </div>

                        <ul className="xp-list">
                          {current.bullets.map((b, i) => (
                            <motion.li
                              key={b}
                              className="xp-item"
                              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                              animate={{ opacity: 0.85, y: 0 }}
                              transition={{ delay: reduce ? 0 : 0.12 + i * 0.07, duration: 0.4 }}
                            >
                              {b}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="xp-nav">
                    <span className="xp-nav-count">
                      Role {items.length - active} of {items.length} · newest first
                    </span>
                    <div className="xp-nav-btns">
                      <button aria-label="Earlier role" disabled={active === 0} onClick={() => step(-1)}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                      </button>
                      <button aria-label="Later role" disabled={active === items.length - 1} onClick={() => step(1)}>
                        <ArrowForwardIcon sx={{ fontSize: 18 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edu"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.3 }}
              >
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    className="xp-panel"
                    ref={panelRef}
                    onMouseMove={onMove}
                    style={{ minHeight: 260 }}
                  >
                    <div style={{ position: "relative", maxWidth: 560 }}>
                      <div className="xp-role">{edu.school}</div>
                      <p className="xp-desc">{edu.degree}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </>
  );
}

export default Experience;