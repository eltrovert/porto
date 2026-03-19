
import React, { useState } from 'react';
import { Github, Twitter, Mail, Linkedin, Instagram, Youtube, ArrowDown, Sparkles, Send, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AbstractVisual from './AbstractVisual';

const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setShowResult(true);
    setAnswer(''); 

    try {
        const resp = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query.trim() })
        });
        const data = await resp.json();
        
        if (data.error) {
            setAnswer(data.error);
        } else {
            setAnswer(data.answer || "I couldn't retrieve that information right now.");
        }
    } catch (error) {
        console.error("AI Error:", error);
        setAnswer("Connection to the neural network failed. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] md:min-h-screen flex items-center py-20 md:py-0 bg-dark overflow-hidden font-mono">
      
      {/* Inner Container for Content Centering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Content - Width Unified */}
            <div className="space-y-8 relative z-20 w-full max-w-xl">
            
            {/* Status Badge - Terminal Style */}
            <div className="inline-flex items-center gap-2 text-xs text-accent">
                <span className="text-gray-500">{'>'}</span>
                <span className="text-gray-400">status:</span>
                <span className="bg-accent/10 border border-accent/20 px-2 py-0.5 rounded text-accent animate-pulse">
                    building_homelab
                </span>
            </div>

            {/* Headlines */}
            <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                  Hello, I'm <span className="text-accent">El</span><span className="animate-pulse">_</span>
                </h1>
                
                <div className="space-y-6">
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed w-full font-light font-sans">
                    <span className="bg-white/10 text-white px-2 py-0.5 rounded text-sm font-mono mr-2 border border-white/10">
                        System Architect & Principal DevMLSecOps
                    </span>
                    with 13+ years of global experience traversing the complex universe of cloud infrastructure, automation, and distributed systems.
                </p>

                {/* Expertise List - Config File Style */}
                <div className="group relative pt-2 bg-[#0a0a0a] border border-white/10 p-5 rounded-xl w-full shadow-2xl overflow-hidden">
                    {/* Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-700 ease-in-out" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                            </div>
                            <span className="text-[10px] text-gray-500 ml-2">skills.yml</span>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                            <div><span className="text-purple-400">expertise:</span></div>
                            <div className="pl-4 flex items-center gap-2">
                                <span className="text-gray-600">-</span> 
                                <span className="text-green-400">"Kubernetes & Cloud-Native"</span>
                            </div>
                            <div className="pl-4 flex items-center gap-2">
                                <span className="text-gray-600">-</span> 
                                <span className="text-green-400">"MLOps & Distributed Training"</span>
                            </div>
                            <div className="pl-4 flex items-center gap-2">
                                <span className="text-gray-600">-</span> 
                                <span className="text-green-400">"CI/CD Pipelines & GitOps"</span>
                            </div>
                             <div className="pl-4 flex items-center gap-2">
                                <span className="text-gray-600">-</span> 
                                <span className="text-green-400">"IaC (Terraform, Ansible)"</span>
                            </div>
                            <div className="pl-4 flex items-center gap-2">
                                <span className="text-gray-600">-</span> 
                                <span className="text-green-400">"Observability Stack"</span>
                            </div>
                            <div className="pl-4 flex items-center gap-2">
                                <span className="text-gray-600">-</span> 
                                <span className="text-green-400">"..."</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="pt-4 flex flex-row items-start lg:items-center gap-6">
                
                {/* AI Interaction Section */}
                <div className="w-full relative z-30">
                    <form onSubmit={handleAskAI} className="relative group z-50">
                        
                        {/* Input Container */}
                        <div className="relative flex items-center bg-[#0a0a0a] rounded-lg p-1 border border-white/10 focus-within:border-accent/50 transition-colors shadow-lg">
                            <div className="pl-4 pr-3 text-accent">
                                <span className="text-lg font-bold">{'>'}</span>
                            </div>
                            <input 
                                type="text" 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="ask_ai --about=me" 
                                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-600 py-3 font-mono min-w-0"
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading || !query.trim()}
                                className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-transparent hover:border-white/10"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                        </div>
                    </form>

                    {/* AI Response Display */}
                    <AnimatePresence>
                        {showResult && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 mt-4 w-full z-40"
                            >
                                <div className="bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-lg p-5 shadow-2xl relative font-sans">
                                    <button 
                                        onClick={() => setShowResult(false)}
                                        className="absolute top-3 right-3 p-1 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                    
                                    <div className="flex gap-4">
                                        <div className="shrink-0 pt-1">
                                            <div className="w-8 h-8 rounded bg-accent/10 border border-accent/20 flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-accent" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Output</p>
                                            
                                            {isLoading ? (
                                                <div className="text-accent font-mono text-xs animate-pulse">Processing request...</div>
                                            ) : (
                                                <div className="text-sm text-gray-200 leading-relaxed">
                                                    {answer}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Social Icons with "Let's connect" on left */}
            <div className="flex items-center gap-4 pt-2 flex-wrap">
                <span className="text-sm text-gray-500 font-mono pr-4 border-r border-white/10">
                    ./connect
                </span>
                <div className="flex items-center gap-3">
                    <SocialIcon icon={<Github className="w-5 h-5" />} href="#" label="GitHub" />
                    <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" label="LinkedIn" />
                    <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" label="X (Twitter)" />
                    <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" label="Instagram" />
                    <SocialIcon icon={<Youtube className="w-5 h-5" />} href="#" label="YouTube" />
                    <SocialIcon icon={<Mail className="w-5 h-5" />} href="#" label="Email" />
                </div>
            </div>

            </div>

            {/* Right Content - Abstract Visual (desktop only) */}
            <div className="relative h-[450px] w-full hidden lg:block perspective-1000">
              <AbstractVisual />
            </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
         <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">scroll_down</span>
         <ArrowDown className="w-4 h-4 text-accent" />
      </div>
    </div>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode, href: string, label: string }> = ({ icon, href, label }) => (
  <a 
    href={href} 
    aria-label={label}
    className="text-gray-500 hover:text-accent transition-colors p-3 hover:bg-white/5 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
  >
    {icon}
  </a>
);

export default Hero;
