import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
const logo = import.meta.env.BASE_URL + "icons/logo.png";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const handleClick = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    setMenuOpen(false);
  };

  const navItems = ["Home", "About", "Projects", "Contact"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Nav link underline ── */
        .nav-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--theme-text-primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
          z-index: 1100;
        }
        @media (max-width: 600px) {
          .hamburger { display: flex; }
          .nav-links  { display: none !important; }
        }
        .hamburger-line {
          width: 22px;
          height: 1px;
          background: var(--theme-text-primary);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }
        .hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── Mobile menu ── */
        .mobile-menu {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: var(--theme-bg-primary);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .mobile-menu.open {
          opacity: 1;
          pointer-events: all;
        }
        .mobile-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 2rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--theme-text-primary);
        }

        /* ── Active dot ── */
        .active-dot {
          display: inline-block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #ff3b3b;
          margin-left: 6px;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "56px", sm: "62px", md: "70px" },
            backgroundColor: scrolled
              ? `var(--theme-bg-primary)`
              : "var(--theme-bg-primary)",
            borderBottom: scrolled
              ? "1px solid var(--theme-border-hover)"
              : "1px solid var(--theme-border)",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            transition: "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
            display: "flex",
            alignItems: "center",
            px: "clamp(16px, 5%, 96px)",
          }}
        >
          <Box sx={{
            maxWidth: "1440px",
            width: "100%",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>

            {/* Logo */}
            <Link to="/" onClick={handleClick} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  height: { xs: "24px", sm: "26px", md: "40px" },
                  width: "auto",
                  objectFit: "contain",
                  filter: isDark ? "brightness(1)" : "brightness(0.8)",
                  transition: "filter 0.3s ease, opacity 0.3s ease",
                  "&:hover": { filter: "brightness(0.75)" },
                }}
              />
            </Link>

            {/* Desktop Nav links and Theme Toggle */}
            <Box
              className="nav-links"
              sx={{
                display: "flex",
                gap: { xs: "20px", sm: "28px", md: "40px" },
                alignItems: "center",
              }}
            >
              {navItems.map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <Link
                    key={item}
                    to={path}
                    onClick={handleClick}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    style={{
                      fontSize: "16px",
                      color: isActive ? "var(--theme-text-primary)" : "var(--theme-text-muted)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {item}
                    {isActive && <span className="active-dot" />}
                  </Link>
                );
              })}

              {/* Theme Toggle for Desktop */}
              <ThemeToggle />
            </Box>

            {/* Hamburger (mobile) */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </button>
          </Box>
        </Box>
      </motion.div>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* Corner decoration */}
        <div style={{
          position: "absolute", top: 24, left: 24,
          width: 24, height: 24,
          borderTop: "1px solid var(--theme-border-hover)",
          borderLeft: "1px solid var(--theme-border-hover)",
        }} />

        {navItems.map((item, i) => {
          const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link
                to={path}
                onClick={handleClick}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
              >
                {item}
              </Link>
            </motion.div>
          );
        })}

        {/* Theme Toggle for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: navItems.length * 0.07, duration: 0.4 }}
        >
          <ThemeToggle />
        </motion.div>

        {/* Bottom tag */}
        <div style={{
          position: "absolute", bottom: 32,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "10px",
          letterSpacing: "3px",
          color: "var(--theme-text-muted)",
          textTransform: "uppercase",
        }}>
          Gopika · Portfolio
        </div>
      </div>
    </>
  );
}

export default Navbar;