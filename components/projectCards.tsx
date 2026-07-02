'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { JSX, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Scout',
    description: [
      'Built a real-time monitoring engine using Next.js and PostgreSQL to track system uptime, precision latency, and network timeouts',
      'Configured secure background cron jobs to execute automated, high-frequency pings across multiple web endpoints on a continuous schedule',
      'Integrated Recharts & AI diagnostics pipeline to automatically analyze server error logs'
    ],
    src: '/scout-home-page.png',
    link: 'https://scout.mohits.site',
    color: '#009966',
  },
  {
    title: 'MeetNow',
    description: [
      'Engineered P2P video/audio streaming using WebRTC and Socket.io to handle complex signaling, ICE candidates, and real-time screen sharing',
      'Implemented secure session-based authentication and custom Higher-Order Components (HOC) for protected routing and persistent user states',
    ],
    src: '/meetnow-home-page.png',
    link: 'https://meetnowfrontend-souz.onrender.com',
    color: '#A69FFE',
  },
  {
    title: 'ArtEcho',
    description: [
      'Developed a full-stack art marketplace with user authentication, artwork uploads, purchases, and commenting features',
      'Built RESTful APIs using Node.js and Express for authentication and data handling',
      'Deployed the application on Render and ensured responsive UI using React.js'
    ],
    src: '/artecho-home-page.png',
    link: 'https://artecho.onrender.com/arts',
    color: '#6B8F71',
  }
];

// Helper function to dynamically darken the project hex color for the card background
const darkenHex = (hex: string, percent: number): string => {
  let num = parseInt(hex.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = (num >> 8 & 0x00FF) - amt,
    B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 + (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 + (B < 0 ? 0 : B > 255 ? 255 : B)).toString(16).slice(1);
};

export default function ProjectSection(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className="py-20">
      <section className="text-white w-full mx-auto px-4">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.04;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project?.link}
              src={project?.src}
              title={project?.title}
              color={project?.color}
              description={project?.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </main>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string[];
  src: string | undefined;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  url,
  src,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Creates a highly custom, deep-toned ambient background version of the primary color
  const darkBgColor = darkenHex(color, 88);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 lg:w-250 md:w-200 sm:w-160 mr-10"
    >
      <motion.div
        style={{
          scale,
          top: `calc(4vh + ${i * 30}px)`,
          backgroundColor: darkBgColor,
          borderColor: `${color}25` // Muted version of full accent color for border stroke
        }}
        className="group/card flex flex-col md:flex-row relative h-[520px] w-full rounded-3xl p-6 md:p-12 origin-top shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-md border overflow-hidden transition-all duration-500 hover:border-white/20"
      >
        {/* Subtle radial backdrop glow matching the project color */}
        <div
          style={{ background: `radial-gradient(circle at top left, ${color}15, transparent 65%)` }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Dynamic Accent Ribbon */}
        <div
          style={{ background: color }}
          className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 opacity-80 group-hover/card:opacity-100 transition-opacity duration-300"
          aria-hidden
        />

        {/* LEFT COLUMN: Typography and Interactive Action */}
        <div className="flex flex-col justify-between w-full md:w-[45%] h-full z-10 pr-0 md:pr-8 pb-6 md:pb-0">
          <div className="space-y-4">
            <span
              style={{ color: color }}
              className="text-xs uppercase tracking-[0.3em] font-medium block font-mono"
            >
              Project 0{i + 1}
            </span>
            <h2 className="text-3xl md:text-4xl text-white tracking-wider  font-heading">
              {title}
            </h2>
            <div className="text-sm md:text-base text-white/60 leading-relaxed font-sans font-light max-w-sm pt-2">
              <ul className='list-[circle] list-inside'>

                {description.map((des, idx) => {
                  return (
                    <li className='mt-2' key={idx}>{des}</li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <a href={url || '#'}>
              <button className="group/work relative overflow-hidden rounded-lg bg-[#00b4d8]/0 border border-white/20 px-6 py-3 text-base transition-colors cursor-pointer">
                <span className="absolute bottom-0 left-[-40] h-60 w-60 origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white transition-transform duration-600 ease-out group-hover/work:translate-y-12"></span>
                <span className="font-semibold text-white relative z-10 group-hover/work:text-[#000000] flex gap-2" >
                  See Project
                  <ArrowRight className="w-4 h-4 mt-1 ml-1" />
                </span>
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Media Stage */}
        <div className="relative w-full md:w-[55%] h-[55%] md:h-full rounded-2xl overflow-hidden group/image flex items-center justify-center border border-white/5 bg-black/40">
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover/image:scale-105 group-hover/image:rotate-[0.5deg]">
            <Image
              fill
              src={src || ""}
              alt={title}
              className="object-cover w-full h-full opacity-80 group-hover/image:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
            {/* Subtle overlay gradient to frame image details nicely */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/image:opacity-20 transition-opacity duration-500" />
          </div>
        </div>
      </motion.div >
    </div >
  );
};