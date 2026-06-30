'use client'

import SplitText from "../SplitText"
import {useEffect} from 'react'

export default function MohitSinghInit () {
    return (
        <div className="flex flex-col my-50 ml-10 w-full mr-200">

            <SplitText
                text="MOHIT"
                className="font-heading text-8xl md:text-6xl text-white text-center h-22 pt-4 tracking-widest"
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
                className="font-heading text-8xl md:text-6xl text-center h-22 pt-4 pl-18 tracking-widest"
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

            <div className="ml-145 w-150">
                <SplitText
                    text="Full-stack developer passionate about creating beautiful and interactive web experiences. Always learning, always building, always pushing boundaries."
                    className="text-2xl font-semibold"
                    delay={10}
                    duration={0.25}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                    color="#d8d8d8"
                />

            </div>

            <div className="flex gap-4 mt-8 justify-center ml-50">
                <button className="group/btn relative overflow-hidden rounded-full bg-[#00b4d8] px-14 py-4 text-lg transition-all duration-300">
                    <span className="absolute inset-0 bg-white transform transition-all duration-300 scale-0 group-hover/btn:scale-100"></span>
                    <span className="font-semibold text-white relative z-10 group-hover/btn:text-[#00b4d8]">Download Resume</span>
                </button>

                <button className="group/btn relative overflow-hidden rounded-full bg-[#00b4d8] px-14 py-4 text-lg transition-all duration-300">
                    <span className="absolute inset-0 bg-white transform transition-all duration-300 scale-0 group-hover/btn:scale-100"></span>
                    <span className="font-semibold text-white relative z-10 group-hover/btn:text-[#00b4d8]">Contact Me</span>
                </button>
            </div>
        </div>

    )
}