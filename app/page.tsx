'use client'

import MohitSinghInit from '@/components/customs/mohitSinghHeading';
import SidebarNav from '@/components/customs/sideNavbar';
import LandingPage from '@/components/customs/openingPage';
import { useRef, useState } from 'react';

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black/0">
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
  
    
      <main className={`flex flex-1 w-full flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black/0  ${
          showMainPage ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <SidebarNav/>
        <MohitSinghInit/>
        <LandingPage/>
      </main>
    </div>
    </div>
  );
}
