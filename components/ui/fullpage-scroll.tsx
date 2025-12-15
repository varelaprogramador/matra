"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// Context para informar aos filhos que a seção está ativa
const SectionContext = createContext({ isActive: false, index: 0 });
export const useSectionContext = () => useContext(SectionContext);

interface Section {
  id: string;
  component: ReactNode;
}

interface FullpageScrollProps {
  sections: Section[];
  transitionDuration?: number;
}

export function FullpageScroll({ sections, transitionDuration = 0.7 }: FullpageScrollProps) {
  // Compute initial section from hash using lazy initializer
  const [currentSection, setCurrentSection] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const index = sections.findIndex(s => s.id === hash);
      if (index !== -1) return index;
    }
    return 0;
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevSection, setPrevSection] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const index = sections.findIndex(s => s.id === hash);
      if (index !== -1) return index;
    }
    return 0;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const goToSection = useCallback((index: number) => {
    if (isAnimating) return;
    if (index < 0 || index >= sections.length) return;

    setPrevSection(currentSection);
    setIsAnimating(true);
    setCurrentSection(index);

    // Update URL hash
    window.history.replaceState(null, "", `#${sections[index].id}`);

    setTimeout(() => {
      setIsAnimating(false);
    }, transitionDuration * 1000 + 200);
  }, [isAnimating, sections, transitionDuration, currentSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    // Verifica se o conteúdo interno pode scrollar
    const target = sectionRef.current;
    if (target) {
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      // Se não está no topo/fim, permite scroll interno
      if (e.deltaY < 0 && !isAtTop) return;
      if (e.deltaY > 0 && !isAtBottom) return;
    }

    e.preventDefault();
    if (isAnimating) return;

    if (e.deltaY > 30) {
      goToSection(currentSection + 1);
    } else if (e.deltaY < -30) {
      goToSection(currentSection - 1);
    }
  }, [currentSection, goToSection, isAnimating]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isAnimating) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSection(currentSection + 1);
      } else {
        goToSection(currentSection - 1);
      }
    }
  }, [currentSection, goToSection, isAnimating]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isAnimating) return;

    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      goToSection(currentSection + 1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      goToSection(currentSection - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSection(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSection(sections.length - 1);
    }
  }, [currentSection, goToSection, isAnimating, sections.length]);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown]);

  // Handle hash change from navbar clicks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const index = sections.findIndex(s => s.id === hash);
        if (index !== -1 && index !== currentSection) {
          goToSection(index);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sections, currentSection, goToSection]);

  const direction = currentSection > prevSection ? 1 : -1;

  // Animação de entrada como se a página estivesse sendo montada
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: direction > 0 ? -50 : 50,
      transition: { duration: 0.3 }
    }
  };

  const slideVariants = {
    enter: {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: direction < 0 ? "50%" : "-50%",
      opacity: 0,
      scale: 0.95,
    },
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black"
    >
      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className={`group relative h-3 w-3 rounded-full border transition-all duration-300 ${
              currentSection === index
                ? "bg-white border-white scale-125"
                : "bg-transparent border-white/30 hover:bg-white/30 hover:border-white/50"
            }`}
            aria-label={`Ir para ${section.id}`}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1.5 text-xs text-white capitalize opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 border border-white/10">
              {section.id}
            </span>
          </button>
        ))}
      </div>

      {/* Sections */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 200, damping: 25 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          ref={sectionRef}
        >
          <SectionContext.Provider value={{ isActive: true, index: currentSection }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="min-h-screen"
            >
              {sections[currentSection].component}
            </motion.div>
          </SectionContext.Provider>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-full bg-black/60 border border-white/10 px-4 py-2 backdrop-blur-md">
          <span className="text-sm font-medium text-white/60">
            {String(currentSection + 1).padStart(2, "0")}
          </span>
          <div className="h-1 w-12 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-medium text-white/40">
            {String(sections.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
