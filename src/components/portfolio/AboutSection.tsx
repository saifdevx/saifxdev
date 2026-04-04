import { motion } from "framer-motion";
import { Code, Terminal, Rocket, Coffee, Lightbulb, User, Brain, Globe } from "lucide-react";
import saifPhoto from "@/assets/saif-profile.png";

const AboutSection = () => {
  const quickFacts = [
    { icon: User, text: "CS Student @ SZABIST" },
    { icon: Brain, text: "Generative AI Associate" },
    { icon: Globe, text: "WordPress Developer" },
    { icon: Coffee, text: "Actively Learning Python" },
  ];

  const floatingIcons = [Terminal, Code, Lightbulb, Brain];

  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      {/* Green themed gradient background */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <div 
          className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, hsl(142 76% 36%) 0%, transparent 70%)" }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, hsl(152 76% 40%) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Floating Icons Background */}
      {floatingIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block text-green-500/10"
          style={{
            left: `${20 + index * 20}%`,
            top: `${20 + (index * 15) % 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6 + index, repeat: Infinity, delay: index * 0.5 }}
        >
          <Icon size={40 + index * 10} />
        </motion.div>
      ))}

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
        {/* Left: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotateY: -30 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative order-2 md:order-1"
        >
          <motion.div
            className="relative aspect-square max-w-[250px] md:max-w-[350px] mx-auto"
            whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Green Gradient Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 p-[3px]">
              <div className="w-full h-full rounded-3xl bg-background overflow-hidden">
                <img 
                  src={saifPhoto} 
                  alt="Saif Rasheed - Generative AI Associate & Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-background border border-green-500/30 rounded-xl px-2.5 py-1.5 shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-medium">Open to Work</span>
              </div>
            </motion.div>

            {/* Tech Badge */}
            <motion.div
              className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 bg-background border border-emerald-500/30 rounded-xl px-2.5 py-1.5 shadow-lg"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-green-500" />
                <span className="text-xs font-mono">Gen AI Associate</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <motion.span 
            className="text-xs font-semibold uppercase tracking-[0.3em] text-green-500 mb-3 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Who I Am
          </motion.span>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Passionate About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">AI & Innovation</span>
          </h2>

          <div className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Generative AI Associate and WordPress Developer with 2+ years of experience 
              in AI-assisted workflows, web development, and digital automation. Currently 
              contributing to AI product development at Hypervail LLC, working on LLM-powered 
              workflows, prompt engineering, and AI agent systems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Computer Science student at SZABIST University, actively building skills in{" "}
              <span className="text-foreground font-medium">Python and backend development</span>. 
              Passionate about leveraging AI to transform how we work and build digital products.
            </motion.p>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            {quickFacts.map((fact, index) => (
              <motion.div
                key={fact.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-green-500/5 border border-green-500/20"
              >
                <fact.icon size={14} className="text-green-500 flex-shrink-0" />
                <span className="text-xs font-medium">{fact.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Download Resume Button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-5 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 font-medium text-sm flex items-center gap-2 hover:bg-green-500/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Rocket size={14} />
            View Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
