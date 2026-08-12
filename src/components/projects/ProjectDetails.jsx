import { Box, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import projects from "../../data/projects";
import Breadcrumbs from "../common/breadcrumbs";

import figma from "../../assets/tech icons/figma.svg";
import github from "../../assets/tech icons/github.svg";
import netlify from "../../assets/tech icons/netflify.svg";
import shopify from "../../assets/tech icons/shopify.svg";
import vscode from "../../assets/tech icons/vs code.svg";
import webflow from "../../assets/tech icons/webflow.svg";
import wordpress from "../../assets/tech icons/wordpress.svg";
import hostinger from "../../assets/tech icons/hostinger.png";
import firebase from "../../assets/tech icons/firebase.png";
import antigravity from "../../assets/tech icons/antigravity.png";
import mui from "../../assets/tech icons/mui.png";
import nodejs from "../../assets/tech icons/node js.png";
// import npm from "../../assets/tech icons/npm.svg";
import php from "../../assets/tech icons/php.svg";
import react from "../../assets/tech icons/react.svg";
// import vite from "../../assets/tech icons/vite.svg";
import typescript from "../../assets/tech icons/typescript.svg";
import razorpay from "../../assets/tech icons/razor pay.png";
import api from "../../assets/tech icons/api.png";
import lenis from "../../assets/tech icons/lenis.png";
import lottie from "../../assets/tech icons/lottie.webp";
import seo from "../../assets/tech icons/seo.png";
import framerMotion from "../../assets/tech icons/framer motion.svg";
import git from "../../assets/tech icons/git.png";
import googleAnalytics from "../../assets/tech icons/Google Analytics.png";
import googleSearchConsole from "../../assets/tech icons/google search console.webp";

const ORIGIN_LABELS = {
  "emilda solutions": "Emilda Solutions",
  "HFWL Technologies": "HFWL Technologies",
  freelance: "Freelance",
};

const TECH_ICONS = {
  Figma: figma,
  GitHub: github,
  Netlify: netlify,
  Shopify: shopify,
  "VS Code": vscode,
  Webflow: webflow,
  WordPress: wordpress,
  Hostinger: hostinger,
  Firebase: firebase,
  Antigravity: antigravity,
  "Material-UI": mui,
  "Node.js": nodejs,
  // NPM: npm,
  PHP: php,
  React: react,
  // Vite: vite,
  TypeScript: typescript,
  "Razorpay": razorpay,
  API: api,
  Lenis: lenis,
  Lottie: lottie,
  SEO: seo,
  "Framer Motion": framerMotion,
  Git: git,
  "Google Analytics": googleAnalytics,
  "Google Search Console": googleSearchConsole,
};

function ProjectDetails() {
  const { origin, id } = useParams();
  const project = projects.find((p) =>
    p.origin.toLowerCase().replace(/\s+/g, '-') === origin &&
    p.id === id
  );

  if (!project) {
    return (
      <Box 
        id="main-content"
        tabIndex="-1"
        role="main"
        style={{ outline: "none" }}
        sx={{
          width: "100%", minHeight: "100vh", background: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)", display: "flex", alignItems: "center",
          justifyContent: "center", px: "5%",
        }}
      >
        <Helmet>
          <title>Projects | Project Not Found | Gopika P Portfolio</title>
          <meta name="description" content="The requested project could not be found. Explore other projects in Gopika P's portfolio." />
        </Helmet>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: { xs: "14px", sm: "16px" }, color: "var(--theme-text-secondary)" }}>
          Project not found.
        </Typography>
      </Box>
    );
  }

  const relatedProjects = projects.filter((p) =>
    project.relatedProjects?.includes(p.id)
  );

  // Get related projects from the same origin only (freelance/emilda/HFWL Technologies)
  const recentProjects = [...projects]
    .filter((p) =>
      p.origin === project.origin && // Same origin
      p.id !== project.id // Exclude current project
    )
    .sort((a, b) => b.count - a.count) // Most recent first
    .slice(0, 3); // Get top 3

  // Zero-pad project number: 1 → "01", 12 → "12"
  const projectNumber = String(project.count).padStart(2, "0");

  // Generate meta title with format: Projects | [Project Title]
  const metaTitle = project?.title 
    ? `Projects | ${project.title} | Gopika P Portfolio`
    : 'Projects | Gopika P Portfolio';

  // Generate meta description with fallback
  const metaDescription = project?.shortDescription
    ? `${project.title} - ${project.shortDescription} Built with ${project.tech?.join(", ") || "modern web technologies"}.`
    : `${project.title} - A web development project by Gopika P. Explore the full case study and technical implementation.`;

  // Generate meta keywords with fallback
  const metaKeywords = project?.title && project?.company
    ? `${project.title}, ${project.company}, web development, React, TypeScript, portfolio, Gopika P`
    : `web development, React, TypeScript, portfolio, Gopika P`;

  return (
    <div id="main-content" tabIndex="-1" role="main" style={{ outline: "none" }}>
      {/* Helmet for SEO - with format: Projects | Title */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>

      {/* Hidden heading for screen readers - provides proper landmark structure */}
      <h1 style={{ 
        position: "absolute", 
        width: "1px", 
        height: "1px", 
        padding: 0, 
        margin: "-1px", 
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        border: 0,
        whiteSpace: "nowrap"
      }}>
        {project.title} - Project Details | Gopika P Portfolio
      </h1>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .pd-tech-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 999px;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          transition: border-color 0.25s ease;
          cursor: default;
        }
        .pd-tech-chip:hover {
          border-color: var(--theme-border-hover);
        }

        .pd-related-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .pd-related-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(to right, #ff3b3b, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pd-related-card:hover { 
          border-color: var(--theme-border-hover); 
          transform: translateY(-3px); 
        }
        .pd-related-card:hover::before { transform: scaleX(1); }
        
        .pd-recent-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
        }
        .pd-recent-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #ff3b3b, #ff8c3b, #ff3b3b);
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pd-recent-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 100% 100%, rgba(255, 59, 59, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .pd-recent-card:hover { 
          border-color: #ff3b3b;
          box-shadow: 0 10px 30px -10px rgba(255, 59, 59, 0.2);
        }
        .pd-recent-card:hover::before { 
          transform: scaleX(1);
          animation: shimmer 1s ease infinite;
        }
        .pd-recent-card:hover::after {
          opacity: 1;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        .pd-live-link {
          color: var(--theme-text-primary);
          text-decoration: none;
          border-bottom: 1px solid var(--theme-border);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          word-break: break-all;
          transition: border-color 0.2s ease;
        }
        .pd-live-link:hover { 
          border-color: var(--theme-text-primary); 
        }

        .pd-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--theme-text-secondary);
          margin-bottom: 14px;
          font-weight:700;
          font-style:italic;
          text-decoration:underline;
        }

        /* Mobile horizontal scroll for recent projects */
        .pd-recent-scroll {
          overflow-x: auto;
          overflow-y: visible;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .pd-recent-scroll::-webkit-scrollbar {
          height: 3px;
        }

        .pd-recent-scroll::-webkit-scrollbar-track {
          background: var(--theme-border);
          border-radius: 3px;
        }

        .pd-recent-scroll::-webkit-scrollbar-thumb {
          background: #ff3b3b;
          border-radius: 3px;
        }

        .pd-recent-track {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 16px;
          width: max-content;
        }

        .pd-recent-track > * {
          width: 280px;
          min-width: 280px;
          flex-shrink: 0;
        }

        /* Desktop grid */
        @media (min-width: 769px) {
          .pd-recent-scroll {
            overflow: visible;
          }
          
          .pd-recent-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            width: 100%;
          }
          
          .pd-recent-track > * {
            width: auto;
            min-width: auto;
          }
        }

        /* Hide scroll hint on desktop by default */
        .mobile-scroll-hint {
          display: none !important;
        }

        /* Show scroll hint only on mobile where horizontal scroll exists */
        @media (max-width: 768px) {
          .mobile-scroll-hint {
            display: flex !important;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-top: 20px;
          }
        }

        /* Light theme specific adjustments */
        [data-theme="light"] .pd-tech-chip {
          background: var(--theme-bg-card);
        }
        [data-theme="light"] .pd-recent-card {
          background: var(--theme-bg-card);
        }
        [data-theme="light"] .pd-recent-card:hover {
          background: var(--theme-bg-secondary);
        }

        /* Responsive font sizes */
        @media (max-width: 600px) {
          .pd-section-label {
            font-size: 14px;
          }
          .pd-live-link {
            font-size: 13px;
          }
        }
      `}</style>

      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
          { label: project.title },
        ]}
      />

      <Box sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        borderTop: "1px solid var(--theme-border)",
        borderBottom: "1px solid var(--theme-border)",
        px: "5%",
        py: { xs: "48px", sm: "64px", md: "80px" },
      }}>
        <Box sx={{ maxWidth: "1440px", mx: "auto", width: "100%" }}>

          {/* Hero top row — title block + project number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow + project number */}
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              {/* Eyebrow */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b" }} />
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: { xs: "10px", sm: "11px", md: "12px" },
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "var(--theme-text-secondary)",
                }}>
                  {ORIGIN_LABELS[project.origin] || project.origin}
                </Typography>
              </Box>

              {/* Project number — top right */}
              <Typography sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                lineHeight: 0.9,
                letterSpacing: "4px",
                color: "var(--theme-text-muted)",
                opacity: 0.1,
                userSelect: "none",
                mt: { xs: "-4px", md: "-8px" },
              }}>
                #{projectNumber}
              </Typography>
            </Box>

            {/* Title */}
            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2rem, 7vw, 3rem)", sm: "clamp(2.5rem, 8vw, 4rem)", md: "clamp(3rem, 5vw, 4.5rem)" },
              fontWeight: 400,
              letterSpacing: "3px",
              lineHeight: 1,
              mb: 1.5,
              color: "var(--theme-text-primary)",
            }}>
              {project.title}
            </Typography>

            {/* Company + Location + CEO - FIXED: changed to primary for better contrast */}
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--theme-text-primary)",
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
              letterSpacing: "1px",
              mb: 4,
            }}>
              {project.company}
              {project.location && ` · ${project.location}`}
              {project.ceo && (
                <span style={{ color: "var(--theme-text-primary)" }}> · CEO: {project.ceo}</span>
              )}
            </Typography>
          </motion.div>

          {/* Divider */}
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(to right, var(--theme-border-hover), transparent)",
            marginBottom: "40px",
          }} />

          {/* Two-col layout */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
            gap: { xs: 6, md: 10 },
            alignItems: "start",
          }}>

            {/* LEFT — main content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Short description */}
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                color: "var(--theme-text-secondary)",
                lineHeight: 1.7,
                mb: 5,
              }}>
                {project.shortDescription}
              </Typography>

              {/* Detailed description */}
              {project.detailedDescription && (
                <Box sx={{ mb: 6 }}>
                  <p className="pd-section-label">About the Project</p>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "var(--theme-text-secondary)",
                    fontSize: { xs: "14px", sm: "14px", md: "15px" },
                    lineHeight: 1.8,
                  }}>
                    {project.detailedDescription}
                  </Typography>
                </Box>
              )}

              {/* Tech stack - with error handling for missing icons */}
              {project.tech?.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <p className="pd-section-label">Tech Used</p>
                  <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {project.tech.map((tech) => (
                      <div key={tech} className="pd-tech-chip">
                        {TECH_ICONS[tech] && (
                          <Box
                            component="img"
                            src={TECH_ICONS[tech]}
                            alt={tech}
                            sx={{
                              width: "20px",
                              height: "auto",
                              maxHeight: "20px",
                              objectFit: "contain",
                              filter: "none",
                            }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: { xs: "12px", sm: "14px" },
                          color: "var(--theme-text-secondary)",
                          letterSpacing: "0.5px",
                        }}>
                          {tech}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Testimonials Section */}
              {project.testimonials && project.testimonials.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <p className="pd-section-label">Client Feedback</p>
                  <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(1, 1fr)" },
                    gap: "20px",
                  }}>
                    {project.testimonials.map((testimonial, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{
                          background: "var(--theme-bg-card)",
                          border: "1px solid var(--theme-border)",
                          borderRadius: "16px",
                          padding: "24px",
                        }}
                      >
                        {/* Stars Rating */}
                        <Box sx={{ display: "flex", gap: "4px", mb: 2 }}>
                          {[...Array(5)].map((_, i) => (
                            <Box
                              key={i}
                              sx={{
                                color: i < testimonial.rating ? "#ffe600ff" : "var(--theme-border)",
                                fontSize: "18px",
                              }}
                            >
                              ★
                            </Box>
                          ))}
                        </Box>

                        {/* Testimonial Message */}
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "16px",
                          lineHeight: 1.7,
                          color: "var(--theme-text-secondary)",
                          mb: 3,
                          fontStyle: "italic",
                        }}>
                          "{testimonial.content}"
                        </Typography>

                        {/* Author Info */}
                        <Box>
                          <Typography sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "var(--theme-text-primary)",
                            mb: 0.5,
                          }}>
                            {testimonial.name}
                          </Typography>
                          <Typography sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "14px",
                            letterSpacing: "1px",
                            color: "var(--theme-text-secondary)",
                          }}>
                            {testimonial.role} · {testimonial.company} {project.location && `· ${project.location}`}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              )}
            </motion.div>

            {/* RIGHT — sidebar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Box sx={{
                background: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
                borderRadius: "20px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}>

                {/* Status */}
                <Box>
                  <p className="pd-section-label">Status</p>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    px: 2, py: 0.8, borderRadius: "999px",
                    backgroundColor: project.status === "active" ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)",
                    color: project.status === "active" ? "var(--theme-success)" : "var(--theme-error)",
                    border: project.status === "active" ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(248,113,113,0.2)",
                  }}>
                    <Box sx={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: project.status === "active" ? "var(--theme-success)" : "var(--theme-error)",
                      animation: project.status === "active" ? "statusPulse 2s infinite" : "none",
                    }} />
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: { xs: "10px", sm: "11px" },
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}>
                      {project.status === "active" ? "Active" : "Inactive"}
                    </Typography>
                  </Box>
                  <style>{`
                    @keyframes statusPulse {
                      0%,100%{opacity:1;transform:scale(1)}
                      50%{opacity:0.4;transform:scale(0.8)}
                    }
                  `}</style>
                </Box>

                {/* Live URL - FIXED: changed link color */}
                {project.liveUrl && (
                  <Box>
                    <p className="pd-section-label">Website Link</p>

                    <Typography
                      component="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        color: "#3b82f6",
                        textDecoration: "none",
                        wordBreak: "break-all",
                        "&:hover": {
                          color: "#7898ccff",
                        },
                      }}
                    >
                      {project.liveUrl.replace("https://", "").replace("http://", "")}
                    </Typography>
                  </Box>
                )}

                {/* Origin */}
                <Box>
                  <p className="pd-section-label">Worked At</p>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: { xs: "14px", sm: "16px" },
                    color: "var(--theme-text-secondary)",
                  }}>
                    {ORIGIN_LABELS[project.origin] || project.origin}
                  </Typography>
                </Box>

                {/* Location */}
                {project.location && (
                  <Box>
                    <p className="pd-section-label">Location</p>
                    <Typography sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: { xs: "14px", sm: "16px" },
                      color: "var(--theme-text-secondary)",
                    }}>
                      {project.location}
                    </Typography>
                  </Box>
                )}

              </Box>
            </motion.div>

          </Box>

          {/* ── Recent Projects with Horizontal Scroll ── */}
          {recentProjects.length > 0 && (
            <>
              <div style={{
                width: "100%", height: "1px",
                background: "linear-gradient(to right, var(--theme-border-hover), transparent)",
                margin: "56px 0 40px",
              }} />
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: 1.5 }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", flexShrink: 0 }} />
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: { xs: "10px", sm: "11px" },
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "var(--theme-text-secondary)",
                  }}>
                    Recent
                  </Typography>
                </Box>

                <Typography sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
                  letterSpacing: "3px",
                  mb: 4,
                  color: "var(--theme-text-primary)",
                }}>
                  Related Projects
                </Typography>

                {/* Horizontal scroll wrapper */}
                <div className="pd-recent-scroll">
                  <div className="pd-recent-track">
                    {recentProjects.map((p) => (
                      <Link
                        key={p.count}
                        to={`/projects/${p.origin.toLowerCase().replace(/\s+/g, '-')}/${p.id}`}
                        className="pd-recent-card"
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Typography sx={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: { xs: "0.7rem", sm: "0.75rem" },
                              letterSpacing: "2px",
                              color: "var(--theme-text-secondary)",
                              lineHeight: 1,
                            }}>
                              #{String(p.count).padStart(2, "0")}
                            </Typography>
                            <Typography sx={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                              letterSpacing: "2px",
                              color: "var(--theme-text-primary)",
                              lineHeight: 1,
                            }}>
                              {p.title}
                            </Typography>
                          </Box>
                          <Box sx={{
                            width: 6, height: 6, borderRadius: "50%", flexShrink: 0, mt: "3px",
                            background: p.status === "active" ? "var(--theme-success)" : "var(--theme-error)",
                          }} />
                        </Box>
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "var(--theme-text-secondary)",
                          fontSize: { xs: "12px", sm: "13px" },
                          lineHeight: 1.6,
                          mb: 2,
                        }}>
                          {p.shortDescription}
                        </Typography>
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: { xs: "9px", sm: "10px" },
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: "var(--theme-text-secondary)",
                        }}>
                          {ORIGIN_LABELS[p.origin] || p.origin}
                        </Typography>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Scroll hint for mobile - fixed */}
                <div className="mobile-scroll-hint">
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--theme-text-secondary)",
                  }}>
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

              </Box>
            </>
          )}

        </Box>
      </Box>
    </div>
  );
}

export default ProjectDetails;