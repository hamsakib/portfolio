import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Twitter, Facebook, Instagram, Download, ArrowRight, Sparkles, Bot, Cpu } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/hamsakib', label: 'GitHub', color: 'hover:text-white' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hasanalmahmudsakib/', label: 'LinkedIn', color: 'hover:text-sky-400' },
  { icon: Twitter, href: 'https://x.com/hamsakib', label: 'Twitter/X', color: 'hover:text-sky-300' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61587748780848', label: 'Facebook', color: 'hover:text-blue-400' },
  { icon: Instagram, href: 'https://www.instagram.com/hasanalmahmudsakib/', label: 'Instagram', color: 'hover:text-pink-400' },
];

const TERMINAL_LINES = [
  { text: '$ python reel_analyzer.py --live', color: 'text-emerald-400' },
  { text: '  Connecting to Claude API...', color: 'text-slate-500' },
  { text: '  Loading 847 Instagram reels...', color: 'text-slate-500' },
  { text: '  model: claude-opus-4-7', color: 'text-violet-400' },
  { text: '  Analyzing engagement patterns...', color: 'text-slate-500' },
  { text: '', color: '' },
  { text: '✓ Peak hook detected: first 2.3s', color: 'text-cyan-400' },
  { text: '✓ Engagement lift: +340% above avg', color: 'text-cyan-400' },
  { text: '✓ Report generated in 1.8s', color: 'text-violet-300' },
];

function TerminalWidget() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState(0);

  useEffect(() => {
    const isComplete = count >= TERMINAL_LINES.length;
    const delay = isComplete ? 2800 : 550;
    const timer = setTimeout(() => {
      if (isComplete) {
        setCount(0);
        setSession((s) => s + 1);
      } else {
        setCount((c) => c + 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="w-full max-w-sm rounded-xl overflow-hidden border border-white/[0.08]"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(14px)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]"
        style={{ background: 'rgba(255,255,255,0.025)' }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
        <span className="text-slate-600 text-xs font-mono ml-2">reel_analyzer.py</span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 font-mono">AI</span>
      </div>
      {/* Lines */}
      <div className="p-4 font-mono text-xs space-y-1 min-h-[168px]">
        {TERMINAL_LINES.slice(0, count).map((line, i) => (
          <motion.div
            key={`${session}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className={line.color || 'text-transparent'}
          >
            {line.text || ' '}
          </motion.div>
        ))}
        {count < TERMINAL_LINES.length && count > 0 && (
          <span className="inline-block w-1.5 h-3 bg-violet-400 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.25) 0%, transparent 55%), #030712',
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.25) 0%, transparent 55%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 60px 60px, 60px 60px',
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT — Text */}
          <div className="order-2 lg:order-1">

            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/25 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <Bot size={14} className="text-violet-400" />
              <span className="text-xs font-medium text-slate-300">AI-Powered Developer</span>
              <Sparkles size={12} className="text-cyan-400" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-name text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4"
            >
              <span className="text-white">Hasan Al</span>
              <br />
              <span className="gradient-text">Mahmud Sakib</span>
            </motion.h1>

            {/* Typing Designation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-slate-500 text-lg">I&apos;m a</span>
              <span className="text-lg sm:text-xl font-semibold font-mono text-violet-300 min-h-[28px]">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'AI Automation Specialist',
                    2000,
                    'React Developer',
                    2000,
                    'Python Automation Engineer',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  speed={55}
                  deletionSpeed={70}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              I build end-to-end web applications, automation systems, and AI-powered tools — delivering{' '}
              <span className="text-white font-medium">senior-level output</span> using cutting-edge AI to ship
              faster without sacrificing quality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 hover:from-violet-500 hover:to-cyan-500"
              >
                View My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/resume.pdf"
                download
                className="btn-glow flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white font-semibold text-sm transition-all duration-300 hover:border-violet-500/40"
              >
                <Download size={16} className="text-violet-400" />
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-1"
            >
              <span className="text-slate-600 text-xs mr-2 font-medium uppercase tracking-wider">Find me on</span>
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className={`w-9 h-9 rounded-lg glass border border-white/[0.06] flex items-center justify-center text-slate-500 ${color} transition-all duration-200 hover:border-violet-500/30 hover:-translate-y-0.5`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Avatar + Terminal */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-glow-pulse"
                style={{
                  transform: 'scale(1.15)',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                }}
              />

              {/* Rotating gradient ring */}
              <div
                className="absolute rounded-full avatar-ring"
                style={{
                  inset: '-3px',
                  background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)',
                  padding: '2px',
                  borderRadius: '50%',
                }}
              >
                <div className="w-full h-full rounded-full" style={{ background: '#030712' }} />
              </div>

              {/* Avatar circle */}
              <div
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #13132a 0%, #1a1a3e 100%)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Hasan Al Mahmud Sakib"
                  className="w-full h-full object-cover object-top"
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.12), transparent 60%)',
                  }}
                />
              </div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass border border-violet-500/25 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Cpu size={14} className="text-violet-400" />
                <div>
                  <p className="text-[10px] text-slate-500 leading-none">Powered by</p>
                  <p className="text-xs font-bold text-white leading-none mt-0.5">Claude AI</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass border border-cyan-500/25 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <p className="text-[10px] text-slate-500 leading-none">Status</p>
                  <p className="text-xs font-bold text-emerald-400 leading-none mt-0.5">Open to Work</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -left-20 glass border border-emerald-500/25 rounded-xl px-3 py-2 hidden lg:flex flex-col items-center gap-0.5"
              >
                <span className="text-[11px] font-black text-emerald-400 leading-tight text-center">Pro</span>
                <span className="text-[10px] text-slate-500 leading-none text-center">English</span>
              </motion.div>
            </motion.div>

            {/* Animated terminal */}
            <TerminalWidget />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-violet-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
