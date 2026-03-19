
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Activity, GitCommit, Wifi, Terminal } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
    onNavigate?: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, view: ViewType) => {
      e.preventDefault();
      if (onNavigate) {
          onNavigate(view);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#020202] border-t border-white/5 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Main Content Grid: Compact Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
                
                {/* Brand Column (4 Cols) */}
                <div className="lg:col-span-4 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
                            El Muhammad
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed font-mono max-w-sm">
                            System Architect & Principal DevMLSecOps traversing the unknown domains of cloud infrastructure and distributed systems.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <SocialLink href="#" icon={<Github className="w-4 h-4" />} label="Github" />
                        <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
                        <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
                        <SocialLink href="#" icon={<Mail className="w-4 h-4" />} label="Email" />
                    </div>
                </div>

                {/* Navigation Columns (8 Cols - split into 3 groups) */}
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                    
                    {/* Group 1: Main */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-accent/50">~/</span> main
                        </h4>
                        <ul className="space-y-1.5 font-mono text-xs text-gray-400">
                            <li><FooterLink label="home.tsx" onClick={(e) => handleNavClick(e, 'home')} /></li>
                            <li><FooterLink label="about.md" onClick={(e) => handleNavClick(e, 'about')} /></li>
                            <li><FooterLink label="uses.json" onClick={(e) => handleNavClick(e, 'uses')} /></li>
                            <li><FooterLink label="sitemap.xml" onClick={(e) => handleNavClick(e, 'sitemap')} /></li>
                        </ul>
                    </div>

                    {/* Group 2: Engineering */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-accent/50">~/</span> engineering
                        </h4>
                        <ul className="space-y-1.5 font-mono text-xs text-gray-400">
                            <li><FooterLink label="projects/" onClick={(e) => handleNavClick(e, 'projects')} /></li>
                            <li><FooterLink label="blog_posts/" onClick={(e) => handleNavClick(e, 'posts')} /></li>
                            <li><FooterLink label="talks/" onClick={(e) => handleNavClick(e, 'talks')} /></li>
                            <li><FooterLink label="stack/" onClick={(e) => handleNavClick(e, 'kudos')} /></li>
                        </ul>
                    </div>

                    {/* Group 3: Resources */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-accent/50">~/</span> resources
                        </h4>
                        <ul className="space-y-1.5 font-mono text-xs text-gray-400">
                            <li><FooterLink label="library/" onClick={(e) => handleNavClick(e, 'books')} /></li>
                            <li><FooterLink label="notes/" onClick={(e) => handleNavClick(e, 'notes')} /></li>
                            <li><FooterLink label="guestbook.log" onClick={(e) => handleNavClick(e, 'guestbook')} /></li>
                            <li><FooterLink label="life_outside_tech/" onClick={(e) => handleNavClick(e, 'life')} /></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar: Compact Terminal & Stats */}
            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Inline Terminal Subscribe */}
                <div className="w-full md:w-auto flex-1 max-w-md">
                    <div className="flex items-center bg-[#0a0a0a] border border-white/10 rounded-md px-3 py-1.5 font-mono text-xs focus-within:border-accent/30 transition-colors">
                        <Terminal className="w-3 h-3 text-gray-500 mr-2" />
                        <span className="text-green-500 mr-2">➜</span>
                        <input 
                            type="email" 
                            placeholder="./subscribe.sh --email" 
                            className="bg-transparent border-none focus:outline-none focus:ring-0 text-gray-300 placeholder-gray-600 w-full h-full p-0"
                        />
                        <button className="text-accent hover:text-white font-bold ml-2 transition-colors text-[10px]">
                            [ENTER]
                        </button>
                    </div>
                </div>

                {/* System Stats & Copyright */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-8 text-[10px] font-mono text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            Systems Online
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Wifi className="w-3 h-3" />
                            64ms
                        </span>
                        <span className="flex items-center gap-1.5">
                            <GitCommit className="w-3 h-3" />
                            v2.4.0
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-gray-400 transition-colors">Privacy</button>
                        <button onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-gray-400 transition-colors">Terms</button>
                        <span>© {new Date().getFullYear()} El Muhammad</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string; onClick?: (e: React.MouseEvent) => void }> = ({ label, onClick }) => (
    <button onClick={onClick} className="text-gray-400 hover:text-accent transition-colors text-left w-full hover:translate-x-1 duration-200">
        {label}
    </button>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a 
        href={href} 
        aria-label={label}
        className="p-2 rounded-md bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
    >
        {icon}
    </a>
);

export default Footer;