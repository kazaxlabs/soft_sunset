import { useEffect, useRef, useState, FormEvent } from "react";
import { Locale } from "./types";
import { ChevronDown, CheckCircle2, ChevronRight } from "lucide-react";
import Header from "./components/Header";
import GrainyGradient from "./components/GrainyGradient";

export default function App() {
  const verticalScrollRef = useRef<HTMLDivElement>(null);
  
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);
  const [locale, setLocale] = useState<Locale>("FR");
  
  // Interactive Form State for Slide 4
  const [formStep, setFormStep] = useState(1);
  const [projectScope, setProjectScope] = useState<"standard" | "advanced">("standard");
  const [variableValue, setVariableValue] = useState(500);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVioletTheme, setIsVioletTheme] = useState(false);
  const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);

  const isLayoutShifted = isNextButtonHovered || formStep === 3 || isVioletTheme;

  // Set up viewports and smooth snapping mechanics
  useEffect(() => {
    const verticalScroll = verticalScrollRef.current;
    if (!verticalScroll) return;

    setViewportHeight(window.innerHeight);

    let isScrolling = false;
    let scrollStartTop = 0;
    let isLongScroll = false;
    let stabilizerTimeout: any = null;

    const handleScroll = () => {
      const Y = verticalScroll.scrollTop;
      setScrollY(Y);

      if (!isScrolling) {
        isScrolling = true;
        scrollStartTop = Y;
        isLongScroll = false;
      }

      const scrolledDistance = Math.abs(Y - scrollStartTop);
      if (scrolledDistance > 120) {
        isLongScroll = true;
      }

      // Debounce and trigger snap to page when scroll stops
      window.clearTimeout(stabilizerTimeout);
      stabilizerTimeout = window.setTimeout(() => {
        isScrolling = false;
        if (isLongScroll) {
          const currentY = verticalScroll.scrollTop;
          const H = window.innerHeight || 800;
          const closestPageIndex = Math.round(currentY / H);
          const targetY = closestPageIndex * H;
          
          if (Math.abs(currentY - targetY) > 5) {
            verticalScroll.scrollTo({
              top: targetY,
              behavior: "smooth"
            });
          }
        }
        isLongScroll = false;
      }, 200);
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    verticalScroll.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      verticalScroll.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(stabilizerTimeout);
    };
  }, []);

  const scrollToPage = (pageIndex: number) => {
    if (verticalScrollRef.current) {
      verticalScrollRef.current.scrollTo({
        top: pageIndex * window.innerHeight,
        behavior: "smooth"
      });
    }
  };

  const H = viewportHeight || 800;
  const maxScroll = 3 * H;
  const currentProgressPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
  const activePageIndex = Math.min(3, Math.max(0, Math.round(scrollY / H)));

  const getSlideStyle = (index: number) => {
    const startY = index * H;
    const endY = (index + 1) * H;

    if (scrollY < startY) {
      return {
        transform: "translateY(0px) scale(1)",
        opacity: 1,
        visibility: "visible" as const,
        zIndex: index * 10
      };
    } else if (scrollY >= startY && scrollY < endY) {
      return {
        transform: "translateY(0px) scale(1)",
        opacity: 1,
        visibility: "visible" as const,
        zIndex: index * 10
      };
    } else {
      const isBackdrop = scrollY < endY + H;
      return {
        transform: "translateY(0px) scale(1)",
        opacity: isBackdrop ? 1 : 0,
        visibility: isBackdrop ? ("visible" as const) : ("hidden" as const),
        zIndex: index * 10
      };
    }
  };

  const getCornerClass = (index: number) => {
    if (index === 0) return "rounded-t-none";
    return "rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] lg:rounded-t-[5.5rem]";
  };

  const getRevealClass = (
    slideIndex: number, 
    itemIndex: number, 
    direction: "up" | "down" | "left" | "right" | "scale" = "up"
  ) => {
    const isActive = activePageIndex === slideIndex;
    
    let transformClass = "";
    if (direction === "up") {
      transformClass = isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none";
    } else if (direction === "down") {
      transformClass = isActive ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none";
    } else if (direction === "left") {
      transformClass = isActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0 pointer-events-none";
    } else if (direction === "right") {
      transformClass = isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0 pointer-events-none";
    } else if (direction === "scale") {
      transformClass = isActive ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none";
    }

    const delayClass = [
      "delay-[0ms]",
      "delay-[150ms]",
      "delay-[300ms]",
      "delay-[450ms]",
      "delay-[600ms]",
      "delay-[750ms]"
    ][itemIndex] || "delay-[100ms]";

    return `transition-all duration-1000 ${delayClass} ease-out transform ${transformClass}`;
  };

  const computedTotal = Math.round(variableValue * (projectScope === "advanced" ? 12.5 : 8.0));

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div 
      ref={verticalScrollRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden overscroll-y-contain bg-brand-beige scroll-smooth selection:bg-brand-orange selection:text-white animate-fade-in"
    >
      <Header 
        locale={locale} 
        setLocale={setLocale} 
        scrollToPage={scrollToPage} 
        activePage={activePageIndex} 
      />

      {/* DYNAMIC SCROLL PROGRESS TRACKER BAR */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-brand-beige-dark/40 z-50">
        <div 
          className="h-full bg-brand-orange transition-all duration-75"
          style={{ width: `${currentProgressPercent}%` }}
        />
      </div>

      {/* ==========================================
          SLIDE 1: HOME / ACCUEIL (HERO)
          ========================================== */}
      <div 
        style={getSlideStyle(0)}
        className="sticky top-0 w-full h-screen bg-[#FAF6F0] flex flex-col justify-between pb-6 will-change-transform animate-fade-in relative"
      >
        <GrainyGradient variant="hero" />

        <main className="relative flex-1 flex flex-col justify-center items-start text-left px-6 md:px-12 max-w-5xl w-full mx-auto z-10 pt-24">
          <div className={`inline-flex items-center px-4 py-2 mb-5 bg-white/85 backdrop-blur-sm rounded-full border border-brand-beige-dark/50 shadow-xs ${getRevealClass(0, 0, "down")}`}>
            <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping mr-2" />
            <div className="h-2 w-28 bg-brand-orange/60 rounded-full" />
          </div>

          <div className={`space-y-3 sm:space-y-4 w-full ${getRevealClass(0, 1, "up")}`}>
            <div className="h-10 sm:h-16 md:h-20 lg:h-24 w-[75%] bg-brand-orange rounded-xl animate-pulse" />
            <div className="h-10 sm:h-16 md:h-20 lg:h-24 w-[55%] bg-brand-charcoal rounded-xl" />
            <div className="h-10 sm:h-16 md:h-20 lg:h-24 w-[85%] bg-brand-orange rounded-xl border-b-8 border-brand-orange/20" />
          </div>

          <div className={`space-y-2.5 mt-8 max-w-2xl w-full ${getRevealClass(0, 2, "up")}`}>
            <div className="h-3 w-full bg-brand-charcoal/30 rounded-full" />
            <div className="h-3 w-[92%] bg-brand-charcoal/30 rounded-full" />
            <div className="h-3 w-[78%] bg-brand-charcoal/20 rounded-full" />
          </div>

          <div className={`flex flex-wrap items-center gap-4 mt-10 ${getRevealClass(0, 3, "scale")}`}>
            <button 
              onClick={() => scrollToPage(3)}
              className="bg-brand-orange hover:bg-brand-orange/95 h-12 w-36 rounded-full cursor-pointer transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              <div className="w-8 h-2 bg-white/40 rounded-full" />
            </button>
            <button 
              onClick={() => scrollToPage(2)}
              className="bg-white/60 hover:bg-white/95 h-12 w-36 rounded-full border border-brand-beige-dark/60 cursor-pointer transition-all active:scale-95 shadow-xs flex items-center justify-center"
            >
              <div className="w-8 h-2 bg-brand-charcoal/30 rounded-full" />
            </button>
          </div>
        </main>

        <footer className={`relative w-full px-6 py-4 md:px-12 flex justify-between items-end z-10 border-t border-brand-beige-dark/30 bg-white/20 backdrop-blur-xs ${getRevealClass(0, 4, "up")}`}>
          <div className="space-y-1.5 text-left">
            <div className="h-2 w-16 bg-brand-charcoal/30 rounded-full" />
            <div className="h-3.5 w-32 bg-brand-charcoal/80 rounded-full" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => scrollToPage(1)}
              className="w-8 h-12 rounded-full border border-brand-charcoal/10 flex justify-center p-2 hover:bg-black/5 hover:border-brand-charcoal/20 transition-all cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 text-brand-charcoal animate-bounce" />
            </button>
          </div>

          <div className="space-y-1.5 flex flex-col items-end">
            <div className="h-2 w-14 bg-brand-charcoal/30 rounded-full" />
            <div className="flex items-center gap-1.5 bg-brand-orange/10 px-2.5 py-1 rounded border border-brand-orange/20">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
              <div className="h-2 w-10 bg-brand-orange/60 rounded-full" />
            </div>
          </div>
        </footer>
      </div>

      {/* ==========================================
          SLIDE 2: PILLARS GRID
          ========================================== */}
      <div 
        style={getSlideStyle(1)}
        className={`sticky top-0 w-full h-screen bg-[#b32b09] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden z-10 shadow-[0_-40px_80px_rgba(0,0,0,0.12)] ${getCornerClass(1)} pt-20 pb-8 relative`}
      >
        <GrainyGradient variant="pillars" />
        <div className="w-full max-w-5xl mx-auto px-6 py-8 flex-1 flex flex-col justify-center gap-8 relative z-10">
          
          <div className={`text-center max-w-2xl mx-auto flex flex-col items-center ${getRevealClass(1, 0, "down")}`}>
            <div className="h-5 w-24 bg-white/20 rounded border border-white/25" />
            <div className="h-8 sm:h-12 w-64 bg-white rounded-lg mt-4" />
            <div className="h-3 w-48 bg-white/60 rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((idx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              return (
                <div 
                  key={idx}
                  className={`bg-white/10 backdrop-blur-xs p-5 rounded-[1.5rem] border border-white/15 flex flex-col justify-between h-52 group hover:bg-white/20 transition-all duration-300 shadow-xs ${getRevealClass(1, idx + 1, directions[idx])}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="h-2 w-10 bg-white/40 rounded-full" />
                    <span className="w-2 h-2 bg-white/40 group-hover:bg-white rounded-full transition-all" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3.5 w-16 bg-white rounded" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-white/60 rounded-full" />
                      <div className="h-2 w-5/6 bg-white/40 rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button 
            onClick={() => scrollToPage(2)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* ==========================================
          SLIDE 3: COMPONENT SHOWCASE
          ========================================== */}
      <div 
        style={getSlideStyle(2)}
        className={`sticky top-0 w-full h-screen bg-[#FAF6F0] text-brand-charcoal flex flex-col justify-between overflow-y-auto overflow-x-hidden z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.12)] ${getCornerClass(2)} pt-20 pb-8 relative`}
      >
        <GrainyGradient variant="showcase" />
        <div className="w-full max-w-5xl mx-auto px-6 py-8 flex-1 flex flex-col justify-center gap-8 relative z-10">
          
          <div className={`text-center max-w-2xl mx-auto flex flex-col items-center ${getRevealClass(2, 0, "down")}`}>
            <div className="h-5 w-32 bg-brand-orange/10 rounded-md border border-brand-orange/20" />
            <div className="h-8 sm:h-10 w-52 bg-brand-charcoal rounded-lg mt-3" />
            <div className="h-3 w-40 bg-brand-charcoal/40 rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { colorClass: "bg-brand-orange", bgClass: "bg-[#FAF6F0]" },
              { colorClass: "bg-brand-beige-dark", bgClass: "bg-[#FAF6F0]" },
              { colorClass: "bg-brand-charcoal", bgClass: "bg-brand-orange/5" }
            ].map((card, idx) => {
              const directions: ("left" | "scale" | "right")[] = ["left", "scale", "right"];
              return (
                <div 
                  key={idx}
                  className={`${card.bgClass} border border-brand-beige-dark/60 p-6 rounded-[1.5rem] hover:border-brand-orange/30 transition-all duration-300 flex flex-col justify-between h-[320px] relative overflow-hidden group shadow-xs ${getRevealClass(2, idx + 1, directions[idx])}`}
                >
                  <div>
                    <div className="flex justify-between items-start border-b border-brand-beige-dark/40 pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${card.colorClass}`} />
                        <div className="h-3.5 w-16 bg-brand-charcoal/60 rounded" />
                      </div>
                      <div className="h-4.5 w-14 bg-brand-orange/10 rounded border border-brand-orange/20 animate-pulse" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="h-2 w-full bg-brand-charcoal/20 rounded-full" />
                      <div className="h-2 w-11/12 bg-brand-charcoal/20 rounded-full" />
                      <div className="h-2 w-3/4 bg-brand-charcoal/15 rounded-full" />
                    </div>
                  </div>
                  <div className="border-t border-brand-beige-dark/40 pt-4 flex justify-between items-center">
                    <div className="h-2.5 w-20 bg-brand-charcoal/25 rounded-full" />
                    <div className="h-2.5 w-10 bg-brand-orange/30 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button 
            onClick={() => scrollToPage(3)}
            className="w-10 h-10 rounded-full border border-brand-beige-dark/50 flex items-center justify-center hover:bg-white/25 hover:border-brand-orange/30 transition-colors cursor-pointer text-brand-charcoal"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* ==========================================
          SLIDE 4: DYNAMIC CONFIGURATOR FORM
          ========================================== */}
      <div 
        style={getSlideStyle(3)}
        className={`sticky top-0 w-full h-screen text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden z-30 shadow-[0_-40px_80px_rgba(0,0,0,0.25)] transition-all duration-1000 ease-in-out transform ${
          isLayoutShifted 
            ? "bg-[#130d24] lg:-translate-x-1/2 border-r border-violet-500/20" 
            : `bg-brand-charcoal translate-x-0 ${getCornerClass(3)}`
        } pt-20 pb-8`}
      >
        {/* Rotating full-bleed page separator */}
        <div 
          className={`absolute transition-all duration-1000 ease-in-out z-40 ${
            isLayoutShifted 
              ? "top-0 right-0 w-1 md:w-1.5 h-full bg-violet-600 rounded-none shadow-[-4px_0_20px_rgba(139,92,246,0.3)]" 
              : "top-0 left-0 w-full h-3 bg-brand-orange rounded-b-none"
          }`}
        />

        <div className="w-full max-w-5xl mx-auto px-6 py-8 flex-1 flex flex-col justify-center gap-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className={`space-y-4 text-left flex flex-col items-start lg:col-span-5 transition-opacity duration-1000 ${
              isLayoutShifted ? "lg:opacity-0 lg:pointer-events-none" : "opacity-100"
            } ${getRevealClass(3, 0, "left")}`}>
              <div className={`h-5 w-28 rounded border transition-all duration-1000 ${
                isLayoutShifted ? "bg-violet-500/15 border-violet-500/30" : "bg-brand-orange/10 border-brand-orange/20"
              }`} />
              <div className="h-8 sm:h-10 w-44 bg-white rounded-lg mt-2" />
              <div className="space-y-1.5 w-full mt-2">
                <div className="h-2.5 w-full bg-white/30 rounded-full" />
                <div className="h-2.5 w-[90%] bg-white/30 rounded-full" />
              </div>
              
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 w-full">
                <div className="h-2 w-20 bg-white/35 rounded-full" />
                <p className={`text-3xl font-black font-mono tracking-tight transition-all duration-1000 ${
                  isLayoutShifted ? "text-violet-400" : "text-brand-orange"
                }`}>
                  {computedTotal.toLocaleString()}
                </p>
                <div className="h-2 w-32 bg-white/20 rounded-full" />
              </div>
            </div>

            <div className={`p-6 sm:p-8 rounded-[2rem] border transition-all duration-1000 shadow-md lg:col-span-7 ${
              isLayoutShifted 
                ? "bg-white text-slate-950 border-violet-500/25 shadow-violet-500/5 shadow-xl" 
                : "bg-[#FAF6F0] text-brand-charcoal border-brand-beige-dark/50"
            } ${getRevealClass(3, 1, "right")}`}>
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fade-in flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="h-4 w-32 bg-brand-charcoal rounded mt-2 animate-pulse" />
                  <div className="space-y-1.5 w-full max-w-xs flex flex-col items-center">
                    <div className="h-2.5 w-3/4 bg-brand-charcoal/30 rounded-full" />
                    <div className="h-2.5 w-1/2 bg-brand-charcoal/20 rounded-full" />
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormStep(1);
                      setIsVioletTheme(false);
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                    }}
                    className={`mt-4 text-white p-2.5 rounded-full cursor-pointer transition-all flex items-center justify-center w-10 h-10 shadow-sm ${
                      isVioletTheme ? "bg-violet-600 hover:bg-violet-700" : "bg-brand-orange hover:bg-brand-orange/95"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="flex justify-between items-center border-b border-brand-beige-dark/40 pb-3">
                    <div className={`h-2.5 w-12 rounded-full transition-all duration-1000 ${
                      isVioletTheme ? "bg-violet-500/20" : "bg-brand-orange/20"
                    }`} />
                    <div className="flex gap-1">
                      {[1, 2, 3].map((s) => (
                        <div 
                          key={s} 
                          className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            s === formStep 
                              ? (isVioletTheme ? "bg-violet-600 w-4" : "bg-brand-orange w-4") 
                              : "bg-brand-beige-dark/40"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  {formStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="h-2.5 w-16 bg-brand-charcoal/40 rounded-full" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setProjectScope("standard")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex justify-between items-center ${
                            projectScope === "standard"
                              ? (isVioletTheme ? "bg-violet-600 text-white border-violet-600" : "bg-brand-orange text-white border-brand-orange")
                              : "bg-white text-brand-charcoal border-brand-beige-dark/50 hover:bg-brand-beige"
                          }`}
                        >
                          <div className="h-3 w-16 bg-current rounded-md" />
                          <span className={`w-3 h-3 rounded-full border-2 ${projectScope === "standard" ? "border-white bg-white" : "border-brand-charcoal/30"}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProjectScope("advanced")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex justify-between items-center ${
                            projectScope === "advanced"
                              ? (isVioletTheme ? "bg-violet-600 text-white border-violet-600" : "bg-brand-orange text-white border-brand-orange")
                              : "bg-white text-brand-charcoal border-brand-beige-dark/50 hover:bg-brand-beige"
                          }`}
                        >
                          <div className="h-3 w-20 bg-current rounded-md" />
                          <span className={`w-3 h-3 rounded-full border-2 ${projectScope === "advanced" ? "border-white bg-white" : "border-brand-charcoal/30"}`} />
                        </button>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="h-2.5 w-24 bg-brand-charcoal/40 rounded-full" />
                          <span className={`font-mono text-xs font-bold transition-all duration-1000 ${
                            isVioletTheme ? "text-violet-500" : "text-brand-orange"
                          }`}>{variableValue}</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="2000"
                          value={variableValue}
                          onChange={(e) => setVariableValue(Number(e.target.value))}
                          className={`w-full cursor-pointer transition-all ${
                            isVioletTheme ? "accent-violet-600" : "accent-brand-orange"
                          }`}
                        />
                        <div className="h-2 w-32 bg-brand-charcoal/20 rounded-full mt-1.5" />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className={`text-white p-2.5 rounded-full cursor-pointer transition-all flex items-center justify-center w-10 h-10 shadow-sm ${
                            isVioletTheme ? "bg-violet-600 hover:bg-violet-700" : "bg-brand-charcoal hover:bg-brand-charcoal/90"
                          }`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="h-2 w-12 bg-brand-charcoal/40 rounded-full mb-1.5" />
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`w-full bg-white border border-brand-beige-dark/60 rounded-lg p-2.5 text-xs text-brand-charcoal focus:outline-none transition-all ${
                              isVioletTheme ? "focus:border-violet-600" : "focus:border-brand-orange"
                            }`}
                            placeholder="..."
                          />
                        </div>
                        <div>
                          <div className="h-2 w-12 bg-brand-charcoal/40 rounded-full mb-1.5" />
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`w-full bg-white border border-brand-beige-dark/60 rounded-lg p-2.5 text-xs text-brand-charcoal focus:outline-none transition-all ${
                              isVioletTheme ? "focus:border-violet-600" : "focus:border-brand-orange"
                            }`}
                            placeholder="..."
                          />
                        </div>
                      </div>

                      <div>
                        <div className="h-2 w-14 bg-brand-charcoal/40 rounded-full mb-1.5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-white border border-brand-beige-dark/60 rounded-lg p-2.5 text-xs text-brand-charcoal focus:outline-none transition-all ${
                            isVioletTheme ? "focus:border-violet-600" : "focus:border-brand-orange"
                          }`}
                          placeholder="..."
                        />
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormStep(1);
                            setIsVioletTheme(false);
                          }}
                          className="bg-brand-beige-dark/30 hover:bg-brand-beige-dark/50 text-brand-charcoal p-2.5 rounded-full cursor-pointer transition-all flex items-center justify-center w-10 h-10"
                        >
                          <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                        <button
                          type="button"
                          onMouseEnter={() => setIsNextButtonHovered(true)}
                          onMouseLeave={() => setIsNextButtonHovered(false)}
                          onClick={() => {
                            setFormStep(3);
                            setIsVioletTheme(true);
                            setIsNextButtonHovered(false);
                          }}
                          className={`text-white p-2.5 rounded-full cursor-pointer transition-all flex items-center justify-center w-10 h-10 shadow-sm ${
                            isVioletTheme ? "bg-violet-600 hover:bg-violet-700" : "bg-brand-charcoal hover:bg-brand-charcoal/90"
                          }`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {formStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="bg-white p-4 rounded-xl border border-brand-beige-dark/40 space-y-3">
                        <div className={`h-3.5 w-24 rounded-full transition-all duration-1000 ${
                          isVioletTheme ? "bg-violet-500/40" : "bg-brand-orange/60"
                        }`} />
                        <div className="grid grid-cols-2 gap-y-2.5 text-[11px] font-mono text-brand-charcoal/80 items-center">
                          <div className="h-2.5 w-10 bg-brand-charcoal/30 rounded-full" />
                          <span className="text-right font-bold truncate max-w-[150px] inline-block self-end">{firstName || "..."} {lastName}</span>

                          <div className="h-2.5 w-10 bg-brand-charcoal/30 rounded-full" />
                          <span className="text-right font-bold truncate max-w-[150px] inline-block self-end">{email || "..."}</span>

                          <div className="h-2.5 w-10 bg-brand-charcoal/30 rounded-full" />
                          <span className="text-right font-bold uppercase self-end">{projectScope}</span>

                          <div className="h-2.5 w-10 bg-brand-charcoal/30 rounded-full" />
                          <span className="text-right font-bold self-end">{variableValue}</span>

                           <div className={`h-2.5 w-16 rounded-full transition-all duration-1000 ${
                            isVioletTheme ? "bg-violet-500/30" : "bg-brand-orange/45"
                          }`} />
                          <span className={`text-right font-bold text-xs self-end transition-all duration-1000 ${
                            isVioletTheme ? "text-violet-600 font-extrabold" : "text-brand-orange"
                          }`}>{computedTotal}</span>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormStep(2);
                            setIsVioletTheme(false);
                          }}
                          className="bg-brand-beige-dark/30 hover:bg-brand-beige-dark/50 text-brand-charcoal p-2.5 rounded-full cursor-pointer transition-all flex items-center justify-center w-10 h-10"
                        >
                          <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                        <button
                          type="submit"
                          className={`text-white px-6 py-2.5 rounded-full cursor-pointer transition-all shadow-sm font-bold text-xs h-10 flex items-center justify-center ${
                            isVioletTheme ? "bg-violet-600 hover:bg-violet-700" : "bg-brand-orange hover:bg-brand-orange/95"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

          </div>

        </div>

        <footer className="w-full px-6 py-4 md:px-12 flex flex-col sm:flex-row justify-between items-center border-t border-white/10 bg-black/10 text-[10px] font-mono text-white/40 gap-2.5 z-10">
          <div className="h-2 w-32 bg-white/20 rounded-full" />
          <div className="flex gap-4">
            <div className="h-2 w-16 bg-white/30 rounded-full" />
            <div className="h-2 w-16 bg-white/20 rounded-full" />
          </div>
        </footer>
      </div>
    </div>
  );
}
