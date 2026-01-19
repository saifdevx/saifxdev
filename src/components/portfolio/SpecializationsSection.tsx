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
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Cog,
    title: "Automation Systems",
    description: "Streamlining workflows with smart automation",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Monitor,
    title: "IT Solutions",
    description: "Comprehensive technical solutions",
    gradient: "from-purple-400 to-violet-500",
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
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      {/* Purple themed background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          background: "radial-gradient(ellipse at center, hsl(263 70% 58% / 0.2) 0%, transparent 60%)",
        }}
      />
      
      <div 
        className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, hsl(280 85% 65%) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3 block">What I Do</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Specializations & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Certifications</span>
          </h2>
        </motion.div>

        {/* Specializations Grid - Card Dealing Animation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-12">
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
              <div className="glass-card p-3 md:p-5 h-full border-2 border-transparent hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden">
                {/* Icon */}
                <motion.div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-2 md:mb-3`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <spec.icon size={18} className="md:w-5 md:h-5 text-white" />
                </motion.div>

                <h3 className="text-xs md:text-sm font-bold mb-1 group-hover:text-purple-400 transition-colors">
                  {spec.title}
                </h3>
                <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed">
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
          <h3 className="text-sm md:text-base font-semibold text-center mb-4 flex items-center justify-center gap-2">
            <Award className="text-purple-400" size={18} />
            <span>Certifications</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-2">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: cert.isEmpty ? 1.02 : 1.05 }}
                className={`p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                  cert.isEmpty
                    ? "border-dashed border-border/50 bg-transparent"
                    : "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 hover:bg-purple-500/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${cert.isEmpty ? "bg-muted/30" : "bg-purple-500/10"}`}>
                    <cert.icon 
                      size={12} 
                      className={`md:w-3.5 md:h-3.5 ${cert.isEmpty ? "text-muted-foreground/50" : "text-purple-400"}`} 
                    />
                  </div>
                  <span className={`text-[10px] md:text-xs font-medium ${cert.isEmpty ? "text-muted-foreground/50" : ""}`}>
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