import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Palette, Bug, Zap } from "lucide-react";
import bgImage from "@/assets/bille.jpeg"; // background for services section

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "End-to-end web application development using React, Node.js, Express, and MongoDB. From concept to deployment.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Clean, intuitive interfaces that prioritize user experience. Modern layouts with smooth animations and responsive design.",
  },
  {
    icon: Bug,
    title: "Troubleshooting",
    description:
      "Persistent debugging and problem-solving. I dig deep into complex issues and don't stop until the root cause is found and fixed.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "Quick proof-of-concept builds to validate ideas. Fast iteration cycles using modern tooling like Vite and Python.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-32 relative overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/80 z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/3 rounded-full blur-[150px] z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-white text-glow mb-4">
            What I Offer
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-glow">
            Services
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group p-8 rounded-xl bg-white border border-border/50 shadow-lg hover:border-primary/30 transition-all duration-500 hover:bg-white/95"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
