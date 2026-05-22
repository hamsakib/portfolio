import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

function useParticleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const setSize = () => {
      const p = canvas.parentElement;
      if (p) { canvas.width = p.clientWidth; canvas.height = p.clientHeight; }
    };
    setSize();
    window.addEventListener('resize', setSize);
    for (let i = 0; i < 55; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.4 + 0.4 });
    }
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,58,237,0.55)'; ctx.fill();
      }
      const MAX = 125;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX) {
            const t = particles[i].x / W;
            const r = Math.round(124 * (1 - t) + 6 * t), g = Math.round(58 * (1 - t) + 182 * t), b = Math.round(237 * (1 - t) + 212 * t);
            ctx.beginPath(); ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / MAX) * 0.22})`; ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);
}

// 5×5 pixel font for ascii-art command
const PF = {
  A:[' ### ','#   #','#####','#   #','#   #'], B:['#### ','#   #','#### ','#   #','#### '],
  C:[' ####','#    ','#    ','#    ',' ####'], D:['#### ','#   #','#   #','#   #','#### '],
  E:['#####','#    ','###  ','#    ','#####'], F:['#####','#    ','###  ','#    ','#    '],
  G:[' ####','#    ','# ###','#   #',' ####'], H:['#   #','#   #','#####','#   #','#   #'],
  I:['#####','  #  ','  #  ','  #  ','#####'], J:['  ###','    #','    #','#   #',' ### '],
  K:['#   #','#  # ','###  ','#  # ','#   #'], L:['#    ','#    ','#    ','#    ','#####'],
  M:['#   #','## ##','# # #','#   #','#   #'], N:['#   #','##  #','# # #','#  ##','#   #'],
  O:[' ### ','#   #','#   #','#   #',' ### '], P:['#### ','#   #','#### ','#    ','#    '],
  Q:[' ### ','#   #','# # #','#  # ',' ## #'], R:['#### ','#   #','#### ','# #  ','#  ##'],
  S:[' ####','#    ',' ### ','    #','#### '], T:['#####','  #  ','  #  ','  #  ','  #  '],
  U:['#   #','#   #','#   #','#   #',' ### '], V:['#   #','#   #','#   #',' # # ','  #  '],
  W:['#   #','#   #','# # #','## ##','#   #'], X:['#   #',' # # ','  #  ',' # # ','#   #'],
  Y:['#   #',' # # ','  #  ','  #  ','  #  '], Z:['#####','   # ','  #  ',' #   ','#####'],
  ' ':['     ','     ','     ','     ','     '],
  '!':['  #  ','  #  ','  #  ','     ','  #  '],
};

function renderAsciiArt(text) {
  const chars = text.toUpperCase().split('').map(c => PF[c] || PF[' ']);
  return Array.from({ length: 5 }, (_, row) => ({
    t: 'line', color: 'violet',
    text: chars.map(c => c[row]).join(' ').replace(/#/g, '█'),
  }));
}

const CMDS = {
  help: () => [
    { t: 'head', text: 'Available commands' },
    { t: 'row', cmd: 'whoami',           desc: 'who is HAMS?' },
    { t: 'row', cmd: 'skills',           desc: 'full tech stack' },
    { t: 'row', cmd: 'projects',         desc: 'things I built' },
    { t: 'row', cmd: 'contact',          desc: 'get in touch' },
    { t: 'row', cmd: 'hire',             desc: 'best decision ever' },
    { t: 'row', cmd: 'neofetch',         desc: 'system info (classic)' },
    { t: 'row', cmd: 'matrix',           desc: 'enter the matrix 🐇' },
    { t: 'row', cmd: 'ascii-art <text>', desc: 'render text as pixel art' },
    { t: 'row', cmd: 'joke',             desc: 'developer humor' },
    { t: 'row', cmd: 'ls',               desc: 'list files' },
    { t: 'row', cmd: 'clear',            desc: 'clear terminal' },
  ],
  whoami: () => [
    { t: 'banner' },
    { t: 'kv', k: 'Name    ', v: 'Hasan Al Mahmud Sakib  (HAMS)' },
    { t: 'kv', k: 'Role    ', v: 'Full Stack Dev & AI Automation Specialist' },
    { t: 'kv', k: 'Location', v: 'Bangladesh 🇧🇩' },
    { t: 'kv', k: 'Study   ', v: 'BSc CSE @ North South University' },
    { t: 'ok',  text: '✓ Available for freelance work' },
  ],
  skills: () => [
    { t: 'cat', label: 'Frontend' },
    { t: 'tags', tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'] },
    { t: 'cat', label: 'Backend' },
    { t: 'tags', tags: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL'] },
    { t: 'cat', label: 'Automation & AI' },
    { t: 'tags', tags: ['Playwright', 'Puppeteer', 'Claude AI', 'OpenAI API', 'n8n'] },
  ],
  projects: () => [
    { t: 'proj', emoji: '📊', name: 'ReelScout',      desc: 'Instagram analytics — reverse-engineered XHR endpoints' },
    { t: 'proj', emoji: '🤖', name: 'InstaAutomator', desc: 'Playwright + Python browser automation bot' },
    { t: 'proj', emoji: '✅', name: 'KeenKeeper',     desc: 'Smart productivity & task management app' },
    { t: 'proj', emoji: '🚀', name: 'PlutoMMC',       desc: 'Minecraft server management platform' },
  ],
  contact: () => [
    { t: 'line', color: 'slate', text: '─────────────────────────────────' },
    { t: 'line', color: 'white', text: '📧  hamsakib03@gmail.com' },
    { t: 'line', color: 'white', text: '📱  +880 1842 001223' },
    { t: 'line', color: 'white', text: '💬  wa.me/8801842001223' },
    { t: 'line', color: 'slate', text: '─────────────────────────────────' },
    { t: 'action', text: '→ Jump to contact form', scroll: 'contact' },
  ],
  hire: () => [
    { t: 'ok',   text: 'Smart choice. 🚀' },
    { t: 'line', color: 'white', text: 'Opening contact section...' },
    { t: 'action', text: '→ Go to contact form', scroll: 'contact', autoScroll: true },
  ],
  'sudo hire me': () => [
    { t: 'line', color: 'slate', text: '[sudo] password for visitor: ••••••••' },
    { t: 'ok',   text: 'Access granted. Nice sudo skills. 🎉' },
    { t: 'action', text: '→ Contact HAMS now', scroll: 'contact', autoScroll: true },
  ],
  neofetch: () => [{ t: 'neofetch' }],
  ls: () => [
    { t: 'ls', items: ['about/', 'skills/', 'projects/', 'contact/', 'resume.pdf', 'README.md'] },
  ],
  'cat readme.md': () => [
    { t: 'line', color: 'cyan',  text: '# HAMS — Full Stack Developer' },
    { t: 'line', color: 'slate', text: 'Shipping real products since 2022.' },
    { t: 'line', color: 'slate', text: 'AI-augmented. Automation-first.' },
    { t: 'line', color: 'slate', text: 'Available for freelance. Fast responder.' },
  ],
  matrix: () => {
    const pool = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハムサキブ01';
    const row = () => Array.from({ length: 22 }, () => pool[Math.floor(Math.random() * pool.length)]).join(' ');
    return [
      { t: 'line', color: 'mgreen', text: '> initializing matrix.exe...' },
      { t: 'line', color: 'mgreen', text: row() },
      { t: 'line', color: 'mgreen', text: row() },
      { t: 'line', color: 'mgreen', text: row() },
      { t: 'line', color: 'mgreen', text: row() },
      { t: 'line', color: 'mgreen', text: row() },
      { t: 'ok',   text: 'Wake up, HAMS... 🐇 The Matrix has you.' },
    ];
  },
  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
      "SQL query walks into a bar, approaches 2 tables: 'Can I join you?' 😄",
      "Why do Java devs wear glasses? Because they don't C#. 👓",
      "99 bugs in the code... fix one, push to prod — 127 bugs in the code. 🔢",
      "A programmer's wife: 'Get a loaf of bread. If eggs, get a dozen.' He returns with 12 loaves. 🍞",
    ];
    return [{ t: 'line', color: 'yellow', text: jokes[Math.floor(Math.random() * jokes.length)] }];
  },
};

function Block({ b, onScroll }) {
  const colorMap = { violet: 'text-violet-400', cyan: 'text-cyan-400', green: 'text-emerald-400', mgreen: 'text-green-400', yellow: 'text-yellow-400', red: 'text-red-400', white: 'text-slate-200', slate: 'text-slate-500' };
  switch (b.t) {
    case 'head': return <p className="text-slate-400 text-xs mb-0.5 mt-0.5 font-medium">{b.text}</p>;
    case 'row': return (
      <div className="flex gap-4 text-xs font-mono">
        <span className="text-violet-400 w-32 flex-shrink-0">{b.cmd}</span>
        <span className="text-slate-400">{b.desc}</span>
      </div>
    );
    case 'banner': return (
      <div className="font-mono text-xs leading-tight">
        <p className="text-violet-400">╔══════════════════════════════════╗</p>
        <p className="text-violet-400">║   Hasan Al Mahmud Sakib — HAMS   ║</p>
        <p className="text-violet-400">╚══════════════════════════════════╝</p>
      </div>
    );
    case 'kv': return (
      <div className="flex gap-3 text-xs font-mono">
        <span className="text-slate-500 flex-shrink-0">{b.k}</span>
        <span className="text-slate-300">{b.v}</span>
      </div>
    );
    case 'ok':   return <p className="text-emerald-400 text-xs font-mono">{b.text}</p>;
    case 'cat':  return <p className="text-cyan-400 text-xs font-mono mt-2">── {b.label} {'─'.repeat(Math.max(0, 22 - b.label.length))}</p>;
    case 'tags': return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {b.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono bg-violet-500/10 text-violet-300 border border-violet-500/20">{tag}</span>
        ))}
      </div>
    );
    case 'proj': return (
      <div className="flex items-start gap-2.5 text-xs font-mono">
        <span>{b.emoji}</span>
        <div><span className="text-white font-semibold">{b.name}</span><span className="text-slate-400 ml-2">— {b.desc}</span></div>
      </div>
    );
    case 'ls': return (
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono">
        {b.items.map(item => (
          <span key={item} className={item.endsWith('/') ? 'text-cyan-400' : 'text-slate-300'}>{item}</span>
        ))}
      </div>
    );
    case 'line': return <p className={`text-xs font-mono whitespace-pre ${colorMap[b.color] || 'text-slate-300'}`}>{b.text}</p>;
    case 'action': return (
      <button onClick={() => onScroll(b.scroll)} className="text-xs font-mono text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors text-left">
        {b.text}
      </button>
    );
    case 'neofetch': {
      const art = [
        'H   H  AAAAA  M   M  SSSSS',
        'H   H  A   A  MM MM  S    ',
        'HHHHH  AAAAA  M M M  SSSSS',
        'H   H  A   A  M   M      S',
        'H   H  A   A  M   M  SSSSS',
      ];
      const swatches = ['#ef4444','#eab308','#22c55e','#06b6d4','#3b82f6','#7c3aed','#a855f7','#94a3b8'];
      const info = [
        ['OS', 'Portfolio v2.0'], ['Host', 'Vercel (prod)'], ['Shell', 'React 18 + Vite'],
        ['WM', 'Framer Motion'], ['Terminal', 'v1.0'], ['Theme', 'Dark (always)'],
        ['CPU', 'Claude AI'], ['RAM', '∞ curiosity'], ['Uptime', 'Always building 🚀'],
      ];
      return (
        <div className="font-mono text-[10px] leading-[1.35]">
          <div className="flex gap-4 flex-wrap items-start">
            <div style={{ color: '#7c3aed' }} className="flex-shrink-0">
              {art.map((row, i) => <div key={i}>{row}</div>)}
              <div className="flex gap-0.5 mt-1.5">
                {swatches.map(c => <span key={c} style={{ background: c, display: 'inline-block', width: 12, height: 12, borderRadius: 2 }} />)}
              </div>
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div>
                <span style={{ color: '#a78bfa' }}>hams</span>
                <span style={{ color: '#475569' }}>@</span>
                <span style={{ color: '#22d3ee' }}>portfolio</span>
              </div>
              <div style={{ color: '#1e293b' }}>{'─'.repeat(20)}</div>
              {info.map(([k, v]) => (
                <div key={k}>
                  <span style={{ color: '#7c3aed' }}>{k}</span>
                  <span style={{ color: '#475569' }}>: </span>
                  <span style={{ color: '#cbd5e1' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    default: return null;
  }
}

const QUICK = ['help', 'whoami', 'neofetch', 'skills', 'projects', 'ascii-art hams', 'matrix', 'joke', 'sudo hire me'];

export default function Terminal() {
  const canvasRef  = useRef(null);
  const inputRef   = useRef(null);
  const scrollRef  = useRef(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' });

  useParticleCanvas(canvasRef);

  const [history, setHistory] = useState([
    { type: 'output', blocks: [{ t: 'line', color: 'cyan', text: 'Welcome to HAMS terminal v1.0 — type "help" to explore.' }] },
  ]);
  const [input, setInput]     = useState('');
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') { setHistory([]); setCmdHist(p => [cmd, ...p]); setHistIdx(-1); setInput(''); return; }

    if (cmd === '↑↑↓↓←→←→ba' || cmd === 'konami') {
      setTimeout(() => window.dispatchEvent(new CustomEvent('konami')), 300);
    }

    let blocks;
    if (cmd === '↑↑↓↓←→←→ba' || cmd === 'konami') {
      blocks = [
        { t: 'line', color: 'mgreen', text: '> Konami sequence detected...' },
        { t: 'ok',   text: '🐇 Entering the Matrix. Hold on...' },
      ];
    } else if (cmd.startsWith('ascii-art')) {
      const arg = cmd.slice(9).trim() || 'hams';
      blocks = [
        { t: 'line', color: 'slate', text: `rendering "${arg.toUpperCase()}"` },
        ...renderAsciiArt(arg),
      ];
    } else {
      const fn = CMDS[cmd];
      if (fn) {
        blocks = fn();
        const autoScroll = blocks.find(b => b.t === 'action' && b.autoScroll);
        if (autoScroll) setTimeout(() => scrollToSection(autoScroll.scroll), 900);
      } else {
        blocks = [{ t: 'line', color: 'red', text: `command not found: ${cmd}. Try "help"` }];
      }
    }

    setHistory(p => [...p, { type: 'input', text: cmd }, { type: 'output', blocks }]);
    setCmdHist(p => [cmd, ...p]);
    setHistIdx(-1);
    setInput('');
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); runCommand(input); };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next); setInput(cmdHist[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next); setInput(next === -1 ? '' : cmdHist[next]);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const all = [...Object.keys(CMDS), 'ascii-art'];
      const match = all.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match === 'ascii-art' ? 'ascii-art hams' : match);
    }
  };

  return (
    <section id="playground" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#030712' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.45 }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-violet-400 font-mono text-sm">✦</span>
            <span className="text-slate-500 text-sm uppercase tracking-widest">Playground</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">Interactive Terminal</h2>
          <p className="text-slate-500 text-sm max-w-md mt-4">
            A fully functional terminal built with React. Type a command or click a chip — try{' '}
            <span className="text-violet-400 font-mono">help</span> to start.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/[0.08] cursor-text"
            style={{ background: 'rgba(8,8,20,0.96)', backdropFilter: 'blur(20px)' }}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-slate-500 text-xs font-mono mx-auto">hams@portfolio: ~</span>
            </div>

            <div ref={scrollRef} className="h-80 overflow-y-auto px-4 py-3 space-y-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124,58,237,0.3) transparent' }}>
              {history.map((entry, i) => (
                <div key={i}>
                  {entry.type === 'input' && (
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-violet-400 flex-shrink-0">hams@portfolio:~$</span>
                      <span className="text-white">{entry.text}</span>
                    </div>
                  )}
                  {entry.type === 'output' && (
                    <div className="pl-1 space-y-1 mb-1">
                      {entry.blocks.map((b, j) => <Block key={j} b={b} onScroll={scrollToSection} />)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06]">
              <span className="text-violet-400 text-xs font-mono flex-shrink-0">hams@portfolio:~$</span>
              <input
                ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                autoComplete="off" spellCheck={false}
                className="flex-1 bg-transparent text-white text-xs font-mono outline-none caret-violet-400 placeholder-slate-600"
                placeholder="type a command..."
              />
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.25 }}
            className="lg:col-span-2 space-y-5"
          >
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-medium mb-3">Quick commands</p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map(cmd => (
                  <button key={cmd} onClick={() => runCommand(cmd)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all hover:-translate-y-0.5 ${
                      cmd === 'sudo hire me'
                        ? 'bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20'
                        : 'bg-white/[0.03] border-white/[0.07] text-slate-400 hover:text-white hover:border-violet-500/20'
                    }`}
                  >{cmd}</button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/[0.06]" style={{ background: 'rgba(124,58,237,0.04)' }}>
              <p className="text-violet-400 text-xs font-mono mb-3">// pro tips</p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li><span className="text-slate-400">↑ ↓</span>  navigate command history</li>
                <li><span className="text-slate-400">Tab</span>  autocomplete commands</li>
                <li className="text-slate-600">try: ascii-art hams</li>
                <li className="text-slate-600">try: neofetch</li>
                <li className="text-slate-600">↑↑↓↓←→←→ba (secret!)</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl border border-cyan-500/15" style={{ background: 'rgba(6,182,212,0.04)' }}>
              <p className="text-cyan-400 text-xs font-mono mb-2">// built with</p>
              <div className="flex flex-wrap gap-1.5">
                {['React hooks', 'Canvas API', 'requestAnimationFrame', 'useCallback'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
