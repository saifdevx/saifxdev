import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import projectChatbot from "@/assets/project-chatbot.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectLlm from "@/assets/project-llm.jpg";
import projectBranding from "@/assets/project-branding.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";

const projects = [
  {
    title: "AI-Powered Chatbot System",
    description: "Built intelligent chatbot solutions using ChatGPT API, n8n automation, and Chatbase. Handles customer inquiries with automated conversation flows and AI-powered responses embedded into websites.",
    tech: ["ChatGPT API", "n8n", "Chatbase", "WordPress"],
    gradient: "from-rose-500/20 to-pink-500/20",
    image: projectChatbot,
    caseStudyUrl: "",
  },
  {
    title: "E-Commerce WordPress Stores",
    description: "Designed and delivered 10+ responsive, SEO-optimized WordPress websites with WooCommerce for international clients across UK and US markets. Full project lifecycle management.",
    tech: ["WordPress", "WooCommerce", "Elementor", "SEO"],
    gradient: "from-pink-500/20 to-red-500/20",
    image: projectEcommerce,
    caseStudyUrl: "",
  },
  {
    title: "LLM Workflow Automation",
    description: "Contributing to generative AI product development at Hypervail LLC. Designing prompt engineering pipelines, AI agent systems, and intelligent automation features for client-facing projects.",
    tech: ["LLMs", "Prompt Engineering", "AI Agents", "Automation"],
    gradient: "from-red-500/20 to-rose-500/20",
    image: projectLlm,
    caseStudyUrl: "",
  },
  {
    title: "AI-Assisted Branding & Design",
    description: "Used AI design tools like MidJourney, ImagineArt, and other platforms to produce brand identities, logos, and visual content for international clients within tight timelines.",
    tech: ["MidJourney", "ImagineArt", "AI Design", "Branding"],
    gradient: "from-rose-400/20 to-pink-400/20",
    image: projectBranding,
    caseStudyUrl: "",
  },
  {
    title: "Portfolio Website with AI",
    description: "Built this interactive portfolio using Lovable AI with custom animations, contact form with database integration, and responsive design across all devices.",
    tech: ["Lovable AI", "React", "TypeScript", "Tailwind CSS"],
    gradient: "from-pink-400/20 to-rose-500/20",
    image: projectPortfolio,
    caseStudyUrl: "",
  },
  {
    title: "SEO Optimization Suite",
    description: "Coming soon — Building comprehensive SEO optimization tools and workflows for improving search rankings and organic traffic for client websites.",
    tech: ["SEO", "Analytics", "Content Strategy", "AI Tools"],
    gradient: "from-rose-300/20 to-pink-300/20",
    image: null,
    caseStudyUrl: "",
  },
  {
    title: "AI Agent Dashboard",
    description: "Coming soon — Developing an intelligent dashboard for managing and monitoring AI agents across multiple workflows and client projects.",
    tech: ["AI Agents", "Dashboard", "React", "Python"],
    gradient: "from-pink-300/20 to-rose-400/20",
    image: null,
    caseStudyUrl: "",
  },
  {
    title: "No-Code Automation Platform",
    description: "Coming soon — Creating a visual platform for building AI-powered automation workflows without coding, targeted at small businesses.",
    tech: ["No-Code", "n8n", "Automation", "AI"],
    gradient: "from-rose-500/20 to-red-400/20",
    image: null,
    caseStudyUrl: "",
  },
];

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  const project = projects[currentProject];

  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <motion.div
            key={`image-${currentProject}`}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="perspective-1000 order-2 lg:order-1"
          >
            <motion.div
              className="glass-card overflow-hidden aspect-video border border-rose-500/20"
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={512}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex flex-col items-center justify-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-rose-400 text-lg font-bold"
                  >
                    🚀
                  </motion.div>
                  <span className="text-muted-foreground text-xs font-medium">Coming Soon</span>
                </div>
              )}
            </motion.div>
          </motion.div>

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
              {!project.image && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Coming Soon
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">{project.title}</h3>

            <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4 md:mb-5">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  {tech}
                </span>
              ))}
            </div>

            {project.caseStudyUrl ? (
              <motion.a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={14} />
                View Case Study
              </motion.a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 text-muted-foreground border border-muted-foreground/20 text-xs font-semibold cursor-default opacity-60">
                <ExternalLink size={14} />
                Case Study Coming Soon
              </span>
            )}
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
          <motion.button
            onClick={prevProject}
            className="p-2 rounded-xl glass-card hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
          
          <div className="flex items-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentProject ? "w-6 bg-rose-500" : "w-2 bg-muted-foreground/30 hover:bg-rose-400/60"
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
