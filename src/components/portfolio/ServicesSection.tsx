import { motion } from "framer-motion";
import { Brain, Workflow, Globe, MessageSquare, Zap, Sparkles } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Integration",
    description: "Implement cutting-edge AI solutions tailored to your business. From chatbots to intelligent pipelines.",
    features: ["Custom AI Models", "LLM Integration", "Process Automation"],
    gradient: "from-violet-500 to-purple-500",
    size: "large",
  },
  {
    icon: Workflow,
    title: "Python Automation",
    description: "Eliminate repetitive tasks with powerful Python scripts and automation tools.",
    features: ["Task Automation", "Data Processing", "API Development"],
    gradient: "from-purple-500 to-fuchsia-500",
    size: "large",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites that perform flawlessly.",
    features: ["React & Next.js", "Responsive Design"],
    gradient: "from-fuchsia-500 to-pink-500",
    size: "small",
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description: "Expert guidance on AI strategy and architecture.",
    features: ["AI Strategy", "Best Practices"],
    gradient: "from-pink-500 to-violet-500",
    size: "small",
  },
];

const ServicesSection = () => {
  // Bento cascade animation - from different corners
  const cascadeVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      scale: 0.8,
      x: index % 2 === 0 ? -50 : 50,
      y: index < 2 ? -50 : 50,
    }),
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      {/* Violet themed background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, hsl(280 85% 65% / 0.1) 0%, transparent 50%)",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400 mb-3 block">Services</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            How I Can <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">Help You</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cascadeVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group ${service.size === "large" ? "lg:col-span-2" : ""}`}
            >
              <div className="glass-card p-4 md:p-5 h-full border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon with glow */}
                <div className="relative mb-3">
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <service.icon size={20} className="text-white" />
                  </motion.div>
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${service.gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-base font-bold mb-1.5 group-hover:text-violet-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-xs text-muted-foreground flex items-center gap-1.5"
                    >
                      <Sparkles size={10} className="text-violet-400" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-6 md:mt-10"
        >
          <motion.button
            className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-sm flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px hsl(280 85% 65% / 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={16} />
            Start a Project
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;