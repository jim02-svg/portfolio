import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  baseSize: number;
  driftLeft: boolean;
};

type Props = {
  /** CSS selector for the emitter element (portrait frame). */
  emitterSelector: string;
};

export function PortraitEmbers({ emitterSelector }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Emitter oval in canvas-local coords
    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;

    const parent = canvas.parentElement;
    if (!parent) return;

    const measure = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const emitter = document.querySelector(emitterSelector) as HTMLElement | null;
      if (emitter) {
        const er = emitter.getBoundingClientRect();
        cx = er.left - rect.left + er.width / 2;
        cy = er.top - rect.top + er.height / 2;
        rx = er.width / 2;
        ry = er.height / 2;
      } else {
        cx = width * 0.75;
        cy = height * 0.5;
        rx = width * 0.15;
        ry = height * 0.4;
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    const emitterEl = document.querySelector(emitterSelector);
    if (emitterEl) ro.observe(emitterEl);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    const particles: Particle[] = [];

    const spawn = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;
      const driftLeft = Math.random() < 0.7;
      const baseSize = 0.6 + Math.random() * 1.8;
      const maxLife = 220 + Math.random() * 260;
      let vx: number;
      let vy: number;
      if (driftLeft) {
        vx = -0.5 - Math.random() * 0.9;
        vy = (Math.random() - 0.5) * 0.3;
      } else {
        const a = Math.random() * Math.PI * 2;
        const s = 0.05 + Math.random() * 0.3;
        vx = Math.cos(a) * s;
        vy = Math.sin(a) * s;
      }
      return { x, y, vx, vy, life: 0, maxLife, size: baseSize, baseSize, driftLeft };
    };

    for (let i = 0; i < 80; i++) particles.push(spawn());

    let last = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.6667;
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const target = 160;
      while (particles.length < target) particles.push(spawn());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.driftLeft) {
          p.vy += (Math.sin((p.life + i) * 0.05) * 0.003 - 0.005) * dt;
        } else {
          p.vx += (Math.random() - 0.5) * 0.01 * dt;
          p.vy += (Math.random() - 0.5) * 0.01 * dt;
        }
        const t = p.life / p.maxLife;
        if (t >= 1 || p.x < -30 || p.x > width + 30 || p.y < -30 || p.y > height + 30) {
          particles.splice(i, 1);
          continue;
        }
        p.size = p.baseSize * (1 + t * 1.6);
        const alpha = (1 - t) * 0.6;
        const r = p.size * 4.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, `rgba(229, 9, 20, ${alpha})`);
        grad.addColorStop(0.45, `rgba(183, 0, 0, ${alpha * 0.45})`);
        grad.addColorStop(1, `rgba(157, 19, 24, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [emitterSelector]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 4 }}
    />
  );
}
