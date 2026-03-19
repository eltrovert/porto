
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Box, TerminalSquare, Activity, GitBranch, Settings } from 'lucide-react';

const AbstractVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center -mt-24" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(5deg) rotateY(5deg)' }}>
      
      {/* Background Universe Nodes (Stars) */}
      <UniverseNode top="10%" left="20%" delay={0} />
      <UniverseNode top="15%" left="80%" delay={2} />
      <UniverseNode top="80%" left="15%" delay={4} />
      <UniverseNode top="75%" left="85%" delay={1} />
      <UniverseNode top="40%" left="90%" delay={3} />
      <UniverseNode top="50%" left="10%" delay={5} />
      
      {/* Connection Lines (Subtle Mesh) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <line x1="20%" y1="10%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        <line x1="80%" y1="15%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        <line x1="15%" y1="80%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        <line x1="85%" y1="75%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
      </svg>

      {/* Background Glows - Brightened */}
      <div className="absolute inset-0 bg-accent/30 blur-[100px] rounded-full transform scale-75 opacity-60" />
      
      {/* Orbital Rings */}
      <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" style={{ transform: 'translateZ(-50px)' }} />
      <div className="absolute w-[420px] h-[420px] border border-white/5 rounded-full animate-[spin_50s_linear_infinite_reverse] opacity-50" style={{ transform: 'translateZ(-20px)' }} />
      <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute w-[220px] h-[220px] border border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" style={{ transform: 'translateZ(20px)' }} />

      {/* Center Astronaut Avatar - Floating Animation */}
      <motion.div 
        className="relative z-20 w-48 h-48 flex items-center justify-center"
        style={{ transform: 'translateZ(50px)' }}
        animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0]
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
      >
         {/* Helmet/Visor Container */}
         <div className="w-full h-full rounded-full border-4 border-white/10 shadow-[0_0_50px_rgba(255,207,13,0.2)] overflow-hidden relative bg-black group">
            
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-indigo-500/10 z-10 mix-blend-overlay" />
            
            {/* Astronaut Image - Public Asset */}
            <img 
                src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop" 
                alt="Astronaut Avatar" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            />
            
            {/* Glass Reflection Effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent z-20 pointer-events-none opacity-50" />
            
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.1] z-10 mix-blend-overlay pointer-events-none" />
         </div>
      </motion.div>

      {/* Orbiting Tech Icons */}
      
      {/* Outer Orbit */}
      <OrbitIcon radius={250} duration={30} delay={0} icon={<KubernetesIcon size={40} />} />
      <OrbitIcon radius={250} duration={30} delay={10} icon={<DockerIcon size={32} />} />
      <OrbitIcon radius={250} duration={30} delay={20} icon={<TerraformIcon size={32} />} />

      {/* Middle Orbit */}
       <OrbitIcon radius={210} duration={25} delay={5} reverse icon={
         <div className="p-2 bg-dark border border-white/20 rounded-lg">
            <Activity className="w-5 h-5 text-green-400" />
         </div>
       } />

      {/* Inner Orbit */}
      <OrbitIcon radius={175} duration={15} delay={0} reverse icon={
         <div className="p-2 bg-dark border border-white/20 rounded-lg">
            <GitBranch className="w-6 h-6 text-[#f05032]" />
         </div>
      } />
      <OrbitIcon radius={175} duration={15} delay={7.5} reverse icon={
         <div className="p-2 bg-dark border border-white/20 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
         </div>
      } />


      {/* Floating Code Snippets */}
      
      {/* Top Right: AWS Resource */}
      <FloatingCard className="absolute top-[10%] right-[5%] z-30" delay={0}>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl w-48 hover:border-accent/30 transition-all duration-300" style={{ transform: 'translateZ(80px)' }}>
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 bg-white/20 rounded w-1/3" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
            <div className="h-2 bg-white/10 rounded w-1/2" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-accent" />
            <span className="text-[10px] text-gray-400 font-mono">aws_eks_cluster</span>
          </div>
        </div>
      </FloatingCard>

      {/* Middle Left: Terminal Log */}
      <FloatingCard className="absolute top-[35%] left-[0%] z-30" delay={1.5}>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl w-44 hover:border-accent/30 transition-all duration-300" style={{ transform: 'translateZ(60px)' }}>
           <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
               <TerminalSquare className="w-3 h-3 text-gray-500" />
               <span className="text-[10px] text-gray-500 font-mono">server.log</span>
           </div>
           <div className="font-mono text-[8px] space-y-1 text-green-400/80">
               <div>{">"} npm start</div>
               <div className="text-gray-400">Starting service...</div>
               <div>✓ Connected to DB</div>
               <div className="animate-pulse">_</div>
           </div>
        </div>
      </FloatingCard>

      {/* Bottom Right: K8s Manifest */}
      <FloatingCard className="absolute bottom-[15%] right-[10%] z-30" delay={2}>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl w-52 hover:border-accent/30 transition-all duration-300" style={{ transform: 'translateZ(100px)' }}>
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="space-y-1.5 font-mono text-[8px] text-gray-500">
             <div className="flex"><span className="text-purple-400">apiVersion:</span>&nbsp;apps/v1</div>
             <div className="flex"><span className="text-purple-400">kind:</span>&nbsp;Deployment</div>
             <div className="flex pl-2"><span className="text-blue-400">name:</span>&nbsp;prod-api</div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Box className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] text-gray-400 font-mono">deployment.yaml</span>
          </div>
        </div>
      </FloatingCard>

    </div>
  );
};

// --- Helper Components ---

const UniverseNode: React.FC<{ top: string; left: string; delay: number }> = ({ top, left, delay }) => (
    <div 
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{ top, left, animationDelay: `${delay}s`, opacity: 0.3 }}
    />
);

const OrbitIcon: React.FC<{ radius: number; duration: number; delay: number; icon: React.ReactNode; reverse?: boolean }> = ({ radius, duration, delay, icon, reverse = false }) => {
    return (
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ 
                width: radius * 2, 
                height: radius * 2,
                animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
                animationDelay: `-${delay}s`,
                transformStyle: 'preserve-3d',
            }}
        >
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    animation: `spin ${duration}s linear infinite ${!reverse ? 'reverse' : ''}`, // Counter-rotate to keep icon upright
                }}
            >
                <div className="bg-dark p-2 rounded-full border border-white/10 shadow-xl hover:border-accent hover:scale-110 transition-all cursor-pointer z-20 relative">
                    {icon}
                </div>
            </div>
             <style>{`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

const FloatingCard: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({ className, delay = 0, children }) => (
    <motion.div
        className={className}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
        {children}
    </motion.div>
);

// --- Tech Icons ---
const KubernetesIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#326ce5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M12 2v4" /><path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" /><path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
    </svg>
);

const DockerIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0db7ed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 10a6 6 0 0 0-6-6H4a2 2 0 0 0-2 2v2" />
        <path d="M22 13h-4.5" />
        <rect x="2" y="10" width="20" height="8" rx="2" />
        <circle cx="6" cy="14" r="1" fill="currentColor" />
        <circle cx="10" cy="14" r="1" fill="currentColor" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
    </svg>
);

const TerraformIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7b42bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8l8-4l8 4v8l-8 4l-8-4z" />
            <path d="M12 4v16" />
            <path d="M4 8l8 4l8-4" />
    </svg>
);

export default AbstractVisual;
