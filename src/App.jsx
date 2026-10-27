import "./index.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import About from "./pages/About";

import AppLoader from "./components/common/AppLoader";
import CustomCursor from "./components/common/CustomCursor";
import ScrollToTop from "./components/utils/ScrollToTop";
import ThemeSettings from "./pages/ThemeSettings";
import BackToTop from "./components/common/BackToTop";

import { HeaderVisibilityContext } from "./context/HeaderVisibilityContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastY = useRef(0);

  // Lenis setup
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, [loading]);

  // Header show/hide based on scroll direction
  useEffect(() => {
    if (loading) return;

    let cleanup = () => {};

    const handleScroll = (y) => {
      const delta = y - lastY.current;

      if (y > 80 && delta > 4) {
        setHeaderVisible(false);        // scrolling down → hide
      } else if (delta < -4 || y < 80) {
        setHeaderVisible(true);          // scrolling up → show
      }
      lastY.current = y;
    };

    // Wait a tick for Lenis to be attached
    const timer = setTimeout(() => {
      if (window.lenis) {
        const onLenisScroll = ({ scroll }) => handleScroll(scroll);
        window.lenis.on("scroll", onLenisScroll);
        cleanup = () => window.lenis?.off("scroll", onLenisScroll);
      } else {
        const onWinScroll = () => handleScroll(window.scrollY);
        window.addEventListener("scroll", onWinScroll, { passive: true });
        cleanup = () => window.removeEventListener("scroll", onWinScroll);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [loading]);

  if (loading) {
    return <AppLoader onFinish={() => setLoading(false)} />;
  }

  return (
    <HeaderVisibilityContext.Provider value={headerVisible}>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div style={{ position: "relative" }}>
        <CustomCursor />
        <Navbar />
        <ScrollToTop />
        <BackToTop />

        <Routes>
          <Route path="/theme" element={<ThemeSettings />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:origin/:id" element={<ProjectDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </HeaderVisibilityContext.Provider>
  );
}

export default App;