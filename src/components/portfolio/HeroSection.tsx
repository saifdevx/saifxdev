import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Sparkles, Code, Zap, Terminal, Cpu } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

// Floating Orb Component - Elegant glowing spheres with parallax
const FloatingOrb = ({ 
  size, 
  color, 
  position, 
  delay, 
  mousePosition 
}: { 
  size: number; 
  color: string; 
  position: { x: string; y: string }; 
  delay: number;
  mousePosition: { x: number; y: number };
}) => {
  const parallaxStrength = size / 80; // Larger orbs move more
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}20 40%, ${color}05 70%, transparent)`,
        boxShadow: `
          0 0 ${size * 0.4}px ${color}30,
          0 0 ${size * 0.8}px ${color}15,
          inset 0 0 ${size * 0.3}px ${color}20
        `,
        filter: 'blur(0.5px)',
      }}
      animate={{
        x: mousePosition.x * parallaxStrength * 30,
        y: mousePosition.y * parallaxStrength * 30,
        scale: [1, 1.05, 1],
      }}
      transition={{
        x: { type: "spring", stiffness: 50, damping: 30 },
        y: { type: "spring", stiffness: 50, damping: 30 },
        scale: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {/* Inner glow highlight */}
      <div 
        className="absolute rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.35,
          left: '20%',
          top: '15%',
          background: `radial-gradient(circle, rgba(255,255,255,0.4), transparent)`,
          filter: 'blur(2px)',
        }}
      />
    </motion.div>
  );
};

// Premium Orb System - Elegant floating orbs with mouse parallax
const OrbSystem = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const orbs = [
    { size: 120, color: 'hsl(217, 91%, 60%)', position: { x: '10%', y: '20%' }, delay: 0 },
    { size: 80, color: 'hsl(199, 89%, 48%)', position: { x: '75%', y: '15%' }, delay: 1 },
    { size: 60, color: 'hsl(221, 83%, 53%)', position: { x: '85%', y: '60%' }, delay: 2 },
    { size: 100, color: 'hsl(199, 89%, 48%)', position: { x: '5%', y: '70%' }, delay: 1.5 },
    { size: 45, color: 'hsl(217, 91%, 60%)', position: { x: '60%', y: '75%' }, delay: 0.5 },
    { size: 70, color: 'hsl(221, 83%, 53%)', position: { x: '30%', y: '10%' }, delay: 2.5 },
    { size: 35, color: 'hsl(199, 89%, 48%)', position: { x: '90%', y: '35%' }, delay: 1 },
    { size: 55, color: 'hsl(217, 91%, 60%)', position: { x: '20%', y: '85%' }, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <FloatingOrb 
          key={index} 
          {...orb} 
          mousePosition={mousePosition}
        />
      ))}
      
      {/* Subtle ambient glow in center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// Cycling Tagline Component
const CyclingTagline = () => {
  const taglines = [
    { highlight: "generative AI", text: "that transform businesses through" },
    { highlight: "prompt engineering", text: "that build intelligent products with" },
    { highlight: "AI automation", text: "that streamline workflows using" },
    { highlight: "WordPress & web solutions", text: "that deliver results with" },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4"
    >
      Building{" "}
      <span className="text-foreground font-semibold">intelligent solutions</span>{" "}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {taglines[currentIndex].text}{" "}
          <motion.span 
            className="text-blue-400 font-semibold inline-block"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {taglines[currentIndex].highlight}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </p>
  );
};

// iOS-style Bubble Button Component
const IOSBubbleButton = ({ 
  children, 
  variant = "primary",
  className = "",
  onClick,
}: { 
  children: React.ReactNode; 
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 400, damping: 25 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useTransform(springY, [-20, 20], [10, -10]);
  const rotateY = useTransform(springX, [-20, 20], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 3);
    y.set((e.clientY - centerY) / 3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`
        relative w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-sm
        transition-all duration-300 ease-out
        ${isPrimary 
          ? "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 text-white shadow-[0_4px_20px_-4px_hsl(217_91%_60%/0.5),inset_0_1px_1px_hsl(0_0%_100%/0.2)]" 
          : "bg-white/10 backdrop-blur-xl text-foreground border border-white/20 shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.3),inset_0_1px_1px_hsl(0_0%_100%/0.1)]"
        }
        ${className}
      `}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
      
      {/* Bubble ripple on hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${isPrimary ? "bg-white/20" : "bg-white/10"}`}
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

// Text Reveal Animation Component
const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <motion.span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const codeSnippets = [
    "def build_ai():",
    "import tensorflow",
    "model.train()",
    "async function()",
    "neural_network",
    "automation.run()",
  ];

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 py-16 md:py-0">
      {/* Elegant Floating Orb System */}
      <OrbSystem mousePosition={mousePosition} />

      {/* Dynamic gradient that follows mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * 200 - 100,
          y: mousePosition.y * 200 - 100,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        style={{
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.6) 0%, hsl(199 89% 48% / 0.3) 50%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Blue themed gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] -top-20 -left-20 md:-top-40 md:-left-40 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.4) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute w-[250px] md:w-[500px] h-[250px] md:h-[500px] top-1/2 -right-10 md:-right-20 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(210 100% 50% / 0.35) 0%, transparent 60%)",
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        <motion.div
          className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] bottom-0 left-1/4 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(199 89% 48% / 0.3) 0%, transparent 60%)",
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
          className="absolute hidden md:block text-[10px] md:text-xs font-mono text-blue-400/20 select-none"
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
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 md:mb-6"
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
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-3 md:mb-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-4 h-4 text-blue-400" />
          </motion.div>
          <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">
            Generative AI Associate × WordPress Developer
          </span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* Main Name with Character-by-Character Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-4 md:mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
            <TextReveal 
              text="SAIF RASHEED" 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500"
              delay={0.5}
            />
          </h1>
          
          {/* Animated underline */}
          <motion.div
            className="h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60%", opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Cycling Tagline */}
        <CyclingTagline />

        {/* Stats Row with Staggered Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-6 md:mb-8"
        >
          {[
            { value: "10+", label: "Websites Built" },
            { value: "2+", label: "Years Experience" },
            { value: "AI", label: "Focused" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, backgroundColor: "hsl(217 91% 60% / 0.1)" }}
            >
              <motion.p 
                className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* iOS Bubble CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ perspective: "1000px" }}
        >
          <IOSBubbleButton 
            variant="primary"
            onClick={() => {
              const contactSection = document.querySelectorAll('section');
              const lastSection = contactSection[contactSection.length - 1];
              if (lastSection) lastSection.scrollIntoView({ behavior: 'smooth' });
              // Also dispatch a custom event for the horizontal scroll navigation
              window.dispatchEvent(new CustomEvent('navigateToSection', { detail: { index: 7 } }));
            }}
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </IOSBubbleButton>

          <IOSBubbleButton 
            variant="secondary"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateToSection', { detail: { index: 4 } }));
            }}
          >
            <Code size={16} />
            View Projects
          </IOSBubbleButton>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute -bottom-12 md:bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-muted-foreground text-xs"
          >
            <span className="hidden md:inline">Scroll to explore</span>
            <span className="md:hidden">Swipe to explore</span>
            <ArrowRight size={12} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-[20%] left-[8%] hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent backdrop-blur-sm border border-blue-500/20 flex items-center justify-center">
          <Terminal size={18} className="text-blue-400" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-[30%] right-[10%] hidden md:block"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-transparent backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center">
          <Code size={16} className="text-cyan-400" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-[25%] left-[15%] hidden md:block"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400/20 to-transparent backdrop-blur-sm border border-blue-400/20 flex items-center justify-center">
          <Sparkles size={14} className="text-blue-300" />
        </div>
      </motion.div>

      {/* Morphing shape */}
      <motion.div
        className="absolute bottom-[20%] right-[12%] hidden md:block w-16 h-16"
        animate={{
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(135deg, hsl(217 91% 60% / 0.2), hsl(199 89% 48% / 0.1))",
          border: "1px solid hsl(217 91% 60% / 0.2)",
        }}
      />
    </section>
  );
};

export default HeroSection;