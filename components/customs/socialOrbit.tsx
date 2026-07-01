'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';

/**
 * SocialOrbit
 *
 * Fixed to the top of the viewport (matching the BlackHole position).
 * Icons orbit in a circle centred on the black-hole's visual centre —
 * which is the very top-centre of the screen (the black hole is half-
 * visible, dome pointing down, cut edge at top:0).
 *
 * The orbit centre is placed at (50vw, 0) — the midpoint of the top
 * edge.  With a radius of ~200 px the icons swing above the fold for
 * roughly half their revolution and come back into view for the other
 * half, exactly matching the "particles rotating around the black hole"
 * look the user wants.
 */

const ICONS = [
  {
    key: 'github',
    href: 'https://github.com',
    icon: <FaGithub size={26} color="white" />,
    borderHover: 'hover:border-white',
    delay: '0s',
  },
  {
    key: 'linkedin',
    href: 'https://linkedin.com',
    icon: <FaLinkedin size={26} color="#0077b5" />,
    borderHover: 'hover:border-[#0077b5]',
    delay: '-8.33s', // 1/3 of 25 s
  },
  {
    key: 'mail',
    href: 'mailto:you@example.com',
    icon: <Mail size={26} color="#d44638" />,
    borderHover: 'hover:border-[#d44638]',
    delay: '-16.67s', // 2/3 of 25 s
  },
];

export function SocialOrbit() {
  // The black hole canvas is 560×560 but its container is clipped to
  // the top half (height: 280 px) with the canvas offset at top: -280 px.
  // This means the canvas's geometric centre (cy = 280) sits exactly
  // at viewport y = 0 — the very top edge of the screen.
  const orbitCenterY = 0;  // px from top of viewport
  const radius = 180;      // orbit radius in px
  const duration = 25;     // seconds per revolution

  return (
    <>
      {/* Inject the keyframe + icon styles once */}
      <style>{`
        @keyframes socialOrbit {
          from { transform: rotate(0deg) translateX(${radius}px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(${radius}px) rotate(-360deg); }
        }

        .social-orbit-anchor {
          position: fixed;
          top: ${orbitCenterY}px;
          left: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
          z-index: 41; /* one above the black hole (z-40) */
        }

        .social-orbit-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 52px;
          height: 52px;
          margin-left: -26px;
          margin-top: -26px;
          animation: socialOrbit ${duration}s linear infinite;
          pointer-events: auto;
        }

        .social-orbit-item:nth-child(2) {
          animation-delay: -${duration / 3}s;
        }
        .social-orbit-item:nth-child(3) {
          animation-delay: -${(duration * 2) / 3}s;
        }

        .social-orbit-icon {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(10, 10, 10, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .social-orbit-icon:hover {
          box-shadow: 0 0 12px rgba(255,255,255,0.18);
        }
      `}</style>

      <div className="social-orbit-anchor" aria-hidden="false">
        {ICONS.map(({ key, href, icon }) => (
          <div key={key} className="social-orbit-item">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-orbit-icon"
              aria-label={key}
            >
              {icon}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}