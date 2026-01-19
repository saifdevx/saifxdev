import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CustomCursor from "@/components/portfolio/CustomCursor";
import Navigation from "@/components/portfolio/Navigation";
import CommandPalette from "@/components/portfolio/CommandPalette";
import SectionProgress from "@/components/portfolio/SectionProgress";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SpecializationsSection from "@/components/portfolio/SpecializationsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import ContactSection from "@/components/portfolio/ContactSection";

const sectionNames = [
  "Hero",
  "About",
  "Specializations",
  "Skills",
  "Projects",
  "Experience",
  "Services",
  "Contact",
];

const sections = [
  HeroSection,
  AboutSection,
  SpecializationsSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ServicesSection,
  ContactSection,
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Handle theme toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [isDark]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      // Arrow key navigation
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToNextSection();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPreviousSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  // Scroll wheel navigation (horizontal)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      
      if (delta > 50) {
        goToNextSection();
      } else if (delta < -50) {
        goToPreviousSection();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, isScrolling]);

  // Touch swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 80) {
        if (diff > 0) {
          goToNextSection();
        } else {
          goToPreviousSection();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isScrolling]);

  const goToNextSection = useCallback(() => {
    if (currentSection < sections.length - 1 && !isScrolling) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev + 1);
      setTimeout(() => setIsScrolling(false), 800);
    }
  }, [currentSection, isScrolling]);

  const goToPreviousSection = useCallback(() => {
    if (currentSection > 0 && !isScrolling) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev - 1);
      setTimeout(() => setIsScrolling(false), 800);
    }
  }, [currentSection, isScrolling]);

  const navigateToSection = (index: number) => {
    if (!isScrolling) {
      setIsScrolling(true);
      setCurrentSection(index);
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h1 className="text-5xl font-black gradient-text">SS</h1>
              </motion.div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mx-auto"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-muted-foreground text-sm font-mono"
              >
                Loading experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        totalSections={sections.length}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
        sectionNames={sectionNames}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigateToSection}
      />

      {/* Section Progress */}
      <SectionProgress
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={goToPreviousSection}
        onNext={goToNextSection}
      />

      {/* Main Content - Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden bg-background"
      >
        <motion.div
          className="h-full flex"
          animate={{
            x: `-${currentSection * 100}vw`,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5,
          }}
        >
          {sections.map((Section, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-screen h-screen overflow-hidden"
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{
                opacity: index === currentSection ? 1 : 0.3,
                scale: index === currentSection ? 1 : 0.95,
              }}
              transition={{ duration: 0.5 }}
            >
              <Section />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Index;
