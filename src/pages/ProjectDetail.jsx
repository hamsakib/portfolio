import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Project not found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-violet-400 hover:text-violet-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero banner */}
      <div
        className={`relative h-64 sm:h-80 bg-gradient-to-br ${project.gradient} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, #030712 100%)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-6xl w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}
          >
            {project.id === 'reelscout' && '📊'}
            {project.id === 'insta-automator' && '🤖'}
            {project.id === 'keenkeeper' && '✅'}
            {project.id === 'pluto-mmc' && '🚀'}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 -mt-8 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </motion.button>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs font-medium px-3 py-1 rounded-full glass border border-white/10 text-slate-400">
              {project.category}
            </span>
            {project.liveUrl !== '#' && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                Live
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">{project.title}</h1>
          <p className="text-xl font-medium" style={{ color: project.accent }}>{project.tagline}</p>
        </motion.div>

        {/* Action links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-cyan-500 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25"
            >
              <ExternalLink size={15} />
              View Live Project
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:border-violet-500/40 transition-all hover:-translate-y-0.5"
          >
            <Github size={15} />
            GitHub Repository
          </a>
        </motion.div>

        {/* Content grid */}
        <div className="space-y-8">

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl glass border border-white/[0.07]"
          >
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Code2 size={18} className="text-violet-400" />
              About This Project
            </h2>
            <p className="text-slate-300 leading-[1.85] text-[15px]">{project.longDescription}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 rounded-2xl glass border border-white/[0.07]"
          >
            <h2 className="text-white font-bold text-lg mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag text-sm py-1.5 px-3">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Two-col: Features + Challenges */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl border border-emerald-500/15"
              style={{ background: 'rgba(16,185,129,0.04)' }}
            >
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                Key Features
              </h2>
              <ul className="space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="p-6 rounded-2xl border border-orange-500/15"
              style={{ background: 'rgba(249,115,22,0.04)' }}
            >
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-orange-400" />
                Challenges Faced
              </h2>
              <ul className="space-y-3">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                    <span className="text-orange-400 font-mono text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Future Improvements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-cyan-500/15"
            style={{ background: 'rgba(6,182,212,0.04)' }}
          >
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb size={18} className="text-cyan-400" />
              Future Plans & Improvements
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.improvements.map((imp) => (
                <div
                  key={imp}
                  className="flex items-start gap-2.5 p-3 rounded-xl glass border border-white/[0.05]"
                >
                  <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span>
                  <span className="text-slate-300 text-sm">{imp}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
