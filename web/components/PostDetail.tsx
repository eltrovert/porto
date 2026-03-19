
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen, ChevronUp, Code2, Terminal, User, Eye, Heart, MessageSquare, Send, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostDetailProps {
    onBack: () => void;
    postId?: string | number;
}

// --- RICH TEXT RENDERER COMPONENT ---
const ContentBlock: React.FC<{ block: any }> = ({ block }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(block.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (block.type === 'code') {
        return (
            <div className="my-6 rounded-lg overflow-hidden border border-white/10 bg-[#0f0f0f] relative group">
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

    if (block.type === 'image') {
        return (
            <figure className="my-8">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#111]">
                    <img src={block.url} alt={block.caption} className="w-full h-auto" />
                </div>
                {block.caption && (
                    <figcaption className="mt-3 text-center text-xs text-gray-500 font-mono">
                        {block.caption}
                    </figcaption>
                )}
            </figure>
        );
    }

    return (
        <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed whitespace-pre-line font-sans mb-6">
            {block.content}
        </div>
    );
};

import postsData from "../data/posts.json";

function formatPostDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildPostDetail(postId: string | number) {
    const post = postsData.find((p) => String(p.id) === String(postId));
    if (!post) return null;
    return {
        title: post.title,
        subtitle: post.excerpt,
        date: formatPostDate(post.date),
        readTime: `${Math.max(3, Math.ceil(post.excerpt.split(/\s+/).length / 40))} min read`,
        author: "El Muhammad",
        views: `${Math.floor(Math.random() * 15000 + 2000).toLocaleString()}`,
        initialLikes: Math.floor(Math.random() * 500) + 50,
        category: post.topic,
        tags: [post.topic],
        sections: [
            {
                id: "content",
                title: post.title,
                content: [{ type: "text", content: post.excerpt }]
            }
        ]
    };
}

const FALLBACK_POST = {
    title: "Post Not Found",
    subtitle: "The requested post could not be found.",
    date: "",
    readTime: "",
    author: "El Muhammad",
    views: "0",
    initialLikes: 0,
    category: "Unknown",
    tags: [],
    sections: [{ id: "not-found", title: "Not Found", content: [{ type: "text", content: "This post does not exist." }] }]
};

const PostDetail: React.FC<PostDetailProps> = ({ onBack, postId }) => {
  const post = useMemo(() => {
      return buildPostDetail(postId || 1) || FALLBACK_POST;
  }, [postId]);

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
           <button onClick={onBack} className="group flex items-center space-x-2 text-gray-500 hover:text-white mb-8 transition-colors font-mono">
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
               <span className="text-sm font-medium">../back_to_posts</span>
           </button>

           <header className="mb-16 border-b border-white/10 pb-12">
               <div className="space-y-6 max-w-4xl">
                    <div className="flex items-center gap-3 font-mono">
                        <span className="inline-flex items-center px-3 py-1 rounded-sm bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">{post.category}</span>
                        <span className="text-gray-500 text-xs uppercase tracking-wider">{post.date}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight font-mono"><span className="text-accent">{'>_'}</span> {post.title}</h1>
                    <p className="text-xl text-gray-400 leading-relaxed font-light font-sans">{post.subtitle}</p>
                    
                    {/* Author Meta */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                             <User className="w-5 h-5" />
                        </div>
                        <div className="font-mono text-xs">
                            <div className="text-white font-bold">{post.author}</div>
                            <div className="text-gray-500">{post.readTime} • {post.views} views</div>
                        </div>
                    </div>
               </div>
           </header>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-8 space-y-12">
                   {post.sections.map((section: any, index: number) => (
                       <section key={section.id} id={section.id} className="space-y-6 scroll-mt-32">
                           <h2 className="text-3xl font-bold text-white group flex items-center gap-3 font-mono">
                               <span className="text-accent/40 group-hover:text-accent transition-colors">#</span>
                               {section.title}
                           </h2>
                           {section.content.map((block: any, i: number) => (
                               <ContentBlock key={i} block={block} />
                           ))}
                       </section>
                   ))}

                   <InteractionSection initialLikes={post.initialLikes} />
                   <CommentSection initialComments={[]} />
               </div>
               
               {/* Sidebar */}
               <div className="lg:col-span-4 space-y-8">
                   <div className="bg-[#151515] border border-white/10 rounded-xl p-6 sticky top-32 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.1] pointer-events-none" />
                       <div className="relative z-10">
                           <div className="flex items-center gap-2 mb-6 text-white font-bold font-mono">
                               <BookOpen className="w-5 h-5 text-accent" />
                               <h3>Table of Contents</h3>
                           </div>
                           <nav className="space-y-1 font-mono">
                               {post.sections.map((section: any) => (
                                   <a 
                                     key={section.id} 
                                     href={`#${section.id}`} 
                                     className="block py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border-l-2 border-transparent hover:border-accent"
                                   >
                                       {section.title}
                                   </a>
                               ))}
                           </nav>
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
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} /><span className="font-bold">{likes} Likes</span>
                </button>
                <button className="flex items-center gap-3 px-6 py-3 rounded-md border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all">
                    <Share2 className="w-5 h-5" /><span className="font-bold">Share</span>
                </button>
            </div>
        </div>
    );
};

const CommentSection: React.FC<{ initialComments: any[] }> = ({ initialComments }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const handlePost = (e: React.FormEvent) => { e.preventDefault(); if (!newComment.trim()) return; setComments([...comments, { id: Date.now(), author: "Guest User", date: "Just now", content: newComment }]); setNewComment(""); };
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-mono"><MessageSquare className="w-6 h-6 text-accent" />Discussion</h3>
            <form onSubmit={handlePost} className="bg-[#151515] border border-white/10 rounded-xl p-6 relative overflow-hidden"><div className="relative z-10 flex gap-4"><div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center text-black font-bold shrink-0 font-mono">G</div><div className="flex-1 space-y-4"><textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add to the discussion..." className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 resize-none min-h-[100px] font-mono text-sm" /><div className="flex justify-end"><button type="submit" disabled={!newComment.trim()} className="flex items-center gap-2 px-6 py-2 bg-accent text-black font-bold rounded-md hover:bg-accent/80 transition-colors font-mono text-sm"><Send className="w-4 h-4" /><span>Post Comment</span></button></div></div></div></form>
            <div className="space-y-6">
                {comments.length === 0 && <p className="text-gray-500 font-mono italic">No comments yet. Be the first to start the discussion.</p>}
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4"><div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center text-gray-400 shrink-0"><User className="w-5 h-5" /></div><div className="flex-1 space-y-2"><div className="flex items-baseline gap-3"><span className="text-white font-bold font-mono">{comment.author}</span><span className="text-xs text-gray-500 font-mono">{comment.date}</span></div><p className="text-gray-300 leading-relaxed text-sm font-sans">{comment.content}</p></div></div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
