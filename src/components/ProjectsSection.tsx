import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Code2, Zap } from "lucide-react";
import projectTodo from "@/assets/project-todo.jpg";
import projectLanding from "@/assets/project-landing.jpg";
import projectPrototype from "@/assets/project-prototype.jpg";
import projectCalculator from "@/assets/project-calculator.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";
import bgVideo from "@/assets/1.mp4"; // background video for projects section

const projects = [
  {
    number: "01",
    total: "05",
    title: "To-Do List App",
    description:
      "A full-featured to-do list web application with add, complete, and delete functionality. Built with HTML, CSS, Bootstrap, and vanilla JavaScript with localStorage for persistent storage.",
    longDescription:
      "This comprehensive task management application features real-time updates, local storage persistence, and a clean, intuitive UI. Perfect for managing daily tasks with smooth animations.",
    category: "Web App",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "LocalStorage"],
    image: projectTodo,
    link: "/projects/To-DoListApp.html",
    performance: "Lightweight, instant load",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    total: "05",
    title: "Web Calculator",
    description:
      "A sleek, responsive calculator built with HTML, CSS, and JavaScript. Features all basic arithmetic operations with a modern purple gradient UI and Bootstrap styling.",
    longDescription:
      "A fully functional calculator with a stunning modern design. Supports all basic arithmetic operations with instant calculation and responsive button feedback.",
    category: "Utility",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    image: projectCalculator,
    link: "/projects/Calculator.html",
    performance: "Instant, responsive",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    total: "05",
    title: "Portfolio Website",
    description:
      "A clean, responsive portfolio website built with HTML and Bootstrap. Features hero section, project showcases, skills display, and contact form with smooth navigation.",
    longDescription:
      "Professional portfolio showcasing projects, skills, and achievements. Built with semantic HTML and Bootstrap, featuring smooth scrolling navigation and mobile optimization.",
    category: "Portfolio",
    tags: ["HTML", "CSS", "Bootstrap", "Responsive"],
    image: projectPortfolio,
    link: "/projects/Portfolioweb.html",
    performance: "SEO optimized",
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "04",
    total: "05",
    title: "Python To-Do List",
    description:
      "A command-line to-do list manager built with Python. Supports adding, viewing, marking tasks as done, and deleting tasks with a simple interactive menu.",
    longDescription:
      "A terminal-based task management system with persistent file storage. Features an interactive menu system with full CRUD operations for task management.",
    category: "CLI Tool",
    tags: ["Python", "CLI", "File I/O"],
    image: projectPrototype,
    link: "/projects/todolist.html",
    performance: "Lightweight, efficient",
    color: "from-orange-500 to-red-500",
  },
  {
    number: "05",
    total: "05",
    title: "Python Calculator",
    description:
      "A command-line calculator built with Python supporting addition, subtraction, multiplication, and division with input validation and error handling.",
    longDescription:
      "A robust command-line calculator with comprehensive input validation, error handling, and support for all basic arithmetic operations.",
    category: "CLI Tool",
    tags: ["Python", "CLI", "Math"],
    image: projectLanding,
    link: "/projects/calculator.html",
    performance: "Safe, validated",
    color: "from-indigo-500 to-blue-500",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 z-20"
              style={{ transform: "translateX(-100%)" }}
              whileHover={{ transform: "translateX(100%)" }}
              transition={{ duration: 0.6 }}
            />
            
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
          {/* Number badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="inline-block mb-6"
          >
            <span className={`inline-block text-6xl font-display font-black bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
              {project.number}
            </span>
            <span className="text-white/60 font-display text-xl">/{project.total}</span>
          </motion.div>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="mb-4"
          >
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${project.color} opacity-80`}>
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-body text-white/90 leading-relaxed mb-6 text-lg">
            {project.description}
          </p>

          {/* Expanded description on hover */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="font-body text-white/80 leading-relaxed mb-6 text-sm overflow-hidden"
          >
            {project.longDescription}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.4 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tags.map((tag, idx) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`text-xs font-body font-semibold px-3 py-1.5 rounded-lg border-2 text-white transition-all duration-300 cursor-pointer bg-gradient-to-r ${project.color} opacity-70 border-transparent hover:opacity-100`}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Performance note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.5 }}
            className="flex items-center gap-2 mb-8 text-white/80 font-body text-sm"
          >
            <Zap size={16} className="text-primary" />
            {project.performance}
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r ${project.color} text-white font-body font-bold text-sm tracking-wide hover:shadow-lg transition-all duration-300`}
          >
            {project.link.endsWith('.py') ? (
              <>
                <Code2 size={18} />
                View Source
              </>
            ) : (
              <>
                <ExternalLink size={18} />
                View Live
              </>
            )}
          </motion.a>
        </div>
      </div>

      {/* Divider */}
      {index < projects.length - 1 && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.6, duration: 0.8 }}
          className="mt-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
        />
      )}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 bg-secondary/10 relative overflow-hidden">
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

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/50 z-10" />

      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            Featured Works
          </p>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my best work across web development, tools, and utilities
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>

        {/* CTA at the end */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="font-body text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/vishwasn-b"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-black font-body font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            <Github size={20} />
            Visit GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
