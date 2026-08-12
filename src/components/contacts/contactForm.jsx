import {
  Box,
  Typography,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, company: false, message: false });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const validateName = (v) => !v.trim() ? "Name is required" : !/^[A-Za-z\s]+$/.test(v) ? "Letters only" : v.trim().length < 2 ? "Min 2 characters" : "";
  const validateEmail = (v) => !v.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Invalid email" : "";
  const validatePhone = (v) => !v.trim() ? "Phone is required" : !/^\d{10}$/.test(v) ? "Must be 10 digits" : "";
  const validateCompany = (v) => v && v.trim().length < 2 ? "Min 2 characters" : "";
  const validateMessage = (v) => !v.trim() ? "Message is required" : v.trim().length < 10 ? "Min 10 characters" : "";

  const getError = (name, value) => {
    const fns = { name: validateName, email: validateEmail, phone: validatePhone, company: validateCompany, message: validateMessage };
    return fns[name]?.(value) ?? "";
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "name") value = value.replace(/[^A-Za-z\s]/g, "");
    else if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    else if (name === "company") value = value.replace(/[^A-Za-z0-9\s&.,-]/g, "");
    else if (name === "email") value = value.toLowerCase();
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: getError(name, value) }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: getError(name, form[name]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(form.name), 
      email: validateEmail(form.email),
      phone: validatePhone(form.phone), 
      company: validateCompany(form.company),
      message: validateMessage(form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, company: true, message: true });
    if (Object.values(newErrors).some(Boolean)) {
      setSnackbar({ open: true, message: "Please fix the errors before submitting.", severity: "error" });
      return;
    }
    setLoading(true);
    emailjs.send("service_3wgg108", "template_wieh09d", {
      name: form.name,
      email: form.email,
      phone: `+91${form.phone}`,
      company: form.company || "Not provided",
      message: form.message,
      to_email: form.email,
    }, "tF2Z9ebsNoKBb13kb")
      .then(() => {
        setSnackbar({ open: true, message: "Message sent! I'll get back to you soon.", severity: "success" });
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
        setTouched({ name: false, email: false, phone: false, company: false, message: false });
      })
      .catch(() => setSnackbar({ open: true, message: "Something went wrong. Please try again.", severity: "error" }))
      .finally(() => setLoading(false));
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "var(--theme-text-primary)",
      borderRadius: "12px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "14px",
      backgroundColor: "var(--theme-bg-secondary)",
      "& fieldset": { borderColor: "var(--theme-border)" },
      "&:hover fieldset": { borderColor: "var(--theme-border-hover)" },
      "&.Mui-focused fieldset": { borderColor: "var(--theme-primary)", borderWidth: "1px" },
      "&.Mui-error fieldset": { borderColor: "rgba(255,59,59,0.5)" },
    },
    "& .MuiInputLabel-root": {
      color: "var(--theme-text-muted)",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "16px",
      "&.Mui-focused": { color: "var(--theme-text-secondary)" },
      "&.Mui-error": { color: "rgba(255,59,59,0.7)" },
    },
    "& .MuiFormHelperText-root": {
      color: "rgba(255,59,59,0.7)",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "11px",
      marginLeft: 0,
    },
    "& .MuiInputLabel-asterisk": { display: "none" },
  };

  const Label = ({ text, required }) => (
    <span>{text}{required && <span style={{ color: "rgba(255,59,59,0.8)", marginLeft: 3 }}>*</span>}</span>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .cf-submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--theme-border);
          background: var(--theme-bg-card);
          color: var(--theme-text-secondary);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }
        .cf-submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,59,59,0.08), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cf-submit-btn:hover:not(:disabled) {
          border-color: var(--theme-border-hover);
          color: var(--theme-text-primary);
          background: var(--theme-bg-tertiary);
        }
        .cf-submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .cf-submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .cf-arrow {
          font-size: 14px;
          transition: transform 0.3s ease;
        }
        .cf-submit-btn:hover .cf-arrow { transform: translateX(4px); }

        /* Light theme adjustments */
        [data-theme="light"] .cf-submit-btn {
          background: var(--theme-bg-card);
          border-color: var(--theme-border);
        }
        [data-theme="light"] .cf-submit-btn:hover:not(:disabled) {
          background: var(--theme-primary-light);
          border-color: var(--theme-primary);
          color: var(--theme-text-primary);
        }
      `}</style>

      <Box
        sx={{
          width: "100%",
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
          borderTop: "1px solid var(--theme-border)",
          borderBottom: "1px solid var(--theme-border)",
          px: "5%",
          py: { xs: "60px", sm: "70px", md: "90px" },
        }}
      >
        {/* Hidden heading for screen readers */}
        <h2 style={{
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
          Contact Form - Send me a message
        </h2>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ maxWidth: "760px", mx: "auto", width: "100%" }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: 2 }}>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b" }} />
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", letterSpacing: "2.5px",
                textTransform: "uppercase", color: "var(--theme-text-secondary)",
              }}>
                Contact
              </Typography>
            </Box>

            <Typography sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "clamp(2.2rem, 7vw, 3.5rem)", md: "clamp(2.8rem, 4vw, 4rem)" },
              fontWeight: 400,
              letterSpacing: "3px",
              lineHeight: 1,
              mb: { xs: 4, md: 6 },
              color: "var(--theme-text-primary)",
            }}>
              Let's start a conversation
            </Typography>
          </motion.div>

          {/* Form fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Row 1 */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "16px" }}>
                <TextField
                  variant="outlined" 
                  fullWidth 
                  required
                  label={<Label text="Your Name" required />}
                  name="name" 
                  value={form.name}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={fieldSx}
                />
                <TextField
                  variant="outlined" 
                  fullWidth 
                  required
                  label={<Label text="Your Email" required />}
                  name="email" 
                  type="email" 
                  value={form.email}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={fieldSx}
                />
              </Box>

              {/* Row 2 */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "16px" }}>
                <TextField
                  variant="outlined" 
                  fullWidth 
                  required
                  label={<Label text="Phone Number" required />}
                  name="phone" 
                  type="tel" 
                  value={form.phone}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={fieldSx}
                  placeholder="Enter 10-digit number"
                  inputProps={{ 
                    inputMode: "numeric", 
                    maxLength: 10,
                  }}
                />
                <TextField
                  variant="outlined" 
                  fullWidth
                  label={<Label text="Company" required={false} />}
                  name="company" 
                  value={form.company}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  error={touched.company && !!errors.company}
                  helperText={touched.company && errors.company}
                  sx={fieldSx}
                />
              </Box>

              {/* Message */}
              <TextField
                variant="outlined" 
                fullWidth 
                required
                label={<Label text="Message" required />}
                name="message" 
                multiline 
                rows={5} 
                value={form.message}
                onChange={handleChange} 
                onBlur={handleBlur}
                error={touched.message && !!errors.message}
                helperText={touched.message && errors.message}
                sx={fieldSx}
              />

              {/* Submit */}
              <Box sx={{ mt: 1 }}>
                <button type="submit" disabled={loading} className="cf-submit-btn">
                  {loading
                    ? <CircularProgress size={16} sx={{ color: "var(--theme-text-primary)" }} />
                    : <>Send Message <span className="cf-arrow">→</span></>
                  }
                </button>
              </Box>

            </Box>
          </motion.div>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: "12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            backgroundColor: snackbar.severity === "success" ? "var(--theme-success)" : "var(--theme-error)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ContactForm;