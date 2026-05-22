import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send, Github, Linkedin, Twitter, Facebook, Instagram, MapPin } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hamsakib03@gmail.com',
    href: 'mailto:hamsakib03@gmail.com',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+880 1842 001223',
    href: 'tel:+8801842001223',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+880 1842 001223',
    href: 'https://wa.me/8801842001223',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bangladesh',
    href: '#',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
  },
];

const socials = [
  { icon: Github, href: 'https://github.com/hamsakib', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hasanalmahmudsakib/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/hamsakib', label: 'Twitter/X' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61587748780848', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/hasanalmahmudsakib/', label: 'Instagram' },
];

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%), #030712',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-violet-400 font-mono text-sm">05.</span>
            <span className="text-slate-500 text-sm uppercase tracking-widest">Contact</span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl font-black text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-slate-500 max-w-xl text-sm leading-relaxed mt-6">
            Have a project in mind? Want to automate something? Looking for a developer who delivers?
            Send a message — I respond fast.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Contact info — left 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${item.bg} group hover:border-opacity-60 transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div className={`p-2.5 rounded-xl glass border ${item.bg}`}>
                    <item.icon size={18} className={item.color} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </a>
              </FadeIn>
            ))}

            {/* Social links */}
            <FadeIn delay={0.4}>
              <div className="p-5 rounded-2xl glass border border-white/[0.07]">
                <p className="text-slate-500 text-xs uppercase tracking-wider font-medium mb-4">Also find me on</p>
                <div className="flex gap-2">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      className="w-10 h-10 rounded-xl glass border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/30 transition-all hover:-translate-y-0.5"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact form — right 3 cols */}
          <FadeIn delay={0.2} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl glass border border-white/[0.07] space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration, etc."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-emerald-600 text-white'
                    : status === 'sending'
                    ? 'bg-violet-600/60 text-white/60 cursor-wait'
                    : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25'
                }`}
              >
                {status === 'sent' ? (
                  <>✓ Message Sent!</>
                ) : status === 'sending' ? (
                  <>Sending…</>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-slate-600 text-xs text-center">
                I typically respond within 24 hours.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
