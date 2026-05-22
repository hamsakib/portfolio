import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function MatrixCanvas({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const canvas = ref.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノHAMS0123456789';
    let id;
    const draw = () => {
      ctx.fillStyle = 'rgba(3,7,18,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.96 ? '#ffffff' : '#00ff41';
        ctx.fillText(char, i * 18, drops[i] * 18);
        if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [active]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export default function KonamiEgg() {
  const [active, setActive] = useState(false);
  const buf = useRef([]);

  useEffect(() => {
    const onKey = (e) => {
      buf.current = [...buf.current, e.key].slice(-KONAMI.length);
      if (buf.current.length === KONAMI.length && KONAMI.every((k, i) => k === buf.current[i])) {
        buf.current = [];
        setActive(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setActive(false), 6000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[999] flex items-center justify-center cursor-pointer"
          onClick={() => setActive(false)}
        >
          <MatrixCanvas active={active} />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.35 }}
            className="relative z-10 text-center px-10 py-8 rounded-3xl"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,255,65,0.25)' }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-green-400 font-mono text-4xl tracking-widest mb-4">↑↑↓↓←→←→BA</p>
            <p className="text-white font-black text-3xl sm:text-4xl mb-3">CHEAT CODE UNLOCKED</p>
            <p className="text-green-400 font-mono text-base">You found the Easter Egg, dev! 🐇</p>
            <p className="text-slate-500 font-mono text-sm mt-5">Wake up, visitor... The Matrix has you.</p>
            <p className="text-slate-600 font-mono text-xs mt-3">click anywhere to exit · auto-closes in 6s</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
