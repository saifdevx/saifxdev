import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Generative AI & LLMs",
    skills: ["Prompt Engineering", "ChatGPT API", "LLM Workflows", "AI Agents", "NLP", "AI Automation"],
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "AI Tools & Platforms",
    skills: ["Lovable AI", "Manus AI", "n8n", "Chatbase", "MidJourney", "ImagineArt"],
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Web Development",
    skills: ["WordPress", "Elementor", "WooCommerce", "HTML", "CSS", "SEO Optimization"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Programming & Tools",
    skills: ["Python", "Backend Fundamentals", "API Integration", "Git", "VS Code", "Microsoft Office"],
    color: "from-amber-400 to-yellow-500",
  },
];

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
    visible: { 
      opacity: 1, rotateY: 0, scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 80 },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1, x: 0, scale: 1,
      transition: { delay: i * 0.05, duration: 0.3, type: "spring" },
    }),
  };

  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(38 92% 50% / 0.15)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 80, 0], y: [0, -40, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-3xl"
          style={{ background: "hsl(45 93% 47% / 0.1)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, 60, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500 mb-3 block">Tech Stack</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Technologies</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-3 md:gap-4"
          style={{ perspective: "1000px" }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ scale: 1.02, rotateY: 5, boxShadow: "0 20px 40px hsl(38 92% 50% / 0.15)" }}
              className="glass-card p-4 md:p-5 origin-center border border-amber-500/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${category.color}`} />
                <h3 className="text-sm md:text-base font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    custom={skillIndex + categoryIndex * 6}
                    variants={tagVariants}
                    whileHover={{ scale: 1.15, y: -3, boxShadow: "0 4px 15px hsl(38 92% 50% / 0.3)" }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/15 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-base"
            >
              🚀
            </motion.span>
            <span className="text-xs text-muted-foreground">
              Actively learning Python & backend development
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
