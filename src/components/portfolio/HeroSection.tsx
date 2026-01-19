import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

const HeroSection = () => {
  const nameLetters = "SAIF SATTI".split("");
  
  return (
    <section className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="gradient-orb w-[600px] h-[600px] -top-20 -left-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb w-[500px] h-[500px] top-1/2 right-0"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary) / 0.6) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="gradient-orb w-[400px] h-[400px] bottom-0 left-1/3"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.5) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
            Python Developer × AI Specialist
          </span>
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Main Name */}
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8"
        >
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className={`inline-block ${letter === " " ? "w-4 md:w-8" : "gradient-text"}`}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building{" "}
          <span className="text-foreground font-medium">intelligent solutions</span>{" "}
          that transform businesses through{" "}
          <span className="text-primary font-medium">AI automation</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="group relative px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </span>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>

          <motion.button
            className="group px-8 py-4 rounded-2xl border border-border hover:border-primary/50 transition-colors font-semibold text-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Let's Talk
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            <span>Scroll to explore</span>
            <ArrowRight size={16} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-4 h-4 rounded-full border-2 border-primary/40"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-[15%] w-6 h-6 rounded border-2 border-secondary/40"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[20%] w-3 h-3 bg-accent/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default HeroSection;
