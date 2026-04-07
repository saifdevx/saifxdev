import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Command, Menu, X, Home, User, Briefcase, Code2, FolderOpen, GraduationCap, Wrench, Mail } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/logo-new.webp";

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  isDark: boolean;
  onThemeToggle: () => void;
  onCommandPaletteOpen: () => void;
  sectionNames: string[];
  onNavigate: (index: number) => void;
  isMobile?: boolean;
}

// Icons for each section
const sectionIcons = [Home, User, Briefcase, Code2, FolderOpen, GraduationCap, Wrench, Mail];

const Navigation = ({
  currentSection,
  isDark,
  onThemeToggle,
  onCommandPaletteOpen,
  sectionNames,
  onNavigate,
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Logo - Fixed Top Left - Bigger */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
      >
        <motion.button
          onClick={() => onNavigate(0)}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img 
            src={logoImg} 
            alt="Saif Satti Logo" 
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-contain shadow-2xl"
            animate={{
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.button>
      </motion.div>

      {/* Navigation - Top Right - Premium Compact Pill Design */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
      >
        <div className="bg-background/70 backdrop-blur-2xl border border-border/40 rounded-full px-1.5 py-1.5 flex items-center gap-0.5 shadow-2xl shadow-black/20">
          {/* Desktop Navigation - Icon-based compact pill */}
          <div className="hidden lg:flex items-center gap-0.5">
            {sectionNames.map((name, index) => {
              const Icon = sectionIcons[index];
              const isActive = index === currentSection;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.button
                  key={name}
                  onClick={() => onNavigate(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative p-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                  
                  {/* Tooltip on hover */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap z-50"
                      >
                        {name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator ring */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-border/50 mx-1.5" />

          {/* Command Palette Trigger */}
          <motion.button
            onClick={onCommandPaletteOpen}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-muted/40 hover:bg-muted/60 transition-all text-xs group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Command size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-muted-foreground font-mono text-[10px] hidden xl:inline">⌘K</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            className="p-2.5 rounded-full hover:bg-muted/50 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            />
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="relative z-10"
                >
                  <Moon size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="relative z-10"
                >
                  <Sun size={16} className="text-yellow-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-muted/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Redesigned fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl lg:hidden"
          >
            {/* Close on backdrop click */}
            <div 
              className="absolute inset-0" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="relative flex flex-col items-center justify-center h-full gap-3 px-8"
            >
              {/* Logo in menu - bigger */}
              <motion.img 
                src={logoImg} 
                alt="Logo" 
                className="w-20 h-20 mb-6 rounded-2xl shadow-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              />
              
              {/* Section Links with icons */}
              {sectionNames.map((name, index) => {
                const Icon = sectionIcons[index];
                return (
                  <motion.button
                    key={name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.15 }}
                    onClick={() => {
                      onNavigate(index);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative w-full max-w-xs flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${
                      index === currentSection
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${
                      index === currentSection 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50 text-muted-foreground"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-base font-medium ${
                      index === currentSection ? "text-primary" : "text-foreground"
                    }`}>
                      {name}
                    </span>
                    {index === currentSection && (
                      <motion.div
                        layoutId="activeMobileSection"
                        className="absolute right-4 w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Quick Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mt-6"
              >
                <motion.button
                  onClick={() => {
                    onCommandPaletteOpen();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-muted/40 border border-border/50 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Command size={16} />
                  <span>Quick Nav</span>
                </motion.button>
                
                <motion.button
                  onClick={onThemeToggle}
                  className="p-3 rounded-2xl bg-muted/40 border border-border/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDark ? <Moon size={18} /> : <Sun size={18} />}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;