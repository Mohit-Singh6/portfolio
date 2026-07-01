"use client"

import React, { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

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

export function MyTechStackGlobe() {
  const whiteVariants = new Set(["nextdotjs", "express"])
  const images = mySkillsSlugs.map((slug) => {
    if (whiteVariants.has(slug)) {
      return `https://cdn.simpleicons.org/${slug}/FFFFFF`
    }
    return `https://cdn.simpleicons.org/${slug}`
  })
  return (
    <div className="flex w-full items-center justify-center p-8">
      <IconCloud images={images} />
    </div>
  );
}

interface Icon {
  x: number; y: number; z: number; scale: number; opacity: number; id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
}

// Updated dark-mode friendly colors (Next, Express, Prisma to white)
const skillMeta: Record<string, { name: string; color: string }> = {
  c: { name: 'C', color: '#A8B9CC' },
  cplusplus: { name: 'C++', color: '#00599C' },
  html5: { name: 'HTML5', color: '#E34F26' },
  css3: { name: 'CSS3', color: '#1572B6' },
  javascript: { name: 'JavaScript', color: '#F7DF1E' },
  typescript: { name: 'TypeScript', color: '#3178C6' },
  nextdotjs: { name: 'Next.js', color: '#FFFFFF' },
  react: { name: 'React', color: '#61DAFB' },
  tailwindcss: { name: 'Tailwind CSS', color: '#06B6D4' },
  bootstrap: { name: 'Bootstrap', color: '#7952B3' },
  nodedotjs: { name: 'Node.js', color: '#339933' },
  express: { name: 'Express', color: '#FFFFFF' },
  prisma: { name: 'Prisma', color: '#bbbbbb' },
  mongodb: { name: 'MongoDB', color: '#47A248' },
  mysql: { name: 'MySQL', color: '#4479A1' },
  postgresql: { name: 'PostgreSQL', color: '#4169E1' },
  leetcode: { name: 'LeetCode', color: '#FFA116' },
}

const defaultSkillMeta = { name: 'Skill', color: '#00b4d8' }

function getSkillMetaFromUrl(url?: string) {
  if (!url) return defaultSkillMeta
  const match = url.match(/cdn\.simpleicons\.org\/([^/]+)/)
  const slug = match?.[1]
  if (!slug) return defaultSkillMeta

  return skillMeta[slug] ?? {
    name: slug
      .replace(/dotjs/g, '.js')
      .replace(/dot/g, '.')
      .replace(/(^|[-_\s])(\w)/g, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`),
    color: '#00b4d8',
  }
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '')
  const value = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized

  const intValue = parseInt(value, 16)
  const r = (intValue >> 16) & 255
  const g = (intValue >> 8) & 255
  const b = intValue & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, width: number, height: number, radius: number
) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])

  const pointerRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0.002, y: 0.002 })

  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])
  const hoverScalesRef = useRef<number[]>([])

  const ORBIT_RADIUS = 280;
  const SUN_RADIUS = 72;
  const SUN_GLOW_RADIUS = 200;
  const CANVAS_SIZE = 750;
  const BASE_SPEED = { x: 0.0008, y: 0.0012 };
  const FRICTION = 0.985;
  const DRAG_SENSITIVITY = 0.0015;
  const HOVER_SCALE = 1.4;
  const HOVER_EASE = 0.14;

  // Generate Canvases
  useEffect(() => {
    if (!icons && !images) return
    const items = icons ?? images ?? []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 96
      offscreen.height = 96
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        offCtx.imageSmoothingEnabled = true
        if (images) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(48, 48, 48, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()
            offCtx.drawImage(img, 0, 0, 96, 96)
            imagesLoadedRef.current[index] = true
          }
        } else {
          const svgString = renderToString(item as React.ReactElement)
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0, 96, 96)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })
    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  // Generate Positions
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
        scale: 1, opacity: 1, id: i,
      })
    }
    hoverScalesRef.current = new Array(numIcons).fill(1)
    setIconPositions(newIcons)
  }, [icons, images])

  // Pointer Logic (Fixed Canvas Scaling Bug)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    }
    pointerRef.current.isDragging = true;
    pointerRef.current.lastX = e.clientX;
    pointerRef.current.lastY = e.clientY;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      // Store pointer location in CSS pixel coordinates to match canvas draw space
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    }

    if (pointerRef.current.isDragging) {
      const deltaX = e.clientX - pointerRef.current.lastX;
      const deltaY = e.clientY - pointerRef.current.lastY;

      velocityRef.current.x = -deltaY * DRAG_SENSITIVITY;
      velocityRef.current.y = -deltaX * DRAG_SENSITIVITY;

      pointerRef.current.lastX = e.clientX;
      pointerRef.current.lastY = e.clientY;
    }
  }

  const handleMouseUp = () => { pointerRef.current.isDragging = false; }

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    let animationFrameId: number;

    if (canvas && ctx) {
      const dpr = window.devicePixelRatio || 1
      canvas.width = CANVAS_SIZE * dpr
      canvas.height = CANVAS_SIZE * dpr
      canvas.style.width = `${CANVAS_SIZE}px`
      canvas.style.height = `${CANVAS_SIZE}px`

      const animate = () => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        const centerX = CANVAS_SIZE / 2
        const centerY = CANVAS_SIZE / 2
        if (!pointerRef.current.isDragging) {
          velocityRef.current.x = velocityRef.current.x * FRICTION + BASE_SPEED.x * (1 - FRICTION);
          velocityRef.current.y = velocityRef.current.y * FRICTION + BASE_SPEED.y * (1 - FRICTION);
        }

        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.y += velocityRef.current.y;

        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        // 1. Calculate Projections
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

        // 2. Hover Detection
        let hoveredIndex = -1;
        for (let i = projectedIcons.length - 1; i >= 0; i--) {
          const p = projectedIcons[i];
          const dx = pointerRef.current.x - (centerX + p.rotatedX);
          const dy = pointerRef.current.y - (centerY + p.rotatedY);
          const radius = 30 * p.scale;

          if (dx * dx + dy * dy < radius * radius && p.rotatedZ > -ORBIT_RADIUS / 2) {
            hoveredIndex = p.index;
            break;
          }
        }

        const hoveredIconData = hoveredIndex !== -1 ? projectedIcons.find(p => p.index === hoveredIndex) : null;
        const hoveredMeta = hoveredIconData ? getSkillMetaFromUrl(images?.[hoveredIconData.index]) : null;

        // 3. Update hover transition for each icon.
        projectedIcons.forEach((p) => {
          const target = p.index === hoveredIndex ? HOVER_SCALE : 1
          const current = hoverScalesRef.current[p.index] ?? 1
          hoverScalesRef.current[p.index] = current + (target - current) * HOVER_EASE
        })

        // 4. Split Array for Z-Index Sun Occlusion
        const backIcons = projectedIcons.filter(p => p.rotatedZ < 0).sort((a, b) => a.rotatedZ - b.rotatedZ);
        const frontIcons = projectedIcons.filter(p => p.rotatedZ >= 0).sort((a, b) => a.rotatedZ - b.rotatedZ);

        // Render helper function for icons
        const renderIcon = (p: any) => {
          const isHovered = p.index === hoveredIndex
          const iconMeta = isHovered ? hoveredMeta : null
          const hoverScale = hoverScalesRef.current[p.index] ?? 1
          const iconRenderScale = p.scale * hoverScale

          ctx.save()
          ctx.translate(centerX + p.rotatedX, centerY + p.rotatedY)
          ctx.globalAlpha = p.opacity
          ctx.scale(iconRenderScale, iconRenderScale)

          const iconSize = 56
          const halfIcon = iconSize / 2
          if (icons || images) {
            if (iconCanvasesRef.current[p.index] && imagesLoadedRef.current[p.index]) {
              ctx.drawImage(iconCanvasesRef.current[p.index], -halfIcon, -halfIcon, iconSize, iconSize)
            }
          }

          // Behind-the-icon glow on hover
          if (isHovered && iconMeta) {
            // Standard "Normal" Glow: Use Canvas shadow properties
            ctx.shadowColor = iconMeta.color;
            ctx.shadowBlur = 80; // Significantly increased radius
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // 2. Draw the icon (this creates the wide halo)
            ctx.drawImage(iconCanvasesRef.current[p.index], -halfIcon, -halfIcon, iconSize, iconSize);

            // 3. Optional: Boost intensity by drawing it a second time 
            // with a smaller blur if it still looks too faint
            ctx.shadowBlur = 10;
            ctx.drawImage(iconCanvasesRef.current[p.index], -halfIcon, -halfIcon, iconSize, iconSize);

            // Pop effect
            ctx.scale(1.1, 1.1);
          } else {
            ctx.shadowBlur = 0
            ctx.shadowColor = 'transparent'
          }

          

          const iconMetaForBorder = images?.[p.index] ? getSkillMetaFromUrl(images[p.index]) : null
          const permanentGlow = iconMetaForBorder?.name === 'Next.js' || iconMetaForBorder?.name === 'Express'

          if (permanentGlow && iconMetaForBorder) {
            ctx.save()
            ctx.globalAlpha = 0.18
            ctx.shadowColor = hexToRgba(iconMetaForBorder.color, 0.36)
            ctx.shadowBlur = 28
            ctx.fillStyle = hexToRgba(iconMetaForBorder.color, 0.08)
            ctx.beginPath()
            ctx.ellipse(0, 0, 30, 18, 0.1, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }

          ctx.restore()
        };

        // 5. Draw Back Icons
        backIcons.forEach(renderIcon);

        // 6. Draw Sun (Now naturally occludes back icons!)
        ctx.save()
        ctx.translate(centerX, centerY)
        const sunGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, SUN_GLOW_RADIUS)
        sunGlow.addColorStop(0, "rgba(255, 240, 200, 0.5)"); // Soft center
        sunGlow.addColorStop(0.4, "rgba(255, 190, 110, 0.15)"); // Fades very slowly
        sunGlow.addColorStop(1, "rgba(255, 95, 0, 0)"); // Fades into absolute nothingness

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

        // 7. Draw Front Icons
        frontIcons.forEach(renderIcon);

        // 8. Draw Tooltip Label LAST (Guarantees it is always on top)
        if (hoveredIconData && hoveredMeta) {
          const labelText = hoveredMeta.name
          const labelColor = hoveredMeta.color === '#FFFFFF' ? '#F2F2F2' : hoveredMeta.color
          const hoverScale = hoverScalesRef.current[hoveredIconData.index] ?? 1
          const labelY = 58 * hoveredIconData.scale * hoverScale

          ctx.save()
          ctx.translate(centerX + hoveredIconData.rotatedX, centerY + hoveredIconData.rotatedY)
          ctx.globalAlpha = 1
          ctx.font = '700 16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = labelColor
          ctx.shadowColor = hexToRgba(labelColor, 0.28)
          ctx.shadowBlur = 14
          ctx.fillText(labelText, 0, labelY)
          ctx.shadowBlur = 0
          ctx.restore()
        }

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()
    }

    return () => cancelAnimationFrame(animationFrameId)
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
      className="cursor-grab active:cursor-grabbing rounded-full w-full max-w-[750px] aspect-square"
      aria-label="Interactive 3D Tech Stack Globe"
      role="img"
    />
  )
}