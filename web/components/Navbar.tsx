
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Book, Gamepad2, Menu, X, Fingerprint, PenTool, Heart, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem, ViewType } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Posts', href: '#' },
  { label: 'Talks', href: '#' },
  { label: 'About', href: '#' },
];

interface NavbarProps {
  onNavigate?: (view: ViewType) => void;
  currentView?: ViewType;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView = 'home' }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  // Handle Scroll Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at the very top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling Down -> Hide
        setIsVisible(false);
        setIsMoreOpen(false); // Close menu if scrolling away
      } 
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMoreOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsMoreOpen(false);
    }, 150);
  };

  const handleNavClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    if (onNavigate) {
      if (label === 'Home') onNavigate('home');
      if (label === 'Projects') onNavigate('projects');
      if (label === 'Posts') onNavigate('posts');
      if (label === 'Talks') onNavigate('talks');
      if (label === 'About') onNavigate('about');
      // Extra handling for standard nav items if needed
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMegaMenuClick = (e: React.MouseEvent, view: ViewType) => {
      e.preventDefault();
      if (onNavigate) onNavigate(view);
      setIsMoreOpen(false);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {/* Hover Detection Zone - Hovering the top 100px reveals the nav */}
      <div 
        className="fixed top-0 left-0 right-0 h-24 z-40"
        onMouseEnter={() => setIsVisible(true)}
      />

      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4 pointer-events-none"
      >
        {/* Glassmorphism Navigation Bar */}
        <div className="pointer-events-auto relative bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-none px-6 py-3 flex items-center shadow-xl shadow-black/40 font-mono text-sm tracking-tight">
          
          {/* Logo / Brand */}
          <div className="hidden md:flex items-center mr-8 pr-8 border-r border-white/10">
              <span className="font-bold text-white">eltrovert.com</span>
              <span className="animate-pulse text-accent ml-1">_</span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.label)}
                className={`px-4 py-2 transition-all rounded hover:bg-white/5 flex items-center ${
                  (item.label === 'Home' && currentView === 'home') || 
                  (item.label === 'Projects' && currentView === 'projects') ||
                  (item.label === 'Posts' && currentView === 'posts') ||
                  (item.label === 'Talks' && currentView === 'talks') ||
                  (item.label === 'About' && currentView === 'about')
                    ? 'text-accent' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2 text-accent/40 opacity-0 group-hover:opacity-100 transition-opacity">./</span>
                {item.label}
              </a>
            ))}

            {/* More Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center space-x-1 px-4 py-2 rounded transition-all ${
                  isMoreOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3 h-3 ml-2 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-[900px] bg-[#0f0f0f] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl z-50 p-6"
                    style={{ right: '-100px' }}
                  >
                    <div className="grid grid-cols-3 gap-6 font-mono">
                        
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <MenuCard
                                title="life_outside_tech"
                                description="Adventures & Hobbies"
                                image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                                icon={<Gamepad2 className="w-3 h-3" />}
                                height="h-48"
                                onClick={(e) => handleMegaMenuClick(e, 'life')}
                            />
                            
                            <MenuList
                                title="guest_book.log"
                                description="Sign the log"
                                icon={<Heart className="w-3 h-3" />}
                                onClick={(e) => handleMegaMenuClick(e, 'guestbook')}
                            />
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                             <MenuList
                                title="short_notes.txt"
                                description="Quick thoughts"
                                icon={<PenTool className="w-3 h-3" />}
                                onClick={(e) => handleMegaMenuClick(e, 'notes')}
                            />
                             <MenuCard
                                title="device_uses.json"
                                description="My hardware stack"
                                image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                                icon={<Smartphone className="w-3 h-3" />}
                                height="h-48"
                                onClick={(e) => handleMegaMenuClick(e, 'uses')}
                            />
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-4">
                             <MenuCard
                                title="library/"
                                description="Curated books"
                                image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80"
                                icon={<Book className="w-3 h-3" />}
                                height="h-48"
                                onClick={(e) => handleMegaMenuClick(e, 'books')}
                            />
                            <MenuList
                                title="kudos.md"
                                description="Credits & Thanks"
                                icon={<Fingerprint className="w-3 h-3" />}
                                onClick={(e) => handleMegaMenuClick(e, 'kudos')}
                            />
                        </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
              <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="p-2 text-gray-300 hover:text-white"
              >
                  {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
         <AnimatePresence>
          {isMobileMenuOpen && (
               <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="absolute top-24 left-4 right-4 bg-[#111] border border-white/10 p-6 flex flex-col space-y-4 md:hidden z-50 pointer-events-auto shadow-2xl font-mono text-sm">
                   {NAV_ITEMS.map((item) => (
                      <a 
                        key={item.label} 
                        href={item.href} 
                        onClick={(e) => handleNavClick(e, item.label)}
                        className={`text-gray-300 hover:text-white p-4 border-b border-white/5 ${
                            (item.label === 'Home' && currentView === 'home') || 
                            (item.label === 'Projects' && currentView === 'projects') ||
                            (item.label === 'Posts' && currentView === 'posts') ||
                            (item.label === 'Talks' && currentView === 'talks') ||
                            (item.label === 'About' && currentView === 'about')
                            ? 'text-accent' : ''
                        }`}
                      >
                          {item.label}
                      </a>
                   ))}
                   {/* Mobile Extra Links (Simplified) */}
                   <a href="#" onClick={(e) => handleMegaMenuClick(e, 'uses')} className="text-gray-300 hover:text-white p-4 border-b border-white/5">device_uses.json</a>
                   <a href="#" onClick={(e) => handleMegaMenuClick(e, 'life')} className="text-gray-300 hover:text-white p-4 border-b border-white/5">life_outside.tech</a>
                   <a href="#" onClick={(e) => handleMegaMenuClick(e, 'books')} className="text-gray-300 hover:text-white p-4">library/</a>
               </motion.div>
          )}
         </AnimatePresence>
      </motion.nav>
    </>
  );
};

// Sub-components for Menu Items
interface MenuCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  height?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ title, description, image, icon, height = "h-32", onClick }) => (
  <a href="#" onClick={onClick} className={`group relative block w-full overflow-hidden bg-[#151515] border border-white/5 ${height}`}>
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
    <div className="absolute bottom-0 left-0 p-4 w-full">
      <div className="flex items-center space-x-2 text-white font-bold mb-1">
        <span className="text-accent">{icon}</span>
        <span className="text-sm font-mono">{title}</span>
      </div>
      <p className="text-[10px] text-gray-400 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
    </div>
  </a>
);

interface MenuListProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const MenuList: React.FC<MenuListProps> = ({ title, description, icon, onClick }) => (
  <a href="#" onClick={onClick} className="flex items-center space-x-3 p-3 bg-[#151515] border border-white/5 hover:bg-[#1a1a1a] hover:border-white/10 transition-all group">
    <div className="p-2 bg-white/5 rounded-sm text-gray-500 group-hover:text-accent transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-gray-300 group-hover:text-white font-mono">{title}</h4>
      <p className="text-[10px] text-gray-500 group-hover:text-gray-400 uppercase tracking-wider font-sans">{description}</p>
    </div>
  </a>
);

export default Navbar;