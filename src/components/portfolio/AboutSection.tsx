import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Calendar } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Calendar, label: "Graduation", value: "2028" },
    { icon: MapPin, label: "Location", value: "Islamabad" },
    { icon: Briefcase, label: "Focus", value: "AI Dev" },
  ];

  const codeSnippet = `const developer = {
  name: "Saif Satti",
  role: "AI Specialist",
  skills: ["Python", "AI/ML", "Automation"],
  passion: "Building intelligent systems"
};

// Currently learning
developer.studying = {
  university: "SZABIST",
  major: "Computer Science",
  specialization: "AI"
};`;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-title">About Me</span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Crafting the Future with{" "}
            <span className="gradient-text">AI & Code</span>
          </h2>

          <div className="space-y-3 md:space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>
              AI developer specializing in Python-powered automation and 
              intelligent systems. Currently pursuing Computer Science with 
              AI specialization at <span className="text-foreground font-medium">SZABIST, Islamabad</span>.
            </p>
            <p>
              I build practical AI solutions that solve real-world problems — 
              from automation systems to intelligent agents that streamline 
              business operations.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-3 md:gap-6 mt-6 md:mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card px-3 md:px-5 py-3 md:py-4 flex items-center gap-2 md:gap-3"
              >
                <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                  <stat.icon size={16} className="md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm md:text-base font-semibold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Code Window */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-card overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-border">
              <div className="flex gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] md:text-xs text-muted-foreground font-mono ml-2">
                developer.ts
              </span>
            </div>

            {/* Code Content */}
            <div className="p-3 md:p-6 font-mono text-[10px] md:text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
                {codeSnippet.split('\n').map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex"
                  >
                    <span className="w-5 md:w-8 text-right mr-2 md:mr-4 text-muted-foreground/40 select-none">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      {line.includes('const ') && (
                        <span>
                          <span className="text-purple-400">const </span>
                          <span className="text-blue-400">{line.split('const ')[1].split(' ')[0]}</span>
                          <span>{line.split(line.split('const ')[1].split(' ')[0]).slice(1).join('')}</span>
                        </span>
                      )}
                      {line.includes('//') && (
                        <span className="text-green-400/70">{line}</span>
                      )}
                      {!line.includes('const ') && !line.includes('//') && (
                        <span>
                          {line.replace(/"([^"]+)"/g, '<span class="text-amber-400">"$1"</span>')
                            .split('<span class="text-amber-400">')
                            .map((part, j) => {
                              if (part.includes('</span>')) {
                                const [quoted, rest] = part.split('</span>');
                                return (
                                  <span key={j}>
                                    <span className="text-amber-400">"{quoted}"</span>
                                    {rest}
                                  </span>
                                );
                              }
                              return <span key={j}>{part}</span>;
                            })}
                        </span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </pre>
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div
            className="absolute -top-3 -right-2 md:-top-4 md:-right-4 glass-card px-2 md:px-4 py-1.5 md:py-2 flex items-center gap-1.5 md:gap-2"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GraduationCap size={14} className="md:w-[18px] md:h-[18px] text-primary" />
            <span className="text-xs md:text-sm font-medium">CS @ SZABIST</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
