import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/common/breadcrumbs";
import HeroSection from "../components/home/Hero";
import AboutSection from "../components/home/About";
import RecentProjects from "../components/home/Recentprojects";
import CTASection from "../components/home/Cta";
import Experience from "../components/home/Experience";

function Home() {
  return (
    <div
      id="main-content"
      tabIndex="-1"
      role="main"
      style={{ position: "relative", outline: "none" }}
    >
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
        Gopika P - Web Developer Portfolio Home
      </h1>

      <Helmet>
        <title>Gopika P | Web Developer Portfolio</title>
        <meta name="description" content="Gopika P — Web Developer portfolio showcasing innovative projects, front-end expertise, and creative solutions. Explore my work, skills, and professional journey." />
      </Helmet>

      <Breadcrumbs
        items={[
          { label: "Home" }
        ]}
      />

      <HeroSection />
      <AboutSection />
      <RecentProjects />
      <Experience />
      <CTASection />
    </div>
  );
}

export default Home;