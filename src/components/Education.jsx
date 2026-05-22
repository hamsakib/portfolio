import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';

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

export default function Education() {
  return (
    <section id="education" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-violet-400 font-mono text-sm">03.</span>
            <span className="text-slate-500 text-sm uppercase tracking-widest">Education</span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl font-black text-white">
            Academic Background
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="max-w-2xl">
          <div className="p-6 rounded-2xl border border-violet-500/25 bg-violet-500/[0.05] flex items-center gap-5">
            <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/25 flex-shrink-0">
              <GraduationCap size={24} className="text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-white font-bold text-base">
                  Bachelor of Science — Computer Science & Engineering
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  Ongoing
                </span>
              </div>
              <p className="text-violet-300 font-medium text-sm">North South University</p>
              <p className="text-slate-500 text-xs mt-0.5">Bangladesh's First & Leading Private University</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
