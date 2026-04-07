import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Project Manager",
    company: "Tech Startup",
    image: "👨‍💼",
    text: "Vishwas delivered an exceptional portfolio website. The attention to detail and modern design approach was exactly what we needed. Highly recommended!",
    rating: 5,
    color: "from-blue-400 to-cyan-400",
  },
  {
    name: "Priya Patel",
    role: "UI/UX Designer",
    company: "Design Agency",
    image: "👩‍🎨",
    text: "Working with Vishwas was seamless. He translated our designs into pixel-perfect implementations with smooth animations and excellent performance.",
    rating: 5,
    color: "from-purple-400 to-pink-400",
  },
  {
    name: "Arjun Kumar",
    role: "CTO",
    company: "E-Commerce Platform",
    image: "👨‍💻",
    text: "The full-stack solutions provided were robust, scalable, and production-ready. Vishwas showed strong problem-solving skills and technical expertise.",
    rating: 5,
    color: "from-green-400 to-emerald-400",
  },
  {
    name: "Neha Singh",
    role: "Startup Founder",
    company: "SaaS Company",
    image: "👩‍💼",
    text: "From concept to launch, Vishwas was instrumental in building our MVP. His dedication and willingness to go the extra mile made all the difference.",
    rating: 5,
    color: "from-orange-400 to-red-400",
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-md hover:border-primary/50 transition-all duration-500 h-full flex flex-col"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1 + index * 0.1 }}
          >
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <p className="font-body text-white mb-6 leading-relaxed flex-grow text-sm sm:text-base">
        "{testimonial.text}"
      </p>

      {/* Divider */}
      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />

      {/* Author */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-2xl font-display font-bold`}
        >
          {testimonial.image}
        </div>
        <div>
          <h4 className="font-display font-bold text-white text-sm">
            {testimonial.name}
          </h4>
          <p className="font-body text-xs text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="py-32 relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/3 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            What People Say
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Feedback from amazing clients I've had the privilege to work with
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="font-body text-muted-foreground mb-6">
            Want to work together on your next project?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-black font-body font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Let's Talk
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
