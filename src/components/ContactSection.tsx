import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Instagram, Mail, Send, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import bgVideo from "@/assets/Madison Beer 4K 60FPS Clips (Topaz Upscale)  High Quality Scenepack.mp4"; // background video for contact section

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com/vishwasn-b" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/vishwasn-b" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/vishwasn.b" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-32 bg-primary/10 relative overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            Let's Connect
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-50 mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
            <p className="font-body text-gray-100 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col justify-between"
          >
            <div>
              <motion.p
                variants={itemVariants}
                className="font-body text-gray-100 text-lg mb-8 leading-relaxed"
              >
                Whether you have an exciting project, want to collaborate, or just want to say hello — I'm here and ready to help make your ideas a reality.
              </motion.p>

              {/* Email */}
              <motion.a
                variants={itemVariants}
                href="mailto:vishwasnb@gmail.com"
                whileHover={{ x: 10 }}
                className="group inline-flex items-center gap-3 mb-12"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail size={24} className="text-gray-900" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">
                    Email Me
                  </p>
                  <p className="font-display text-xl font-bold text-gray-50 group-hover:text-primary transition-colors duration-300">
                    vishwasnb@gmail.com
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="font-body text-xs text-gray-100 uppercase tracking-widest font-semibold">
                Connect On Social
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative p-4 rounded-xl bg-slate-700/40 border border-slate-600/50 hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:border-transparent transition-all duration-300"
                  >
                    <link.icon size={20} className="text-gray-100 relative z-10" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-gray-100 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={false}
              animate={submitted ? { opacity: 0.5 } : { opacity: 1 }}
            >
              {/* Name */}
              <div>
                <label className="block text-xs font-body tracking-widest uppercase text-white mb-3 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-slate-800/60 border-b-2 border-primary/30 text-gray-100 placeholder:text-gray-400 focus:border-primary focus:outline-none transition-all duration-300 font-body backdrop-blur-sm rounded-lg ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Vishwas"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 font-body">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-body tracking-widest uppercase text-white mb-3 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-slate-800/60 border-b-2 border-primary/30 text-gray-100 placeholder:text-gray-400 focus:border-primary focus:outline-none transition-all duration-300 font-body backdrop-blur-sm rounded-lg ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-body">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-body tracking-widest uppercase text-white mb-3 font-semibold">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  disabled={isSubmitting}
                  rows={5}
                  className={`w-full px-4 py-3 bg-slate-800/60 border-b-2 border-primary/30 text-gray-100 placeholder:text-gray-400 focus:border-primary focus:outline-none transition-all duration-300 font-body backdrop-blur-sm rounded-lg resize-none ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 font-body">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitted}
                whileHover={{ scale: submitted ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-body font-bold text-sm tracking-wide transition-all duration-300 ${
                  submitted
                    ? "bg-green-500/80 text-white"
                    : "bg-gradient-to-r from-primary to-accent text-black hover:shadow-lg hover:shadow-primary/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={18} />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </motion.button>

              {/* Helper text */}
              <p className="text-xs text-white/70 text-center font-body">
                I'll respond within 24 hours
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
