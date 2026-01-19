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
  isMobile = false,
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop/Tablet Navigation - Top Right */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
      >
        <div className="glass-card px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-4">
          {/* Logo - Hidden on very small screens */}
          <motion.span
            className="hidden sm:inline font-bold text-lg gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            SS
          </motion.span>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block w-px h-4 bg-border" />

          {/* Command Palette Trigger */}
          <motion.button
            onClick={onCommandPaletteOpen}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Command size={14} />
            <span className="text-muted-foreground">⌘K</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
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
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} />
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
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6 px-8"
            >
              {/* Section Links */}
              {sectionNames.map((name, index) => (
                <motion.button
                  key={name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onNavigate(index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-semibold transition-colors ${
                    index === currentSection
                      ? "gradient-text"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {name}
                </motion.button>
              ))}

              {/* Command Palette in Mobile Menu */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  onCommandPaletteOpen();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-muted-foreground"
              >
                <Command size={18} />
                <span>Quick Navigation</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo - Fixed Top Left for brand visibility */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
      >
        <motion.span
          className="font-black text-2xl md:text-3xl gradient-text cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => onNavigate(0)}
        >
          SS
        </motion.span>
      </motion.div>
    </>
  );
};

export default Navigation;
