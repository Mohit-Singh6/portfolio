'use client'

import SplitText from "../SplitText"
import {useEffect} from 'react'
import { Download } from "lucide-react"

export default function MohitSinghInit () {
    return (
        <div className="flex flex-col mt-50 w-full mr-230">

            <SplitText
                text="MOHIT"
                className="font-heading text-8xl md:text-6xl text-white text-center h-22 pt-4 ml-50"
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
                className="font-heading text-8xl md:text-6xl text-center h-22 pt-4 pl-18 ml-60"
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

            <div className="ml-147 w-150 mt-8">
                <SplitText
                    text="Information Technology @ NIT Jalandhar"
                    delay={30}
                    duration={0.25}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                    color="#d8d8d8"
                />
                <SplitText
                    text="Full-stack developer passionate about creating beautiful and interactive web experiences. Always learning, always building, always pushing boundaries."
                    className="text-2xl font-semibold leading-relaxed tracking-wide"
                    delay={30}
                    duration={0.25}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                    color="#d8d8d8"
                />

            </div>

            <div className="flex gap-4 mt-8 justify-center ml-50">
                <button className="group/work relative overflow-hidden rounded-full bg-[#00b4d8] px-8 py-3 text-base transition-colors">
                    <span className="absolute bottom-0 left-[-50] h-48 w-65 origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white transition-transform duration-600 ease-out group-hover/work:translate-y-12"></span>
                    <span className="font-semibold text-white relative z-10 group-hover/work:text-[#00b4d8] flex gap-2" ><Download/> Resume</span>
                </button>

                <button className="group/work relative overflow-hidden rounded-full border border-zinc-700/80 bg-transparent px-12 py-3 text-base transition-all duration-300 hover:border-[#2a8fb8] hover:shadow-[2px_2px_10px_rgba(42,143,184,0.35)]">
                    <span className="relative z-10 font-semibold text-white transition-colors">Contact Me</span>
                </button>
            </div>
        </div>

    )
}