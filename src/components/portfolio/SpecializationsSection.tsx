import { motion } from "framer-motion";
import { Brain, Code2, Cog, Monitor, Award, Globe, Bot, Wand2 } from "lucide-react";

const specializations = [
  {
    icon: Brain,
    title: "Generative AI",
    description: "LLMs, prompt engineering, and AI agent systems",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "WordPress Development",
    description: "10+ sites delivered for international clients",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "n8n workflows, chatbots, and API integrations",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Wand2,
    title: "AI-Assisted Design",
    description: "Branding, logos, and visuals with AI tools",
    gradient: "from-purple-400 to-violet-500",
  },
];

const tools = [
  "Lovable AI", "Manus AI", "ChatGPT", "n8n", "Chatbase", 
  "MidJourney", "ImagineArt", "Elementor", "WooCommerce",
  "VS Code", "Git", "Microsoft Office",
];

const SpecializationsSection = () => {
  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0, x: 100, y: -50, rotateZ: 15 + index * 5, scale: 0.8,
    }),
    visible: (index: number) => ({
      opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1,
      transition: { duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ background: "radial-gradient(ellipse at center, hsl(263 70% 58% / 0.2) 0%, transparent 60%)" }}
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
            Specializations & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Tools</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-10">
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
                <motion.div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-2 md:mb-3`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                >
                  <spec.icon size={18} className="md:w-5 md:h-5 text-white" />
                </motion.div>
                <h3 className="text-xs md:text-sm font-bold mb-1 group-hover:text-purple-400 transition-colors">{spec.title}</h3>
                <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed">{spec.description}</p>
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

        {/* Tools & Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm md:text-base font-semibold text-center mb-4 flex items-center justify-center gap-2">
            <Award className="text-purple-400" size={18} />
            <span>Tools & Platforms I Use</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 text-xs rounded-xl border border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
