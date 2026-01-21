import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Sparkles, Code, Zap, Terminal, Cpu } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

// Molecule/Nucleus type
interface Molecule {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  electrons: number;
}

// Interactive Molecule System Component
const MoleculeSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moleculesRef = useRef<Molecule[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const colors = [
    "rgba(59, 130, 246, 0.8)",   // blue-500
    "rgba(6, 182, 212, 0.8)",    // cyan-500
    "rgba(99, 102, 241, 0.7)",   // indigo-500
    "rgba(139, 92, 246, 0.6)",   // violet-500
  ];

  const initMolecules = useCallback((width: number, height: number) => {
    const molecules: Molecule[] = [];
    const count = Math.min(15, Math.floor((width * height) / 50000));
    
    for (let i = 0; i < count; i++) {
      molecules.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        orbitRadius: 15 + Math.random() * 20,
        orbitSpeed: 0.02 + Math.random() * 0.03,
        electrons: 2 + Math.floor(Math.random() * 3),
      });
    }
    moleculesRef.current = molecules;
  }, []);

  const drawMolecule = useCallback((ctx: CanvasRenderingContext2D, mol: Molecule, time: number) => {
    // Draw nucleus glow
    const gradient = ctx.createRadialGradient(mol.x, mol.y, 0, mol.x, mol.y, mol.radius * 2);
    gradient.addColorStop(0, mol.color);
    gradient.addColorStop(0.5, mol.color.replace("0.8", "0.3").replace("0.7", "0.2").replace("0.6", "0.15"));
    gradient.addColorStop(1, "transparent");
    
    ctx.beginPath();
    ctx.arc(mol.x, mol.y, mol.radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw nucleus core
    const coreGradient = ctx.createRadialGradient(mol.x - mol.radius * 0.3, mol.y - mol.radius * 0.3, 0, mol.x, mol.y, mol.radius);
    coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    coreGradient.addColorStop(0.3, mol.color);
    coreGradient.addColorStop(1, mol.color.replace("0.8", "0.5").replace("0.7", "0.4").replace("0.6", "0.3"));
    
    ctx.beginPath();
    ctx.arc(mol.x, mol.y, mol.radius, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();

    // Draw orbit paths
    ctx.strokeStyle = mol.color.replace("0.8", "0.15").replace("0.7", "0.1").replace("0.6", "0.08");
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(mol.x, mol.y, mol.orbitRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw electrons
    for (let i = 0; i < mol.electrons; i++) {
      const angle = time * mol.orbitSpeed + (i * Math.PI * 2) / mol.electrons;
      const ex = mol.x + Math.cos(angle) * mol.orbitRadius;
      const ey = mol.y + Math.sin(angle) * mol.orbitRadius;
      
      // Electron glow
      const electronGradient = ctx.createRadialGradient(ex, ey, 0, ex, ey, 6);
      electronGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      electronGradient.addColorStop(0.5, mol.color);
      electronGradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(ex, ey, 6, 0, Math.PI * 2);
      ctx.fillStyle = electronGradient;
      ctx.fill();

      // Electron core
      ctx.beginPath();
      ctx.arc(ex, ey, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fill();
    }
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, molecules: Molecule[]) => {
    for (let i = 0; i < molecules.length; i++) {
      for (let j = i + 1; j < molecules.length; j++) {
        const dx = molecules[j].x - molecules[i].x;
        const dy = molecules[j].y - molecules[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.3;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(molecules[i].x, molecules[i].y);
          ctx.lineTo(molecules[j].x, molecules[j].y);
          ctx.stroke();
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (moleculesRef.current.length === 0) {
        initMolecules(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const molecules = moleculesRef.current;
      const mouse = mouseRef.current;

      // Update and draw molecules
      molecules.forEach((mol) => {
        // Mouse attraction/repulsion
        const dx = mouse.x - mol.x;
        const dy = mouse.y - mol.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250 && distance > 0) {
          const force = (250 - distance) / 250;
          const attractionStrength = 0.02;
          mol.vx += (dx / distance) * force * attractionStrength;
          mol.vy += (dy / distance) * force * attractionStrength;
        }

        // Apply velocity with damping
        mol.x += mol.vx;
        mol.y += mol.vy;
        mol.vx *= 0.98;
        mol.vy *= 0.98;

        // Bounce off edges
        if (mol.x < mol.orbitRadius) { mol.x = mol.orbitRadius; mol.vx *= -0.5; }
        if (mol.x > canvas.width - mol.orbitRadius) { mol.x = canvas.width - mol.orbitRadius; mol.vx *= -0.5; }
        if (mol.y < mol.orbitRadius) { mol.y = mol.orbitRadius; mol.vy *= -0.5; }
        if (mol.y > canvas.height - mol.orbitRadius) { mol.y = canvas.height - mol.orbitRadius; mol.vy *= -0.5; }
      });

      drawConnections(ctx, molecules);
      molecules.forEach((mol) => drawMolecule(ctx, mol, time));

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initMolecules, drawMolecule, drawConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};

// Cycling Tagline Component
const CyclingTagline = () => {
  const taglines = [
    { highlight: "AI automation", text: "that transform businesses through" },
    { highlight: "machine learning", text: "that revolutionize industries with" },
    { highlight: "intelligent systems", text: "that empower companies using" },
    { highlight: "smart solutions", text: "that accelerate growth with" },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
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
    </motion.p>
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
      {/* Interactive Molecule System */}
      <MoleculeSystem />

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
          transition={{ duration: 0.6, delay: 0.2 }}
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-3 md:mb-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-4 h-4 text-blue-400" />
          </motion.div>
          <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">
            Python Developer × AI Specialist
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mb-4 md:mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
            <TextReveal 
              text="SAIF SATTI" 
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
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-6 md:mb-8"
        >
          {[
            { value: "5+", label: "Projects" },
            { value: "10+", label: "Technologies" },
            { value: "AI", label: "Focused" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.15, type: "spring", stiffness: 200 }}
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
          <IOSBubbleButton variant="primary">
            View Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </IOSBubbleButton>

          <IOSBubbleButton variant="secondary">
            <Mail size={16} />
            Let's Talk
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