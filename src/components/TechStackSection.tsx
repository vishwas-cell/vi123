import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Zap, 
  GitBranch, 
  Palette, 
  Server,
  PackageOpen,
  Rocket
} from "lucide-react";

const techCategories = [
  {
    title: "Frontend",
    icon: Code2,
    gradient: "from-blue-400 to-green-400",
    techs: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 88 },
      { name: "Vite", level: 92 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    gradient: "from-purple-400 to-pink-400",
    techs: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "MongoDB", level: 88 },
      { name: "REST APIs", level: 93 },
      { name: "Authentication", level: 87 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Palette,
    gradient: "from-orange-400 to-red-400",
    techs: [
      { name: "Git & GitHub", level: 94 },
      { name: "npm/yarn", level: 91 },
      { name: "API Testing", level: 89 },
      { name: "Debugging", level: 95 },
      { name: "VS Code", level: 96 },
    ],
  },
  {
    title: "Languages",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-400",
    techs: [
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 85 },
      { name: "HTML/CSS", level: 96 },
      { name: "SQL", level: 82 },
      { name: "CSS Animations", level: 94 },
    ],
  },
];

const SkillBar = ({ tech, delay }: { tech: { name: string; level: number }; delay: number }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="font-body text-sm font-semibold text-white">{tech.name}</span>
        <span className="font-body text-xs text-primary font-bold">{tech.level}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${tech.level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
        />
      </div>
    </motion.div>
  );
};

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="tech-stack"
      className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            Technical Expertise
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Technologies I <span className="text-gradient">Master</span>
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
            A well-rounded skill set across the entire web development stack
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-primary/30 transition-all duration-500"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${category.gradient} opacity-85 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Bars */}
                {category.techs.map((tech, idx) => (
                  <SkillBar
                    key={tech.name}
                    tech={tech}
                    delay={index * 0.1 + idx * 0.05}
                  />
                ))}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating Icons Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Code2, label: "5+ Years", value: "Experience" },
            { icon: PackageOpen, label: "20+", value: "Projects" },
            { icon: GitBranch, label: "50+", value: "Repositories" },
            { icon: Rocket, label: "100%", value: "Dedication" },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center hover:border-primary/50 transition-all duration-500 cursor-pointer"
              >
                <StatIcon size={28} className="text-primary mx-auto mb-3" />
                <p className="font-display font-bold text-white text-lg">
                  {stat.label}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
