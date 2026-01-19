import { motion } from "framer-motion";
import { Brain, Workflow, Globe, MessageSquare, Zap, Sparkles } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Integration",
    description: "Implement cutting-edge AI solutions tailored to your business. From chatbots to intelligent pipelines.",
    features: ["Custom AI Models", "LLM Integration", "Process Automation"],
    gradient: "from-purple-500 to-pink-500",
    size: "large",
  },
  {
    icon: Workflow,
    title: "Python Automation",
    description: "Eliminate repetitive tasks with powerful Python scripts and automation tools.",
    features: ["Task Automation", "Data Processing", "API Development"],
    gradient: "from-blue-500 to-cyan-500",
    size: "large",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites that perform flawlessly.",
    features: ["React & Next.js", "Responsive Design"],
    gradient: "from-green-500 to-emerald-500",
    size: "small",
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description: "Expert guidance on AI strategy and architecture.",
    features: ["AI Strategy", "Best Practices"],
    gradient: "from-orange-500 to-amber-500",
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
    <section className="relative w-full h-screen flex items-center justify-center py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
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
          className="text-center mb-10 md:mb-14"
        >
          <span className="section-title">Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            How I Can <span className="gradient-text">Help You</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
              <div className="glass-card p-5 md:p-6 h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon with glow */}
                <div className="relative mb-4 md:mb-5">
                  <motion.div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <service.icon size={24} className="md:w-7 md:h-7 text-white" />
                  </motion.div>
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-xs md:text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <Sparkles size={12} className="text-primary" />
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
          className="text-center mt-10 md:mt-14"
        >
          <motion.button
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px hsl(var(--primary) / 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={20} />
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
