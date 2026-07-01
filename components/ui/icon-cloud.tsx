"use client"

import React, { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

// 1. Your Custom Tech Stack Slugs mapped to simple-icons
export const mySkillsSlugs = [
  "c",
  "cplusplus",
  "html5",
  "css3",
  "javascript",
  "typescript",
  "nextdotjs",
  "react",
  "tailwindcss",
  "bootstrap",
  "nodedotjs",
  "express",
  "prisma",
  "mongodb",
  "mysql",
  "postgresql",
  "leetcode"
];

// Helper to instantly load your skills component
export function MyTechStackGlobe() {
  const images = mySkillsSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );
  return (
    // Added a container to ensure it has room to breathe and scale
    <div className="flex w-full items-center justify-center p-8">
      <IconCloud images={images} />
    </div>
  );
}

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  
  // High-Performance Physics Trackers
  const pointerRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0.002, y: 0.002 }) 
  
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  // ==========================================
  // MASSIVE SIZE & PHYSICS CONFIGURATION
  // ==========================================
  const ORBIT_RADIUS = 280;
  const SUN_RADIUS = 72;
  const SUN_GLOW_RADIUS = 120;
  const CANVAS_SIZE = 750;  // Expanded canvas to fit the icon cloud
  const BASE_SPEED = { x: 0.0008, y: 0.0012 }; // Slower, heavier auto-spin
  const FRICTION = 0.985; // Increased momentum (spins much longer after letting go)
  const DRAG_SENSITIVITY = 0.0015; // How heavy the globe feels when dragging

  // 1. Create icon canvases
  useEffect(() => {
    if (!icons && !images) return

    const items = icons ?? images ?? []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 48 // Slightly crisper resolution for the bigger globe
      offscreen.height = 48
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (images) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(24, 24, 24, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()
            offCtx.drawImage(img, 0, 0, 48, 48)
            imagesLoadedRef.current[index] = true
          }
        } else {
          offCtx.scale(0.48, 0.48)
          const svgString = renderToString(item as React.ReactElement)
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  // 2. Generate initial sphere positions
  useEffect(() => {
    const items = icons ?? images ?? []
    const newIcons: Icon[] = []
    const numIcons = items.length || 20

    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      newIcons.push({
        x: Math.cos(phi) * r * ORBIT_RADIUS,
        y: y * ORBIT_RADIUS,
        z: Math.sin(phi) * r * ORBIT_RADIUS,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [icons, images])

  // 3. Pointer Tracking
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    pointerRef.current.isDragging = true;
    pointerRef.current.lastX = e.clientX;
    pointerRef.current.lastY = e.clientY;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    }

    if (pointerRef.current.isDragging) {
      const deltaX = e.clientX - pointerRef.current.lastX;
      const deltaY = e.clientY - pointerRef.current.lastY;
      
      // Inject momentum based on drag speed
      velocityRef.current.x = deltaY * DRAG_SENSITIVITY;
      velocityRef.current.y = deltaX * DRAG_SENSITIVITY;
      
      pointerRef.current.lastX = e.clientX;
      pointerRef.current.lastY = e.clientY;
    }
  }

  const handleMouseUp = () => {
    pointerRef.current.isDragging = false;
  }

  // 4. Main Physics & Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    let animationFrameId: number;

    if (canvas && ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // MOMENTUM PHYSICS: Glide smoothly back to base speed
        if (!pointerRef.current.isDragging) {
          velocityRef.current.x = velocityRef.current.x * FRICTION + BASE_SPEED.x * (1 - FRICTION);
          velocityRef.current.y = velocityRef.current.y * FRICTION + BASE_SPEED.y * (1 - FRICTION);
        }

        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.y += velocityRef.current.y;

        // Render a glowing sun-like center and the icons around it.
        ctx.save()
        ctx.translate(centerX, centerY)

        const sunGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, SUN_GLOW_RADIUS)
        sunGlow.addColorStop(0, "rgba(255, 240, 200, 0.7)")
        sunGlow.addColorStop(0.25, "rgba(255, 190, 110, 0.28)")
        sunGlow.addColorStop(0.6, "rgba(255, 135, 45, 0.1)")
        sunGlow.addColorStop(1, "rgba(255, 95, 0, 0)")

        ctx.beginPath()
        ctx.arc(0, 0, SUN_GLOW_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = sunGlow
        ctx.fill()

        const sunCore = ctx.createRadialGradient(0, 0, SUN_RADIUS * 0.18, 0, 0, SUN_RADIUS)
        sunCore.addColorStop(0, "rgba(255, 245, 220, 0.95)")
        sunCore.addColorStop(0.35, "rgba(255, 205, 115, 0.9)")
        sunCore.addColorStop(0.7, "rgba(255, 155, 60, 0.74)")
        sunCore.addColorStop(1, "rgba(255, 110, 25, 0.45)")

        ctx.beginPath()
        ctx.arc(0, 0, SUN_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = sunCore
        ctx.fill()

        ctx.restore()

        // CALCULATE 3D PROJECTIONS
        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        const projectedIcons = iconPositions.map((icon, index) => {
          const rotatedX = icon.x * cosY - icon.z * sinY
          const rotatedZ = icon.x * sinY + icon.z * cosY
          const rotatedY = icon.y * cosX - rotatedZ * sinX
          const finalZ = icon.y * sinX + rotatedZ * cosX

          const depth = (finalZ + ORBIT_RADIUS) / (ORBIT_RADIUS * 2)
          const scale = 0.2 + depth * 0.85
          const opacity = Math.max(0.06, Math.min(1, depth * 1.1))
          
          return { ...icon, index, rotatedX, rotatedY, rotatedZ: finalZ, scale, opacity }
        })

        // Z-INDEX SORTING (Draw back icons first, front icons last)
        projectedIcons.sort((a, b) => a.rotatedZ - b.rotatedZ)

        // HOVER DETECTION
        let hoveredIndex = -1;
        for (let i = projectedIcons.length - 1; i >= 0; i--) {
          const p = projectedIcons[i];
          const dx = pointerRef.current.x - (centerX + p.rotatedX);
          const dy = pointerRef.current.y - (centerY + p.rotatedY);
          const radius = 24 * p.scale; 
          
          if (dx * dx + dy * dy < radius * radius && p.rotatedZ > -ORBIT_RADIUS / 2) {
            hoveredIndex = p.index;
            break;
          }
        }

        // DRAW ICONS
        projectedIcons.forEach((p) => {
          ctx.save()
          ctx.translate(centerX + p.rotatedX, centerY + p.rotatedY)
          ctx.scale(p.scale, p.scale)
          ctx.globalAlpha = p.opacity

          // Hover pop effect
          if (p.index === hoveredIndex) {
            ctx.shadowColor = "#c4c4c4"; 
            ctx.shadowBlur = 5;
            ctx.scale(1.0, 1.0); 
          }

          if (icons || images) {
            if (iconCanvasesRef.current[p.index] && imagesLoadedRef.current[p.index]) {
              ctx.drawImage(iconCanvasesRef.current[p.index], -24, -24, 48, 48)
            }
          }
          ctx.restore()
        })

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [icons, images, iconPositions])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE} 
      height={CANVAS_SIZE}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      // Tailwind classes keep it responsive on smaller screens but allow it to get huge on desktop
      className="cursor-grab active:cursor-grabbing rounded-full w-full max-w-[750px] aspect-square"
      aria-label="Interactive 3D Tech Stack Globe"
      role="img"
    />
  )
}