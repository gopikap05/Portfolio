import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useHeaderVisibility } from "../../context/HeaderVisibilityContext";  // NEW

function Breadcrumbs({ items }) {
  const headerVisible = useHeaderVisibility();  // NEW

  return (
    <motion.div
      animate={{
        y: headerVisible ? 0 : -200,               // NEW
        opacity: headerVisible ? 1 : 0,            // NEW
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: "var(--navbar-height, 70px)",         // NEW: below the navbar
        left: 0,
        width: "100%",
        zIndex: 900,
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          borderBottom: "1px solid var(--theme-border)",
          px: "5%",
          pt: { xs: "10px", sm: "12px", md: "16px" },
          pb: { xs: "10px", sm: "12px", md: "16px" },
        }}
      >
        <Box
          sx={{
            maxWidth: "1440px",
            width: "100%",
            mx: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Box
                key={index}
                component="span"
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  letterSpacing: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isLast ? (
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      color: "var(--theme-text-secondary)",
                      opacity: 0.9,
                    }}
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <>
                    <Link
                      to={item.path}
                      style={{
                        color: "var(--theme-text-secondary)",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "inherit",
                        letterSpacing: "inherit",
                        transition: "color 0.3s ease",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "var(--theme-text-primary)")}
                      onMouseLeave={(e) => (e.target.style.color = "var(--theme-text-secondary)")}
                    >
                      {item.label}
                    </Link>
                    <span style={{
                      margin: "0 12px",
                      color: "var(--theme-text-primary)",
                      opacity: 0.5,
                      fontSize: "inherit",
                      fontWeight: 600,
                    }}>/</span>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </motion.div>
  );
}

export default Breadcrumbs;