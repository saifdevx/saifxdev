import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionProgressProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
}

const SectionProgress = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
}: SectionProgressProps) => {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-card px-4 py-3 flex items-center gap-4">
        {/* Previous Button */}
        <motion.button
          onClick={onPrevious}
          disabled={currentSection === 0}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Progress Bar */}
        <div className="w-32 sm:w-48 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Counter */}
        <div className="flex items-center gap-1 text-sm font-mono min-w-[50px] justify-center">
          <span className="text-primary font-bold">{currentSection + 1}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{totalSections}</span>
        </div>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Scroll Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center text-xs text-muted-foreground mt-3"
      >
        <span className="hidden md:inline">Use arrow keys or scroll • </span>
        <span className="md:hidden">Swipe or tap arrows • </span>
        <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">⌘K</kbd> for quick nav
      </motion.p>
    </motion.div>
  );
};

export default SectionProgress;
