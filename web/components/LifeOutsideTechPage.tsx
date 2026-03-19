
import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Coffee, Camera, Plane, MapPin } from 'lucide-react';

const HOBBIES = [
    {
        title: "Gaming",
        icon: <Gamepad2 className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        description: "Exploring virtual worlds. Currently obsessed with Baldur's Gate 3 and Cyberpunk 2077. I enjoy RPGs that allow for deep immersion and complex decision-making."
    },
    {
        title: "Coffee Brewing",
        icon: <Coffee className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        description: "The morning ritual. Dialing in the perfect espresso shot or V60 pour-over. Exploring beans from different regions of Indonesia and Ethiopia."
    },
    {
        title: "Photography",
        icon: <Camera className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
        description: "Capturing moments. Mostly street photography and architectural shots. I love playing with light and shadows in urban environments."
    },
    {
        title: "Traveling",
        icon: <Plane className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
        description: "Solo backpacking and experiencing new cultures. Recently visited Japan and was amazed by the blend of tradition and modernity."
    }
];

const LifeOutsideTechPage: React.FC = () => {
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> offline_mode
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} When the terminal is closed, this is where I traverse.
            </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOBBIES.map((hobby, idx) => (
                <motion.div 
                    key={hobby.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
                >
                    <div className="aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                        <img 
                            src={hobby.image} 
                            alt={hobby.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-accent">
                                {hobby.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white font-mono">{hobby.title}</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed font-sans">
                            {hobby.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Map Section */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-8 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 rounded-xl text-center"
        >
            <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2 font-mono">Based in Indonesia</h3>
            <p className="text-gray-400 font-sans">Exploring the archipelago and beyond. Always looking for the next adventure.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default LifeOutsideTechPage;
