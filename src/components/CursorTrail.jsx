import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const ptcls = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = ({ clientX: x, clientY: y }) => {
      for (let i = 0; i < 3; i++) {
        ptcls.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -1.4 - 0.2,
          life: 1,
          size: Math.random() * 3 + 1.5,
          hue: Math.random() > 0.5 ? 265 : 188,
        });
      }
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ptcls.current = ptcls.current.filter(p => p.life > 0.02);
      for (const p of ptcls.current) {
        p.x += p.vx; p.y += p.vy;
        p.life -= 0.038; p.vx *= 0.95; p.vy *= 0.95;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size * p.life), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 68%, ${p.life * 0.75})`;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998, mixBlendMode: 'screen' }}
    />
  );
}
