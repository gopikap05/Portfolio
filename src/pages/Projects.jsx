import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/common/breadcrumbs";
import AllProjects from "../components/projects/AllProjects";
import ProjectHero from "../components/projects/project";
import Testimonials from "../components/projects/testimonials";

function Projects() {
  return (
    <Box 
      id="main-content" 
      tabIndex="-1" 
      role="main"
      style={{ outline: "none" }}
    >
      <Helmet>
        <title>Projects | Gopika - Portfolio</title>
        <meta name="description" content="Explore Gopika P's portfolio projects — a collection of web development work including React applications, responsive designs, and innovative front-end solutions." />
      </Helmet>

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
        Projects Portfolio - Gopika P Web Development Work
      </h1>

      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
        ]}
      />
      <ProjectHero />
      <AllProjects />
      <Testimonials />
    </Box>
  );
}

export default Projects;