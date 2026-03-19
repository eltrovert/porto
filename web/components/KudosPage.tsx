
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, PenTool, Layout } from 'lucide-react';

const TECH_STACK = [
    { name: "React", description: "UI Library", icon: <Code2 className="w-5 h-5" /> },
    { name: "Tailwind CSS", description: "Styling", icon: <PenTool className="w-5 h-5" /> },
    { name: "Framer Motion", description: "Animations", icon: <Layout className="w-5 h-5" /> },
    { name: "Lucide Icons", description: "Iconography", icon: <Heart className="w-5 h-5" /> }
];

const KudosPage: React.FC = () => {
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> dependencies
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} Appreciation for the tools and people that make this possible.
            </motion.p>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
            <h2 className="text-2xl font-bold text-white mb-8 text-center font-mono">package.json</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {TECH_STACK.map((tech, idx) => (
                    <motion.div 
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300"
                    >
                        <div className="flex justify-center mb-4 text-accent">
                            {tech.icon}
                        </div>
                        <h3 className="text-white font-bold mb-1 font-mono">{tech.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">{tech.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Inspirations / Thanks */}
        <div className="text-center bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 rounded-xl p-10">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">Special Thanks</h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto font-sans">
                To the open source community, the designers who share their work on Dribbble and Pinterest for inspiration, and to the friends who provided feedback on early iterations of this portfolio.
            </p>
            <div className="mt-8">
                <Heart className="w-8 h-8 text-red-500 mx-auto animate-pulse" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default KudosPage;
