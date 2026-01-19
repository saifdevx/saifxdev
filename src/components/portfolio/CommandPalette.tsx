import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Briefcase, Code, FolderOpen, GraduationCap, Wrench, Mail, X } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionIndex: number) => void;
}

const sections = [
  { name: "Hero", icon: Home, index: 0 },
  { name: "About", icon: User, index: 1 },
  { name: "Specializations", icon: Briefcase, index: 2 },
  { name: "Skills", icon: Code, index: 3 },
  { name: "Projects", icon: FolderOpen, index: 4 },
  { name: "Experience", icon: GraduationCap, index: 5 },
  { name: "Services", icon: Wrench, index: 6 },
  { name: "Contact", icon: Mail, index: 7 },
];

const CommandPalette = ({ isOpen, onClose, onNavigate }: CommandPaletteProps) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredSections.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredSections.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredSections[selectedIndex]) {
            onNavigate(filteredSections[selectedIndex].index);
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredSections, onNavigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101]"
          >
            <div className="glass-card overflow-hidden mx-4">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search size={20} className="text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search sections..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredSections.map((section, index) => (
                  <motion.button
                    key={section.name}
                    onClick={() => {
                      onNavigate(section.index);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      index === selectedIndex
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-muted"
                    }`}
                    initial={false}
                    animate={{
                      backgroundColor:
                        index === selectedIndex
                          ? "hsl(var(--primary) / 0.2)"
                          : "transparent",
                    }}
                  >
                    <section.icon size={18} />
                    <span className="font-medium">{section.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground font-mono">
                      {section.index + 1}
                    </span>
                  </motion.button>
                ))}

                {filteredSections.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No sections found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
                    Select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
