import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Command } from "lucide-react";

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  isDark: boolean;
  onThemeToggle: () => void;
  onCommandPaletteOpen: () => void;
  sectionNames: string[];
}

const Navigation = ({
  currentSection,
  totalSections,
  isDark,
  onThemeToggle,
  onCommandPaletteOpen,
  sectionNames,
}: NavigationProps) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-card px-6 py-3 flex items-center gap-6">
        {/* Logo */}
        <motion.span
          className="font-bold text-lg gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          SS
        </motion.span>

        {/* Section Progress */}
        <div className="hidden md:flex items-center gap-2">
          {sectionNames.map((name, index) => (
            <motion.button
              key={index}
              className="group relative px-2 py-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? "bg-primary glow-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-muted-foreground">
                {name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Section Counter */}
        <div className="flex md:hidden items-center gap-2 text-sm font-mono text-muted-foreground">
          <span className="text-primary">{currentSection + 1}</span>
          <span>/</span>
          <span>{totalSections}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <motion.button
            onClick={onCommandPaletteOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Command size={14} />
            <span className="hidden sm:inline text-muted-foreground">⌘K</span>
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
