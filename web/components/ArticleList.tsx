
import React from 'react';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Article {
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  views: string;
  tags: string[];
  image: string;
}

const ARTICLES: Article[] = [
  {
    date: 'December 10, 2024',
    title: 'Scaling Kubernetes Clusters with Karpenter',
    excerpt: 'An in-depth guide on how to implement high-performance node autoscaling for EKS clusters using Karpenter, replacing the traditional Cluster Autoscaler.',
    readTime: '6 min read',
    views: '7,288 views',
    tags: ['kubernetes', 'scaling'],
    image: 'https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=2000&auto=format&fit=crop'
  },
  {
    date: 'March 03, 2024',
    title: 'GitOps Patterns with ArgoCD',
    excerpt: 'A collection of advanced GitOps patterns including ApplicationSets, Generators, and multi-cluster management strategies for enterprise scale.',
    readTime: '10 min read',
    views: '8,777 views',
    tags: ['gitops', 'argocd'],
    image: 'https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=2000&auto=format&fit=crop'
  },
  {
    date: 'March 18, 2023',
    title: 'Secure Multi-Cloud Networking',
    excerpt: 'Solving connectivity challenges such as VPC peering, transit gateways, and implementing zero-trust mesh networking across AWS and GCP.',
    readTime: '7 min read',
    views: '14,792 views',
    tags: ['networking', 'security'],
    image: 'https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=2000&auto=format&fit=crop'
  }
];

const ArticleList: React.FC = () => {
  return (
    <section className="pt-8 pb-24 w-full bg-dark">
      
      {/* Inner Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FEATURED POSTS SECTION */}
        <div className="mb-32">
            {/* Header with Highlighter Animation */}
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight relative inline-block z-10">
                    Featured <span className="relative inline-block px-2">
                        Posts
                        <motion.span 
                            initial={{ width: '0%' }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="absolute bottom-1 left-0 h-[0.4em] bg-accent/60 -z-10 -rotate-1 rounded-sm"
                        />
                    </span>
                </h2>
            </div>

            {/* List */}
            <div className="space-y-16">
            {ARTICLES.map((article, index) => (
                <div key={index} className="group flex flex-col lg:flex-row gap-10 items-start border-b border-white/5 pb-16 last:border-0">
                {/* Content */}
                <div className="flex-1 space-y-4">
                    <span className="text-sm text-gray-400 font-medium tracking-wide">{article.date}</span>
                    
                    <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 cursor-pointer leading-tight">
                    {article.title}
                    </h3>
                    
                    <p className="text-lg text-gray-400 leading-relaxed">
                    {article.excerpt}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-2 ml-auto">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium text-gray-400 border border-white/5 group-hover:border-accent/20 transition-colors">
                            {tag}
                            </span>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Thumbnail - Reduced size by ~30% */}
                <div className="w-full lg:w-[280px] h-48 rounded-2xl overflow-hidden bg-[#111] border border-white/10 shrink-0 shadow-lg">
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
                <button className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-full px-8 py-3 text-base font-medium tracking-wide">
                    <span>View All Archives</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>


        {/* RETRO / YEARLY SECTION */}
        <div className="pt-12">
            <div className="mb-16">
                <div className="flex items-baseline gap-4 mb-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white leading-none flex items-center tracking-tighter">
                        <span className="text-accent mr-3 tracking-normal">{'>'}</span>
                        Retro
                        <motion.span 
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-[0.5em] h-[1em] bg-accent ml-2 align-middle"
                        />
                    </h2>
                </div>
                
                <p className="text-gray-400 max-w-xl text-xl leading-relaxed font-light pl-2 md:pl-10 border-l border-white/10">
                    Every year, I share my progress both in career and personal life. Here's the last 3 years of them.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RetroCard 
                    year="2024" 
                    title="The 2024 Retrospective" 
                    subtitle="Scaling Systems, Solo Travel, and the Art of Balance."
                    views="4,218 views"
                />
                <RetroCard 
                    year="2023" 
                    title="The 2023 Retrospective" 
                    subtitle="Graduation, Tech Winter, and Landing the First Architect Role."
                    views="2,982 views"
                />
                <RetroCard 
                    year="2022" 
                    title="The 2022 Retrospective" 
                    subtitle="Kubernetes Certification, Bootcamp, and New Beginnings."
                    views="3,107 views"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

const RetroCard: React.FC<{ year: string; title: string; subtitle: string; views: string }> = ({ year, title, subtitle, views }) => (
    <a href="#" className="block p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:bg-[#111] hover:border-white/20 transition-all duration-300 group hover:-translate-y-1">
        <div className="text-xs font-mono text-gray-400 mb-4 border border-white/10 inline-block px-2 py-1 rounded bg-black/50">
            {year}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
            {title}
        </h3>
        <p className="text-base text-gray-400 mb-6 line-clamp-3 leading-relaxed">
            {subtitle}
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-600 group-hover:text-gray-500 font-medium uppercase tracking-wider">
            <Eye className="w-3 h-3" />
            <span>{views}</span>
        </div>
    </a>
)

export default ArticleList;
