import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Links ── */
        .footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12px, 1vw, 14px);
          color: var(--theme-text-secondary);
          text-decoration: none;
          position: relative;
          display: inline-block;
          padding-bottom: 2px;
          transition: color 0.3s ease;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0%;
          height: 1px;
          background: var(--theme-text-primary);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .footer-link:hover { 
          color: var(--theme-text-primary); 
        }
        .footer-link:hover::after { 
          width: 100%; 
        }

        /* ── Marquee ── */
        .footer-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid var(--theme-border);
          border-bottom: 1px solid var(--theme-border);
          padding: 6px 0;
          width: 100%;
          position: relative;
        }
        .footer-marquee-track {
          display: flex;
          gap: 48px;
          animation: fMarquee 25s linear infinite;
          width: max-content;
        }
        @keyframes fMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .footer-marquee-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 6vw, 80px);
          letter-spacing: 2px;
          user-select: none;
          flex-shrink: 0;
        }
        /* Dark theme marquee */
        [data-theme="dark"] .footer-marquee-name {
          color: transparent;
          -webkit-text-stroke: 1px var(--theme-border-hover);
        }
        [data-theme="dark"] .footer-marquee-name.solid {
          -webkit-text-stroke: 0px;
          color: var(--theme-text-muted);
          opacity: 0.035;
        }
        /* Light theme marquee - more visible */
        [data-theme="light"] .footer-marquee-name {
          color: var(--theme-text-muted);
          opacity: 0.25;
          -webkit-text-stroke: 0px;
        }
        [data-theme="light"] .footer-marquee-name.solid {
          color: var(--theme-primary);
          opacity: 0.15;
        }

        /* ── Status dot ── */
        .status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--theme-success);
          display: inline-block;
          flex-shrink: 0;
          animation: sPulse 2.5s ease infinite;
        }
        @keyframes sPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.75); }
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: clamp(20px, 3vw, 32px) 0;
        }
        .footer-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          letter-spacing: 1.5px;
          white-space: nowrap;
          font-weight: 400;
        }
        /* Dark theme footer meta */
        [data-theme="dark"] .footer-meta {
          color: var(--theme-text-muted);
          opacity: 0.6;
        }
        /* Light theme footer meta - more visible */
        [data-theme="light"] .footer-meta {
          color: var(--theme-text-secondary);
          opacity: 0.8;
          font-weight: 500;
        }
        
        .footer-avail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
        }
        /* Dark theme availability text */
        [data-theme="dark"] .footer-avail {
          color: var(--theme-text-muted);
        }
        /* Light theme availability text - more visible */
        [data-theme="light"] .footer-avail {
          color: var(--theme-primary);
          opacity: 0.85;
        }

        @media (max-width: 600px) {
          .footer-bottom {
            justify-content: center;
            text-align: center;
            flex-direction: column;
            gap: 12px;
          }
          .footer-meta {
            white-space: normal;
            text-align: center;
            font-size: 11px;
          }
          .footer-avail {
            font-size: 11px;
          }
        }

        @media (max-width: 400px) {
          .footer-meta {
            font-size: 10px;
          }
          .footer-avail {
            font-size: 10px;
          }
        }
      `}</style>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderTop: "1px solid var(--theme-border)",
          overflow: "hidden",
        }}
      >
        {/* ── Main content ── */}
        <Box sx={{
          maxWidth: "1440px",
          mx: "auto",
          width: "100%",
          px: { xs: "20px", sm: "36px", md: "52px", lg: "96px" },
          pt: { xs: "52px", sm: "72px", md: "96px", lg: "120px" },
        }}>

          {/* Top: tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px",
              border: "1px solid var(--theme-border-hover)",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px", letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--theme-text-muted)",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Contact
            </div>
          </motion.div>

          {/* Center block: heading + description stacked */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "flex-end" },
            justifyContent: "space-between",
            gap: { xs: "32px", md: "60px", lg: "80px" },
          }}>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "3px",
                margin: 0,
                flexShrink: 0,
                color: "var(--theme-text-primary)",
              }}
            >
              Let's<br />work<br />
              <span style={{ color: "var(--theme-text-secondary)", opacity: 0.6 }}>together.</span>
            </motion.h2>

            {/* Right: description + contacts */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: "380px",
                paddingBottom: "clamp(8px, 1.5vw, 20px)",
              }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
                color: "var(--theme-text-secondary)",
                lineHeight: 1.85,
                margin: "0 0 clamp(20px, 3vw, 32px)",
              }}>
                Open to full-time roles and product engineering opportunities. Building something ambitious? Let's create something impactful together.
              </p>

              {/* Contacts stacked */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255,59,59,0.5)",
                    width: "48px",
                    flexShrink: 0,
                  }}>Email</span>
                  <a href="mailto:gopikap026@gmail.com" className="footer-link">
                    gopikap026@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </Box>

          {/* Thin divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, var(--theme-border-hover), transparent)",
            margin: "clamp(32px, 5vw, 56px) 0 0",
          }} />
        </Box>

        {/* ── Marquee (Fixed) ── */}
        <div className="footer-marquee-wrap">
          <div className="footer-marquee-track">
            {[...Array(2)].map((_, repeatIndex) => (
              <React.Fragment key={repeatIndex}>
                {Array.from({ length: 8 }, (_, i) => (
                  <span
                    key={`${repeatIndex}-${i}`}
                    className={`footer-marquee-name ${i % 4 === 2 ? "solid" : ""}`}
                    style={{ padding: "0 clamp(12px, 2vw, 28px)" }}
                  >
                    {i % 2 === 0 ? "GOPIKA" : "·"}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <Box sx={{
          maxWidth: "1440px",
          mx: "auto",
          width: "100%",
          px: { xs: "20px", sm: "36px", md: "52px", lg: "96px" },
        }}>
          <div className="footer-bottom">
            <span className="footer-meta">© {year} Gopika. All rights reserved.</span>

            <div className="footer-avail">
              <span className="status-dot" />
              Available for work
            </div>

            <span className="footer-meta">Designed &amp; built by Gopika</span>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Footer;