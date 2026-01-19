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
        className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
      >
        <div className="glass-card px-4 py-3 flex items-center justify-between">
          {/* Section Name */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-primary font-bold">
              {String(currentSection + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium truncate">
              {sectionNames[currentSection]}
            </span>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSections }).map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? "bg-primary w-4"
                    : index < currentSection
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button - Shows after scrolling down */}
      {currentSection > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 p-3 rounded-full glass-card md:hidden"
        >
          <ChevronUp size={20} className="text-primary" />
        </motion.button>
      )}
    </>
  );
};

export default MobileProgress;
