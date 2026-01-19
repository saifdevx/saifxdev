import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles, Code, Zap, Terminal, Cpu } from "lucide-react";

const HeroSection = () => {
  const roles = ["Python Developer", "AI Specialist", "Automation Expert"];
  
  // Floating code snippets for background
  const codeSnippets = [
    "def build_ai():",
    "import tensorflow",
    "model.train()",
    "async function()",
    "neural_network",
    "automation.run()",
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0 px-4 md:px-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Orb */}
        <motion.div
          className="absolute w-[500px] md:w-[800px] h-[500px] md:h-[800px] -top-40 -left-40 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary Orb */}
        <motion.div
          className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] top-1/2 -right-20 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary) / 0.5) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Accent Orb */}
        <motion.div
          className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bottom-0 left-1/4 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block text-[10px] md:text-xs font-mono text-primary/20 select-none"
          style={{
            left: `${10 + (index * 15) % 80}%`,
            top: `${15 + (index * 20) % 70}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ 
            duration: 8 + index * 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {snippet}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8"
        >
          <motion.span 
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs md:text-sm text-muted-foreground">Available for projects</span>
        </motion.div>

        {/* Pre-title with Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-4 md:mb-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">
            Python Developer × AI Specialist
          </span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-4 h-4 text-secondary" />
          </motion.div>
        </motion.div>

        {/* Main Name - Glitch Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mb-6 md:mb-8"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight gradient-text"
            animate={{
              textShadow: [
                "0 0 0px transparent",
                "0 0 30px hsl(var(--primary) / 0.5)",
                "0 0 0px transparent",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            SAIF SATTI
          </motion.h1>
          
          {/* Glitch layers */}
          <motion.h1 
            className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-primary/30 select-none"
            animate={{
              x: [-2, 2, -2],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
          >
            SAIF SATTI
          </motion.h1>
        </motion.div>

        {/* Animated Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          Building{" "}
          <span className="text-foreground font-semibold">intelligent solutions</span>{" "}
          that transform businesses through{" "}
          <motion.span 
            className="text-primary font-semibold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI automation
          </motion.span>
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10 md:mb-12"
        >
          {[
            { value: "5+", label: "Projects" },
            { value: "10+", label: "Technologies" },
            { value: "AI", label: "Focused" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <motion.p 
                className="text-2xl md:text-3xl font-bold gradient-text"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <motion.button
            className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm md:text-base overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>

          <motion.button
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl border border-border hover:border-primary/50 transition-colors font-semibold text-sm md:text-base flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted) / 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={18} />
            Let's Talk
          </motion.button>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm"
          >
            <span className="hidden md:inline">Scroll to explore</span>
            <span className="md:hidden">Swipe to explore</span>
            <ArrowRight size={14} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-[20%] left-[8%] hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-sm border border-primary/20 flex items-center justify-center">
          <Terminal size={20} className="text-primary" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-[30%] right-[10%] hidden md:block"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent backdrop-blur-sm border border-secondary/20 flex items-center justify-center">
          <Code size={18} className="text-secondary" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-[25%] left-[15%] hidden md:block"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-transparent backdrop-blur-sm border border-accent/20 flex items-center justify-center">
          <Sparkles size={14} className="text-accent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
