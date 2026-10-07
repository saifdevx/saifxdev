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
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="fixed bottom-6 right-6 z-40 hidden md:block pointer-events-auto"
    >
      <div className="bg-background/80 backdrop-blur-md border border-border/30 rounded-full px-3 py-2 shadow-lg flex items-center gap-2">
        {/* Previous Button */}
        <motion.button
          onClick={onPrevious}
          disabled={currentSection === 0}
          aria-label="Previous section"
          className="p-1 rounded-full hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={14} />
        </motion.button>

        {/* Compact Section Dots */}
        <div className="flex items-center gap-1">
          {sectionNames.map((name, index) => (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              aria-label={`Go to ${name} section`}
              aria-current={index === currentSection ? "page" : undefined}
              className="group relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-1.5 h-1.5 rounded-full transition-[transform,background-color,border-color,color,opacity,width] duration-300 ${
                  index === currentSection
                    ? "bg-primary w-3"
                    : index < currentSection
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-popover/90 text-popover-foreground px-1.5 py-0.5 rounded shadow-md border border-border/50">
                {name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-muted/30">
          <span className="text-primary font-semibold">{currentSection + 1}</span>
          <span className="text-muted-foreground mx-0.5">/</span>
          <span className="text-muted-foreground">{totalSections}</span>
        </div>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          aria-label="Next section"
          className="p-1 rounded-full hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SectionProgress;
