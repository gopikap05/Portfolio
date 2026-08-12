import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

// Move these arrays into `../../data/experience.js` and import them if you want to
// keep the same pattern that `projects.js` uses for Testimonials.jsx.
const experienceData = [
  {
    id: "exp-1",
    role: "Frontend Developer",
    company: "HFWL Technologies",
    ceo: "Shaji Nair",
    location: "Arlington, Virginia, United States",
    workMode: "Work From Home",
    duration: "Mar 2025 — Present",
    description:
      "HFWL Technologies is a health-tech startup building AI-powered products across nutrition, wellness, and clinical care — including HFWL Technologies, one of its flagship products.",
    bullets: [
      "Solely own and maintain 6 product websites (HFWL Technologies, NouriqAi, KliniqAi, HFWL, KalariAi, EndoCPM) built with WP Bricks",
      "Handle end-to-end SEO meta tags, on-page optimisation, and site structure across all 6 products",
      "Integrated Google Site Kit, Google Analytics, and Microsoft Clarity for traffic and behaviour tracking",
      "Collaborate with the frontend team and tech lead on internal React portals — lifestyle dashboards and billing systems",
    ],
  },
  {
    id: "exp-2",
    role: "Frontend Developer",
    company: "Emilda Solutions Pvt Ltd · Freelance",
    ceo: "Paul Arasu",
    location: "Hosur, Tamil Nadu, India",
    workMode: "Work From Home",
    duration: "Jan 2025 — Mar 2025",
    description:
      "Continued freelance collaboration with Emilda Solutions after the full-time engagement, delivering client websites independently.",
    bullets: [
      "Built and delivered client websites independently, managing projects from brief to deployment",
      "Developed the TwoFeathers Home Care website — a responsive, accessible site focused on clean navigation and service clarity",
      "Optimised page performance and UI across deliverables, applying WordPress and Webflow best practices",
    ],
  },
  {
    id: "exp-3",
    role: "Frontend Developer",
    company: "Emilda Solutions Pvt Ltd · Full-time",
    ceo: "Paul Arasu",
    location: "India",
    workMode: "Work From Office",
    duration: "May 2024 — Jan 2025",
    description:
      "Emilda Solutions is a web development agency delivering custom digital solutions for clients across healthcare, e-commerce, and enterprise sectors globally.",
    bullets: [
      "Built and maintained client websites using WordPress and Webflow — UI development, API integrations, and third-party services",
      "Delivered 3 international projects: Vitalis Healthcare (B2B, US), Bricor (e-commerce, US), and PearlD3 (AI ERP, Saudi Arabia)",
      "Handled SEO, page speed optimisation, and cross-browser compatibility across all deliverables",
      "Worked in an agile team environment, shipping production-ready websites on client timelines",
    ],
  },
];

const educationData = [
  {
    id: "edu-1",
    school: "Karunya Institute of Technology and Sciences",
    degree: "Bachelor's degree, Electrical, Electronics and Communications Engineering",
    duration: "Jun 2019 — May 2023",
    grade: "Grade: 7.07",
  },
];

function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotTop, setDotTop] = useState(32);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  // Track which card is active based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Move the single tracking dot to align with the active card
  useLayoutEffect(() => {
    const activeCard = cardRefs.current[activeIndex];
    if (activeCard && timelineRef.current) {
      setDotTop(activeCard.offsetTop + 32);
    }
  }, [activeIndex]);

  if (!experienceData || experienceData.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        .experience-section {
          width: 100%;
          background-color: var(--theme-bg-primary);
          color: var(--theme-text-primary);
          position: relative;
          overflow: hidden;
        }

        .experience-tag {
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
          color: var(--theme-text-secondary);
          margin-bottom: clamp(40px, 6vw, 24px);
        }

        .experience-timeline {
          position: relative;
          padding-left: 32px;
        }

        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: var(--theme-border);
        }

        .experience-dot-tracker {
          position: absolute;
          left: 0px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #ff3b3b;
          border: 2px solid var(--theme-bg-primary);
          box-shadow: 0 0 0 3px rgba(255, 59, 59, 0.15);
          z-index: 2;
        }

        .experience-card {
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 20px;
          padding: 28px 30px;
          margin-bottom: 24px;
          position: relative;
          transition: border-color 0.4s ease, background 0.4s ease;
        }

        .experience-card:last-child {
          margin-bottom: 0;
        }

        .experience-card.active {
          border-color: #ff3b3b;
          background: linear-gradient(135deg, rgba(255, 59, 59, 0.04), rgba(255, 140, 59, 0.02));
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .experience-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--theme-text-primary);
        }

        .experience-company {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #ff3b3b;
          margin-top: 2px;
        }

        .experience-ceo {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: var(--theme-text-secondary);
          margin-top: 4px;
        }

        .experience-duration {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--theme-text-secondary);
          white-space: nowrap;
          padding: 6px 12px;
          border: 1px solid var(--theme-border);
          border-radius: 999px;
        }

        .experience-meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .experience-location {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--theme-text-secondary);
        }

        .experience-mode-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--theme-text-secondary);
          border: 1px solid var(--theme-border);
          border-radius: 999px;
          padding: 4px 12px;
        }

        .experience-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: var(--theme-text-primary);
          opacity: 0.85;
          margin-bottom: 16px;
        }

        .experience-bullets {
          margin: 0;
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .experience-bullets li {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--theme-text-primary);
          opacity: 0.85;
        }

        .education-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 10px;
        }

        .education-school {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--theme-text-primary);
          margin-bottom: 6px;
        }

        .education-degree {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--theme-text-primary);
          opacity: 0.85;
          margin-bottom: 8px;
        }

        .education-grade {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--theme-text-secondary);
        }

        @media (max-width: 768px) {
          .experience-timeline {
            padding-left: 24px;
          }
          .experience-dot-tracker {
            left: -8px;
          }
          .experience-card {
            padding: 20px;
          }
          .experience-role {
            font-size: 16px;
          }
          .experience-description {
            font-size: 13px;
          }
        }
      `}</style>

      <Box className="experience-section">
        <Box sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          px: "clamp(20px, 5%, 96px)",
          pt: { xs: "80px", sm: "100px", md: "120px" },
          pb: { xs: "80px", sm: "100px", md: "120px" },
        }}>

          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="experience-tag">
              <WorkOutlineIcon sx={{ fontSize: "14px" }} />
              Experience
            </div>
          </motion.div>

          {/* Header */}
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
              mb: { xs: 4, md: 6 },
            }}>
              Where I've Worked
            </Typography>
          </motion.div>

          {/* Timeline */}
          <Box className="experience-timeline" ref={timelineRef}>
            {/* Single tracking dot — moves to the active card as you scroll */}
            <motion.span
              className="experience-dot-tracker"
              animate={{ top: dotTop }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />

            {experienceData.map((exp, idx) => (
              <Box
                key={exp.id || idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`experience-card ${idx === activeIndex ? "active" : ""}`}
              >
                <Box className="experience-header">
                  <Box>
                    <Typography className="experience-role">{exp.role}</Typography>
                    <Typography className="experience-company">{exp.company}</Typography>
                    {exp.ceo && (
                      <Typography className="experience-ceo">CEO: {exp.ceo}</Typography>
                    )}
                  </Box>
                  <span className="experience-duration">{exp.duration}</span>
                </Box>

                <Box className="experience-meta-row">
                  {exp.location && (
                    <Typography className="experience-location">{exp.location}</Typography>
                  )}
                  {exp.workMode && (
                    <span className="experience-mode-chip">{exp.workMode}</span>
                  )}
                </Box>

                <Typography className="experience-description">
                  {exp.description}
                </Typography>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="experience-bullets">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </Box>
            ))}
          </Box>

          {/* Education */}
          {educationData && educationData.length > 0 && (
            <Box sx={{ mt: { xs: 6, md: 8 } }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="experience-tag">
                  <SchoolOutlinedIcon sx={{ fontSize: "14px" }} />
                  Education
                </div>
              </motion.div>

              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Box
                    className="experience-card"
                    sx={{ marginBottom: idx === educationData.length - 1 ? 0 : "16px" }}
                  >
                    <Box className="education-block">
                      <Box>
                        <Typography className="education-school">{edu.school}</Typography>
                        <Typography className="education-degree">{edu.degree}</Typography>
                        {edu.grade && (
                          <Typography className="education-grade">{edu.grade}</Typography>
                        )}
                      </Box>
                      <span className="experience-duration">{edu.duration}</span>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}

        </Box>
      </Box>
    </>
  );
}

export default Experience;