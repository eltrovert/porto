
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Github, ExternalLink, Shield, Cpu, Activity, CheckCircle, Code2, Terminal, Server, Calendar, Tag, AlertTriangle, HardDrive, Network, Router, BookOpen, Eye, Heart, Share2, MessageSquare, Send, User, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import astroProjects from "../data/astro-projects.json";

interface ProjectDetailProps {
    onBack: () => void;
    projectId?: string;
}

// --- RICH CONTENT RENDERER ---
const JournalBlock: React.FC<{ block: any }> = ({ block }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(block.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (block.type === 'code') {
        return (
            <div className="my-4 rounded-lg overflow-hidden border border-white/10 bg-[#0f0f0f] relative">
                <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
                    <span className="text-xs font-mono text-gray-500">{block.language}</span>
                    <button onClick={handleCopy} className="text-gray-500 hover:text-white transition-colors">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
                <div className="p-4 overflow-x-auto">
                    <pre className="font-mono text-sm text-gray-300">
                        <code>{block.content}</code>
                    </pre>
                </div>
            </div>
        );
    }
    return (
        <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed whitespace-pre-line font-sans mb-4">
            {block.content}
        </div>
    );
};

// Derive slug from url: /project/homelab-infrastructure → homelab-infrastructure
const deriveSlug = (url: string) => url.split('/').pop() || '';
const fixImage = (img: string) => img.replace('/assets/images/projects/', '/images/projects/');

// Build PROJECTS_DB dynamically from astro-projects.json
const PROJECTS_DB: Record<string, any> = Object.fromEntries(
    astroProjects.map((p) => {
        const slug = deriveSlug(p.url);
        return [slug, {
            title: p.name,
            status: `${p.year} Project`,
            summary: p.description,
            image: fixImage(p.image),
            views: "—",
            initialLikes: 0,
            metrics: [],
            techStack: [],
            meta: { timeline: p.year, role: "Engineer", type: "Project" },
            journal: [
                {
                    chapter: "01",
                    title: "Overview",
                    date: p.year,
                    readTime: "2 min read",
                    content: [
                        { type: "text", content: p.description },
                    ]
                }
            ]
        }];
    })
);

const ProjectDetail: React.FC<ProjectDetailProps> = ({ onBack, projectId }) => {
  const project = useMemo(() => {
      const fallbackSlug = deriveSlug(astroProjects[0].url);
      return PROJECTS_DB[projectId || fallbackSlug] || PROJECTS_DB[fallbackSlug];
  }, [projectId]);

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
       
       {/* --- Standardized Background Section --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Back Navigation */}
           <button 
                onClick={onBack}
                className="group flex items-center space-x-2 text-gray-500 hover:text-white mb-8 transition-colors font-mono"
           >
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
               <span className="text-sm font-medium">../back_to_projects</span>
           </button>

           {/* --- HEADER --- */}
           <header className="mb-12 border-b border-white/10 pb-12">
               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                   <div className="space-y-4 max-w-3xl">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider font-mono">
                            <Activity className="w-3 h-3" />
                            <span>{project.status}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-mono">
                            <span className="text-accent">{'>_'}</span> {project.title}
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed font-light font-sans">
                            {project.summary}
                        </p>
                        
                        <div className="flex items-center gap-6 pt-2 text-sm text-gray-500 font-medium font-mono">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-accent" />
                                <span>{project.views} Views</span>
                            </div>
                        </div>
                   </div>
                   
                   <div className="flex flex-wrap gap-3 shrink-0 font-mono text-sm">
                       <a href="#" className="flex items-center space-x-2 px-5 py-2.5 bg-white text-black rounded-md font-bold hover:bg-accent transition-colors">
                            <Github className="w-4 h-4" />
                            <span>Config Repo</span>
                       </a>
                       <a href="#" className="flex items-center space-x-2 px-5 py-2.5 bg-[#111] border border-white/10 rounded-md text-white hover:bg-white/5 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            <span>Diagram</span>
                       </a>
                   </div>
               </div>

               {/* Metrics Dashboard */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                   {project.metrics.map((metric: any, idx: number) => (
                       <div key={idx} className="bg-[#151515] border border-white/5 p-5 rounded-xl flex items-center justify-between relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.1] pointer-events-none" />
                           <div className="relative z-10">
                               <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 font-mono">{metric.label}</p>
                               <p className="text-2xl font-bold text-white font-mono">{metric.value}</p>
                           </div>
                           <div className="text-right relative z-10">
                               <div className="p-2 bg-white/5 rounded-lg inline-block mb-1">{metric.icon}</div>
                               <p className="text-[10px] text-gray-500 font-mono">{metric.trend}</p>
                           </div>
                       </div>
                   ))}
               </div>
           </header>

           {/* --- MAIN LAYOUT --- */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               
               {/* MAIN CONTENT */}
               <div className="lg:col-span-8 space-y-16">
                   {project.journal.map((entry: any, index: number) => (
                       <section className="space-y-6" id={`chapter-${index}`} key={index}>
                           <div className="flex items-center gap-4 mb-6">
                               <span className="text-5xl font-bold text-white/10 font-mono">{entry.chapter}</span>
                               <div>
                                   <h2 className="text-2xl font-bold text-white font-mono">{entry.title}</h2>
                                   <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 font-mono">
                                       <span>{entry.date}</span>
                                       <span>•</span>
                                       <span>{entry.readTime}</span>
                                   </div>
                               </div>
                           </div>
                           
                           {/* Rich Content Rendering */}
                           {entry.content.map((block: any, i: number) => (
                               <JournalBlock key={i} block={block} />
                           ))}

                       </section>
                   ))}

                   <InteractionSection initialLikes={project.initialLikes} />
                   <CommentSection initialComments={[]} />
               </div>

               {/* SIDEBAR */}
               <div className="lg:col-span-4 space-y-8">
                   <div className="bg-[#151515] border border-white/10 rounded-xl p-6 sticky top-32 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.1] pointer-events-none" />
                       <div className="relative z-10">
                           <h3 className="text-lg font-bold text-white mb-6 font-mono">Infrastructure Stack</h3>
                           <div className="space-y-4">
                               {project.techStack.map((tech: any) => (
                                   <div key={tech.name} className="flex items-center justify-between pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                       <div className="flex items-center gap-3">
                                           <div className="p-1.5 bg-white/5 rounded-md text-gray-400"><Code2 className="w-4 h-4" /></div>
                                           <span className="text-sm font-medium text-gray-200 font-mono">{tech.name}</span>
                                       </div>
                                       <span className="text-xs text-gray-500 font-mono">{tech.type}</span>
                                   </div>
                               ))}
                           </div>
                           <div className="mt-8 pt-8 border-t border-white/10 space-y-4 font-mono">
                               <div className="flex items-center gap-3 text-sm text-gray-400"><Calendar className="w-4 h-4 text-accent" /><span>{project.meta.timeline}</span></div>
                               <div className="flex items-center gap-3 text-sm text-gray-400"><Tag className="w-4 h-4 text-accent" /><span>{project.meta.role}</span></div>
                               <div className="flex items-center gap-3 text-sm text-gray-400"><Server className="w-4 h-4 text-accent" /><span>{project.meta.type}</span></div>
                           </div>
                       </div>
                   </div>
               </div>

           </div>
       </div>
    </div>
  );
};

// ... InteractionSection and CommentSection ...
const InteractionSection: React.FC<{ initialLikes: number }> = ({ initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const handleLike = () => { if (liked) { setLikes(l => l - 1); setLiked(false); } else { setLikes(l => l + 1); setLiked(true); } };
    return (
        <div className="py-8 border-y border-white/10 flex items-center justify-between mt-12 font-mono">
            <div className="flex items-center gap-6">
                <button onClick={handleLike} className={`flex items-center gap-3 px-6 py-3 rounded-md border transition-all duration-300 ${liked ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'}`}>
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} /><span className="font-bold">{likes}</span>
                </button>
            </div>
        </div>
    );
};

const CommentSection: React.FC<{ initialComments: any[] }> = ({ initialComments }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const handlePost = (e: React.FormEvent) => { e.preventDefault(); if (!newComment.trim()) return; setComments([...comments, { id: Date.now(), author: "Guest", date: "Just now", content: newComment }]); setNewComment(""); };
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-mono"><MessageSquare className="w-6 h-6 text-accent" />Discussion</h3>
            <form onSubmit={handlePost} className="bg-[#151515] border border-white/10 rounded-xl p-6 relative overflow-hidden"><div className="relative z-10 flex gap-4"><div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center text-black font-bold shrink-0 font-mono">G</div><div className="flex-1 space-y-4"><textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add to the discussion..." className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 resize-none min-h-[100px] font-mono text-sm" /><div className="flex justify-end"><button type="submit" disabled={!newComment.trim()} className="flex items-center gap-2 px-6 py-2 bg-accent text-black font-bold rounded-md hover:bg-accent/80 transition-colors font-mono text-sm"><Send className="w-4 h-4" /><span>Post Comment</span></button></div></div></div></form>
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4"><div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center text-gray-400 shrink-0"><User className="w-5 h-5" /></div><div className="flex-1 space-y-2"><div className="flex items-baseline gap-3"><span className="text-white font-bold font-mono">{comment.author}</span><span className="text-xs text-gray-500 font-mono">{comment.date}</span></div><p className="text-gray-300 leading-relaxed text-sm font-sans">{comment.content}</p></div></div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetail;
