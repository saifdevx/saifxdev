import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: ["Python", "JavaScript", "React", "Node.js", "FastAPI", "Flask"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "Hugging Face", "Pandas"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "VS Code", "ChatGPT", "Linux", "PostgreSQL"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Design & Web",
    skills: ["Figma", "Tailwind CSS", "WordPress", "Responsive Design", "UI/UX", "Framer"],
    color: "from-orange-500 to-amber-500",
  },
];

const SkillsSection = () => {
  // 3D flip animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      rotateY: 90,
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 80,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: "spring",
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 overflow-hidden">
      {/* Animated Background - Unique style */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl"
          style={{ background: "hsl(var(--secondary) / 0.15)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.1)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -60, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="section-title">Tech Stack</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-4 md:gap-6"
          style={{ perspective: "1000px" }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)",
              }}
              className="glass-card p-5 md:p-6 origin-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Category Header with gradient line */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.color}`} />
                <h3 className="text-base md:text-lg font-semibold">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills Tags - Flying in animation */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    custom={skillIndex + categoryIndex * 6}
                    variants={tagVariants}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -3,
                      boxShadow: "0 4px 15px hsl(var(--primary) / 0.3)",
                    }}
                    className="px-3 py-1.5 text-xs md:text-sm rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-muted/30 border border-border/50">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-lg"
            >
              🚀
            </motion.span>
            <span className="text-sm text-muted-foreground">
              Constantly learning and exploring new technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
