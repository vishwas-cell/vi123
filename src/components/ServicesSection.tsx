import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Globe, 
  Palette, 
  Bug, 
  Zap, 
  Rocket,
  Code2,
  Shield,
  Accessibility
} from "lucide-react";
import bgImage from "@/assets/bille.jpeg"; // background for services section

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "End-to-end web application development using React, Node.js, Express, and MongoDB. From concept to deployment.",
    color: "from-blue-500 to-cyan-500",
    details: ["Full-stack applications", "REST APIs", "Real-time features"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Clean, intuitive interfaces that prioritize user experience. Modern layouts with smooth animations and responsive design.",
    color: "from-purple-500 to-pink-500",
    details: ["Responsive design", "Design systems", "User-centered approach"],
  },
  {
    icon: Bug,
    title: "Troubleshooting & Debugging",
    description:
      "Persistent debugging and problem-solving. I dig deep into complex issues and don't stop until the root cause is found and fixed.",
    color: "from-red-500 to-orange-500",
    details: ["Performance optimization", "Bug fixes", "Code review"],
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "Quick proof-of-concept builds to validate ideas. Fast iteration cycles using modern tooling like Vite and Python.",
    color: "from-yellow-500 to-orange-500",
    details: ["MVP development", "Quick iteration", "Agile methodology"],
  },
  {
    icon: Code2,
    title: "Code Quality & Best Practices",
    description:
      "Writing clean, maintainable code following industry best practices and design patterns. Ensuring long-term sustainability.",
    color: "from-green-500 to-emerald-500",
    details: ["Code standards", "Testing", "Documentation"],
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Optimizing applications for speed, efficiency, and scalability. Making sure your platform handles growth with ease.",
    color: "from-indigo-500 to-blue-500",
    details: ["Speed optimization", "Scalability", "SEO optimization"],
  },
  {
    icon: Shield,
    title: "Security Implementation",
    description:
      "Building secure applications with authentication, authorization, and data protection. Following security best practices.",
    color: "from-teal-500 to-cyan-500",
    details: ["Authentication", "Data protection", "Secure coding"],
  },
  {
    icon: Accessibility,
    title: "Accessibility & Mobile-First",
    description:
      "Creating fully accessible applications for everyone. Mobile-first responsive design that works everywhere.",
    color: "from-pink-500 to-rose-500",
    details: ["Accessibility (a11y)", "Mobile-first", "Cross-browser"],
  },
];

const ServiceCard = ({ 
  service, 
  index,
  isExpanded,
  onHover,
}: { 
  service: typeof services[0]; 
  index: number;
  isExpanded: number | null;
  onHover: (index: number | null) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;
  const isCurrentExpanded = isExpanded === index;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group relative h-full"
    >
      <div className={`glassmorphism relative p-8 rounded-2xl border border-white/20 hover:border-primary/50 transition-all duration-500 h-full backdrop-blur-sm ${
        isCurrentExpanded ? "bg-white/20" : "bg-white/5"
      }`}>
        {/* Gradient background animation */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with animated background */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
          >
            <Icon size={28} className="text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold text-white mb-3 leading-tight">
            {service.title}
          </h3>

          {/* Description */}
          <p className="font-body text-white/90 text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Expandable details */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={isCurrentExpanded ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <div className="space-y-2 pt-4 border-t border-white/20">
              {service.details.map((detail) => (
                <motion.div
                  key={detail}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isCurrentExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                  {detail}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Link */}
          <motion.a
            href="#contact"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:text-accent transition-colors duration-300"
          >
            Learn More →
          </motion.a>
        </div>

        {/* Border glow on hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 pointer-events-none ${service.color.replace('from-', 'border-').split(' ')[0]}`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-32 relative overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/70 z-0" />
      
      {/* Animated background glows */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] z-0" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            What I Offer
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Services & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to bring your vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isExpanded={expandedIndex}
              onHover={setExpandedIndex}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="font-body text-white/80 mb-6">
            Interested in working together? Let's discuss your project.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-black font-body font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Start a Project
            <Zap size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
