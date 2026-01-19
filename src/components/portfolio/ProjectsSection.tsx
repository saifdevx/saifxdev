import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "AI Automation Platform",
    description: "Intelligent task automation system using Python and LLMs. Automates complex workflows, processes documents, and integrates with business tools.",
    tech: ["Python", "LangChain", "FastAPI", "React"],
    image: "/placeholder.svg",
    gradient: "from-purple-500/20 to-pink-500/20",
    accentColor: "purple",
  },
  {
    title: "Smart Data Processor",
    description: "AI-powered data analysis and visualization tool. Transforms raw data into actionable insights with automated reporting and dashboard generation.",
    tech: ["Python", "Pandas", "Plotly", "Streamlit"],
    image: "/placeholder.svg",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "blue",
  },
  {
    title: "Custom ChatGPT Agent",
    description: "Specialized AI agent for business operations. Handles customer inquiries, processes orders, and provides intelligent recommendations.",
    tech: ["OpenAI API", "Python", "LangChain", "PostgreSQL"],
    image: "/placeholder.svg",
    gradient: "from-green-500/20 to-emerald-500/20",
    accentColor: "green",
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
    <section className="relative w-full h-screen flex items-center justify-center py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <motion.div
        key={currentProject}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />

      <div className="relative max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="section-title">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Project Card */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Project Image */}
          <motion.div
            key={`image-${currentProject}`}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="perspective-1000 order-2 lg:order-1"
          >
            <motion.div
              className="glass-card overflow-hidden aspect-video"
              whileHover={{ 
                rotateY: 5, 
                rotateX: -5,
                scale: 1.02,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-muted-foreground text-xs md:text-sm">Project Preview</span>
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
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span className="text-xs md:text-sm font-mono text-muted-foreground">
                0{currentProject + 1} / 0{projects.length}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <motion.button
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-primary text-primary-foreground font-medium text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
                Live Demo
              </motion.button>
              
              <motion.button
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-border hover:border-primary/50 transition-colors font-medium text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={16} className="md:w-[18px] md:h-[18px]" />
                Source Code
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12">
          <motion.button
            onClick={prevProject}
            className="p-2 md:p-3 rounded-lg md:rounded-xl glass-card hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>
          
          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "w-6 md:w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextProject}
            className="p-2 md:p-3 rounded-lg md:rounded-xl glass-card hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
