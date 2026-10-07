import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle, Briefcase } from "lucide-react";

const workExperience = [
  {
    role: "Agentic AI Developer",
    company: "Self-Directed Projects & Freelance (Remote)",
    period: "Jun 2026 – Present",
    description: "I design, build, and deploy AI agents and web apps that solve real business problems. My agents automate multi-step tasks end to end, from collecting data to taking action. Recent builds include Hyperex Agent and Lead Gen Agent. I also build chatbots with WordPress plugins, n8n, Chatbase, GPTCodes.ai, and the ChatGPT API.",
  },
  {
    role: "Generative AI Associate",
    company: "Hypervail LLC (US-Based, Remote)",
    period: "Feb 2026 – Sep 2026",
    description: "Supported LLM-powered workflows and AI agent design for client projects, working with a remote team across time zones. I designed and refined prompt pipelines to make model output more consistent and accurate, managed my own deliverables, and evaluated new generative AI tools for active projects.",
  },
  {
    role: "WordPress Developer & Designer",
    company: "Freelance (International Clients)",
    period: "Jan 2024 – Present",
    description: "Delivered 10+ responsive, SEO-optimized WordPress sites for clients in the UK, US, and other markets, handling everything from the first brief to post-launch support. I built WooCommerce stores and custom Elementor layouts, improved speed and mobile performance, and used AI design tools for logos and brand visuals on tight timelines.",
  },
];

const certifications = [
  "Agentic AI Course – Air University, Islamabad (2024–2025)",
  "NYJTC Software Engineering Job Simulation (2024)",
  "ChatGPT Expert Professional Certification – Udemy (Aug 2023)",
  "Microsoft Office Specialist (PowerPoint) – Certiport (Jan 2023)",
  "Website Designing Diploma – Joher Institute (Jul 2022)",
  "Information Technology Diploma – Joher Institute (Jul 2022)",
];

const ExperienceSection = () => {
  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[200px] md:w-[350px] h-[200px] md:h-[350px] rounded-full blur-3xl"
          style={{ background: "hsl(199 89% 48% / 0.2)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-3xl"
          style={{ background: "hsl(185 84% 40% / 0.15)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-3 block">Background</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500">Education</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-6">
          {/* Work Experience + Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-4 md:p-6 border border-cyan-500/20"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10">
                <Briefcase size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold">Experience</h3>
                <p className="text-muted-foreground text-xs">Work History</p>
              </div>
            </div>

            <div className="relative pl-4 border-l-2 border-cyan-500/30 space-y-4">
              {workExperience.map((exp, index) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[calc(1rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
                  <span className="text-[10px] font-mono text-cyan-400">{exp.period}</span>
                  <h4 className="text-xs md:text-sm font-semibold">{exp.role}</h4>
                  <p className="text-muted-foreground text-[10px] md:text-xs">{exp.company}</p>
                  <p className="text-muted-foreground text-[10px] md:text-xs mt-1 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="mt-4 pt-4 border-t border-cyan-500/10">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={14} className="text-cyan-400" />
                <span className="text-xs font-semibold">Education</span>
              </div>
              <div className="pl-4 border-l-2 border-cyan-500/20">
                <span className="text-[10px] font-mono text-cyan-400">2024 – 2028</span>
                <h4 className="text-xs md:text-sm font-semibold">BS Computer Science</h4>
                <p className="text-muted-foreground text-[10px] md:text-xs">SZABIST, Islamabad</p>
                <div className="inline-block mt-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px]">
                  + Agentic AI Course
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-4 md:p-6 border border-teal-500/20"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-xl bg-teal-500/10">
                <Award size={20} className="text-teal-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold">Certifications</h3>
                <p className="text-muted-foreground text-xs">Professional Credentials</p>
              </div>
            </div>

            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors border border-cyan-500/10"
                >
                  <CheckCircle size={14} className="text-teal-500 flex-shrink-0" />
                  <span className="font-medium text-xs md:text-sm">{cert}</span>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-4 pt-3 border-t border-teal-500/10">
              <p className="text-xs font-semibold mb-2">Languages</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-[10px] rounded-lg bg-teal-500/10 border border-teal-500/20">English – Professional</span>
                <span className="px-2 py-1 text-[10px] rounded-lg bg-teal-500/10 border border-teal-500/20">Urdu – Native</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
