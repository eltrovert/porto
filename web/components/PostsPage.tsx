
import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar, Tag, Heart, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import postsData from "../data/posts.json";

const TOPIC_IMAGES: Record<string, string> = {
  "Kubernetes": "https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=800&auto=format&fit=crop",
  "Infrastructure as Code": "https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=800&auto=format&fit=crop",
  "Networking": "https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=800&auto=format&fit=crop",
  "Machine Learning & MLOps": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
  "Monitoring & Observability": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "Cloud Migration": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
  "Security": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  "CI/CD & GitOps": "https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=800&auto=format&fit=crop",
  "Cloud": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
  "AI Development Tools": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
  "Hardware & System Design": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "Database": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
  "Containers": "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800&auto=format&fit=crop",
  "Testing": "https://images.unsplash.com/photo-1576444356170-66073fbf1ece?q=80&w=800&auto=format&fit=crop",
  "Disaster Recovery": "https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=800&auto=format&fit=crop",
  "DevOps": "https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=800&auto=format&fit=crop",
  "Projects": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  "Infrastructure": "https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=800&auto=format&fit=crop",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BLOG_POSTS = postsData.map((p) => ({
  id: p.id,
  title: p.title,
  excerpt: p.excerpt,
  tags: [p.topic],
  date: formatDate(p.date),
  image: TOPIC_IMAGES[p.topic] || DEFAULT_IMAGE,
}));

const TOPICS = ["All Topics", ...Array.from(new Set(postsData.map((p) => p.topic))).sort()];

interface PostsPageProps {
  onPostSelect?: (postId: number) => void;
  initialTopic?: string | null;
}

const PostsPage: React.FC<PostsPageProps> = ({ onPostSelect, initialTopic }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(initialTopic || "All Topics");

  useEffect(() => {
    if (initialTopic) {
      setSelectedTopic(initialTopic);
    }
  }, [initialTopic]);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === "All Topics" || post.tags.includes(selectedTopic);
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
      {/* Background (Shortened for brevity, use standard background code here) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
          >
            <span className="text-accent">{'>_'}</span> my_writing.md
            <span className="animate-pulse ml-2 text-accent">_</span>
          </motion.h1>
        </div>

        <div className="space-y-8 mb-12">
            <input 
                type="text" 
                placeholder="Search posts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent/50 font-mono text-sm block mx-auto max-w-2xl"
            />
            <div className="flex flex-wrap justify-center gap-2">
                {TOPICS.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border font-mono ${selectedTopic === topic ? 'bg-accent text-black border-accent font-bold' : 'bg-[#111] text-gray-400 border-white/5'}`}
                    >
                        {topic}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            {filteredPosts.map((post) => (
                <motion.article 
                    key={post.id}
                    onClick={() => onPostSelect && onPostSelect(post.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 hover:border-accent/20 rounded-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden cursor-pointer"
                >
                    <div className="w-full md:w-[20%] h-48 md:h-auto relative shrink-0 border-b md:border-r border-white/5 bg-[#111]">
                        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors font-mono">{post.title}</h3>
                        <p className="text-gray-400 text-sm md:text-base font-sans">{post.excerpt}</p>
                    </div>
                </motion.article>
            ))}
        </div>

      </div>
    </div>
  );
};

export default PostsPage;
