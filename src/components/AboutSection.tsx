import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Wrench } from "lucide-react";
import bgVideo from "@/assets/Itachi Clips for editing  Twixtor + 4k  By The Editing Oasis (1).mp4"; // background video for about section

const skills = [
  {
    icon: Code2,
    title: "Frontend",
    items: ["React", "CSS / Tailwind", "Vite", "TypeScript"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["Git", "Python", "Rapid Prototyping", "Debugging"],
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-primary/10 relative overflow-hidden">
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
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-white mb-4">
            More About Myself ———
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            I'm passionate about building{" "}
            <span className="text-gradient">digital experiences</span> that solve real problems.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-body text-white text-base sm:text-lg leading-relaxed mb-6">
              I enjoy working with modern technologies to create web applications 
              that are both functional and visually compelling. My approach combines 
              clean code architecture with persistent troubleshooting — I don't stop 
              until the problem is solved.
            </p>
            <p className="font-body text-white text-base sm:text-lg leading-relaxed mb-6">
              With expertise spanning frontend frameworks like React and backend 
              technologies including Node.js and MongoDB, I bring a holistic 
              perspective to every project. I specialize in rapid prototyping 
              and iterative development.
            </p>
            <p className="font-body text-white text-base sm:text-lg leading-relaxed">
              Whether it's a complex web application or a quick prototype, 
              I approach every challenge with curiosity and determination.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                className="flex gap-5 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-500"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <skill.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {skill.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-body px-3 py-1 rounded-full bg-white/20 text-white border border-white/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
