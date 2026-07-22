'use client'

import TextType from '../TextType'

export default function AboutMe() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#111111]/0 px-6 text-center  ml-2 mt-50">
            <div className="space-y-4">
                <div className="font-heading text-2xl font-black uppercase tracking-[0.15em] sm:text-6xl md:text-7xl lg:text-7xl sm:tracking-[5px]">
                    <TextType
                        text={['MOHIT SINGH']}
                        typingSpeed={100}
                        pauseDuration={15000}
                        showCursor={true}
                        deletingSpeed={50}
                        cursorCharacter='_'
                        // variableSpeedEnabled={false}
                        // variableSpeedMin={100}
                        // variableSpeedMax={120}
                        cursorBlinkDuration={0.5}
                        className="text-white"
                        color="#00b4d8"
                    />
                </div>
                <p className="animate-pulse text-s font-mono tracking-[0.35em] text-zinc-500 mt-60 mr-2">
                    Click anywhere to continue.
                </p>
            </div>
        </div>
    )
}