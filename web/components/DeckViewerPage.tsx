
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';

interface DeckViewerPageProps {
  onBack: () => void;
}

const DeckViewerPage: React.FC<DeckViewerPageProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 12;

  const nextSlide = () => setCurrentSlide(prev => Math.min(totalSlides, prev + 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(1, prev - 1));

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="group flex items-center space-x-2 text-gray-500 hover:text-white mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Talks</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Viewer */}
            <div className="flex-1">
                <div className="relative aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                    {/* Mock Slide Content */}
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Slide {currentSlide}</h2>
                            <p className="text-gray-500">Zero Trust Networking in Practice</p>
                            <div className="mt-8 w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${(currentSlide / totalSlides) * 100}%` }} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Controls Overlay */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                        <button onClick={prevSlide} disabled={currentSlide === 1} className="p-2 rounded-full bg-black/50 text-white hover:bg-accent hover:text-black disabled:opacity-30 disabled:hover:bg-black/50 disabled:hover:text-white transition-all">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button onClick={nextSlide} disabled={currentSlide === totalSlides} className="p-2 rounded-full bg-black/50 text-white hover:bg-accent hover:text-black disabled:opacity-30 disabled:hover:bg-black/50 disabled:hover:text-white transition-all">
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                {/* Bottom Toolbar */}
                <div className="mt-4 flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-lg p-3 px-6">
                    <span className="text-sm text-gray-400 font-mono">Page {currentSlide} / {totalSlides}</span>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-white"><Download className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-white"><Maximize2 className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* Sidebar info */}
            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Zero Trust Networking</h3>
                    <p className="text-sm text-gray-400 mb-4">Presented at DevOps Days Singapore, 2023.</p>
                    <div className="prose prose-invert text-xs text-gray-500 leading-relaxed">
                        <p>Moving beyond VPNs: Implementing mTLS everywhere using Istio and Cilium. Practical architectural patterns for securing microservices.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DeckViewerPage;
