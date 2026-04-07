import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Award, Target } from "lucide-react";

const experiences = [
  {
    year: "2024 - Present",
    title: "Full-Stack Developer",
    company: "Self-Employed / Freelance",
    description:
      "Building and maintaining multiple full-stack web applications. Specializing in React frontends with Node.js/MongoDB backends.",
    logo: "🚀",
    color: "from-blue-500 to-cyan-500",
    achievements: [
      "Developed 20+ production-ready web applications",
      "Managed complete project lifecycles from design to deployment",
      "Optimized database queries reducing load times by 40%",
    ],
  },
  {
    year: "2023 - 2024",
    title: "Learning & Portfolio Building",
    company: "Self-Directed Growth",
    description:
      "Intensive learning period focusing on modern web development, system design, and best practices.",
    logo: "📚",
    color: "from-purple-500 to-pink-500",
    achievements: [
      "Completed 50+ coding projects",
      "Mastered React, Node.js, and MongoDB",
      "Built responsive design expertise",
    ],
  },
  {
    year: "2022 - 2023",
    title: "Web Development Fundamentals",
    company: "Personal Projects & Learning",
    description:
      "Foundation building in HTML, CSS, JavaScript, and introduction to frameworks.",
    logo: "🎓",
    color: "from-green-500 to-emerald-500",
    achievements: [
      "Created 10+ projects with vanilla JavaScript",
      "Learned responsive design principles",
      "Introduced to React and modern tooling",
    ],
  },
];

const milestones = [
  { icon: Briefcase, label: "Projects Completed", value: "20+" },
  { icon: Award, label: "Skills Mastered", value: "15+" },
  { icon: Target, label: "Client Satisfaction", value: "100%" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-32 relative overflow-hidden bg-background"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            My Journey
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Experience & <span className="text-gradient">Growth</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl">
            A continuous journey of learning, building, and mastering web development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-0 md:left-1/2 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent -translate-x-1/2 hidden md:block"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`md:p-8 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <div
                    className={`inline-block w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} text-white text-2xl flex items-center justify-center mb-4 font-display font-bold`}
                  >
                    {exp.logo}
                  </div>
                  <p className="text-xs font-body tracking-[0.2em] uppercase text-primary font-semibold mb-2">
                    {exp.year}
                  </p>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="font-body text-accent mb-4">{exp.company}</p>
                  <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((achievement) => (
                      <motion.div
                        key={achievement}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="font-body text-sm text-white">
                          {achievement}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="hidden md:flex justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-32 grid md:grid-cols-3 gap-6"
        >
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.label}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center hover:border-primary/50 transition-all duration-500"
              >
                <Icon size={32} className="text-primary mx-auto mb-4" />
                <h4 className="font-display text-3xl font-bold text-white mb-2">
                  {milestone.value}
                </h4>
                <p className="font-body text-muted-foreground">
                  {milestone.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
