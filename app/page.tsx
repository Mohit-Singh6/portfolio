'use client';

import MohitSinghInit from '@/components/customs/mohitSinghHeading';
import SidebarNav from '@/components/customs/sideNavbar';
import { useRef, useState } from 'react';

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
    setRipplePos({ x, y });

    // Let the browser paint the 0%-at-click-point state first,
    // so growth visibly animates from that exact spot.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('expanding');
      });
    });
  };

  // Drives phase changes off the ACTUAL end of the clip-path transition,
  // instead of guessed setTimeouts that can drift out of sync.
  const handleClipTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'clip-path') return;

    if (phase === 'expanding') {
      // Screen is fully covered by the circle right now.
      // Mount the main page underneath it, then immediately start collapsing.
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
      className="relative min-h-screen w-full bg-[#111111] text-white overflow-hidden font-sans select-none"
      ref={containerRef}
    >
      {/* Ripple mask layer */}
      <div
        onTransitionEnd={handleClipTransitionEnd}
        className="absolute inset-0 z-[90] pointer-events-none transition-[clip-path] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          backgroundColor: '#00b4d8',
          transitionDuration: `${TRANSITION_MS}ms`,
          clipPath: isCovering
            ? `circle(150% at ${ripplePos.x}px ${ripplePos.y}px)`
            : `circle(0% at ${ripplePos.x}px ${ripplePos.y}px)`,
        }}
      />

      {/* STAGE 1: INTRO SPLASH */}
      {isIntroMounted && (
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

      {/* STAGE 2: MAIN PAGE — only mounted once the circle has covered the
          screen, so its own entrance animations play fresh when it becomes
          visible as the circle collapses away. Nothing rendered before that. */}
      {isMainMounted && (
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-12 lg:px-24">
          <SidebarNav />
          <MohitSinghInit />
        </main>
      )}
    </div>
  );
}