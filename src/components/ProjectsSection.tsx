import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
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
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "LocalStorage"],
    image: projectTodo,
    link: "/projects/To-DoListApp.html",
  },
  {
    number: "02",
    total: "05",
    title: "Web Calculator",
    description:
      "A sleek, responsive calculator built with HTML, CSS, and JavaScript. Features all basic arithmetic operations with a modern purple gradient UI and Bootstrap styling.",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    image: projectCalculator,
    link: "/projects/Calculator.html",
  },
  {
    number: "03",
    total: "05",
    title: "Portfolio Website",
    description:
      "A clean, responsive portfolio website built with HTML and Bootstrap. Features hero section, project showcases, skills display, and contact form with smooth navigation.",
    tags: ["HTML", "CSS", "Bootstrap"],
    image: projectPortfolio,
    link: "/projects/Portfolioweb.html",
  },
  {
    number: "04",
    total: "05",
    title: "Python To-Do List",
    description:
      "A command-line to-do list manager built with Python. Supports adding, viewing, marking tasks as done, and deleting tasks with a simple interactive menu.",
    tags: ["Python", "CLI", "Prototyping"],
    image: projectPrototype,
    link: "/projects/todolist.html",
  },
  {
    number: "05",
    total: "05",
    title: "Python Calculator",
    description:
      "A command-line calculator built with Python supporting addition, subtraction, multiplication, and division with input validation and error handling.",
    tags: ["Python", "CLI", "Prototyping"],
    image: projectLanding,
    link: "/projects/calculator.html",
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
          <p className="font-body text-sm text-white mb-3">
            <span className="text-2xl font-display font-bold text-white">
              {project.number}
            </span>
            <span className="text-white/80">/{project.total}</span>
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="font-body text-white/90 leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-body px-3 py-1 rounded-full border border-white/30 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-body text-white hover:text-white/80 transition-colors duration-300"
            >
              {project.link.endsWith('.py') ? 'View Source' : 'View Project'} <ExternalLink size={14} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-body text-white/80">
              CLI Project — Source Available
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 bg-secondary/10 relative">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-white mb-4">
            Notable works
          </p>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            Projects
          </h2>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
