import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/common/breadcrumbs";
import ContactHero from "../components/contacts/ContactHero";
import ContactForm from "../components/contacts/contactForm";
import ThanksNote from "../components/contacts/thanksnote";
import Social from "../components/contacts/Social";

function Contact() {
  return (
    <Box
      id="main-content"
      tabIndex="-1"
      role="main"
      style={{ outline: "none" }}
      sx={{ backgroundColor: "#000", minHeight: "100vh" }}
    >
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
        Contact Gopika P - get in touch
      </h1>

      <Helmet>
        <title>Contact | Gopika - Portfolio</title>
        <meta name="description" content="Get in touch with Gopika P — feel free to reach out for full-time opportunities, inquiries, or just to say hello. Connect via contact form or social media." />
      </Helmet>

      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
        ]}
      />

      <ContactHero />
      <ContactForm />
      <Social />
      <ThanksNote />
    </Box>
  );
}

export default Contact;