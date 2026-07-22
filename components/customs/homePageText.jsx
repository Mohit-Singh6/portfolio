'use client'

import SplitText from "../SplitText"
import { Download } from "lucide-react"

export default function MohitSinghInit() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 sm:px-8 py-12 text-center lg:mr-[59vw] md:mr-[59vw] mt-35">
      
      {/* Title Block */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl ml-0">
        <SplitText
          text="MOHIT"
          className="font-heading text-5xl sm:text-3xl md:text-5xl lg:text-6xl text-white text-center leading-tight lg:h-20 md:h-16"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <SplitText
          text="SINGH"
          className="font-heading text-5xl sm:text-3xl md:text-5xl lg:text-6xl text-center leading-tight lg:ml-23 md:ml-20 lg:h-22 md:h-16"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          color="#00b4d8"
        />
      </div>

      {/* Description Block */}
      <div className="w-full lg:max-w-2xl md:max-w-[37rem] mt-8 flex flex-col gap-3 text-center sm:text-left lg:ml-110 md:ml-102">
        <SplitText
          text="Information Technology @ NIT Jalandhar"
          className="md:text-[0.9rem] font-semibold sm:text-3xl lg:text-[1rem]"
          delay={30}
          duration={0.25}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="inherit"
          color="#d8d8d8"
        />
        <SplitText
          text="A Full-Stack Developer dedicated to building high-performance, scalable, and reliable web applications. Specializing in Next.js and the MERN stack to turn complex algorithmic logic into robust solutions that just work."
          className="text-base md:text-[1.1rem] font-semibold leading-relaxed tracking-wide sm:text-3xl md:text-5xl lg:text-[1.2rem]"
          delay={30}
          duration={0.25}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="inherit"
          color="#d8d8d8"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center justify-center w-full lg:ml-24 md:ml-32">
        <a
          href="/mohit_singh_resume.pdf"
          download="Mohit_Singh_Resume.pdf"
          className="w-full sm:w-auto"
        >
          <button className="group/work relative overflow-hidden rounded-full bg-[#00b4d8] px-8 py-3 text-base transition-colors cursor-pointer w-full sm:w-auto flex items-center justify-center">
            <span className="absolute bottom-0 left-[-50px] h-48 w-65 origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white transition-transform duration-600 ease-out group-hover/work:translate-y-12"></span>
            <span className="font-semibold text-white relative z-10 group-hover/work:text-[#00b4d8] flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Resume
            </span>
          </button>
        </a>

        <button
          className="group/work relative overflow-hidden rounded-full border border-zinc-700/80 bg-transparent px-10 py-3 text-base transition-all duration-300 hover:border-[#2a8fb8] hover:shadow-[2px_2px_10px_rgba(42,143,184,0.35)] cursor-pointer w-full sm:w-auto"
          onClick={() => {
            window.location.href = 'mailto:mohitssr11@gmail.com';
          }}
        >
          <span className="relative z-10 font-semibold text-white transition-colors">
            Contact Me
          </span>
        </button>
      </div>

    </div>
  )
}