
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, FileText, Calendar, MapPin, Play, Mic, Heart, MessageSquare, Share2 } from 'lucide-react';
import { ViewType } from '../types';
import astroTalks from "../data/astro-talks.json";

// --- Types ---
type TalkType = 'All' | 'Conference' | 'Workshop' | 'Meetup';

interface Talk {
    id: number;
    title: string;
    event: string;
    location: string;
    date: string;
    type: TalkType;
    description: string;
    videoLink?: string;
    slidesLink?: string;
    thumbnail: string;
    attendees?: string;
}

// Map astro talk types to our filter types
const TYPE_MAP: Record<string, TalkType> = {
  "Webinar": "Conference",
  "Conference Talk": "Conference",
  "Community Talk": "Meetup",
  "Meetup": "Meetup",
};

// Topic-based Unsplash placeholders for each talk
const TALK_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
];

const TALKS: Talk[] = astroTalks.map((t, idx) => ({
    id: idx + 1,
    title: t.title,
    event: t.event,
    location: t.location,
    date: t.date,
    type: TYPE_MAP[t.type] || "Conference",
    description: t.description,
    videoLink: t.recording || undefined,
    slidesLink: t.slides || undefined,
    thumbnail: TALK_IMAGES[idx] || TALK_IMAGES[0],
}));

const STATS = [
    { label: "Total Talks", value: "5" },
    { label: "Cities", value: "4" },
    { label: "Topics", value: "DevOps" },
];

interface TalksPageProps {
    onNavigate?: (view: ViewType) => void;
}

const TalksPage: React.FC<TalksPageProps> = ({ onNavigate }) => {
    const [filter, setFilter] = useState<TalkType>('All');

    const filteredTalks = filter === 'All' ? TALKS : TALKS.filter(t => t.type === filter);

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
                
                {/* --- Header --- */}
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-6 font-mono"
                    >
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span>Live Transmission</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
                    >
                        <span className="text-accent">{'>_'}</span> transmission_logs
                        <span className="animate-pulse ml-2 text-accent">_</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-mono text-sm md:text-base"
                    >
                        {'//'} Keynotes, workshops, and deep-dive sessions from various coordinates.
                    </motion.p>
                </div>

                {/* --- Impact Stats --- */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12 border-y border-white/10 py-8 bg-[#0a0a0a]/30 backdrop-blur-sm rounded-xl">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                            <div className="text-xs text-accent/80 uppercase tracking-widest font-mono">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* --- Controls --- */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl">
                        {['All', 'Conference', 'Workshop', 'Meetup'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t as TalkType)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all font-mono ${
                                    filter === t 
                                    ? 'bg-accent text-black shadow-lg shadow-yellow-500/20 font-bold' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Talks Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTalks.map((talk) => (
                        <TalkCard key={talk.id} talk={talk} onNavigate={onNavigate} />
                    ))}
                </div>

                {/* --- Footer CTA --- */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-8 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-2xl w-full relative overflow-hidden group">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2 font-mono">Initialize Communication?</h3>
                            <p className="text-gray-400 mb-6 font-sans">Open a channel for speaking inquiries at your event.</p>
                            <a href="mailto:hello@example.com" className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-accent transition-colors font-mono">
                                <Mic className="w-4 h-4" />
                                <span>Request Speaker Frequency</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

interface InteractionBarProps {
    initialLikes?: number;
    initialComments?: number;
}

const InteractionBar: React.FC<InteractionBarProps> = ({ initialLikes = 0, initialComments = 0 }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLiked) {
            setLikes(l => l - 1);
        } else {
            setLikes(l => l + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Logic for sharing or commenting
    };

    return (
        <div className="flex items-center gap-6 mt-auto pt-4 border-t border-white/5 font-mono">
             <button 
                onClick={handleLike}
                className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-red-500 group"
             >
                 <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
                 <span className={`${isLiked ? 'text-white' : 'text-gray-500'}`}>{likes || 'Like'}</span>
             </button>

             <button 
                onClick={handleAction}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group"
             >
                 <MessageSquare className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                 <span>{initialComments || 'Comment'}</span>
             </button>

             <button 
                onClick={handleAction}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group"
             >
                 <Share2 className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                 <span>Share</span>
             </button>
        </div>
    );
};

const TalkCard: React.FC<{ talk: Talk; onNavigate?: (view: ViewType) => void }> = ({ talk, onNavigate }) => {
    
    const handleViewDeck = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) onNavigate('deck');
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(255,207,13,0.05)]"
        >
            {/* Thumbnail - Top */}
            <div className="w-full h-56 relative shrink-0 overflow-hidden bg-black border-b border-white/5">
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-20 z-10 transition-opacity" />
                <img 
                    src={talk.thumbnail} 
                    alt={talk.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                />
                
                {/* Play Button Overlay if Video Exists */}
                {talk.videoLink && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform hover:bg-accent hover:border-accent hover:text-black text-white">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                    </div>
                )}

                <div className="absolute top-3 left-3 z-20 font-mono">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            talk.type === 'Conference' ? 'bg-blue-600 text-white border-blue-500' :
                            talk.type === 'Workshop' ? 'bg-purple-600 text-white border-purple-500' :
                            'bg-green-600 text-white border-green-500'
                        }`}>
                            {talk.type}
                        </span>
                </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3 font-mono">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            <span>{talk.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            <span>{talk.location}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors leading-tight font-mono">
                        {talk.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4 font-mono">
                        <span className="text-sm font-bold text-gray-300">@ {talk.event}</span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                        {talk.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 font-mono">
                        {talk.videoLink ? (
                            <a href={talk.videoLink} className="flex items-center space-x-2 text-white hover:text-accent transition-colors text-sm font-bold">
                                <Video className="w-4 h-4" />
                                <span>Watch Replay</span>
                            </a>
                        ) : (
                                <span className="flex items-center space-x-2 text-gray-600 text-sm font-bold cursor-not-allowed">
                                <Video className="w-4 h-4" />
                                <span>Recording Unavailable</span>
                            </span>
                        )}

                        <div className="w-px h-4 bg-white/10" />

                        {talk.slidesLink ? (
                            <button onClick={handleViewDeck} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                <FileText className="w-4 h-4" />
                                <span>View Deck</span>
                            </button>
                        ) : (
                            <span className="flex items-center space-x-2 text-gray-600 text-sm font-medium cursor-not-allowed">
                                <FileText className="w-4 h-4" />
                                <span>Deck Private</span>
                            </span>
                        )}
                    </div>

                    <InteractionBar initialLikes={Math.floor(Math.random() * 50) + 5} initialComments={Math.floor(Math.random() * 10)} />
                </div>
            </div>
        </motion.div>
    );
};

export default TalksPage;