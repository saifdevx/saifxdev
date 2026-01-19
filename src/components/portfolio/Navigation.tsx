import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Command, Menu, X } from "lucide-react";
import { useState } from "react";

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
      {/* Navigation - Top Right */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-40"
      >
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
          {/* Command Palette Trigger */}
          <motion.button
            onClick={onCommandPaletteOpen}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Command size={12} />
            <span className="text-muted-foreground font-mono">⌘K</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-5 px-8"
            >
              {/* Section Links */}
              {sectionNames.map((name, index) => (
                <motion.button
                  key={name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  onClick={() => {
                    onNavigate(index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-xl font-semibold transition-colors flex items-center gap-3 ${
                    index === currentSection
                      ? "gradient-text"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-xs font-mono text-primary/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {name}
                </motion.button>
              ))}

              {/* Quick Nav Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  onCommandPaletteOpen();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted/50 text-muted-foreground text-sm"
              >
                <Command size={16} />
                <span>Quick Navigation</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo - Fixed Top Left */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-40"
      >
        <motion.button
          onClick={() => onNavigate(0)}
          className="font-black text-xl md:text-2xl gradient-text"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          SS
        </motion.button>
      </motion.div>
    </>
  );
};

export default Navigation;
