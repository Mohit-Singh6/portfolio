'use client'

import TextType from "../TextType"
import {useEffect} from 'react'

export default function MohitSinghInit () {
    return (
        <TextType 
            text={["MOHIT SINGH"]}
            typingSpeed={75}
            pauseDuration={1500}
            deletingSpeed={50}
            showCursor={true}
            cursorCharacter="_"
            className="font-heading text-6xl md:text-7xl text-white text-center"
            loop={false}
        />
    )
}