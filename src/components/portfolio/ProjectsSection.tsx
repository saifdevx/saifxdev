import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "AI Automation Platform",
    description: "Intelligent task automation system using Python and LLMs. Automates complex workflows, processes documents, and integrates with business tools.",
    tech: ["Python", "LangChain", "FastAPI", "React"],
    image: "/placeholder.svg",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    title: "Smart Data Processor",
    description: "AI-powered data analysis and visualization tool. Transforms raw data into actionable insights with automated reporting and dashboard generation.",
    tech: ["Python", "Pandas", "Plotly", "Streamlit"],
    image: "/placeholder.svg",
    gradient: "from-pink-500/20 to-red-500/20",
  },
  {
    title: "Custom ChatGPT Agent",
    description: "Specialized AI agent for business operations. Handles customer inquiries, processes orders, and provides intelligent recommendations.",
    tech: ["OpenAI API", "Python", "LangChain", "PostgreSQL"],
    image: "/placeholder.svg",
    gradient: "from-red-500/20 to-rose-500/20",
  },
];

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentProject];

  return (
    <section className="relative w-full h-full md:h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
      {/* Rose/Pink themed background */}
      <motion.div
        key={currentProject}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />
      
      <div 
        className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, hsl(346 77% 50%) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400 mb-3 block">Portfolio</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-500">Projects</span>
          </h2>
        </motion.div>

        {/* Project Card */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 items-center">
          {/* Project Image */}
          <motion.div
            key={`image-${currentProject}`}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="perspective-1000 order-2 lg:order-1"
          >
            <motion.div
              className="glass-card overflow-hidden aspect-video border border-rose-500/20"
              whileHover={{ 
                rotateY: 5, 
                rotateX: -5,
                scale: 1.02,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Project Preview</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            key={`info-${currentProject}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-rose-400">
                0{currentProject + 1} / 0{projects.length}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-4 md:mb-5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
              <motion.button
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={14} />
                Live Demo
              </motion.button>
              
              <motion.button
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-rose-500/30 hover:border-rose-500/60 transition-colors font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={14} />
                Source Code
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
          <motion.button
            onClick={prevProject}
            className="p-2 rounded-xl glass-card hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
          
          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "w-6 bg-rose-500"
                    : "w-2 bg-muted-foreground/30 hover:bg-rose-400/60"
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextProject}
            className="p-2 rounded-xl glass-card hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;