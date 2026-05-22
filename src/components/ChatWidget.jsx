import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const QA = [
  { triggers: ['hello', 'hi ', 'hey', 'yo', 'sup'], answer: "Hey there! 👋 I'm HAMS's portfolio bot. Ask me anything about his skills, projects, or availability!" },
  { triggers: ['who are you', 'who is hams', 'about you', 'introduce', 'tell me about'], answer: "I'm HAMS — Hasan Al Mahmud Sakib. Full Stack Developer & AI Automation Specialist from Bangladesh 🇧🇩. I build real production apps with React, Node.js, Python & AI tools. Currently studying BSc CSE at North South University." },
  { triggers: ['build', 'what can you', 'services', 'what do you do'], answer: "I build full-stack web apps, REST APIs, browser automation bots, and AI-powered tools. Real products — not tutorials. Examples: ReelScout (Instagram analytics), InstaAutomator (Playwright bot), KeenKeeper (task app)." },
  { triggers: ['hire', 'available', 'freelance', 'work with', 'work together'], answer: "Yes! I'm open for freelance work right now. I respond fast — usually within a few hours. Best way: email hamsakib03@gmail.com or WhatsApp +880 1842 001223." },
  { triggers: ['rate', 'price', 'cost', 'charge', 'how much', 'budget'], answer: "My rate depends on the project scope and timeline. DM me at hamsakib03@gmail.com with project details and I'll give you a fair quote within 24 hours." },
  { triggers: ['stack', 'tech', 'skill', 'language', 'framework', 'tools'], answer: "React · Next.js · Node.js · Python · MongoDB · PostgreSQL · Playwright · Claude AI · Docker · Tailwind CSS. I use AI co-pilots (Claude, ChatGPT) to ship faster than traditional dev cycles." },
  { triggers: ['project', 'reelscout', 'instaautomator', 'keenkeeper', 'plutommc', 'built', 'portfolio'], answer: "4 main projects:\n📊 ReelScout — Instagram analytics platform\n🤖 InstaAutomator — browser automation bot\n✅ KeenKeeper — smart task management\n🚀 PlutoMMC — Minecraft server platform\n\nScroll to the Projects section to see details!" },
  { triggers: ['location', 'country', 'where', 'bangladesh', 'timezone'], answer: "Based in Bangladesh 🇧🇩 (GMT+6). I work with clients globally — I adapt my schedule for meetings across timezones. Remote work is my default." },
  { triggers: ['contact', 'email', 'reach', 'message', 'phone', 'whatsapp'], answer: "📧 hamsakib03@gmail.com\n📱 +880 1842 001223\n💬 WhatsApp: wa.me/8801842001223\n\nI typically respond within a few hours!" },
  { triggers: ['resume', 'cv', 'download'], answer: "You can download my CV using the button in the hero section at the top of the page! 👆" },
  { triggers: ['university', 'nsu', 'north south', 'education', 'study', 'degree'], answer: "I'm studying BSc in Computer Science & Engineering at North South University — Bangladesh's #1 private university. Currently ongoing." },
  { triggers: ['ai', 'automation', 'playwright', 'claude', 'gpt', 'bot'], answer: "AI & automation is my specialty. I've built Instagram automation bots with Playwright, integrated Claude & OpenAI APIs into apps, and I use n8n for workflow automation. It's not a buzzword for me — it's how I ship." },
];

const QUICK = ["Who are you?", "What can you build?", "Available for hire?", "What's your tech stack?", "Show me your projects"];

function getAnswer(text) {
  const lower = text.toLowerCase();
  for (const qa of QA) {
    if (qa.triggers.some(t => lower.includes(t))) return qa.answer;
  }
  return "Not sure about that one! Try asking about HAMS's skills, projects, availability, or stack. Or just email hamsakib03@gmail.com — he responds fast! 😊";
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! 👋 I'm HAMS's AI assistant. Ask me anything about him, or tap a quick question below!" }
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const scrollRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(p => [...p, { from: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { from: 'bot', text: getAnswer(msg) }]);
    }, 600 + Math.random() * 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-80 rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/60"
            style={{ background: 'rgba(8,8,20,0.97)', backdropFilter: 'blur(24px)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.12))' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                  <Bot size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Ask HAMS</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-emerald-400 text-[11px]">Online now</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1">
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-64 overflow-y-auto px-4 py-3 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124,58,237,0.2) transparent' }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[86%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.from === 'user'
                        ? 'bg-violet-600 text-white rounded-br-sm'
                        : 'bg-white/[0.07] text-slate-300 rounded-bl-sm border border-white/[0.06]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-3 py-2.5 rounded-2xl rounded-bl-sm bg-white/[0.07] border border-white/[0.06] flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(); }}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-violet-500/40 transition-colors"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500 flex items-center justify-center transition-colors flex-shrink-0 hover:shadow-lg hover:shadow-violet-500/25"
              >
                <Send size={13} className="text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/30 relative"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
        title="Chat with HAMS's AI assistant"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#030712]" />}
      </motion.button>
    </div>
  );
}
