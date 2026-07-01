"use client";

import { useState, useRef } from "react";
import RightSidebarNav from "@/components/customs/sideNavbar";

export default function LandingPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartTransition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioning) return;

    // Capture the exact pixel coordinates where the user clicked on the screen
    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);
    
    setRipplePos({ x, y });
    setIsTransitioning(true);

    // Phase 1: Circle expands to completely paint the screen black (0.6s)
    setTimeout(() => {
      setShowMainPage(true); // Swaps the background pages invisibly underneath
    }, 600);

    // Phase 2: Circle cleanly pulls back down into the cursor coordinate (1.2s total)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#111111] text-white overflow-hidden font-sans select-none"
    >
      {/* Clip-Path Ripple Layer Mask */}
      <div
        className="absolute inset-0 bg-black z-[90] pointer-events-none transition-all ease-in-out duration-[600ms]"
        style={{
          clipPath: isTransitioning
            ? `circle(150% at ${ripplePos.x}px ${ripplePos.y}px)` // Fully expanded state
            : `circle(0% at ${ripplePos.x}px ${ripplePos.y}px)`,   // Initial/Collapsed state
        }}
      />

      {/* =========================================================
          STAGE 1: THE INTRO SCREEN
          ========================================================= */}
      {!showMainPage && (
        <div 
          onClick={handleStartTransition}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] cursor-pointer"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-[0.35em] text-white uppercase">
              MOHIT SINGH
            </h1>
            <p className="text-xs font-mono text-zinc-500 tracking-widest animate-pulse uppercase">
              [ Click Anywhere To Continue ]
            </p>
          </div>
        </div>
      )}

      {/* =========================================================
          STAGE 2: THE MAIN PORTFOLIO HERO
          ========================================================= */}
      <main 
        className={`w-full min-h-screen flex items-center px-12 lg:px-24 transition-opacity duration-700 ${
          showMainPage ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-xl space-y-6">
          <h1 className="text-6xl font-black tracking-tight leading-none">
            MOHIT <span className="text-[#00b4d8] block">SINGH</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed font-sans">
            Full-stack developer passionate about creating beautiful and interactive web experiences.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button className="px-6 py-3 bg-[#00b4d8] text-black font-bold rounded-full text-sm shadow-[0_0_15px_rgba(0,180,216,0.3)]">
              Download Resume
            </button>
            <button className="px-6 py-3 border border-zinc-800 bg-zinc-950/20 text-zinc-400 font-medium rounded-full text-sm">
              Contact Me
            </button>
          </div>
        </div>

        {/* Your perfect sidebar navbar */}
        <RightSidebarNav />
      </main>
    </div>
  );
}