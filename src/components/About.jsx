import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket, Coffee, Gamepad2, Music, Bot, Star } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Full Stack Engineering',
    desc: 'From pixel-perfect React UIs to Node.js APIs — I own the entire stack.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Brain,
    title: 'AI-Augmented Development',
    desc: 'I leverage Claude, ChatGPT, and Copilot as teammates to ship faster.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Rocket,
    title: 'Automation Specialist',
    desc: 'Playwright & Python automation — if it\'s manual and repetitive, I automate it.',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
  },
];

const stats = [
  { value: '4+', label: 'Projects Built' },
  { value: '2+', label: 'Years Coding' },
  { value: '8.0', label: 'IELTS Band' },
  { value: '∞', label: 'AI Prompts/day' },
];

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle section divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-violet-400 font-mono text-sm">01.</span>
            <span className="text-slate-500 text-sm uppercase tracking-widest">About</span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl font-black text-white mb-2">
            Who I Am
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Story — left 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            <FadeIn delay={0.1}>
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: 'rgba(124,58,237,0.04)',
                  borderColor: 'rgba(124,58,237,0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Bot size={18} className="text-violet-400" />
                  <span className="text-violet-300 font-semibold text-sm">The Developer × AI Angle</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  I&apos;m Hasan Al Mahmud Sakib — a Full Stack Developer from Bangladesh, currently studying
                  CSE at <span className="text-violet-300 font-medium">North South University</span> (Bangladesh&apos;s #1 private university).
                  I code with an AI co-pilot always open, and I hold an{' '}
                  <span className="text-emerald-400 font-medium">IELTS Band 8</span> — meaning I communicate at expert
                  English level with clients and teams worldwide.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-slate-400 leading-[1.85] text-[15px]">
                My journey started with curiosity — tinkering with HTML and CSS, then falling deep into
                JavaScript. From there, the path led to React for frontends, Node.js for backends, Python for
                automation, and eventually Playwright for browser automation at a level most developers never
                reach. Every project I take on pushes me to learn something new.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-slate-400 leading-[1.85] text-[15px]">
                What I enjoy most is building things that{' '}
                <span className="text-white">actually work in production</span> — not just demos. I built{' '}
                <span className="text-violet-300 font-medium">ReelScout</span>, a live Instagram analytics
                platform, by reverse-engineering Instagram&apos;s private XHR endpoints. I automate what others
                do manually. I ship with intent.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Coffee, text: 'Fueled by Coffee' },
                  { icon: Gamepad2, text: 'Gamer' },
                  { icon: Music, text: 'Music Head' },
                  { icon: Star, text: 'Lifelong Learner' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-white/[0.06] text-slate-400 text-xs font-medium"
                  >
                    <Icon size={13} className="text-slate-500" />
                    {text}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — stats + highlights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats grid */}
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="p-4 rounded-2xl glass border border-white/[0.06] text-center"
                  >
                    <p
                      className="text-3xl font-black mb-1"
                      style={{
                        background: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {value}
                    </p>
                    <p className="text-slate-500 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Highlights */}
            {highlights.map((item, i) => (
              <FadeIn key={item.title} delay={0.2 + i * 0.1}>
                <div className={`p-4 rounded-2xl border ${item.bg} flex gap-4 items-start`}>
                  <div className={`mt-0.5 p-2 rounded-lg glass`}>
                    <item.icon size={18} className={item.color} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
