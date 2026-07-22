'use client'

import SplitText from "../SplitText"
import { Download } from "lucide-react"

export default function MohitSinghInit() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-3 px-4 px-8 py-12 text-center lg:mr-[59vw] md:mr-[59vw] sm:mr-[59vw] mr-[55vw] mt-35">

            {/* Title Block */}
            <div className="flex flex-col items-center justify-center w-full max-w-4xl sm:ml-0 ml-12">
                <SplitText
                    text="MOHIT"
                    className="font-heading text-3xl sm:text-3xl md:text-5xl lg:text-6xl text-white text-center leading-tight lg:h-20 md:h-16 sm:h-11 h-10"
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
                    className="font-heading text-3xl sm:text-3xl md:text-5xl lg:text-6xl text-center leading-tight lg:ml-23 md:ml-20 sm:ml-13 ml-8 lg:h-22 md:h-16 h-10"
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
            <div className="w-full lg:max-w-2xl md:max-w-[35rem] sm:max-w-[23rem] max-w-[18rem] lg:mt-8 md:mt-7 sm:mt-5 mt-4 flex flex-col gap-1 text-center text-left lg:ml-110 md:ml-96 sm:ml-63 ml-33">
                <SplitText
                    text="Information Technology @ NIT Jalandhar"
                    className="md:text-[0.9rem] font-semibold sm:text-[0.8rem] text-[0.6rem] lg:text-[1rem]"
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
                    className="text-base md:text-[1.1rem] font-semibold leading-snug tracking-wide sm:text-[0.9rem] text-[0.75rem] lg:text-[1.2rem]"
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
            <div className="flex flex-col flex-row gap-3 gap-4 mt-8 items-center justify-center w-full lg:ml-25 md:ml-33 sm:ml-50 ml-40">
                <a
                    href="/mohit_singh_resume.pdf"
                    download="Mohit_Singh_Resume.pdf"
                    className="w-auto flex justify-center"
                >
                    <button className="group/work relative overflow-hidden rounded-full bg-[#00b4d8] px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-base transition-colors cursor-pointer w-auto min-w-[100px] sm:min-w-0 flex items-center justify-center">
                        <span className="absolute bottom-0 left-[-50px] h-48 w-65 origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white transition-transform duration-600 ease-out group-hover/work:translate-y-12"></span>
                        <span className="font-semibold text-white relative z-10 group-hover/work:text-[#00b4d8] flex items-center justify-center gap-2">
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Resume
                        </span>
                    </button>
                </a>

                <button
                    className="group/work relative overflow-hidden rounded-full border border-zinc-700/80 bg-transparent px-2 py-2.5 sm:px-10 sm:py-3 text-xs sm:text-base transition-all duration-300 hover:border-[#2a8fb8] hover:shadow-[2px_2px_10px_rgba(42,143,184,0.35)] cursor-pointer w-auto min-w-[100px] sm:min-w-0"
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