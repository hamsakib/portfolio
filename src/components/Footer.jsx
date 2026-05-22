import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Facebook, Instagram, Heart, Zap } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/hamsakib', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/hasanalmahmudsakib/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/hamsakib', label: 'Twitter/X' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61587748780848', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/hasanalmahmudsakib/', label: 'Instagram' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.5), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white font-mono"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
              >
                HS
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Hasan Al Mahmud Sakib</p>
                <p className="text-slate-500 text-xs">Full Stack Developer</p>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Building production-ready apps with modern tech and AI — faster than traditional development cycles.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-slate-500 hover:text-violet-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get In Touch</h4>
            <a
              href="mailto:hamsakib03@gmail.com"
              className="text-slate-500 hover:text-violet-400 text-sm transition-colors block mb-2"
            >
              hamsakib03@gmail.com
            </a>
            <p className="text-slate-600 text-xs mb-5">Bangladesh 🇧🇩</p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-8 h-8 rounded-lg glass border border-white/[0.06] flex items-center justify-center text-slate-600 hover:text-white hover:border-violet-500/30 transition-all hover:-translate-y-0.5"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            © 2025 Hasan Al Mahmud Sakib. Built with{' '}
            <Heart size={11} className="text-red-400" /> and{' '}
            <Zap size={11} className="text-violet-400" /> Claude AI.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for freelance work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
