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
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-52 md:w-72 h-52 md:h-72 rounded-full blur-3xl"
          style={{ background: "hsl(var(--accent) / 0.15)" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="section-title">Background</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-5 md:p-8"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-primary/10">
                <GraduationCap size={22} className="md:w-7 md:h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">Education</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Academic Background</p>
              </div>
            </div>

            <div className="relative pl-4 md:pl-6 border-l-2 border-primary/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary glow-primary" />
                
                <div className="mb-2">
                  <span className="text-xs md:text-sm font-mono text-primary">2024 — 2028</span>
                </div>
                
                <h4 className="text-base md:text-lg font-semibold mb-1">
                  Bachelor in Computer Science
                </h4>
                
                <p className="text-muted-foreground text-sm md:text-base mb-2">
                  SZABIST, Islamabad
                </p>
                
                <div className="inline-block px-2 md:px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs md:text-sm">
                  Specialization: Artificial Intelligence
                </div>
              </motion.div>
            </div>

            {/* Future Experience Placeholder */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground text-xs md:text-sm text-center">
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
            className="glass-card p-5 md:p-8"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-secondary/10">
                <Award size={22} className="md:w-7 md:h-7 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">Certifications</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Professional Credentials</p>
              </div>
            </div>

            <div className="space-y-2 md:space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <CheckCircle size={16} className="md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{cert}</span>
                </motion.div>
              ))}
            </div>

            {/* More Coming */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center text-muted-foreground text-xs md:text-sm mt-4 md:mt-6"
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
