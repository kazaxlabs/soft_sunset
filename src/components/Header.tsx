import { Locale } from "../types";
import { Shield, ChevronRight } from "lucide-react";

interface HeaderProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  scrollToPage: (p: number) => void;
  activePage: number;
}

export default function Header({ scrollToPage, activePage }: HeaderProps) {
  const menuItems = [0, 1, 2, 3];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-beige/85 backdrop-blur-md border-b border-brand-beige-dark/40 px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-300">
      {/* Brand & Subtitle - Geometric Minimalist Mark */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToPage(0)}>
        <div className="w-5 h-5 bg-brand-orange rounded-xs" />
        <div className="w-2.5 h-5 bg-brand-charcoal/80 rounded-xs" />
        <div className="w-8 h-2.5 bg-brand-beige-dark/60 rounded-full hidden sm:block ml-1" />
      </div>

      {/* Center Nav Items as abstract visual layout pills */}
      <nav className="flex items-center gap-1.5 bg-white/50 p-1 rounded-full border border-brand-beige-dark/50 shadow-xs">
        {menuItems.map((idx) => (
          <button
            key={idx}
            onClick={() => scrollToPage(idx)}
            className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center`}
          >
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                activePage === idx
                  ? "bg-brand-orange w-8"
                  : "bg-brand-charcoal/30 w-4 hover:bg-brand-orange/60"
              }`} 
            />
          </button>
        ))}
      </nav>

      {/* Right Side: Visual CTA Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => scrollToPage(3)}
          className="bg-brand-orange hover:bg-brand-orange/95 text-white p-2 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer flex items-center justify-center w-8 h-8"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

