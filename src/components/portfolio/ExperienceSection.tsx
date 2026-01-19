import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle } from "lucide-react";

const certifications = [
  "Microsoft Office Specialist",
  "IT Expert Certification",
  "ChatGPT Specialist",
  "WordPress Designer",
  "Website Designer",
];

const ExperienceSection = () => {
  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      {/* Cyan themed background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[200px] md:w-[350px] h-[200px] md:h-[350px] rounded-full blur-3xl"
          style={{ background: "hsl(199 89% 48% / 0.2)" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-3xl"
          style={{ background: "hsl(185 84% 40% / 0.15)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
          }}
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
            Education & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-6">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-4 md:p-6 border border-cyan-500/20"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10">
                <GraduationCap size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold">Education</h3>
                <p className="text-muted-foreground text-xs">Academic Background</p>
              </div>
            </div>

            <div className="relative pl-4 border-l-2 border-cyan-500/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
                
                <div className="mb-2">
                  <span className="text-xs font-mono text-cyan-400">2024 — 2028</span>
                </div>
                
                <h4 className="text-sm md:text-base font-semibold mb-1">
                  Bachelor in Computer Science
                </h4>
                
                <p className="text-muted-foreground text-xs md:text-sm mb-2">
                  SZABIST, Islamabad
                </p>
                
                <div className="inline-block px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                  Specialization: Artificial Intelligence
                </div>
              </motion.div>
            </div>

            {/* Future Experience Placeholder */}
            <div className="mt-4 md:mt-6 p-3 rounded-xl border border-dashed border-cyan-500/20">
              <p className="text-muted-foreground text-xs text-center">
                Experience entries coming soon...
              </p>
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

            {/* More Coming */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center text-muted-foreground text-xs mt-4"
            >
              Continuously learning and earning more...
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;