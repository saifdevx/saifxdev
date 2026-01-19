import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionProgressProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  sectionNames: string[];
  onNavigate: (index: number) => void;
}

const SectionProgress = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  sectionNames,
  onNavigate,
}: SectionProgressProps) => {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
    >
      <div className="glass-card px-6 py-4 flex flex-col items-center gap-3">
        {/* Section Dots */}
        <div className="flex items-center gap-2">
          {sectionNames.map((name, index) => (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className="group relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? "bg-primary glow-primary scale-125"
                    : index < currentSection
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-muted-foreground bg-background/80 px-2 py-1 rounded">
                {name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex items-center gap-4">
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
          <div className="w-24 sm:w-32 h-1 bg-muted rounded-full overflow-hidden">
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

        {/* Keyboard Hint */}
        <p className="text-[10px] text-muted-foreground">
          Use <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-[9px]">←</kbd>{" "}
          <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-[9px]">→</kbd> or scroll •{" "}
          <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-[9px]">⌘K</kbd> quick nav
        </p>
      </div>
    </motion.div>
  );
};

export default SectionProgress;
