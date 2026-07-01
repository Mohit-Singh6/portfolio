'use client';

import MohitSinghInit from '@/components/customs/mohitSinghHeading';
import SidebarNav from '@/components/customs/sideNavbar';
import OpeningPageHeading from '@/components/customs/openingPageHeading';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';
import { useRef, useState } from 'react';
import { MyTechStackGlobe } from '@/components/ui/icon-cloud';

type Phase = 'intro' | 'expanding' | 'collapsing' | 'main';

const TRANSITION_MS = 600;

export default function Home() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartTransition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'intro') return; // ignore extra clicks once started

    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);
    
    // Set coordinates. Because phase is still 'intro', transition is 0ms.
    // It teleports to these coordinates instantly.
    setRipplePos({ x, y });

    // Let the browser paint the teleported 0% state first,
    // so growth visibly animates from that exact spot.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('expanding');
      });
    });
  };

  const handleClipTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'clip-path') return;

    if (phase === 'expanding') {
      // Screen is fully covered. Mount main page, then collapse.
      setPhase('collapsing');
    } else if (phase === 'collapsing') {
      // Circle has fully closed back at the click point — done.
      setPhase('main');
    }
  };

  const isCovering = phase === 'expanding';
  const isMainMounted = phase === 'collapsing' || phase === 'main';
  const isIntroMounted = phase === 'intro' || phase === 'expanding';

  return (
    <div
      className="relative min-h-screen w-full bg-[#111111]/0 text-white overflow-auto font-sans select-none"
      ref={containerRef}
    >
      {/* Ripple mask layer */}
      <div
        onTransitionEnd={handleClipTransitionEnd}
        className="absolute inset-0 z-[90] pointer-events-none transition-[clip-path] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          backgroundColor: '#00b4d8',
          // THE FIX: 0ms during 'intro' to prevent the origin point from sliding.
          // 600ms otherwise to give you that buttery smooth expansion and collapse.
          transitionDuration: phase === 'intro' ? '0ms' : `${TRANSITION_MS}ms`,
          clipPath: isCovering
            ? `circle(150% at ${ripplePos.x}px ${ripplePos.y}px)`
            : `circle(0% at ${ripplePos.x}px ${ripplePos.y}px)`,
        }}
      />

      {/* STAGE 1: INTRO SPLASH */}
      {isIntroMounted && (
        <div
          onClick={handleStartTransition}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] bg-[radial-gradient(circle_at_top_right,_rgba(0,180,216,0.05),_transparent_40%)] cursor-pointer h-screen w-full"
        >
          <OpeningPageHeading/>
        </div>
      )}

      {/* STAGE 2: MAIN PAGE */}
      {isMainMounted && (
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-12 lg:px-24">
          <SidebarNav />
          <MyTechStackGlobe />
          <MohitSinghInit />
        </main>
      )}
    </div>
  );
}