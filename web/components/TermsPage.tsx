
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Copyright } from 'lucide-react';

const TermsPage: React.FC = () => {
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 mb-6 text-accent"
            >
                <FileText className="w-8 h-8" />
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
            >
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Service</span>
            </motion.h1>
        </div>

        {/* Content */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8"
        >
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Copyright className="w-5 h-5 text-accent" />
                    Intellectual Property
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        The content on this website (text, images, code snippets, and project descriptions) is the intellectual property of El Muhammad, unless otherwise noted or attributed to open source licenses.
                    </p>
                    <p>
                        You are free to use the open-source code snippets provided in the blog posts under the MIT License, provided proper attribution is given.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    Disclaimer
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        The information provided on this portfolio is for educational and informational purposes only. While I strive for accuracy, technology changes rapidly. I am not liable for any errors or omissions, or for any losses, injuries, or damages arising from the display or use of this information.
                    </p>
                    <p>
                        Code snippets are provided "as is" without warranty of any kind. Use them in production environments at your own risk.
                    </p>
                </div>
            </section>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsPage;
