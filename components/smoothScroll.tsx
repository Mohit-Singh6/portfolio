"use client"

import { ReactLenis } from 'lenis/react' // This path is built natively into the lenis package
import 'lenis/dist/lenis.css' // Recommended layout CSS for Lenis

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  )
}