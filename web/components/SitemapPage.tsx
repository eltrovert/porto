
import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, Layout, Server, BookOpen, Shield } from 'lucide-react';
import { ViewType } from '../types';

interface SitemapPageProps {
  onNavigate?: (view: ViewType) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  
  // Refactored Data Structure for Grid Layout
  const directories = [
      {
          name: "root",
          icon: <Layout className="w-4 h-4 text-accent" />,
          items: [
              { name: "index.tsx", type: "file", view: 'home' },
              { name: "about.tsx", type: "file", view: 'about' },
              { name: "sitemap.xml", type: "file", view: 'sitemap' },
          ]
      },
      {
          name: "engineering",
          icon: <Server className="w-4 h-4 text-blue-400" />,
          items: [
              { name: "projects.tsx", type: "file", view: 'projects' },
              { name: "blog.tsx", type: "file", view: 'posts' },
              { name: "talks.tsx", type: "file", view: 'talks' },
              { name: "uses.tsx", type: "file", view: 'uses' },
              { name: "stack.json", type: "file", view: 'kudos' },
          ]
      },
      {
          name: "resources",
          icon: <BookOpen className="w-4 h-4 text-green-400" />,
          items: [
              { name: "library.tsx", type: "file", view: 'books' },
              { name: "notes.tsx", type: "file", view: 'notes' },
              { name: "guestbook.tsx", type: "file", view: 'guestbook' },
              { name: "life.tsx", type: "file", view: 'life' },
          ]
      },
      {
          name: "legal",
          icon: <Shield className="w-4 h-4 text-red-400" />,
          items: [
              { name: "privacy.md", type: "file", view: 'privacy' },
              { name: "terms.md", type: "file", view: 'terms' },
          ]
      }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
       {/* --- Standardized Background Section --- */}
       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* 1. Nebula Gradients */}
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           
           {/* 2. Stars & Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

           {/* 3. Floating Debris */}
           <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-yellow-200/20 rounded-full animate-float-slow shadow-[0_0_10px_rgba(255,207,13,0.5)]" />
           <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/10 rounded-full animate-float-medium" />
           <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white/10 rounded-full animate-ping" />

           {/* 4. Hazy Orbital Tracks & Comets */}
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
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
            >
                Directory <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Tree</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                /var/www/html
            </motion.p>
        </div>

        {/* Tree Container - Grid Layout for Lower Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {directories.map((dir, idx) => (
                <motion.div
                    key={dir.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 relative group overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                        <div className="p-2 bg-white/5 rounded-lg">
                            {dir.icon}
                        </div>
                        <h2 className="text-lg font-bold text-white font-mono">{dir.name}/</h2>
                    </div>

                    {/* Children Items */}
                    <ul className="space-y-3 relative z-10">
                        {dir.items.map((item, itemIdx) => (
                            <li key={item.name} className="flex items-center gap-3 group/item">
                                {/* Tree Lines */}
                                <div className="w-4 h-4 border-l border-b border-white/10 rounded-bl-lg -mt-2 ml-1" />
                                
                                <button 
                                    onClick={() => item.view && onNavigate && onNavigate(item.view as ViewType)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition-all font-mono text-sm"
                                >
                                    <FileText className="w-3.5 h-3.5 text-gray-600 group-hover/item:text-accent transition-colors" />
                                    <span className={item.view ? 'group-hover/item:text-accent transition-colors' : ''}>
                                        {item.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Background Decorative */}
                    <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default SitemapPage;