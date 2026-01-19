import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Command, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/logo.png";

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

const Navigation = ({
  currentSection,
  isDark,
  onThemeToggle,
  onCommandPaletteOpen,
  sectionNames,
  onNavigate,
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Logo - Fixed Top Left with new logo image */}
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
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.button>
      </motion.div>

      {/* Navigation - Top Right - Redesigned */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
      >
        <div className="bg-background/60 backdrop-blur-2xl border border-border/30 rounded-2xl px-2 py-1.5 flex items-center gap-1 shadow-2xl">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {sectionNames.slice(0, 5).map((name, index) => (
              <motion.button
                key={name}
                onClick={() => onNavigate(index)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                  index === currentSection
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {name}
              </motion.button>
            ))}
            {sectionNames.length > 5 && (
              <motion.button
                onClick={onCommandPaletteOpen}
                className="px-2 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                +{sectionNames.length - 5}
              </motion.button>
            )}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-5 bg-border/50 mx-1" />

          {/* Command Palette Trigger */}
          <motion.button
            onClick={onCommandPaletteOpen}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all text-xs group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Command size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-muted-foreground font-mono text-[10px]">⌘K</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            className="p-2 rounded-xl hover:bg-muted/50 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
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
            className="lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-all"
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

      {/* Mobile Menu Overlay - Redesigned */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl lg:hidden"
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
              className="relative flex flex-col items-center justify-center h-full gap-4 px-8"
            >
              {/* Logo in menu */}
              <motion.img 
                src={logoImg} 
                alt="Logo" 
                className="w-16 h-16 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              />
              
              {/* Section Links */}
              {sectionNames.map((name, index) => (
                <motion.button
                  key={name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.15 }}
                  onClick={() => {
                    onNavigate(index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`relative text-lg font-semibold transition-colors flex items-center gap-3 py-2 ${
                    index === currentSection
                      ? "gradient-text"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-[10px] font-mono text-primary/50 w-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {name}
                  {index === currentSection && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -left-4 w-1.5 h-full bg-primary rounded-full"
                    />
                  )}
                </motion.button>
              ))}

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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Command size={14} />
                  <span>Quick Nav</span>
                </motion.button>
                
                <motion.button
                  onClick={onThemeToggle}
                  className="p-2 rounded-xl bg-muted/30 border border-border/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </motion.button>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 flex items-center gap-2 text-xs text-muted-foreground/50"
              >
                <Sparkles size={12} />
                <span>Built with passion</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
