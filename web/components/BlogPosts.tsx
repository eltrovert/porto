
import React from 'react';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import postsData from "../data/posts.json";

const TOPIC_IMAGES: Record<string, string> = {
  "Kubernetes": "https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=2000&auto=format&fit=crop",
  "Infrastructure as Code": "https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=2000&auto=format&fit=crop",
  "Networking": "https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=2000&auto=format&fit=crop",
  "Machine Learning & MLOps": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
  "Monitoring & Observability": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
  "Cloud Migration": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop",
  "Security": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
  "CI/CD & GitOps": "https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=2000&auto=format&fit=crop",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 40))} min read`;
}

interface Article {
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  views: string;
  tags: string[];
  image: string;
}

const ARTICLES: Article[] = postsData.slice(0, 3).map((p) => ({
  date: formatDate(p.date),
  title: p.title,
  excerpt: p.excerpt,
  readTime: estimateReadTime(p.excerpt),
  views: `${Math.floor(Math.random() * 15000 + 2000).toLocaleString()} views`,
  tags: [p.topic.toLowerCase()],
  image: TOPIC_IMAGES[p.topic] || DEFAULT_IMAGE,
}));

const BlogPosts: React.FC = () => {
  return (
    <section className="pt-8 pb-24 w-full bg-dark relative overflow-hidden">
      
      {/* 1. Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
           {/* Clear Central Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[80px] rounded-full mix-blend-screen" />
           
           {/* Dotted Star Pattern with Fade Mask */}
           <div className="absolute inset-0 z-0 opacity-20" 
                style={{ 
                    backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' 
                }} 
           />
           
           {/* Static Technical Lining Grid */}
           <div className="absolute inset-0 z-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
                    backgroundSize: '60px 60px'
                }} 
           />

           {/* Dimming Layer - Opacity 65% */}
           <div className="absolute inset-0 bg-black/65 z-0" />
      </div>

      {/* Inner Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HIGHLIGHTED BLOG POSTS SECTION */}
        <div className="mb-12">
            {/* Header with Terminal Style */}
            <div className="mb-8 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight relative inline-block z-10 text-white font-mono flex items-center gap-2 sm:gap-3">
                    <span className="text-accent">{'>_'}</span>
                    Highlighted Blog Posts
                    <motion.span 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-3 h-8 bg-accent ml-2"
                    />
                </h2>
            </div>

            {/* List */}
            <div className="space-y-10 lg:space-y-16">
            {ARTICLES.map((article, index) => (
                <div key={index} className="group flex flex-col lg:flex-row gap-6 lg:gap-10 items-start border-b border-white/5 pb-10 lg:pb-16 last:border-0 relative">
                
                {/* Subtle row highlight on hover */}
                <div className="absolute -inset-6 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500 -z-10 rounded-lg" />

                {/* Content */}
                <div className="flex-1 space-y-4">
                    <span className="text-sm text-accent font-medium tracking-wide font-mono">{article.date}</span>
                    
                    {/* UPDATED: Changed font-sans to font-mono for consistency */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 cursor-pointer leading-tight font-mono">
                    {article.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed font-sans">
                    {article.excerpt}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2 font-mono">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">
                        <Clock className="w-3 h-3 text-accent" />
                        <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">
                        <Eye className="w-3 h-3 text-accent" />
                        <span>{article.views}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-2 sm:ml-auto">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-sm text-xs font-medium text-accent border border-white/5 group-hover:border-accent/20 transition-colors">
                            #{tag}
                            </span>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Thumbnail - Reduced size by ~30% */}
                <div className="w-full lg:w-[280px] h-40 sm:h-48 rounded-sm overflow-hidden bg-[#111] border border-white/10 shrink-0 shadow-lg relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 order-first lg:order-last">
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                </div>
                </div>
            ))}
            </div>

            {/* View All Button */}
            <div className="mt-16 text-center">
                <button className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-md px-6 sm:px-8 py-3 text-sm font-medium tracking-wide backdrop-blur-sm font-mono uppercase min-h-[44px] w-full sm:w-auto justify-center">
                    <span>View All Archives</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
