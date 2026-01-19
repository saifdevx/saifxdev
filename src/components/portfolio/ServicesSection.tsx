import { motion } from "framer-motion";
import { Brain, Workflow, Globe, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Integration",
    description: "Implement cutting-edge AI solutions tailored to your business needs. From chatbots to data analysis pipelines.",
    features: ["Custom AI Models", "LLM Integration", "Process Automation"],
  },
  {
    icon: Workflow,
    title: "Python Automation",
    description: "Eliminate repetitive tasks and streamline operations with powerful Python scripts and automation tools.",
    features: ["Task Automation", "Data Processing", "API Development"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Create modern, responsive websites and web applications that look stunning and perform flawlessly.",
    features: ["React & Next.js", "Responsive Design", "Performance Optimized"],
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description: "Get expert guidance on AI strategy, technical architecture, and digital transformation initiatives.",
    features: ["AI Strategy", "Technical Guidance", "Best Practices"],
  },
];

const ServicesSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="section-title">Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            How I Can <span className="gradient-text">Help You</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="glass-card p-4 md:p-6 h-full transition-all duration-300 hover:border-primary/30">
                {/* Icon */}
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                >
                  <service.icon size={20} className="md:w-6 md:h-6 text-primary" />
                </motion.div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">{service.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1 md:space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs md:text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </li>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4">
            Have a project in mind? Let's discuss how I can help.
          </p>
          <motion.button
            className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Conversation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
