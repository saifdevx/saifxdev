import { motion } from "framer-motion";
import { Brain, Code2, Cog, Monitor } from "lucide-react";

const specializations = [
  {
    icon: Brain,
    title: "AI Development",
    description: "Building intelligent systems with machine learning and natural language processing",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    icon: Code2,
    title: "Python Programming",
    description: "Creating robust, scalable applications with clean, maintainable code",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: Cog,
    title: "Automation Systems",
    description: "Streamlining workflows and eliminating repetitive tasks with smart automation",
    gradient: "from-green-500 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.4)",
  },
  {
    icon: Monitor,
    title: "IT Solutions",
    description: "Delivering comprehensive technical solutions tailored to business needs",
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
];

const SpecializationsSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="section-title">What I Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            My <span className="gradient-text">Specializations</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div 
                className="glass-card p-5 md:p-8 h-full transition-all duration-300 group-hover:border-primary/30"
                style={{
                  boxShadow: "0 0 0 transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${spec.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 transparent";
                }}
              >
                {/* Icon Container */}
                <motion.div
                  className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-4 md:mb-6`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <spec.icon size={22} className="md:w-7 md:h-7 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:gradient-text transition-all duration-300">
                  {spec.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {spec.description}
                </p>

                {/* Hover Indicator */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${spec.gradient} rounded-b-2xl`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
