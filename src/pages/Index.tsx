import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-new.png";

import CustomCursor from "@/components/portfolio/CustomCursor";
import Navigation from "@/components/portfolio/Navigation";
import CommandPalette from "@/components/portfolio/CommandPalette";
import SectionProgress from "@/components/portfolio/SectionProgress";
import MobileProgress from "@/components/portfolio/MobileProgress";
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

// Unique accent colors per section
const sectionThemes = [
  { accent: "217 91% 60%", name: "blue" },      // Hero - Blue
  { accent: "142 76% 36%", name: "green" },     // About - Green
  { accent: "263 70% 58%", name: "purple" },    // Specializations - Purple
  { accent: "38 92% 50%", name: "amber" },      // Skills - Amber
  { accent: "346 77% 50%", name: "rose" },      // Projects - Rose
  { accent: "199 89% 48%", name: "cyan" },      // Experience - Cyan
  { accent: "280 85% 65%", name: "violet" },    // Services - Violet
  { accent: "173 80% 40%", name: "teal" },      // Contact - Teal
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle theme toggle and section accent colors
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [isDark]);

  // Update accent color based on current section (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const root = document.documentElement;
      root.style.setProperty('--primary', sectionThemes[currentSection].accent);
    }
  }, [currentSection, isMobile]);

  // Define navigation callbacks BEFORE useEffects that use them
  const goToNextSection = useCallback(() => {
    if (currentSection < sections.length - 1 && !isScrolling) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev + 1);
      setTimeout(() => setIsScrolling(false), 400);
    }
  }, [currentSection, isScrolling]);

  const goToPreviousSection = useCallback(() => {
    if (currentSection > 0 && !isScrolling) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev - 1);
      setTimeout(() => setIsScrolling(false), 400);
    }
  }, [currentSection, isScrolling]);

  const navigateToSection = useCallback((index: number) => {
    if (isMobile) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
    } else {
      if (!isScrolling) {
        setIsScrolling(true);
        setCurrentSection(index);
        setTimeout(() => setIsScrolling(false), 800);
      }
    }
  }, [isMobile, isScrolling]);

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

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
  }, [isMobile, goToNextSection, goToPreviousSection]);

  // Scroll wheel navigation (desktop only - horizontal) - OPTIMIZED
  useEffect(() => {
    if (isMobile) return;

    let accumulatedDelta = 0;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      accumulatedDelta += delta;
      
      // Clear any existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Use requestAnimationFrame for smooth handling
      scrollTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > 50) {
          if (accumulatedDelta > 0) {
            goToNextSection();
          } else {
            goToPreviousSection();
          }
        }
        accumulatedDelta = 0;
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentSection, isScrolling, isMobile, goToNextSection, goToPreviousSection]);

  // Touch swipe navigation (desktop horizontal mode only)
  useEffect(() => {
    if (isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      // Increased threshold for swipe
      if (Math.abs(diff) > 100) {
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
  }, [currentSection, isScrolling, isMobile]);

  // Mobile scroll detection for current section
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen - Using logo instead of SS text */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="mb-8"
              >
                <motion.img 
                  src={logoImg}
                  alt="Saif Satti Logo"
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-3xl"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px hsl(var(--primary) / 0.5)",
                      "0 0 60px hsl(var(--primary) / 0.8)",
                      "0 0 20px hsl(var(--primary) / 0.5)"
                    ],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 250 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mx-auto"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-muted-foreground text-sm font-mono"
              >
                Initializing experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor (Desktop only) */}
      {!isMobile && <CustomCursor />}

      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        totalSections={sections.length}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
        sectionNames={sectionNames}
        onNavigate={navigateToSection}
        isMobile={isMobile}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigateToSection}
      />

      {/* Section Progress (Desktop) */}
      {!isMobile && (
        <SectionProgress
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={goToPreviousSection}
          onNext={goToNextSection}
          sectionNames={sectionNames}
          onNavigate={navigateToSection}
        />
      )}

      {/* Mobile Progress */}
      {isMobile && (
        <MobileProgress
          currentSection={currentSection}
          totalSections={sections.length}
          sectionNames={sectionNames}
        />
      )}

      {/* Main Content */}
      {isMobile ? (
        // Mobile: Vertical Scrolling Layout - each section isolated
        <div className="w-full overflow-x-hidden">
          {sections.map((Section, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="w-full"
            >
              <Section />
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Horizontal Scroll Container
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
              stiffness: 60,
              damping: 25,
              mass: 0.8,
            }}
          >
            {sections.map((Section, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-screen h-screen overflow-hidden"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: index === currentSection ? 1 : 0.2,
                }}
                transition={{ duration: 0.6 }}
              >
                <Section />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Index;