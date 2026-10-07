import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface MobileProgressProps {
  currentSection: number;
  totalSections: number;
  sectionNames: string[];
}

const MobileProgress = ({
  currentSection,
  totalSections,
  sectionNames,
}: MobileProgressProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Current Section Indicator - Fixed at bottom */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-3 left-3 right-3 z-30 md:hidden"
      >
        <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between shadow-lg">
          {/* Section Name */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
              {String(currentSection + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-medium truncate max-w-[120px]">
              {sectionNames[currentSection]}
            </span>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSections }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 rounded-full transition-[transform,background-color,border-color,color,opacity,width] duration-300 ${
                  index === currentSection
                    ? "w-4 bg-primary"
                    : index < currentSection
                    ? "w-1.5 bg-primary/50"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
                animate={index === currentSection ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      {currentSection > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-16 right-3 z-30 p-2.5 rounded-full bg-background/90 backdrop-blur-xl border border-border/50 shadow-lg md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={18} className="text-primary" />
        </motion.button>
      )}
    </>
  );
};

export default MobileProgress;
