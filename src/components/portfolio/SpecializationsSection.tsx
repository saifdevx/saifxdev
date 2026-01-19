import { motion } from "framer-motion";
import { Brain, Code2, Cog, Monitor, Award, Plus, Shield, Database } from "lucide-react";

const specializations = [
  {
    icon: Brain,
    title: "AI Development",
    description: "Building intelligent systems with ML and NLP",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Code2,
    title: "Python Programming",
    description: "Creating robust, scalable applications",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Cog,
    title: "Automation Systems",
    description: "Streamlining workflows with smart automation",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Monitor,
    title: "IT Solutions",
    description: "Comprehensive technical solutions",
    gradient: "from-orange-500 to-amber-500",
  },
];

const certifications = [
  { name: "Microsoft Office Specialist", icon: Shield },
  { name: "IT Expert Certification", icon: Database },
  { name: "ChatGPT Specialist", icon: Brain },
  { name: "WordPress Designer", icon: Code2 },
  { name: "Website Designer", icon: Monitor },
  // Empty slots for future
  { name: "", icon: Plus, isEmpty: true },
  { name: "", icon: Plus, isEmpty: true },
  { name: "", icon: Plus, isEmpty: true },
];

const SpecializationsSection = () => {
  // Card dealing animation
  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: 100,
      y: -50,
      rotateZ: 15 + index * 5,
      scale: 0.8,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
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
          className="text-center mb-10 md:mb-12"
        >
          <span className="section-title">What I Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Specializations & <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        {/* Specializations Grid - Card Dealing Animation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group"
            >
              <div className="glass-card p-4 md:p-6 h-full border-2 border-transparent hover:border-primary/30 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-3 md:mb-4`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <spec.icon size={20} className="md:w-6 md:h-6 text-white" />
                </motion.div>

                <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  {spec.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {spec.description}
                </p>

                {/* Bottom gradient line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${spec.gradient} rounded-b-2xl`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <Award className="text-primary" size={20} />
            <span>Certifications</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: cert.isEmpty ? 1.02 : 1.05 }}
                className={`p-3 md:p-4 rounded-xl border transition-all duration-300 ${
                  cert.isEmpty
                    ? "border-dashed border-border/50 bg-transparent"
                    : "border-border/30 bg-muted/20 hover:border-primary/30 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`p-1.5 md:p-2 rounded-lg ${cert.isEmpty ? "bg-muted/30" : "bg-primary/10"}`}>
                    <cert.icon 
                      size={14} 
                      className={`md:w-4 md:h-4 ${cert.isEmpty ? "text-muted-foreground/50" : "text-primary"}`} 
                    />
                  </div>
                  <span className={`text-xs md:text-sm font-medium ${cert.isEmpty ? "text-muted-foreground/50" : ""}`}>
                    {cert.isEmpty ? "Add More" : cert.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
