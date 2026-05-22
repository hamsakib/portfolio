import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { projects } from '../data/projects';

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, delay }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className="project-card group flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0d0d1f]/80"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Project image / gradient placeholder */}
      <div
        className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Centered icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}
          >
            {project.id === 'reelscout' && '📊'}
            {project.id === 'insta-automator' && '🤖'}
            {project.id === 'keenkeeper' && '✅'}
            {project.id === 'pluto-mmc' && '🚀'}
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Quick links overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <Github size={16} />
          </a>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-white font-bold text-xl mb-1">{project.title}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: project.accent }}>{project.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-tag">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* View details button */}
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="group/btn flex items-center justify-between w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-200 text-sm font-semibold text-white"
        >
          <span>View Details</span>
          <ArrowRight size={15} className="text-violet-400 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 lg:py-32 relative"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 60%), #030712',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-violet-400 font-mono text-sm">04.</span>
            <span className="text-slate-500 text-sm uppercase tracking-widest">Projects</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="section-title text-4xl sm:text-5xl font-black text-white mb-2">
                Things I&apos;ve Built
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-lg mt-6">
                Real production projects — not tutorials. Each one solved a genuine problem using modern tech and AI-assisted development.
              </p>
            </div>
            <div className="flex items-center gap-2 glass border border-violet-500/20 px-4 py-2 rounded-xl whitespace-nowrap self-start sm:self-auto">
              <Layers size={14} className="text-violet-400" />
              <span className="text-slate-300 text-sm font-medium">{projects.length} Projects</span>
            </div>
          </div>
        </FadeIn>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>

        {/* More coming */}
        <FadeIn delay={0.4} className="mt-10 text-center">
          <p className="text-slate-600 text-sm">
            More projects coming as I build them.{' '}
            <a
              href="https://github.com/hamsakib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              See GitHub →
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
