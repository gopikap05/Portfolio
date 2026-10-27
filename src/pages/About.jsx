import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/common/breadcrumbs";
import AboutMeHero from "../components/about/AboutMeHero";
import AboutMeFAQ from "../components/about/AboutMeFAQ";
import Resume from "../components/about/Resume";
import AboutPortfolio from "../components/about/aboutPortfolio";

function About() {
  return (
    <Box 
      id="main-content" 
      tabIndex="-1" 
      role="main"
      style={{ outline: "none" }}
    >
      {/* Hidden heading for screen readers */}
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
        About Gopika P - Web Developer Portfolio
      </h1>

      <Helmet>
        <title>About | Gopika - Portfolio</title>
        <meta name="description" content="Learn more about Gopika P — my background, skills, resume, portfolio highlights, and frequently asked questions. Explore my journey and work in web development." />
      </Helmet>

      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
        ]}
      />

      {/* Top spacer — clears the fixed navbar + breadcrumb strip */}
      <div style={{ height: "100px", width: "100%" }} />

      <AboutMeHero />
      <AboutMeFAQ />
      <Resume />
      <AboutPortfolio />
    </Box>
  );
}

export default About;