'use client';

import MohitSinghInit from '@/components/customs/homePageText';
import SidebarNav from '@/components/customs/sideNavbar';
import OpeningPageHeading from '@/components/customs/transitionPage';
import ScrollTextAnimation from '@/components/customs/aboutSection';
import { useRef, useState } from 'react';
import { MyTechStackGlobe } from '@/components/ui/skillsSolarSystem';
import { IconCloudHeading } from '@/components/ui/skillsHeading';
import BlackHole from '@/components/customs/blackHole';
import {SocialOrbit} from '@/components/customs/socialOrbit';
import EducationSection from '@/components/customs/educationSection';
import Projects from '@/components/projectCards';
import { ProjectsHeading } from '@/components/ui/projectsHeading';
import EmailFooter from '@/components/customs/emailFooter';

type Phase = 'intro' | 'expanding' | 'collapsing' | 'main';

const TRANSITION_MS = 600;

export default function Home() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartTransition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'intro') return;

    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);
    
    setRipplePos({ x, y });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('expanding');
      });
    });
  };

  const handleClipTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'clip-path') return;

    if (phase === 'expanding') {
      setPhase('collapsing');
    } else if (phase === 'collapsing') {
      setPhase('main');
    }
  };

  const isCovering = phase === 'expanding';
  const isMainMounted = phase === 'collapsing' || phase === 'main';
  const isIntroMounted = phase === 'intro' || phase === 'expanding';

  return (
    <div
      className="relative h-screen w-full bg-[#111111]/0 text-white overflow-y-auto overflow-x-hidden font-sans select-none scrollbar-hide"
      ref={containerRef}
      style={{
        // Native Firefox & IE scrollbar hiding
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none'
      }}
    >
      {/* Global Style Injection to hide Webkit (Chrome/Safari) scrollbars while keeping scroll functionality */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Ripple mask layer */}
      <div
        onTransitionEnd={handleClipTransitionEnd}
        className="fixed inset-0 transition-[clip-path] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          backgroundColor: '#00b4d8',
          // Drops mask behind content once loaded so it can't trap scroll wheel events
          zIndex: phase === 'main' ? -1 : 90, 
          pointerEvents: phase === 'intro' ? 'auto' : 'none',
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
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-12 lg:px-24 pb-24" id='home'>
          <SidebarNav />
          <BlackHole />
          <SocialOrbit />
          <MohitSinghInit />
          <ScrollTextAnimation />
          <ProjectsHeading />
          <Projects />
          <IconCloudHeading />
          <MyTechStackGlobe />
          <EducationSection />
          <EmailFooter />
        </main>
      )}
    </div>
  );
}