import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import projects from "../../data/projects";

function Testimonials() {
  // Extract testimonials from projects that have them with error handling
  const testimonialsData = projects
    ?.filter(project => project?.testimonials && project.testimonials.length > 0)
    ?.flatMap(project => 
      project.testimonials.map(testimonial => ({
        id: `${project.id}-${testimonial.name}`,
        name: testimonial.name,
        role: testimonial.role,
        company: project.company || "",
        location: project.location || "",
        content: testimonial.content,
        rating: testimonial.rating || 5,
        projectLink: `/projects/${project.origin?.toLowerCase().replace(/\s+/g, '-') || 'freelance'}/${project.id}`
      }))
    ) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 1; // CHANGED: from 2 to 1
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  const nextSlide = () => {
    if (totalPages === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    if (totalPages === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getCurrentTestimonials = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return testimonialsData.slice(start, end);
  };

  // Don't render if no testimonials
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        .testimonials-section {
          width: 100%;
          background-color: var(--theme-bg-primary);
          color: var(--theme-text-primary);
          position: relative;
          overflow: hidden;
        }

        .testimonials-tag {
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

        .testimonial-card {
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          border-radius: 20px;
          padding: 30px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          max-width: 80%;
          margin: 0 auto;
        }
        
        .testimonial-card:hover {
          border-color: #ff3b3b;
          background: linear-gradient(135deg, rgba(255, 59, 59, 0.04), rgba(255, 140, 59, 0.02));
        }
        
        .star-filled {
          color: #ffc107;
        }
        
        .star-empty {
          color: var(--theme-border);
        }
        
        .testimonial-quote {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: var(--theme-text-primary);
          margin-bottom: 28px;
          font-style: italic;
          flex: 1;
        }
        
        .testimonial-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--theme-text-primary);
          margin-bottom: 6px;
        }
        
        .testimonial-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          color: var(--theme-text-secondary);
        }

        .view-project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--theme-border);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-secondary);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover .view-project-link {
          color: #ff3b3b;
          gap: 12px;
        }

        .nav-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--theme-border);
          background: var(--theme-bg-card);
          color: var(--theme-text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-button:hover {
          border-color: #ff3b3b;
          color: #ff3b3b;
          transform: scale(1.05);
        }

        .nav-button:active {
          transform: scale(0.95);
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--theme-border);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot-indicator:hover {
          background: #ff3b3b;
          transform: scale(1.2);
        }

        .dot-indicator.active {
          width: 24px;
          border-radius: 4px;
          background: #ff3b3b;
        }

        .testimonials-note {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          letter-spacing: 1.5px;
          color: var(--theme-text-secondary);
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 20px;
          }
          .testimonial-quote {
            font-size: 14px;
            margin-bottom: 20px;
          }
          .testimonial-name {
            font-size: 14px;
          }
          .testimonial-meta {
            font-size: 10px;
          }
          .nav-button {
            width: 36px;
            height: 36px;
          }
          .testimonials-note {
            font-size: 11px;
          }
        }
      `}</style>

      <Box className="testimonials-section">
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
            <div className="testimonials-tag">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
              Testimonials
            </div>
          </motion.div>

          {/* Header with Navigation */}
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
                What Clients Say
              </Typography>
            </motion.div>

            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", gap: "12px" }}>
                <button className="nav-button" onClick={prevSlide} aria-label="Previous testimonial">
                  <ChevronLeftIcon sx={{ fontSize: "24px" }} />
                </button>
                <button className="nav-button" onClick={nextSlide} aria-label="Next testimonial">
                  <ChevronRightIcon sx={{ fontSize: "24px" }} />
                </button>
              </Box>
            )}
          </Box>

          {/* Testimonials Slider - Now shows 1 item at a time */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Box sx={{
                display: "flex",
                justifyContent: "center",
              }}>
                {getCurrentTestimonials().map((testimonial, idx) => (
                  <Link key={testimonial.id || idx} to={testimonial.projectLink} className="testimonial-card">
                    {/* Stars Rating */}
                    <Box sx={{ display: "flex", gap: "6px", mb: 3, justifyContent: "center" }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < testimonial.rating ? "star-filled" : "star-empty"} style={{ fontSize: "20px" }}>
                          ★
                        </span>
                      ))}
                    </Box>

                    {/* Testimonial Content */}
                    <Typography className="testimonial-quote" sx={{ textAlign: "center" }}>
                      "{testimonial.content}"
                    </Typography>

                    {/* Author Information */}
                    <Box sx={{ textAlign: "center" }}>
                      <Typography className="testimonial-name">
                        {testimonial.name}
                      </Typography>
                      <Typography className="testimonial-meta">
                        {testimonial.role} · {testimonial.company} {testimonial.location && `· ${testimonial.location}`}
                      </Typography>
                    </Box>

                    {/* View Project Link */}
                    <div className="view-project-link" style={{ justifyContent: "center" }}>
                      <span>View Project Details</span>
                      <span style={{ fontSize: "14px" }}>→</span>
                    </div>
                  </Link>
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          {totalPages > 1 && (
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              mt: "40px",
            }}>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`dot-indicator ${currentIndex === idx ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${idx + 1}`}
                  onKeyPress={(e) => e.key === 'Enter' && goToSlide(idx)}
                />
              ))}
            </Box>
          )}

          {/* Note about testimonials location */}
          <Box sx={{
            textAlign: "center",
            mt: "32px",
            pt: "24px",
            borderTop: "1px solid var(--theme-border)",
          }}>
            <Typography className="testimonials-note">
              💬 These testimonials are also featured on their respective project pages under the "Client Feedback" section
            </Typography>
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default Testimonials;