import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Instagram, Mail, Send, ArrowUpRight } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 bg-primary/20 relative overflow-hidden">
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
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
<p className="text-xs font-body tracking-[0.3em] uppercase text-white mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Want to reach out about a project or collaboration?
          </h2>
          <p className="font-body text-white text-lg mb-10">
              Or just want to say a friendly hello? Don't hesitate.
            </p>

            {/* Email */}
            <a
              href="mailto:vishwasnb@gmail.com"
              className="inline-flex items-center gap-2 font-display text-2xl sm:text-3xl font-bold text-white hover:text-white/80 transition-colors duration-300 mb-12"
            >
              <Mail size={28} className="text-white" />
              vishwasnb@gmail.com
            </a>

            {/* Social links */}
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-300"
                >
                  {link.label === "Instagram" ? (
                    <Instagram size={18} className="text-pink-500 group-hover:text-pink-400" />
                  ) : link.label === "LinkedIn" ? (
                    <Linkedin size={18} className="text-blue-500 group-hover:text-blue-400" />
                  ) : (
                    <link.icon size={18} className="text-gray-400 group-hover:text-gray-300" />
                  )}
                  <span className="font-body text-sm">{link.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-body tracking-widest uppercase text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full bg-white/10 border-b border-white/30 py-3 font-body text-white placeholder:text-white/50 focus:border-white focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-body tracking-widest uppercase text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="w-full bg-white/10 border-b border-white/30 py-3 font-body text-white placeholder:text-white/50 focus:border-white focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-body tracking-widest uppercase text-white mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                  rows={5}
                  className="w-full bg-white/10 border-b border-white/30 py-3 font-body text-white placeholder:text-white/50 focus:border-white focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-body font-semibold text-sm tracking-wide rounded-lg hover:bg-white/90 transition-opacity duration-300"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
