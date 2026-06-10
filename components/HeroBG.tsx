"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

/**
 * Hand-written canvas starfield. Particles drift radially outward from the
 * center; mouse proximity repulses them (~100px). 120-180 particles on
 * desktop, 60 on mobile. Disabled for prefers-reduced-motion.
 */
export default function HeroBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const REPULSE = 100;

    const count = isMobile ? 60 : 150;
    const particles: P[] = [];

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const spawn = (fromCenter = false): P => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.05, 0.25);
      const dist = fromCenter ? rand(0, 30) : rand(0, Math.max(w, h) / 2);
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(1, 3),
        alpha: rand(0.3, 0.6),
      };
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      cx = w / 2;
      cy = h / 2;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    for (let i = 0; i < count; i++) particles.push(spawn());

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        // mouse repulse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < REPULSE && d > 0) {
          const force = (REPULSE - d) / REPULSE;
          p.x += (dx / d) * force * 2;
          p.y += (dy / d) * force * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // respawn near center once particle drifts off-screen
        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          Object.assign(p, spawn(true));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (!reduce) {
      raf = requestAnimationFrame(draw);
    } else {
      // static field for reduced motion
      draw();
      cancelAnimationFrame(raf);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
