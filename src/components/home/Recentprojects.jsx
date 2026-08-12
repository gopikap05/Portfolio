import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import projects from "../../data/projects";

const SPRING_CFG = { stiffness: 300, damping: 25, mass: 0.4 };
const ACCENT_COLOR = "#8B5CF6";
const ACCENT_COLOR_RGB = "139, 92, 246";
const RED_COLOR = "#ff3b3b";
const RED_COLOR_RGB = "255, 59, 59";

function ProjectCard({ project, index, to }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, SPRING_CFG);
  const smoothY = useSpring(rawY, SPRING_CFG);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [rawX, rawY]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const originLabel = project.origin
    ? project.origin.charAt(0).toUpperCase() + project.origin.slice(1)
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ display: "flex", height: "100%", width: "100%" }}
    >
      <Link
        to={to}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--theme-border)",
          backgroundColor: "var(--theme-bg-card)",
          cursor: "none",
          boxSizing: "border-box",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="card-gradient-bg"
          style={{
            position: "absolute",
            inset: 0,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 0,
          }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "var(--theme-overlay-dark)",
          zIndex: 1,
        }} />

        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "2px",
          background: `linear-gradient(to right, ${ACCENT_COLOR}, transparent)`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s ease",
          zIndex: 2,
        }} />

        <motion.div
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "var(--theme-text-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            left: smoothX,
            top: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: hovered ? 1 : 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
          transition={{ opacity: { duration: 0.2 } }}
        >
          <span style={{ fontSize: "18px", color: "var(--theme-bg-primary)", lineHeight: 1 }}>→</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--theme-bg-primary)",
          }}>View</span>
        </motion.div>

        <div className="project-card-content" style={{
          position: "relative",
          zIndex: 3,
          padding: "30px",
          minHeight: "200px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
        }}>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "28px",
            letterSpacing: "4px",
            color: `rgba(${RED_COLOR_RGB}, 0.8)`,
            marginBottom: "16px",
            lineHeight: 1,
          }}>
            {String(project.count).padStart(2, "0")}
          </div>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
            letterSpacing: "2px",
            color: "var(--theme-text-primary)",
            lineHeight: 1,
            marginBottom: "12px",
          }}>
            {project.title || project.company}
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--theme-text-secondary)", // CHANGED: was muted, now secondary for better contrast
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            {project.company}
            {project.ceo && ` · ${project.ceo}`}
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: `rgba(${ACCENT_COLOR_RGB}, 0.8)`, // CHANGED: was 0.7, now 0.8 for better contrast
              border: `1px solid rgba(${ACCENT_COLOR_RGB}, 0.3)`,
              borderRadius: "999px",
              padding: "4px 12px",
            }}>
              {originLabel}
            </span>

            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: project.status === "active"
                ? "rgba(34,197,94,1)" // CHANGED: was 0.85, now 1 for better contrast
                : "rgba(156,163,175,0.9)", // CHANGED: was 0.7, now 0.9 for better contrast
              border: `1px solid ${project.status === "active"
                ? "rgba(34,197,94,0.3)"
                : "rgba(156,163,175,0.25)"}`,
              borderRadius: "999px",
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: project.status === "active"
                  ? "rgba(34,197,94,1)" // CHANGED: was 0.85, now 1
                  : "rgba(156,163,175,0.9)", // CHANGED: was 0.6, now 0.9
                display: "inline-block",
                flexShrink: 0,
              }} />
              {project.status}
            </span>
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--theme-text-primary)", // CHANGED: was secondary, now primary for better contrast
            fontSize: "0.9rem",
            lineHeight: 1.7,
            flex: 1,
          }}>
            {project.shortDescription}
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

function RecentProjects() {
  const navigate = useNavigate();

  const originOrder = ["HFWL Technologies", "emilda solutions", "freelance"];

  const recentProjects = originOrder.map((origin) => {
    return projects
      .filter((p) => p.origin.toLowerCase() === origin.toLowerCase())
      .sort((a, b) => b.count - a.count)[0];
  }).filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');

        @keyframes gradientRevolve {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .card-gradient-bg {
          background: linear-gradient(
            270deg,
            rgba(139, 92, 246, 0.35),
            rgba(168, 85, 247, 0.3),
            rgba(59, 130, 246, 0.3),
            rgba(139, 92, 246, 0.35)
          );
          background-size: 400% 400%;
          animation: gradientRevolve 4s ease infinite;
        }

        .projects-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border: 1px solid var(--theme-border-hover);
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          margin-bottom: clamp(40px, 6vw, 64px);
        }

        .animated-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 48px;
          border: 1px solid var(--theme-border-hover);
          background: transparent;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--theme-text-primary);
          cursor: pointer;
          overflow: hidden;
          transition: color 0.5s ease, border-color 0.5s ease, border-radius 0.5s ease;
          white-space: nowrap;
        }
        .animated-button .btn-bg {
          position: absolute;
          inset: 0;
          background: var(--theme-text-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
          border-radius: inherit;
        }
        .animated-button:hover .btn-bg { transform: scaleX(1); }
        .animated-button:hover {
          color: var(--theme-bg-primary);
          border-color: var(--theme-text-primary);
          border-radius: 10px;
        }
        .animated-button .btn-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .animated-button .btn-arrow {
          display: inline-block;
          transition: transform 0.4s ease;
        }
        .animated-button:hover .btn-arrow { transform: translateX(6px); }
        .animated-button:active { transform: scale(0.97); }

        /* Mobile horizontal scroll */
@media (max-width: 768px) {
  .projects-grid {
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .projects-grid::-webkit-scrollbar { height: 3px; }
  .projects-grid::-webkit-scrollbar-track {
    background: var(--theme-border);
    border-radius: 3px;
  }
  .projects-grid::-webkit-scrollbar-thumb {
    background: var(--theme-primary);
    border-radius: 3px;
  }

  .projects-scroll-track {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 24px;
    width: max-content;
  }

  .projects-scroll-track > * {
    width: 280px !important;
    min-width: 280px !important;
    flex-shrink: 0 !important;
    height: 360px !important;
  }

  .mobile-scroll-hint {
    display: flex !important;
  }
}

.project-card-content {
  padding: 20px !important;
}
        
        /* Desktop */
        @media (min-width: 769px) {
          .projects-grid {
            overflow: visible;
          }
          
          .projects-scroll-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
            width: 100%;
          }
          
          .mobile-scroll-hint {
            display: none !important;
          }
        }

        /* CONTRAST FIX: Swipe hint text */
        .swipe-hint-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-secondary); /* CHANGED: was muted with opacity */
        }
      `}</style>

      <Box sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        borderTop: "1px solid var(--theme-border)",
        position: "relative",
        overflow: "visible",
      }}>
        <Box sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          px: "clamp(20px, 5%, 96px)",
          pt: { xs: "80px", sm: "100px", md: "120px" },
          pb: { xs: "80px", sm: "100px", md: "120px" },
        }}>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="projects-tag">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: RED_COLOR, display: "inline-block" }} />
              Recent Projects
            </div>
          </motion.div>

          <Box sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "16px", sm: 0 },
            mb: { xs: 4, md: 6 },
          }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "clamp(2.5rem, 8vw, 4rem)", md: "clamp(3rem, 5vw, 5rem)" },
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "3px",
                color: "var(--theme-text-primary)",
              }}>
                Latest Work
              </Typography>
            </motion.div>
          </Box>

          <div className="projects-grid">
            <div className="projects-scroll-track">
              {recentProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  to={`/projects/${project.origin.toLowerCase().replace(/\s+/g, '-')}/${project.id}`}
                />
              ))}
            </div>
          </div>

          {/* Scroll hint - CONTRAST FIXED */}
          <div className="mobile-scroll-hint" style={{
            display: "none",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "24px",
            marginBottom: "0",
          }}>
            <span className="swipe-hint-text">
              Swipe to see more
            </span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontSize: "14px",
                color: "var(--theme-text-secondary)",
              }}
            >
              →
            </motion.div>
          </div>

          {/* CTA Button with top margin on desktop */}
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 2, md: 6 }
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button className="animated-button" onClick={() => navigate("/projects")}>
                <div className="btn-bg" />
                <span className="btn-text">
                  View All Projects
                  <span className="btn-arrow">→</span>
                </span>
              </button>
            </motion.div>
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default RecentProjects;