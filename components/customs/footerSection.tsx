'use client';

import TextAnimation from '@/components/uilayouts/scroll-text';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function SpaceFooter() {
  return (
    <section className="w-full md:w-[87%] px-4 py-16 md:mr-19">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 sm:p-0">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-6 max-w-2xl">
              <TextAnimation
                text="Let&apos;s build something great together."
                variants={{
                  hidden: { filter: 'blur(10px)', opacity: 0, y: 30 },
                  visible: {
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  },
                }}
                classname="text-[1.4rem] font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
              />

              <TextAnimation
                as="div"
                text="Get in Touch"
                variants={{
                  hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
                  visible: {
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' },
                  },
                }}
                classname="w-full sm:w-auto"
              >
                <a href="mailto:mohitssr11@gmail.com" className="w-full sm:w-auto">
                  <button className="group/work relative overflow-hidden rounded-full border border-zinc-700/80 bg-transparent sm:px-8 px-4 sm:py-3 py-2 md:text-base text-sm transition-all duration-300 hover:border-white/25 hover:shadow-[2px_2px_10px_rgba(255,255,255,0.08)] cursor-pointer">
                    <span className="absolute bottom-0 left-[-50] h-48 w-65 origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white transition-transform duration-600 ease-out group-hover/work:translate-y-12"></span>
                    <span className="font-semibold text-white relative z-10 group-hover/work:text-[#000000] flex items-center gap-2">
                      <MdEmail className="h-5 w-5 shrink-0" />
                      Get in Touch
                    </span>
                  </button>
                </a>
              </TextAnimation>
            </div>

            <TextAnimation
              as="div"
              text="Socials"
              direction="up"
              variants={{
                hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
                visible: {
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' },
                },
              }}
              classname="flex flex-col items-end sm:gap-5 gap-3 text-right"
            >
              <span className="text-[0.8rem] sm:text-sm uppercase tracking-[0.3em] text-white/60">Socials</span>
              <div className="flex items-center sm:gap-4 gap-2">
                <a
                  href="https://github.com/Mohit-Singh6"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex sm:h-11 sm:w-11 h-9 w-9 items-center justify-center rounded-full border border-zinc-700/80 bg-transparent text-slate-200 transition-colors duration-300 hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  <FaGithub className="h-5 w-5" />
                </a>

                <a
                  href="https://linkedin.com/in/mohit-singh-s985"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex sm:h-11 sm:w-11 h-9 w-9 items-center justify-center rounded-full border border-zinc-700/80 bg-transparent text-slate-200 transition-colors duration-300 hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </TextAnimation>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} Mohit Singh · Signed off from Earth</span>
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-300/80">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
