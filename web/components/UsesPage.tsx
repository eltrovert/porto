
import React from 'react';
import { motion } from 'framer-motion';
import astroUses from "../data/astro-uses.json";

// Group uses items by category, pinned items first in each category
const SECTIONS = Object.values(
  astroUses
    .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
    .reduce<Record<string, { category: string; items: { title: string; description: string; link?: string; linkText?: string }[] }>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { category: item.category, items: [] };
      }
      acc[item.category].items.push({
        title: item.name,
        description: item.description,
        link: item.website || undefined,
        linkText: item.website ? "Visit Website" : undefined,
      });
      return acc;
    }, {})
);

const UsesPage: React.FC = () => {
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> hardware_manifest.json
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} A peek of my workspace and tools.
            </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-24 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group"
        >
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
            <img 
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2000&auto=format&fit=crop" 
                alt="Workspace Setup" 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
             {/* Window Controls Overlay */}
             <div className="absolute top-4 left-4 flex gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm" />
            </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-24">
            {SECTIONS.map((section, idx) => (
                <div key={section.category} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                    {/* Category Title */}
                    <div className="md:col-span-1">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest sticky top-32 font-mono">
                            {section.category}
                        </h2>
                    </div>
                    
                    {/* Items List */}
                    <div className="md:col-span-3 space-y-12">
                        {section.items.map((item, itemIdx) => (
                            <motion.div 
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: itemIdx * 0.1 }}
                                className="group"
                            >
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors font-mono">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-base font-sans">
                                    {item.description}
                                </p>
                                {item.link && (
                                    <a href={item.link} className="inline-flex items-center mt-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-white transition-colors font-mono">
                                        <span className="border-b border-accent/30 hover:border-white pb-0.5">{item.linkText || "View Link"}</span>
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default UsesPage;
