import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-violet-500 to-purple-600',
    border: 'border-violet-500/20',
    glow: 'rgba(124,58,237,0.15)',
    skills: [
      { name: 'React', level: 88 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 87 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    title: 'Backend & Automation',
    icon: '⚙️',
    color: 'from-cyan-500 to-sky-600',
    border: 'border-cyan-500/20',
    glow: 'rgba(6,182,212,0.15)',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 78 },
      { name: 'Python', level: 75 },
      { name: 'Playwright', level: 82 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/20',
    glow: 'rgba(16,185,129,0.15)',
    skills: [
      { name: 'Git & GitHub', level: 87 },
      { name: 'Vite', level: 85 },
      { name: 'Railway (Deploy)', level: 78 },
      { name: 'VS Code / Cursor', level: 95 },
      { name: 'npm / CLI', level: 88 },
    ],
  },
  {
    title: 'AI Stack',
    icon: '🤖',
    color: 'from-fuchsia-500 to-pink-600',
    border: 'border-fuchsia-500/20',
    glow: 'rgba(217,70,239,0.15)',
    skills: [
      { name: 'Claude AI (Anthropic)', level: 96 },
      { name: 'ChatGPT / GPT-4o', level: 93 },
      { name: 'GitHub Copilot', level: 88 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'AI Automation Workflows', level: 85 },
    ],
  },
];

const aiAgentTools = [
  { name: 'Claude API', sub: 'Anthropic SDK', color: 'text-violet-300', bg: 'bg-violet-500/10 border-violet-500/25' },
  { name: 'OpenAI API', sub: 'GPT-4o / Assistants', color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/25' },
  { name: 'LangChain', sub: 'Agent Orchestration', color: 'text-yellow-300', bg: 'bg-yellow-500/10 border-yellow-500/25' },
  { name: 'n8n', sub: 'Workflow Automation', color: 'text-pink-300', bg: 'bg-pink-500/10 border-pink-500/25' },
  { name: 'Claude Code', sub: 'AI Dev CLI', color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/25' },
  { name: 'Webhook APIs', sub: 'Event-driven Systems', color: 'text-orange-300', bg: 'bg-orange-500/10 border-orange-500/25' },
  { name: 'Cursor IDE', sub: 'AI-native Editor', color: 'text-sky-300', bg: 'bg-sky-500/10 border-sky-500/25' },
  { name: 'Vector DBs', sub: 'Chroma / Pinecone', color: 'text-rose-300', bg: 'bg-rose-500/10 border-rose-500/25' },
  { name: 'Hugging Face', sub: 'Open Source Models', color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/25' },
];

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-slate-500 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ boxShadow: '0 0 8px rgba(124,58,237,0.4)' }}
        />
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 lg:py-32 relative"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%), #030712',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-violet-400 font-mono text-sm">02.</span>
            <span className="text-slate-500 text-sm uppercase tracking-widest">Skills</span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl font-black text-white mb-4">
            My Tech Stack
          </h2>
          <p className="text-slate-500 max-w-xl text-sm leading-relaxed mt-6">
            A full-spectrum skill set — from frontend finesse to backend architecture, browser automation,
            and the AI tools that multiply everything.
          </p>
        </FadeIn>

        {/* Categories grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {skillCategories.map((cat, ci) => (
            <FadeIn key={cat.title} delay={ci * 0.1}>
              <div
                className={`p-6 rounded-2xl border ${cat.border} h-full`}
                style={{ background: `radial-gradient(ellipse at top left, ${cat.glow}, transparent 60%), rgba(255,255,255,0.02)` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className={`text-sm font-bold bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                    {cat.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={ci * 0.1 + si * 0.08}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* AI Agents & Integrations — full-width showcase */}
        <FadeIn delay={0.35} className="mt-5">
          <div
            className="p-6 sm:p-8 rounded-2xl border border-violet-500/20 relative overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(124,58,237,0.07), transparent 60%), rgba(255,255,255,0.015)',
            }}
          >
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h3 className="text-white font-bold text-base">AI Agents & Integrations</h3>
                    <p className="text-slate-500 text-xs mt-0.5">APIs, agent frameworks & automation platforms I build with</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg glass border border-violet-500/25 text-violet-300 whitespace-nowrap self-start sm:self-auto">
                  Production-grade tooling
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                {aiAgentTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={`p-3 rounded-xl border ${tool.bg} flex flex-col gap-1 lg:col-span-1`}
                  >
                    <span className={`text-xs font-bold ${tool.color}`}>{tool.name}</span>
                    <span className="text-slate-600 text-[10px] leading-tight">{tool.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* AI Callout Banner */}
        <FadeIn delay={0.45} className="mt-5">
          <div
            className="p-6 rounded-2xl relative overflow-hidden border border-fuchsia-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(217,70,239,0.08), rgba(6,182,212,0.08))',
            }}
          >
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <p className="text-white font-bold text-lg mb-1">
                  I don&apos;t just use AI — I architect with it.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  Claude API, OpenAI, LangChain, and n8n are embedded in my workflow as genuine engineering tools.
                  This lets me design, build, debug, and deploy at a pace that traditionally requires a full team —
                  without sacrificing code quality or engineering fundamentals.
                </p>
              </div>
              <div className="sm:ml-auto flex items-center gap-2 px-4 py-2 rounded-xl glass border border-fuchsia-500/25 whitespace-nowrap">
                <span className="text-fuchsia-400 font-mono font-bold text-sm">AI × Dev</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
