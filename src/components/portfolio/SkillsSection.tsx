import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: ["Python", "JavaScript", "React", "Node.js", "FastAPI", "Flask"],
  },
  {
    title: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "Hugging Face", "Pandas"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "VS Code", "ChatGPT", "Linux", "PostgreSQL"],
  },
  {
    title: "Design & Web",
    skills: ["Figma", "Tailwind CSS", "WordPress", "Responsive Design", "UI/UX", "Framer"],
  },
];

const SkillsSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl"
          style={{ background: "hsl(var(--secondary) / 0.2)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 md:w-80 h-60 md:h-80 rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.15)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="section-title">Tech Stack</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-4 md:p-6"
            >
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 md:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="skill-tag text-xs md:text-sm cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Cloud - Additional Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-muted-foreground text-xs md:text-sm">
            And always learning more...{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🚀
            </motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
