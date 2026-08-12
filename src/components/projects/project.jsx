import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";
import projects from "../../data/projects";

function ProjectHero() {
  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status === "active").length;
    const brands = [...new Set(projects.map(p => p.company).filter(Boolean))].length;
    return [
      { num: String(total).padStart(2, "0"), label: "Projects" },
      { num: String(brands).padStart(2, "0"), label: "Brands" },
      { num: String(active).padStart(2, "0"), label: "Active Now" },
    ];
  }, []);

  // Split PROJECTS into individual letters
  const projectsLetters = "PROJECTS".split("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .ph-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(255,59,59,0.5), transparent);
          margin: 0 auto;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .ph-marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 35s linear infinite;
          width: max-content;
        }

        .ph-marquee-track:hover { 
          animation-play-state: running; 
        }

        /* CONTRAST FIX: Marquee items - changed from muted to secondary */
        .ph-marquee-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--theme-text-secondary);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: opacity 0.3s ease;
        }

        .ph-marquee-item::after {
          content: '';
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,59,59,0.4);
        }

        /* Light theme adjustments */
        [data-theme="light"] .ph-marquee-item {
          color: var(--theme-text-secondary);
        }

        /* Projects letter hover animation - same as About Me and Contact */
        .projects-char {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s ease;
          cursor: default;
        }
        
        .projects-char:hover {
          transform: translateY(-10px);
          color: var(--theme-text-muted);
        }
      `}</style>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderTop: "1px solid var(--theme-border)",
          borderBottom: "1px solid var(--theme-border)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Corner decorations - same as About Me and Contact */}
        <div style={{
          position: "absolute", top: 24, left: 24,
          width: 28, height: 28,
          borderTop: "1px solid var(--theme-border-hover)",
          borderLeft: "1px solid var(--theme-border-hover)",
        }} />
        <div style={{
          position: "absolute", bottom: 24, right: 24,
          width: 28, height: 28,
          borderBottom: "1px solid var(--theme-border-hover)",
          borderRight: "1px solid var(--theme-border-hover)",
        }} />

        {/* Ambient glow - same as About Me and Contact */}
        <div style={{
          position: "absolute",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, var(--theme-primary-light) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-100px", right: "-100px",
          pointerEvents: "none",
          opacity: 0.1,
        }} />

        <Box sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          px: "5%",
          pt: { xs: "80px", md: "120px" },
          pb: { xs: "60px", md: "80px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: { xs: "auto", md: "calc(100vh - 80px)" },
          justifyContent: "center",
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: "28px" }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              border: "1px solid var(--theme-border-hover)",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--theme-text-secondary)",
            }}>
              <span style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#ff3b3b",
                display: "inline-block"
              }} />
              Project Showcase
            </div>
          </motion.div>

          {/* Main heading with per-letter hover animation */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(4rem, 15vw, 9rem)", md: "clamp(5rem, 12vw, 10rem)" },
              fontWeight: 400,
              letterSpacing: { xs: "6px", md: "10px" },
              lineHeight: 0.95,
              color: "var(--theme-text-primary)",
            }}>
              {projectsLetters.map((char, i) => (
                <span key={i} className="projects-char">
                  {char}
                </span>
              ))}
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ marginBottom: "56px", textAlign: "center" }}
          >
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: { xs: "12px", md: "13px" },
              color: "var(--theme-text-secondary)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              Design · Development · Deployment
            </Typography>
          </motion.div>

          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ marginBottom: "56px" }}
          >
            <div className="ph-line" />
          </motion.div>

          {/* Stats — fully dynamic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Box sx={{
              display: "flex",
              gap: { xs: "32px", md: "64px" },
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              {stats.map((stat, i) => (
                <Box key={i} sx={{ textAlign: "center" }}>
                  <Typography sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: { xs: "2rem", md: "2.6rem" },
                    letterSpacing: "3px",
                    color: "var(--theme-text-primary)",
                    lineHeight: 1,
                    mb: "4px",
                  }}>
                    {stat.num}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "var(--theme-text-secondary)",
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Box sx={{
            borderTop: "1px solid var(--theme-border)",
            py: "16px",
            overflow: "hidden",
          }}>
            <div className="ph-marquee-track">
              {[...Array(2)].map((_, ri) =>
                [
                  "VS Code", "WordPress", "GitHub", "Firebase", "React JS",
                  "JavaScript", "Node JS", "MUI", "Figma", "Azure",
                  "Antigravity", "Email JS", "TypeScript", "Framer Motion",
                  "Netlify", "Shopify", "Git", "Webflow", "JSON",
                  "API Integration", "Google Analytics", "Google Search Console",
                  "SEO", "Responsiveness"
                ].map((item, i) => (
                  <span key={`${ri}-${i}`} className="ph-marquee-item">
                    {item}
                  </span>
                ))
              )}
            </div>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}

export default ProjectHero;