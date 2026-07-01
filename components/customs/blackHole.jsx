import React, { useRef, useEffect } from "react";

/**
 * BlackHole
 * A half-visible black hole docked to the top edge of the page,
 * flipped so its dome bulges upward and the cut edge sits at the
 * bottom of the visible sliver.
 *
 * Rendered entirely on <canvas>: a rotating, lensed accretion disk,
 * a wavering white photon-ring glow (turbulent, like plasma), and a
 * true-black event horizon.
 *
 * Usage: <BlackHole /> — mount once, anywhere (position is fixed).
 */
export default function BlackHole({ size = 560 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const cx = size / 2;
    const cy = size / 2;
    const horizonR = size * 0.17;

    // Precompute a field of particles orbiting the hole at varying radii,
    // speeds (Keplerian-ish: closer = faster), and inclinations so the
    // disk reads as a warped ellipse rather than a flat ring.
    const N = 260;
    const particles = Array.from({ length: N }, () => {
      const r = horizonR * 1.35 + Math.random() * size * 0.42;
      const angle = Math.random() * Math.PI * 2;
      // base orbital speed (closer = faster). apply a global dampening
      // factor so the whole disk rotates more slowly by default.
      const speed = ((horizonR * 6) / r) * 0.7; // reduced base speed
      const tilt = 0.34 + Math.random() * 0.04; // squash for perspective
      const hueJ = Math.random();
      return { r, angle, speed, tilt, hueJ, size: 0.6 + Math.random() * 1.6 };
    });

    let t = 0;
    let mounted = true;

    const draw = () => {
      if (!mounted) return;
      t += 1;
      const time = t * 0.016;
      ctx.clearRect(0, 0, size, size);

      // ---- outer ambient glow (soft white bloom, gently breathing) ----
      const breathe = 0.85;
      const ambient = ctx.createRadialGradient(cx, cy, horizonR * 0.7, cx, cy, size * 0.62 * breathe);
      // reduce ambient intensity so the dome blends into the page
      ambient.addColorStop(0, "rgba(255,255,255,0.12)");
      ambient.addColorStop(0.35, "rgba(235,240,255,0.05)");
      ambient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, size, size);

      // ---- back half of disk (behind the hole, dimmer) ----
      drawDiskParticles(true);

      // ---- gravitational lensing arc: light bent OVER the top of the hole ----
      const lensR = horizonR * 1.5;
      const lensGrad = ctx.createLinearGradient(cx, cy - lensR, cx, cy - horizonR * 0.4);
      lensGrad.addColorStop(0, "rgba(255,255,255,0)");
      lensGrad.addColorStop(0.5, "rgba(255,255,255,0.5)");
      lensGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      ctx.strokeStyle = lensGrad;
      ctx.lineWidth = size * 0.018;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.ellipse(cx, cy, lensR, lensR * 0.34, 0, Math.PI * 1.02, Math.PI * 1.98);
      ctx.stroke();
      ctx.restore();

      // ---- turbulent photon rim: a wavy, shimmering ring of light hugging ----
      // ---- the event horizon, built from overlapping sine harmonics so it ----
      // ---- ripples like plasma instead of sitting as a static circle ----
      drawWavyRim();

      // ---- event horizon: pure black disk swallowing everything beneath the rim ----
      ctx.beginPath();
      ctx.arc(cx, cy, horizonR, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      // ---- front half of disk (in front of the hole, brighter) ----
      drawDiskParticles(false);

      function drawWavyRim() {
        const baseR = horizonR * 1.1;
        // softened rim layers for better blending with the page
        const layers = [
          { amp: horizonR * 0.05, freq: 7, speed: 1.3, width: size * 0.05, alpha: 0.22, blur: 20 },
          { amp: horizonR * 0.035, freq: 11, speed: -1.8, width: size * 0.03, alpha: 0.32, blur: 12 },
          { amp: horizonR * 0.02, freq: 17, speed: 2.4, width: size * 0.014, alpha: 0.45, blur: 5 },
        ];

        for (const layer of layers) {
          ctx.save();
          ctx.shadowColor = "rgba(255,255,255,0.75)";
          ctx.shadowBlur = layer.blur;
          ctx.strokeStyle = `rgba(255,255,255,${layer.alpha})`;
          ctx.lineWidth = layer.width;
          ctx.beginPath();
          const steps = 140;
          for (let i = 0; i <= steps; i++) {
            const a = (i / steps) * Math.PI * 2;
            const wobble =
              Math.sin(a * layer.freq + time * layer.speed) * layer.amp +
              Math.sin(a * (layer.freq * 0.5) - time * layer.speed * 0.7) * layer.amp * 0.5;
            const r = baseR + wobble;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r * 0.98;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }

      function drawDiskParticles(back) {
        for (const p of particles) {
          // per-frame angular increment. lower multiplier slows visible rotation.
          p.angle += p.speed * 0.0012;
          const x = Math.cos(p.angle);
          const y = Math.sin(p.angle) * p.tilt;
          const isBack = y < 0; // upper half of ellipse = "behind" the hole
          if (isBack !== back) continue;

          const px = cx + x * p.r;
          const py = cy + y * p.r;

          const depthFade = back ? 0.35 : 1;
          const shimmer = 0.75 + Math.sin(time * 2 + p.angle * 6) * 0.25;
          const light = 78 + p.hueJ * 20;
          ctx.beginPath();
          ctx.fillStyle = `hsla(0, 0%, ${light}%, ${(0.55 * depthFade + 0.15) * shimmer})`;
          ctx.arc(px, py, p.size * (back ? 0.8 : 1.1), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: size,
        height: size / 2, // clip box: only the lower half is visible
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 40,
        filter: "drop-shadow(0 10px 32px rgba(255,255,255,0.12))",
      }}
      className="mix-blend-screen opacity-90 ml-80"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          // Flip in Y: the dome now bulges upward, poking out above the
          // page, with the cut edge sitting along the bottom of the strip.
          top: -size / 2,
          left: 0,
          transform: "scaleY(-1)",
          // mask the top so the dome fades smoothly into the page background
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1) 38%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1) 38%)',
        }}
      />
    </div>
  );
}