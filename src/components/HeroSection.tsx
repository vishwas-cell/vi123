import { motion } from "framer-motion";
import { ArrowDownRight, Code2, Zap, Globe } from "lucide-react";
import ironmanBg from "@/assets/marvel-iron-man-in-destroyed-suit-desktop-wallpaper-preview.jpg"; // background image for hero
import profilePhoto from "@/assets/vishwas.png"; // circular profile logo (VISS Vishwas)

const HeroSection = () => {
  const floatingVariants = {
    animate: {
      y: [0, 20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center bg-center bg-cover"
      style={{ backgroundImage: `url('${ironmanBg}')` }}
    >
      {/* Multiple animated glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-blob" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-[100px] animate-blob"
        style={{ animationDelay: "4s" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block mb-8 lg:mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-primary/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-body tracking-widest text-white">
                  Available for Work
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm font-body tracking-[0.3em] uppercase text-white/80 mb-4"
            >
              Full-Stack Developer & Creator
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter text-white mb-8 mx-auto lg:mx-0 max-w-4xl lg:max-w-none"
            >
              Vishwas N
              <br />
              <span className="text-gradient animate-text-gradient">
                Bhagavantanavar
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-white/90 text-base sm:text-lg max-w-md leading-relaxed mb-8 mx-auto lg:mx-0"
            >
              Crafting beautiful, scalable web experiences using React, Node.js & MongoDB.
              Turning ideas into reality with clean code and pixel-perfect designs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 mx-auto lg:mx-0 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-black font-body font-bold text-sm tracking-wide overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowDownRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-body font-bold text-sm tracking-wide hover:border-white/60 hover:bg-white/5 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Skills Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mx-auto lg:mx-0 md:justify-start justify-center"
            >
              {[
                { icon: Code2, label: "React" },
                { icon: Zap, label: "Node.js" },
                { icon: Globe, label: "Full-Stack" },
              ].map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                  >
                    <Icon size={16} className="text-primary group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-xs font-body font-semibold text-white">
                      {skill.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right - Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            variants={floatingVariants}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated border ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border border-gradient-to-r from-primary via-accent to-primary opacity-50"
              />

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />

              {/* Inner glow */}
              <motion.div
                animate={{ boxShadow: [
                  "0 0 20px rgba(59,130,246,0.3)",
                  "0 0 40px rgba(59,130,246,0.5)",
                  "0 0 20px rgba(59,130,246,0.3)",
                ] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-72 sm:w-80 lg:w-[420px] h-72 sm:h-80 lg:h-[420px] rounded-full overflow-hidden border-2 border-primary/30"
              >
                <img
                  src={profilePhoto}
                  alt="Vishwas Bhagavantanavar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-body tracking-widest text-white/60 uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[2px] h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
