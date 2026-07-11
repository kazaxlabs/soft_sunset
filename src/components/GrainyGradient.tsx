import { useEffect, useState } from "react";

interface GrainyGradientProps {
  variant: "hero" | "pillars" | "showcase";
}

export default function GrainyGradient({ variant }: GrainyGradientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      <style>{`
        @keyframes float-blob-1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(8vw, -10vh) scale(1.15) rotate(120deg); }
          66% { transform: translate(-6vw, 6vh) scale(0.9) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }

        @keyframes float-blob-2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(-10vw, 8vh) scale(1.22) rotate(-180deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        }

        @keyframes float-blob-3 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          40% { transform: translate(9vw, 9vh) scale(0.85) rotate(140deg); }
          80% { transform: translate(-7vw, -5vh) scale(1.12) rotate(280deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }

        @keyframes float-blob-4 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          50% { transform: translate(6vw, -8vh) scale(1.15) rotate(-120deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        }

        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%) rotate(0.5deg); }
          20% { transform: translate(-2%, 1%) rotate(-0.5deg); }
          30% { transform: translate(1%, -2%) rotate(1deg); }
          40% { transform: translate(-1%, 2%) rotate(-1deg); }
          50% { transform: translate(-2%, 1%) rotate(0.5deg); }
          60% { transform: translate(2%, 0) rotate(-0.5deg); }
          70% { transform: translate(0, 2%) rotate(1deg); }
          80% { transform: translate(1%, 1%) rotate(-1deg); }
          90% { transform: translate(-1%, -2%) rotate(0.5deg); }
        }

        .animate-grain {
          animation: grain-shift 0.8s steps(6) infinite;
        }
      `}</style>

      {/* BACKGROUND BASE */}
      {variant === "hero" && (
        <div className="absolute inset-0 bg-[#FAF6F0] transition-colors duration-1000" />
      )}
      {variant === "pillars" && (
        <div className="absolute inset-0 bg-[#b32b09] transition-colors duration-1000" />
      )}
      {variant === "showcase" && (
        <div className="absolute inset-0 bg-[#FAF6F0] transition-colors duration-1000" />
      )}

      {/* BLURRED BLOBS CONTAINER */}
      <div className="absolute inset-0 filter blur-[80px] sm:blur-[120px] md:blur-[160px] opacity-90">
        {variant === "hero" && (
          <>
            {/* Blob 1: Orange */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#f24e1e]/15"
              style={{
                top: "-10%",
                right: "-5%",
                width: "48vw",
                height: "48vw",
                animation: "float-blob-1 28s infinite ease-in-out"
              }}
            />
            {/* Blob 2: Warm gold */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#fbb394]/25"
              style={{
                bottom: "10%",
                left: "-10%",
                width: "42vw",
                height: "42vw",
                animation: "float-blob-2 22s infinite ease-in-out"
              }}
            />
            {/* Blob 3: Coral pink */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#f43f5e]/10"
              style={{
                top: "35%",
                left: "25%",
                width: "38vw",
                height: "38vw",
                animation: "float-blob-3 32s infinite ease-in-out"
              }}
            />
            {/* Blob 4: Soft yellow */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#fde047]/15"
              style={{
                bottom: "-5%",
                right: "15%",
                width: "32vw",
                height: "32vw",
                animation: "float-blob-4 24s infinite ease-in-out"
              }}
            />
          </>
        )}

        {variant === "pillars" && (
          <>
            {/* Saturated glowing aura layers matching Reference 2 */}
            {/* Blob 1: Saturated glowing orange */}
            <div 
              className="absolute rounded-full mix-blend-screen bg-[#f24e1e]/45"
              style={{
                top: "-5%",
                left: "15%",
                width: "55vw",
                height: "55vw",
                animation: "float-blob-1 18s infinite ease-in-out"
              }}
            />
            {/* Blob 2: Hot Pink */}
            <div 
              className="absolute rounded-full mix-blend-screen bg-[#f43f5e]/40"
              style={{
                bottom: "-10%",
                right: "5%",
                width: "52vw",
                height: "52vw",
                animation: "float-blob-2 15s infinite ease-in-out"
              }}
            />
            {/* Blob 3: Radiant Gold */}
            <div 
              className="absolute rounded-full mix-blend-screen bg-[#eab308]/35"
              style={{
                top: "30%",
                left: "-5%",
                width: "48vw",
                height: "48vw",
                animation: "float-blob-3 22s infinite ease-in-out"
              }}
            />
            {/* Blob 4: Deep Blood Red */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#7f1d1d]/50"
              style={{
                bottom: "20%",
                right: "30%",
                width: "42vw",
                height: "42vw",
                animation: "float-blob-4 26s infinite ease-in-out"
              }}
            />
          </>
        )}

        {variant === "showcase" && (
          <>
            {/* Soft dreamy sunset tones matching Reference 3 */}
            {/* Blob 1: Soft Rose */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#fda4af]/22"
              style={{
                top: "-5%",
                left: "25%",
                width: "45vw",
                height: "45vw",
                animation: "float-blob-1 24s infinite ease-in-out"
              }}
            />
            {/* Blob 2: Soft Gold */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#fef08a]/25"
              style={{
                bottom: "-5%",
                left: "5%",
                width: "38vw",
                height: "38vw",
                animation: "float-blob-2 20s infinite ease-in-out"
              }}
            />
            {/* Blob 3: Apricot Orange */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#fed7aa]/22"
              style={{
                top: "25%",
                right: "-5%",
                width: "42vw",
                height: "42vw",
                animation: "float-blob-3 30s infinite ease-in-out"
              }}
            />
            {/* Blob 4: Soft Warm Sand */}
            <div 
              className="absolute rounded-full mix-blend-multiply bg-[#ebdcc2]/25"
              style={{
                bottom: "20%",
                right: "20%",
                width: "35vw",
                height: "35vw",
                animation: "float-blob-4 22s infinite ease-in-out"
              }}
            />
          </>
        )}
      </div>

      {/* GRAIN NOISE OVERLAY LAYER */}
      {/* Scaled and translated rapidly to generate live film noise grain */}
      <div className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none z-10 overflow-hidden">
        <div 
          className={`w-full h-full animate-grain pointer-events-none ${
            variant === "pillars" 
              ? "opacity-[0.22] mix-blend-overlay" 
              : "opacity-[0.16] mix-blend-overlay"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* SUBTLE CARD SHADOW DEPTH ADJUSTMENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/[0.015] pointer-events-none" />
    </div>
  );
}
