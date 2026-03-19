
import React from 'react';
import { Eye, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ViewType } from '../types';

interface YearlyRetrospectiveProps {
  onNavigate?: (view: ViewType) => void;
}

const YearlyRetrospective: React.FC<YearlyRetrospectiveProps> = ({ onNavigate }) => {
  const titleText = "Yearly Retrospective";
  const typingDuration = 0.5; // Optimized speed
  const descriptionDelay = typingDuration + 0.1;
  const cardsDelay = descriptionDelay + 0.2;

  return (
    <section className="pt-24 pb-32 w-full bg-dark relative overflow-hidden">
         
         {/* --- Background Effects --- */}
         <div className="absolute inset-0 pointer-events-none">
             {/* 1. Gradient Transition */}
             <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark to-transparent z-10" />
             
             {/* 2. Nebulas - Optimized: reduced count/complexity if needed, but kept for visual fidelity */}
             <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
             <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full mix-blend-screen" />
             
             {/* 3. Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
         </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-6"> {/* Reduced margin from mb-10 */}
                {/* Typing Title */}
                <div className="flex items-baseline gap-4 mb-2">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tighter leading-none flex items-center relative text-white">
                        <span className="text-accent mr-3 tracking-normal">{'>_'}</span>
                        
                        <div className="relative inline-block">
                            <motion.span
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                viewport={{ once: true }}
                                transition={{ duration: typingDuration, ease: "linear" }}
                                className="inline-block text-white"
                            >
                                {titleText}
                            </motion.span>
                            
                            <motion.span
                                initial={{ left: 0 }}
                                whileInView={{ left: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: typingDuration, ease: "linear" }}
                                className="absolute top-0 bottom-2 w-[0.6em] ml-1"
                            >
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full bg-accent"
                                />
                            </motion.span>
                        </div>
                    </h2>
                </div>
                
                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: descriptionDelay, duration: 0.5 }}
                    className="overflow-hidden"
                >
                    <p className="text-gray-400 text-sm sm:text-lg md:text-xl leading-relaxed font-mono lg:whitespace-nowrap pl-4 border-l-2 border-accent/20">
                        {'//'} Tracking progress in career and life. A comprehensive log of yearly milestones.
                    </p>
                </motion.div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <RetroCard
                    year="2024"
                    title="Scaling Systems & Solo Travel"
                    subtitle="Mastering high-scale architecture while exploring the world solo."
                    views="4,218"
                    delay={cardsDelay}
                    onNavigate={onNavigate}
                />
                <RetroCard
                    year="2023"
                    title="The First Architect Role"
                    subtitle="Navigating the tech winter and stepping into senior leadership."
                    views="2,982"
                    delay={cardsDelay + 0.1}
                    onNavigate={onNavigate}
                />
                <RetroCard
                    year="2022"
                    title="Kubernetes Certification"
                    subtitle="Bootcamp graduation and the beginning of the cloud native journey."
                    views="3,107"
                    delay={cardsDelay + 0.2}
                    onNavigate={onNavigate}
                />
            </div>
        </div>
    </section>
  );
};

const RetroCard: React.FC<{ year: string; title: string; subtitle: string; views: string; delay?: number; onNavigate?: (view: ViewType) => void }> = ({ year, title, subtitle, views, delay = 0, onNavigate }) => (
    <motion.button
        onClick={() => onNavigate && onNavigate('posts')}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        className="group relative block h-full min-h-[280px] sm:min-h-[340px] w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] text-left"
    >
        {/* Subtle Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Big Year Number Background */}
        <div className="absolute -top-8 -right-8 text-[140px] leading-none font-black text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-500 select-none font-mono tracking-tighter z-0">
            {year}
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 flex flex-col h-full text-left">
            
            {/* Top Metadata */}
            <div className="flex justify-between items-start mb-auto">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                    <Calendar className="w-5 h-5" />
                </div>
                
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 group-hover:border-white/10 transition-colors font-mono">
                    <Eye className="w-3 h-3" />
                    {views} Views
                </div>
            </div>

            {/* Bottom Content */}
            <div className="mt-8 text-left">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest font-mono">
                       RETROSPECTIVE
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-mono leading-tight text-left">
                    {title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed font-sans border-l border-white/10 pl-4 group-hover:border-accent/30 transition-colors text-left">
                    {subtitle}
                </p>
            </div>
        </div>

        {/* Bottom Progress Bar Line */}
        <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
    </motion.button>
)

export default YearlyRetrospective;
