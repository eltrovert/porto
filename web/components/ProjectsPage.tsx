
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Globe, Code2, FolderGit2, Cpu, Database, Layers, Terminal, Layout, Shield, Zap, Server, Activity, Heart, MessageSquare, Share2 } from 'lucide-react';
import astroProjects from "../data/astro-projects.json";

interface ProjectsPageProps {
  onProjectSelect?: (projectId: string) => void;
}

// Derive slug from url field: /project/homelab-infrastructure → homelab-infrastructure
const deriveSlug = (url: string) => url.split('/').pop() || '';

// Fix image paths: /assets/images/projects/X → /images/projects/X
const fixImage = (img: string) => img.replace('/assets/images/projects/', '/images/projects/');

// Infer tools from description
const TOOLS_MAP: Record<string, string[]> = {
  "homelab-infrastructure": ["Kubernetes", "Terraform", "Proxmox", "Ansible"],
  "mlops-ai-infrastructure": ["MLOps", "Ray", "Kubernetes", "Python"],
  "cloud-migration-journey": ["GCP", "AWS", "Kubernetes", "Terraform"],
  "mini-itx-build": ["Hardware", "Mini ITX"],
  "kubernetes-production-operations": ["Kubernetes", "Security", "Cost Optimization"],
  "deployment-strategies": ["Kubernetes", "Traefik", "Flagger", "Istio"],
  "gitops-cicd-automation": ["ArgoCD", "Flux", "Jenkins", "GitHub Actions"],
  "monitoring-observability": ["Prometheus", "Grafana", "ELK"],
  "vault-secret-management": ["Vault", "GCP KMS", "Kubernetes"],
};

const ARCHIVAL_ICONS: Record<string, React.ReactNode> = {
  "mini-itx-build": <Cpu className="w-5 h-5" />,
  "kubernetes-production-operations": <Shield className="w-5 h-5" />,
  "deployment-strategies": <Zap className="w-5 h-5" />,
  "gitops-cicd-automation": <Terminal className="w-5 h-5" />,
  "monitoring-observability": <Activity className="w-5 h-5" />,
  "vault-secret-management": <Server className="w-5 h-5" />,
};

const pinnedProjects = astroProjects.filter(p => p.pinned);
const archivalProjects = astroProjects.filter(p => !p.pinned);

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onProjectSelect }) => {
  return (
    <div className="min-h-screen pt-32 pb-12 relative overflow-hidden bg-[#050505]">

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

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 relative">
             <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
             >
                 <span className="text-accent">{'>_'}</span> explored_nebulas
                 <span className="animate-pulse ml-2 text-accent">_</span>
             </motion.h1>

             <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto font-mono text-sm md:text-base"
             >
                 {'//'} A complete journal logs of my exploration on each domain knowledge.
             </motion.p>
        </div>

        {/* Major Projects List */}
        <div className="space-y-8 mb-24">
            {pinnedProjects.map((project, idx) => {
                const slug = deriveSlug(project.url);
                return (
                    <ProjectRow
                        key={slug}
                        title={project.name}
                        description={project.description}
                        tools={TOOLS_MAP[slug] || ["Infrastructure"]}
                        image={fixImage(project.image)}
                        mockupType="laptop"
                        link="#"
                        repo="#"
                        reverse={idx % 2 === 1}
                        onClick={() => onProjectSelect && onProjectSelect(slug)}
                    />
                );
            })}
        </div>

        {/* Archival Projects Grid */}
        <div className="relative">
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3 font-mono">
                <span className="text-accent">./</span> archival_scripts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {archivalProjects.map((project) => {
                    const slug = deriveSlug(project.url);
                    return (
                        <ArchivalCard
                            key={slug}
                            title={project.name}
                            description={project.description}
                            tags={TOOLS_MAP[slug]?.slice(0, 3) || ["Infrastructure"]}
                            icon={ARCHIVAL_ICONS[slug] || <Layers className="w-5 h-5" />}
                            thumbnail={fixImage(project.image)}
                        />
                    );
                })}
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

    return (
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5 font-mono">
             <button 
                onClick={handleLike}
                className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-red-500 group"
             >
                 <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
                 <span className={`${isLiked ? 'text-white' : 'text-gray-500'}`}>{likes || 'Like'}</span>
             </button>

             <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group">
                 <MessageSquare className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                 <span>{initialComments || 'Comment'}</span>
             </button>

             <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group">
                 <Share2 className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                 <span>Share</span>
             </button>
        </div>
    );
};

interface ProjectRowProps {
    title: string;
    description: string;
    tools: string[];
    image: string;
    mockupType: 'mobile' | 'laptop';
    link: string;
    repo: string;
    reverse?: boolean;
    onClick?: () => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ title, description, tools, image, mockupType, link, repo, reverse = false, onClick }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 lg:p-8 hover:border-white/10 transition-all duration-500"
        >
             {/* Hover Glow */}
             <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none blur-xl" />

             <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10`}>
                {/* Text Content */}
                <div className={`space-y-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-2">
                        <h2 
                            onClick={onClick}
                            className={`text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-mono ${onClick ? 'cursor-pointer' : ''}`}
                        >
                            {title}
                        </h2>
                        <p className="text-base text-gray-400 leading-relaxed max-w-lg font-sans">
                            {description}
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {tools.map(tool => (
                            <div key={tool} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-gray-300 font-mono">
                                {tool === 'Kubernetes Operator' ? <Cpu className="w-3 h-3 text-accent" /> : 
                                tool === 'Terraform' ? <Database className="w-3 h-3 text-accent" /> :
                                tool === 'Golang' || tool === 'TypeScript' || tool === 'Rust' ? <Code2 className="w-3 h-3 text-accent" /> :
                                <Layers className="w-3 h-3 text-accent" />}
                                <span>{tool}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
                        <button 
                            onClick={(e) => {
                                if (onClick) {
                                    e.preventDefault();
                                    onClick();
                                }
                            }}
                            className="flex items-center space-x-2 px-5 py-2.5 bg-[#111] border border-white/10 rounded-md text-white hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <span>View Project</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </button>
                        {repo && (
                            <a href={repo} className="flex items-center space-x-2 px-5 py-2.5 text-gray-400 hover:text-white transition-colors">
                                <Github className="w-3 h-3" />
                                <span>Repository</span>
                            </a>
                        )}
                    </div>
                    
                    {/* Interactions */}
                    <InteractionBar initialLikes={Math.floor(Math.random() * 50) + 10} initialComments={Math.floor(Math.random() * 10)} />

                </div>

                {/* Visual / Mockup */}
                <div className={`relative group/image ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-0 group-hover/image:opacity-10 transition-opacity duration-700" />
                    
                    {mockupType === 'mobile' ? (
                        <div className="relative mx-auto w-[280px] h-[580px] bg-[#111] rounded-[2rem] border-4 border-[#222] shadow-2xl overflow-hidden transform group-hover/image:-translate-y-4 transition-transform duration-500">
                            <img src={image} alt={title} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div 
                            onClick={onClick}
                            className={`relative w-full aspect-video bg-[#111] rounded-lg border-b-4 border-r-4 border-[#222] shadow-2xl overflow-hidden transform group-hover/image:-translate-y-2 transition-transform duration-500 ${onClick ? 'cursor-pointer' : ''}`}
                        >
                            {/* Laptop Screen Header */}
                            <div className="absolute top-0 left-0 right-0 h-5 bg-[#222] flex items-center px-3 space-x-1.5 z-20">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                            <div className="pt-5 h-full relative">
                                <img src={image} alt={title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// New Archival Card Component
interface ArchivalCardProps {
    title: string;
    description: string;
    tags: string[];
    icon: React.ReactNode;
    thumbnail: string;
}

const ArchivalCard: React.FC<ArchivalCardProps> = ({ title, description, tags, icon, thumbnail }) => {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl relative overflow-hidden group hover:border-accent/30 transition-all duration-300 h-[340px]">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            
            {/* Content Container */}
            <div className="relative z-10 p-8 h-full flex flex-col items-start pointer-events-none w-full">
                <div className="flex items-center gap-3 mb-4 pointer-events-auto">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                        {icon}
                    </div>
                    <div className="flex gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded text-gray-500 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors relative z-20 pointer-events-auto font-mono">{title}</h3>
                
                {/* Description - Full Width */}
                <p className="text-gray-400 text-sm leading-relaxed w-full relative z-20 pointer-events-auto pr-8 font-sans">
                    {description}
                </p>

                {/* Action Button - Moved to Top Right */}
                <div className="absolute top-6 right-6 pointer-events-auto">
                    <button className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full text-white border border-white/10 transition-colors backdrop-blur-sm group/btn">
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Image Box - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-[80%] h-[50%] overflow-hidden border-l border-t border-white/10 bg-[#151515] rounded-tl-lg z-0">
                 <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                 <img 
                    src={thumbnail} 
                    alt={title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100" 
                 />
            </div>
        </div>
    );
};

export default ProjectsPage;
