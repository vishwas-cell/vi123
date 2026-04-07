import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ExternalLink, Heart, Code2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/vishwasn-b", color: "hover:text-gray-400" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vishwasn-b", color: "hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/vishwasn.b", color: "hover:text-pink-400" },
    { icon: Mail, label: "Email", href: "mailto:vishwasnb@gmail.com", color: "hover:text-primary" },
  ];

  const footerLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black to-background border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Main Footer Content */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={24} className="text-primary" />
              <h3 className="font-display text-2xl font-bold text-white">
                V<span className="text-primary">/</span>B
              </h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Building amazing web experiences with clean code and creative solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold text-white mb-4">More</h4>
            <ul className="space-y-3">
              {footerLinks.slice(3).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/projects/Portfolio.html"
                  className="font-body text-sm text-muted-foreground hover:text-white transition-colors duration-300"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold text-white mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-white/5 border border-white/10 text-white transition-all duration-300 ${link.color} hover:border-transparent hover:bg-gradient-to-r hover:from-primary hover:to-accent`}
                    title={link.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <motion.p
            variants={itemVariants}
            className="font-body text-xs text-muted-foreground text-center sm:text-left"
          >
            © {currentYear} Vishwas N Bhagavantanavar. All rights reserved.
          </motion.p>

          {/* Divider */}
          <motion.div variants={itemVariants} className="hidden sm:block w-1 h-4 bg-white/10 rounded-full" />

          {/* Made with love */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 font-body text-xs text-muted-foreground"
          >
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={14} className="fill-red-500 text-red-500" />
            </motion.span>
            using React & TailwindCSS
          </motion.div>
        </motion.div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </footer>
  );
};

export default Footer;
