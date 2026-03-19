
import React from 'react';
import { ArrowRight, Box, GitBranch, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedPosts: React.FC = () => {
  return (
    <section className="pt-24 pb-40 relative overflow-hidden bg-dark">
       {/* 1. Seamless Transition Gradient from Hero */}
       <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-dark via-dark to-transparent z-10 pointer-events-none" />

       {/* 2. Central Cosmic Haze */}
       <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/20 blur-[180px] rounded-full mix-blend-screen opacity-60" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen" />
       </div>

       {/* 3. Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark via-dark to-transparent z-0 pointer-events-none" />

       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Section */}
          <div className="relative text-center mb-32 max-w-3xl mx-auto pt-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center"
            >
                <h2 className="relative z-10 leading-none font-mono tracking-tight text-4xl md:text-6xl font-bold text-white">
                    <span className="text-accent">{'>'}</span> Feature_Highlights
                </h2>

                <div className="mt-8 max-w-2xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-lg md:text-xl text-gray-400 font-mono leading-relaxed text-center px-8">
                            <span className="text-accent">{'//'}</span> Sharing my approach to infrastructure challenges and DevOps mental models.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              <PostCard 
                category="Infrastructure"
                title="Cluster Constellations" 
                subtitle="Navigating the complex galaxy of Kubernetes pods and nodes."
                visual={<K8sVisual />}
                delay={0.1}
              />
              <PostCard 
                category="Automation"
                title="Velocity Thrusters" 
                subtitle="Building resilient CI/CD pipelines for lightspeed delivery."
                visual={<PipelineVisual />}
                delay={0.2}
              />
              <PostCard 
                category="Architecture"
                title="Orbital Mechanics" 
                subtitle="Distributed patterns and high-availability system design."
                visual={<GridVisual />}
                delay={0.3}
              />
          </div>
       </div>
    </section>
  );
};

const PostCard: React.FC<{ category: string; title: string; subtitle: string; visual: React.ReactNode; delay: number }> = ({ category, title, subtitle, visual, delay }) => {
    return (
        <motion.a 
            href="#" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden hover:border-accent/30 transition-all duration-500 flex flex-col h-full hover:shadow-[0_0_30px_rgba(255,207,13,0.05)] hover:-translate-y-1"
        >
             {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

            {/* Visual Container */}
            <div className="h-64 bg-[#0f0f0f] flex items-center justify-center relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-[200%] w-full animate-[scan_4s_linear_infinite]" />
                <div className="transform transition-transform duration-500 group-hover:scale-110 relative z-10 grayscale group-hover:grayscale-0 transition-all">
                    {visual}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col justify-end relative z-10 bg-[#0a0a0a]">
                <div className="mb-3">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/20 px-2 py-1 rounded bg-accent/5 group-hover:bg-accent/10 transition-colors">
                        {category}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-mono">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">{subtitle}</p>
                
                <div className="mt-6 flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors font-mono">
                    <span>{'>'} Initialize Sequence</span>
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
            `}</style>
        </motion.a>
    );
};

const K8sVisual = () => (
    <div className="relative transform scale-100">
        <div className="w-32 h-32 rounded-full border border-white/10 relative flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">
             <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute w-[140%] h-[140%] animate-[spin_8s_linear_infinite_reverse]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full blur-[1px] shadow-[0_0_10px_var(--accent)]" />
             </div>
             <div className="grid grid-cols-2 gap-2 relative z-10">
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-accent/10 border border-accent/50" />
             </div>
        </div>
    </div>
);

const PipelineVisual = () => (
    <div className="flex items-center space-x-2 transform scale-100">
        <div className="relative">
             <div className="w-10 h-10 rounded-lg border border-green-500/30 flex items-center justify-center bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <Box className="w-5 h-5 text-green-500/80" />
             </div>
        </div>
        <div className="w-12 h-1 bg-white/5 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-accent/80 animate-[shimmer_1.5s_infinite]" />
        </div>
        <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/5 shadow-[0_0_15px_rgba(255,207,13,0.1)]">
             <GitBranch className="w-5 h-5 text-accent" />
        </div>
        <div className="w-12 h-1 bg-white/5 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-accent/80 animate-[shimmer_1.5s_infinite] delay-75" />
        </div>
        <Rocket className="w-6 h-6 text-white/80 rotate-45" />
        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
    </div>
);

const GridVisual = () => (
    <div className="relative w-32 h-32 transform rotate-45 scale-75">
        <div className="absolute inset-0 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
            <div className="rounded-xl border border-accent/40 bg-accent/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,207,13,0.1)] animate-pulse" />
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full z-20 shadow-[0_0_10px_white]" />
        <div className="absolute inset-0 border border-white/5 rounded-full scale-150" />
    </div>
);

export default FeaturedPosts;
