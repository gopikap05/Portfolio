import { Box } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ThanksNote() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-80, 80], [6, -6]);
  const rotateY = useTransform(sx, [-80, 80], [-6, 6]);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await emailjs.send(
        "service_3wgg108",
        "template_dlg5gxp",
        {
          from_name: "Portfolio Visitor",
          from_email: "gopikap026@gmail.com",
          rating: `${selected}/5`,
          label: labels[selected],
          feedback: feedback || "No feedback provided",
          to_email: "gopikap026@gmail.com",
        },
        "tF2Z9ebsNoKBb13kb"
      );
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .tn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          align-items: stretch;
        }
        @media (max-width: 680px) {
          .tn-grid { grid-template-columns: 1fr; }
        }

        .tn-card {
          position: relative;
          height: 100%;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 16px;
          padding: 36px 24px 28px 52px;
          box-shadow: var(--theme-shadow-lg);
          transform-style: preserve-3d;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }
        .tn-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #ff3b3b, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
          border-radius: 16px 16px 0 0;
        }
        .tn-card:hover::before {
          transform: scaleX(1);
        }
        .tn-card:hover {
          border-color: var(--theme-border-hover);
        }

        .tn-margin-line { 
          position: absolute; 
          left: 36px; 
          top: 0; 
          bottom: 0; 
          width: 1.5px; 
          background: rgba(255,59,59,0.25); 
        }
        
        .tn-hole { 
          position: absolute; 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          background: var(--theme-bg-primary); 
          border: 1px solid var(--theme-border);
          left: 50%; 
          transform: translateX(-50%); 
        }
        .tn-hole.h1 { top: 16px; }
        .tn-hole.h2 { top: 50%; margin-top: -6px; }
        .tn-hole.h3 { bottom: 16px; }
        
        .tn-tape { 
          position: absolute; 
          top: -9px; 
          left: 50%; 
          transform: translateX(-50%) rotate(-1.5deg); 
          width: 70px; 
          height: 20px; 
          background: rgba(255,59,59,0.15); 
          border-radius: 2px; 
          border: 1px solid rgba(255,59,59,0.2);
        }
        
        .tn-stamp { 
          position: absolute; 
          top: 16px; 
          right: 16px; 
          width: 38px; 
          height: 48px; 
          border: 2px solid rgba(255,59,59,0.45); 
          border-radius: 3px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 3px; 
        }
        .tn-stamp-inner { 
          width: 100%; 
          height: 100%; 
          border: 1px solid rgba(255,59,59,0.25); 
          border-radius: 2px; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
        }
        .tn-stamp-icon { 
          font-size: 14px; 
          line-height: 1; 
          color: rgba(255,59,59,0.6);
        }
        .tn-stamp-text { 
          font-family: 'DM Sans', sans-serif; 
          font-size: 5px; 
          letter-spacing: 1.5px; 
          text-transform: uppercase; 
          color: rgba(255,59,59,0.6); 
          margin-top: 2px; 
        }
        
        .tn-postmark { 
          position: absolute; 
          top: 12px; 
          right: 62px; 
          width: 44px; 
          height: 44px; 
          border-radius: 50%; 
          border: 1.5px solid var(--theme-border-hover); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }
        .tn-postmark::before, .tn-postmark::after { 
          content:''; 
          position:absolute; 
          width:100%; 
          height:1.5px; 
          background: var(--theme-border-hover); 
        }
        .tn-postmark::before { transform: rotate(-25deg); }
        .tn-postmark::after  { transform: rotate(25deg); }
        .tn-postmark-text { 
          font-family: 'DM Sans', sans-serif; 
          font-size: 6px; 
          letter-spacing: 1px; 
          text-transform: uppercase; 
          color: var(--theme-text-muted); 
          text-align: center; 
          z-index: 1; 
          line-height: 1.4; 
        }
        
        .tn-date { 
          font-family: 'Caveat', cursive; 
          font-size: 18px; 
          color: var(--theme-text-muted); 
          display: block; 
          margin-bottom: 1.2rem; 
        }
        
        .tn-card p { 
          font-family: 'Caveat', cursive; 
          font-size: 18px; 
          line-height: 1.5rem; 
          color: var(--theme-text-secondary); 
          margin: 0 0 1.2rem 0; 
        }
        
        .tn-sign { 
          font-family: 'Caveat', cursive; 
          font-size: 22px; 
          font-weight: 600; 
          color: var(--theme-text-secondary); 
          display: block; 
          margin-top: 8px; 
        }

        /* Rating box */
        .rate-box {
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 16px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          height: 100%;
          box-sizing: border-box;
          min-height: 260px;
          transition: border-color 0.3s ease;
          overflow: visible;
        }
        .rate-box:hover {
          border-color: var(--theme-border-hover);
        }

        .rate-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
        }

        /* Star Rating Styles */
        .rating-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        
        .rating-dots {
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: center;
        }
        
        .rating-dot { 
          width: 8px; 
          height: 8px; 
          border-radius: 50%; 
          background: var(--theme-border); 
          transition: all 0.2s ease; 
        }
        
        .rating-dot.lit { 
          background: #f59e0b;
        }

        .rating-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; 
          letter-spacing: 1px;
          color: var(--theme-text-secondary);
          font-weight: 500;
          text-align: center;
          margin-top: 4px;
        }

        /* Feedback textarea */
        .feedback-wrapper {
          width: 100%;
        }
        
        .feedback-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          display: block;
          margin-bottom: 12px;
          text-align: left;
        }
        
        .rate-feedback {
          width: 100%;
          box-sizing: border-box;
          background: var(--theme-bg-secondary);
          border: 1px solid var(--theme-border);
          border-radius: 12px;
          padding: 14px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--theme-text-primary);
          resize: none;
          outline: none;
          transition: border-color 0.25s ease;
          line-height: 1.6;
        }
        .rate-feedback::placeholder { 
          color: var(--theme-text-muted); 
          opacity: 0.5;
        }
        .rate-feedback:focus { 
          border-color: #ff3b3b; 
        }

        .rate-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; 
          letter-spacing: 3px; 
          text-transform: uppercase;
          padding: 14px 32px; 
          border-radius: 999px;
          border: 1px solid var(--theme-border); 
          background: transparent;
          color: var(--theme-text-muted); 
          cursor: not-allowed;
          transition: all 0.25s ease; 
          width: 100%; 
          max-width: 220px;
        }
        .rate-btn.ready { 
          border-color: rgba(255,59,59,0.45); 
          color: rgba(255,100,100,0.8); 
          cursor: pointer; 
        }
        .rate-btn.ready:hover { 
          background: rgba(255,59,59,0.07); 
          border-color: rgba(255,59,59,0.7); 
          color: #ff6b6b; 
        }
        .rate-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .rate-success { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 16px; 
          text-align: center; 
        }
        .rate-success-icon { 
          font-size: 40px; 
          color: #f59e0b; 
        }
        .rate-success-score { 
          font-family: 'DM Sans', sans-serif; 
          font-size: 16px; 
          color: #f59e0b; 
          letter-spacing: 1px; 
        }
        .rate-success-text { 
          font-family: 'DM Sans', sans-serif; 
          font-size: 13px; 
          letter-spacing: 2px; 
          text-transform: uppercase; 
          color: var(--theme-text-muted); 
          line-height: 1.6; 
        }
      `}</style>

      <Box sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        borderTop: "1px solid var(--theme-border)",
        borderBottom: "1px solid var(--theme-border)",
        px: "5%",
        py: { xs: "60px", sm: "72px", md: "90px" },
      }}>
        <Box sx={{ maxWidth: "1440px", width: "100%", mx: "auto" }}>
          <div className="tn-grid">

            {/* Note card */}
            <motion.div
              ref={ref}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="tn-card">
                <div className="tn-tape" />
                <div className="tn-margin-line" />
                <div className="tn-hole h1" />
                <div className="tn-hole h2" />
                <div className="tn-hole h3" />
                <div className="tn-postmark">
                  <div className="tn-postmark-text">2025<br />India</div>
                </div>
                <div className="tn-stamp">
                  <div className="tn-stamp-inner">
                    <span className="tn-stamp-icon">✦</span>
                    <span className="tn-stamp-text">Portfolio</span>
                  </div>
                </div>
                <span className="tn-date">2026,</span>
                <p>Thank you for exploring my portfolio. Every section, component, interaction and animation you see here was carefully crafted to reflect both structure and creativity.</p>
                <p>I appreciate your time and interest in my work.</p>
                <span className="tn-sign">— Gopika</span>
              </div>
            </motion.div>

            {/* Rating box */}
            <motion.div
              style={{ overflow: 'visible' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rate-box">
                {!submitted ? (
                  <>
                    <span className="rate-title">Rate this Portfolio</span>

                    <div className="rating-section">
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '0 12px',
                        boxSizing: 'border-box',
                      }}>
                        {[1, 2, 3, 4, 5].map((n) => {
                          const isLit = n <= (hovered || selected);
                          return (
                            <svg
                              key={n}
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              style={{ cursor: 'pointer', flexShrink: 0, transition: 'transform 0.2s ease' }}
                              onMouseEnter={() => setHovered(n)}
                              onMouseLeave={() => setHovered(0)}
                              onClick={() => setSelected(n)}
                              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
                              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                              <polygon
                                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                                fill={isLit ? '#f59e0b' : 'none'}
                                stroke={isLit ? '#f59e0b' : '#555'}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          );
                        })}
                      </div>

                      <div className="rating-dots">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className={`rating-dot ${n <= (hovered || selected) ? "lit" : ""}`} />
                        ))}
                      </div>

                      <div className="rating-label">
                        {(hovered || selected) ? labels[hovered || selected] : "Select a rating"}
                      </div>
                    </div>

                    {/* Optional feedback */}
                    <div className="feedback-wrapper">
                      <span className="feedback-label">Feedback — optional</span>
                      <textarea
                        className="rate-feedback"
                        rows={3}
                        placeholder="Share your thoughts..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>

                    <button
                      className={`rate-btn ${selected ? "ready" : ""}`}
                      disabled={!selected || loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Sending..." : "Submit →"}
                    </button>
                  </>
                ) : (
                  <motion.div
                    className="rate-success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="rate-success-icon">✦</span>
                    <span className="rate-success-score">{selected} / 5 · {labels[selected]}</span>
                    <span className="rate-success-text">
                      Thanks for the feedback!<br />It means a lot.
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>

          </div>
        </Box>
      </Box>
    </>
  );
}

export default ThanksNote;