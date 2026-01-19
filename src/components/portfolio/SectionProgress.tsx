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
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:block pointer-events-auto"
    >
      <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-4">
        {/* Previous Button */}
        <motion.button
          onClick={onPrevious}
          disabled={currentSection === 0}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Section Dots */}
        <div className="flex items-center gap-1.5">
          {sectionNames.map((name, index) => (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className="group relative p-1"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? "bg-primary scale-125"
                    : index < currentSection
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                animate={index === currentSection ? {
                  boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.4)", "0 0 0 6px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.4)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-popover text-popover-foreground px-2 py-1 rounded shadow-lg border border-border">
                {name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-md bg-muted/50">
          <span className="text-primary font-bold">{String(currentSection + 1).padStart(2, '0')}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{String(totalSections).padStart(2, '0')}</span>
        </div>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SectionProgress;
