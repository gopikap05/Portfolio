import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

function ContactHero() {
  // Split "CONTACT" into individual letters
  const contactLetters = "CONTACT".split("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* Contact hero char animation - same as About Me */
        .contact-hero-char {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s ease;
          cursor: default;
        }
        
        .contact-hero-char:hover {
          transform: translateY(-10px);
          color: var(--theme-text-secondary);
        }
      `}</style>

      {/* ── CONTACT HERO SECTION ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderBottom: "1px solid var(--theme-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Corner decorations */}
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

        {/* Ambient glow */}
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
          px: "clamp(16px, 5%, 96px)",
          py: { xs: "80px", sm: "100px", md: "120px" },
          minHeight: { xs: "auto", md: "60vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#ff3b3b",
            }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--theme-text-secondary)",
            }}>
              Get in touch
            </span>
          </motion.div>

          {/* Big title — per-letter hover animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 14vw, 14rem)",
              fontWeight: 400,
              letterSpacing: "6px",
              lineHeight: 0.9,
              margin: 0,
              textAlign: "center",
              color: "var(--theme-text-primary)",
            }}>
              {contactLetters.map((char, i) => (
                <span key={i} className="contact-hero-char">
                  {char}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 1.1vw, 14px)",
              color: "var(--theme-text-secondary)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              textAlign: "center",
              margin: 0,
            }}>
              Let's work together
            </p>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}

export default ContactHero;