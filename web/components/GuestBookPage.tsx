
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User } from 'lucide-react';

const SIGNATURES = [
    { name: "Alice M.", message: "Love the nebula design! The 3D effect is stunning.", date: "Oct 24, 2024" },
    { name: "DevDan", message: "Great collection of Kubernetes resources. Thanks for sharing.", date: "Oct 22, 2024" },
    { name: "Sarah J.", message: "Your 'Life Outside Tech' page is inspiring. Keep traveling!", date: "Oct 20, 2024" }
];

const GuestBookPage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Logic to submit message would go here
      setMessage("");
      alert("Thanks for signing the guestbook! (Demo)");
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
       {/* --- Standardized Background Section --- */}
       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* Nebula Gradients */}
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           
           {/* Stars & Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

           {/* Floating Debris */}
           <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-yellow-200/20 rounded-full animate-float-slow shadow-[0_0_10px_rgba(255,207,13,0.5)]" />
           <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/10 rounded-full animate-float-medium" />
           <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white/10 rounded-full animate-ping" />

           {/* Hazy Orbital Tracks */}
           <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1440 2200" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="cometGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#ffcf0d" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path d="M -200 600 Q 720 -200 1640 600" fill="none" stroke="url(#orbitGradient)" strokeWidth="1" className="opacity-30" />
                <path d="M 100 -100 Q 400 800 100 2000" fill="none" stroke="white" strokeWidth="0.5" className="opacity-20" strokeDasharray="5 10" />
                <ellipse cx="720" cy="1200" rx="900" ry="400" fill="none" stroke="white" strokeWidth="0.5" className="opacity-15 rotate-[-15deg] origin-center" />
                <path d="M -200 600 Q 720 -200 1640 600" fill="none" stroke="url(#cometGradient)" strokeWidth="2" className="animate-comet-1" strokeDasharray="100 2000" strokeLinecap="round" />
                <circle cx="1200" cy="400" r="1.5" fill="white" className="opacity-60" />
                <circle cx="200" cy="900" r="2" fill="white" className="opacity-40" />
           </svg>
      </div>
      <style>{`
        .animate-comet-1 { animation: cometMove1 12s linear infinite; }
        @keyframes cometMove1 { 0% { stroke-dashoffset: 2100; } 100% { stroke-dashoffset: -2100; } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-slow 6s ease-in-out infinite; }
      `}</style>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> visitor_log
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} Leave a mark on the digital void.
            </motion.p>
        </div>

        {/* Form */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 bg-[#0a0a0a] border border-white/10 rounded-xl p-6"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 font-mono">$ echo "message"</label>
                    <textarea 
                        id="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono text-sm"
                        placeholder="Say hello..."
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-accent text-black font-bold rounded-full hover:bg-accent/80 transition-colors font-mono">
                        <Send className="w-4 h-4" />
                        <span>[ENTER] Sign</span>
                    </button>
                </div>
            </form>
        </motion.div>

        {/* Signatures List */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                cat recent_signatures.log
            </h2>
            {SIGNATURES.map((sig, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="flex gap-4 p-4 border-b border-white/5 last:border-0"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-gray-400">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-white font-mono">{sig.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{sig.date}</span>
                        </div>
                        <p className="text-gray-400 font-sans">{sig.message}</p>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default GuestBookPage;
