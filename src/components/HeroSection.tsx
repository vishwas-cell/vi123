import { motion } from "framer-motion";
import ironmanBg from "@/assets/marvel-iron-man-in-destroyed-suit-desktop-wallpaper-preview.jpg"; // background image for hero
import profilePhoto from "@/assets/vishwas.png"; // circular profile logo (VISS Vishwas)

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center bg-center bg-cover"
      style={{ backgroundImage: `url('${ironmanBg}')` }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-body tracking-[0.3em] uppercase text-white mb-6"
            >
              Full-Stack Developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight text-white mb-8 mx-auto lg:mx-0 max-w-4xl lg:max-w-none"
            >
              Vishwas N <span className="text-gradient">Bhagavantanavar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-body text-white text-base sm:text-lg max-w-md leading-relaxed mb-10 mx-auto lg:mx-0"
            >
              Passionate full-stack developer specializing in React, Node.js & MongoDB.
              Building clean, scalable web applications with persistence and precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-white mb-4"
            >
              <div className="w-6 h-[2px] bg-primary" />
              <p className="font-body text-xs tracking-[0.2em] uppercase font-semibold">
                By Hardwork & Determination
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="font-body text-white text-xs mx-auto lg:mx-0 max-w-xs lg:max-w-none"
            >
              Crafting digital experiences that make an impact.
            </motion.p>
          </div>

          {/* Right - Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
              <img
                src={profilePhoto}
                alt="Vishwas logo"
                className="relative w-72 sm:w-80 lg:w-[420px] h-72 sm:h-80 lg:h-[420px] rounded-full object-cover glow shadow-2xl border border-primary/20"
              />
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
        <span className="text-xs font-body tracking-widest text-muted-foreground uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
