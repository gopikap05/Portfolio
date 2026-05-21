import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import resumePreview from "../../assets/resume/resume-preview.jpg";

function Resume() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const lastTouchDist = useRef(null);

  const openLightbox = () => {
    setLightboxOpen(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setZoom((z) => Math.min(5, Math.max(1, z - e.deltaY * 0.001)));
  }, []);

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoomIn = () => setZoom((z) => Math.min(5, z + 0.5));

  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(1, z - 0.5);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastTouchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && lastTouchDist.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist - lastTouchDist.current;
      setZoom((z) => Math.min(5, Math.max(1, z + delta * 0.005)));
      lastTouchDist.current = dist;
    }
  };

  const skills = ["React", "TypeScript", "Next.js", "MUI", "Framer Motion", "REST APIs", "Git"];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

    .resume-img-wrap {
      position: relative;
      display: block;
      cursor: zoom-in;
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
    }
    .resume-img {
      transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
      display: block;
      width: 100%;
    }
    .resume-img-wrap:hover .resume-img {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 24px 48px rgba(0,0,0,0.18);
    }
    .resume-img-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.35s ease;
      border-radius: 12px;
      pointer-events: none;
    }
    .resume-img-wrap:hover .resume-img-overlay {
      background: rgba(0,0,0,0.38);
      pointer-events: auto;
    }
    .resume-view-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.5);
      border-radius: 999px;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 10px 20px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s, background 0.2s;
      cursor: pointer;
      pointer-events: none;
    }
    .resume-img-wrap:hover .resume-view-btn {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .resume-view-btn:hover {
      background: rgba(255,255,255,0.28);
    }
    .lb-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.88);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: lb-fade-in 0.2s ease;
    }
    @keyframes lb-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .lb-img-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .lb-img {
      max-width: 90vw;
      max-height: 88vh;
      border-radius: 8px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.6);
      transform-origin: center center;
      will-change: transform;
      user-select: none;
      -webkit-user-drag: none;
    }
    .lb-close {
      position: fixed;
      top: 20px;
      right: 24px;
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 50%;
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
      z-index: 10000;
    }
    .lb-close:hover { background: rgba(255,255,255,0.22); }
    .lb-controls {
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(30,30,30,0.75);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 999px;
      padding: 8px 14px;
      z-index: 10000;
    }
    .lb-ctrl-btn {
      width: 32px;
      height: 32px;
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.85);
      font-size: 18px;
      cursor: pointer;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, color 0.2s;
    }
    .lb-ctrl-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .lb-zoom-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      color: rgba(255,255,255,0.7);
      letter-spacing: 1px;
      min-width: 44px;
      text-align: center;
    }
    .lb-divider {
      width: 1px;
      height: 18px;
      background: rgba(255,255,255,0.15);
      margin: 0 4px;
    }
    .resume-3d-card {
      width: min(260px, 100%);
      background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-dark) 100%);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 20px;
      transform: rotate3d(1, -1, 1, 55deg);
      transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
      overflow: hidden;
      padding: 28px 24px;
      display: flex;
      align-items: flex-start;
      position: relative;
      cursor: pointer;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .resume-3d-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
      pointer-events: none;
    }
    .resume-3d-card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 70%);
      pointer-events: none;
    }
    .resume-3d-card:hover {
      transform: rotate3d(0,0,0,0deg) scale(1.02);
      box-shadow: 0 30px 60px rgba(0,0,0,0.4);
      border-color: rgba(255,255,255,0.5);
    }
    .resume-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    .resume-role {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.2rem, 5vw, 3rem);
      color: #ffffff;
      line-height: 1;
      letter-spacing: 2px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .resume-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.9);
      margin: 4px 0 0;
      font-weight: 500;
    }
    .resume-download {
      background: rgba(255,255,255,0.2);
      color: #ffffff;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      border: 1px solid rgba(255,255,255,0.4);
      padding: 10px 18px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: fit-content;
      margin-top: 8px;
      backdrop-filter: blur(4px);
    }
    .resume-download:hover {
      background: rgba(255,255,255,0.35);
      border-color: rgba(255,255,255,0.7);
      transform: translateX(4px);
    }
    .resume-download svg { transition: transform 0.3s ease; }
    .resume-download:hover svg { transform: translateY(2px); }
    [data-theme="light"] .resume-3d-card {
      background: linear-gradient(135deg, var(--theme-primary-light) 0%, var(--theme-primary) 100%);
      border-color: rgba(255,255,255,0.5);
      box-shadow: 0 20px 40px rgba(122,63,145,0.2);
    }
    [data-theme="light"] .resume-role { color: #ffffff; }
    [data-theme="light"] .resume-sub { color: rgba(255,255,255,0.95); }
    [data-theme="light"] .resume-download { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.5); }
    [data-theme="light"] .resume-download:hover { background: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.8); }
    @media (max-width: 768px) {
      .resume-3d-card { transform: rotate3d(0.5,-0.5,0.5,45deg); padding: 24px 20px; }
    }
    @media (max-width: 480px) {
      .resume-3d-card { transform: rotate3d(0.3,-0.3,0.3,30deg); padding: 20px 18px; }
    }
    .skill-chip {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--theme-text-muted);
      border: 1px solid var(--theme-border-hover);
      padding: 4px 12px;
      border-radius: 999px;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    .skill-chip:hover { color: var(--theme-text-secondary); border-color: var(--theme-border); }
    [data-theme="light"] .skill-chip { border-color: var(--theme-border); }
    [data-theme="light"] .skill-chip:hover { border-color: var(--theme-primary); color: var(--theme-primary); }
    @media (max-width: 899px) {
      .resume-right-col { align-items: center !important; text-align: center; }
      .resume-chips { justify-content: center !important; }
      .resume-card-wrap { display: flex; justify-content: center; width: 100%; }
      .resume-desc { text-align: center; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      {lightboxOpen && (
        <div
          className="lb-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="lb-img-wrap" onMouseDown={handleMouseDown}>
            <img
              className="lb-img"
              src={resumePreview}
              alt="Resume Full Size"
              draggable={false}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
              }}
            />
          </div>
          <button className="lb-close" onClick={closeLightbox} aria-label="Close">
            ✕
          </button>
          <div className="lb-controls">
            <button className="lb-ctrl-btn" onClick={handleZoomOut}>−</button>
            <span className="lb-zoom-label">{Math.round(zoom * 100)}%</span>
            <button className="lb-ctrl-btn" onClick={handleZoomIn}>+</button>
            <div className="lb-divider" />
            <button className="lb-ctrl-btn" onClick={handleReset} style={{ fontSize: 14 }}>↺</button>
          </div>
        </div>
      )}

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderTop: "1px solid var(--theme-border)",
          borderBottom: "1px solid var(--theme-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: "1440px",
            mx: "auto",
            width: "100%",
            px: "clamp(16px, 5%, 96px)",
            py: { xs: "60px", sm: "70px", md: "80px" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(28px, 4vw, 48px)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                border: "1px solid var(--theme-border-hover)",
                borderRadius: "999px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--theme-text-secondary)",
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#ff3b3b",
                  display: "inline-block",
                }}
              />
              Resume
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "clamp(2rem, 7vw, 3.5rem)", md: "clamp(3rem, 5vw, 4.5rem)" },
                fontWeight: 400,
                letterSpacing: "3px",
                lineHeight: 1,
                mb: { xs: 4, md: 6 },
                textAlign: { xs: "center", md: "left" },
                color: "var(--theme-text-primary)",
              }}
            >
              A Snapshot of My{" "}
              <Box component="span" sx={{ color: "var(--theme-text-muted)", opacity: 0.5 }}>
                Professional Journey.
              </Box>
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 5, md: 10 },
              alignItems: { xs: "center", md: "flex-start" },
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Left: Resume Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: "0 0 auto", width: "100%", maxWidth: "440px" }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "380px" },
                  maxWidth: "440px",
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <div className="resume-img-wrap" onClick={openLightbox}>
                  <img
                    src={resumePreview}
                    alt="Resume Preview"
                    className="resume-img"
                    style={{
                      borderRadius: "12px",
                      border: "1px solid var(--theme-border)",
                    }}
                  />
                  <div className="resume-img-overlay">
                    <button className="resume-view-btn">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      View Full Size
                    </button>
                  </div>
                </div>
              </Box>
            </motion.div>

            {/* Right: Content */}
            <Box
              className="resume-right-col"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                gap: { xs: "32px", md: "40px" },
                width: "100%",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ width: "100%" }}
              >
                <Typography
                  className="resume-desc"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "var(--theme-text-secondary)",
                    fontSize: { xs: "0.88rem", md: "0.95rem" },
                    lineHeight: 1.9,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Experienced frontend developer with a strong foundation in
                  scalable architecture, performance optimization, and
                  production-ready UI systems. Skilled in React, TypeScript,
                  API integrations, and maintaining enterprise-level applications.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ width: "100%" }}
              >
                <Box
                  className="resume-chips"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {skills.map((s) => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </Box>
              </motion.div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(to right, var(--theme-border-hover), transparent)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <div className="resume-card-wrap">
                  <div
                    className="resume-3d-card"
                    onClick={() => window.open(import.meta.env.BASE_URL + "resume/Gopika-resume.pdf", "_blank")}
                  >
                    <div className="resume-inner">
                      <div>
                        <div className="resume-role">Jr. Frontend</div>
                        <p className="resume-sub">Developer</p>
                      </div>
                      <button className="resume-download">
                        Download CV
                        <svg viewBox="0 0 100 100" width="14" height="14" fill="currentColor">
                          <path d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Resume;