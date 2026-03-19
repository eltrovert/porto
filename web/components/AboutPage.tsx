
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cloud, Server, Database, Activity, Github, Linkedin, Mail, Rocket, Cpu, GitBranch, Monitor } from 'lucide-react';

const AboutPage: React.FC = () => {
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="mb-24 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> whoami
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} System Architect & Principal DevMLSecOps
            </motion.p>
        </div>

        {/* --- Hero Profile --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-32 items-start">
            
            {/* Left: Avatar (Polaroid Style) */}
            <motion.div 
                initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                animate={{ opacity: 1, rotate: -2, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-4 relative"
            >
                <div className="bg-[#151515] p-4 pb-12 border border-white/10 shadow-2xl rounded-sm transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                    <div className="aspect-square bg-[#222] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                            alt="El Muhammad" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-4 right-6">
                        <span className="font-mono text-xl text-gray-400">el_muhammad.jpg</span>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 text-gray-600 opacity-20">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path d="M10 10 Q 50 50 90 10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
                    </svg>
                </div>
            </motion.div>

            {/* Right: Intro Text */}
            <div className="md:col-span-8 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-mono">El Muhammad Cholid Hidayatullah</h2>
                    <p className="text-accent font-medium mb-6 font-mono">Indonesia (Open for Relocation)</p>
                    
                    <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed space-y-6 font-sans">
                        <p>
                            I am a <strong>System Architect & Principal DevMLSecOps</strong> with 13+ years of global experience in cloud infrastructure, automation, and distributed systems. My expertise lies in <strong>Kubernetes</strong>, <strong>CI/CD</strong>, cloud migration, monitoring, and disaster recovery.
                        </p>
                        <p>
                            I have a proven track record of enabling scalability, reliability, and cost efficiency for companies across the US, Europe, and Asia. I excel at leading cross-functional teams, implementing security best practices, and translating complex technical solutions into clear strategies for C-level stakeholders.
                        </p>
                        <p>
                            Currently, I'm focusing on building real-time 3D scene reconstruction systems and distributed ML pipelines using Cloud-Native technologies.
                        </p>
                    </div>
                </div>

                {/* Favorite Tech Stack */}
                <div className="pt-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-mono">Current Favorite Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        <TechBadge icon={<Cloud className="w-3.5 h-3.5" />} label="GCP & AWS" />
                        <TechBadge icon={<Server className="w-3.5 h-3.5" />} label="Kubernetes" />
                        <TechBadge icon={<GitBranch className="w-3.5 h-3.5" />} label="GitOps (ArgoCD)" />
                        <TechBadge icon={<Database className="w-3.5 h-3.5" />} label="Terraform" />
                        <TechBadge icon={<Cpu className="w-3.5 h-3.5" />} label="Ray.io" />
                        <TechBadge icon={<Monitor className="w-3.5 h-3.5" />} label="Prometheus" />
                    </div>
                </div>
            </div>
        </div>

        {/* --- Current Status Card --- */}
        <div className="mb-16 md:mb-32">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 sm:p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="p-4 bg-white/5 rounded-full border border-white/5 shrink-0">
                        <Activity className="w-8 h-8 text-accent animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4 font-mono">Current Mission Log</h3>
                        <ul className="space-y-4 text-gray-400 font-mono text-sm md:text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1.5 shrink-0">{">>"}</span>
                                <span className="leading-relaxed">Building tech communities locally including DevOps Focus Group (DevOps community to learn DevOps), VFC (Vibecoding From Cafe), and many more.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1.5 shrink-0">{">>"}</span>
                                <span className="leading-relaxed">Writing my first book called 'How to Get Hired Internationally'.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1.5 shrink-0">{">>"}</span>
                                <span className="leading-relaxed">Building a personal safe haven local cloud with tens of stacks, learning along the way.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Experience / Timeline (Hidden for now) --- */}
        {/* Professional Journey section hidden per request */}

        {/* --- Certifications Grid (Only Certs Now) --- */}
        <div className="mb-16 md:mb-32">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-4 font-mono">
                <span className="text-accent">01.</span> Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CertCard name="Certified Kubernetes Security Specialist (CKS)" org="Linux Foundation" />
                <CertCard name="Certified Kubernetes Administrator (CKA)" org="Linux Foundation" />
                <CertCard name="Certified Kubernetes Application Developer (CKAD)" org="Linux Foundation" />
                <CertCard name="Kubernetes and Cloud Native Associate (KCNA)" org="Linux Foundation" />
                <CertCard name="Kubernetes and Cloud Native Security Associate (KCSA)" org="Linux Foundation" />
                <CertCard name="Professional Cloud Architect" org="Google Cloud" />
                <CertCard name="Professional Cloud Security Engineer" org="Google Cloud" />
                <CertCard name="Professional Cloud Network Engineer" org="Google Cloud" />
                <CertCard name="Professional Cloud DevOps Engineer" org="Google Cloud" />
                <CertCard name="Red Hat Certified Specialist in OpenShift" org="Red Hat" />
                <CertCard name="Red Hat Certified System Administrator" org="Red Hat" />
            </div>
        </div>

        {/* --- Footer Connect --- */}
        <div className="text-center pt-12 border-t border-white/5">
            <h2 className="text-3xl font-bold text-white mb-6 font-mono">Let's Connect</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto font-sans">
                I'm open to relocation opportunities and discussing cloud architecture transformations.
            </p>
            <div className="flex justify-center gap-6">
                <SocialLink href="#" icon={<Github className="w-6 h-6" />} label="Github" />
                <SocialLink href="#" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
                <SocialLink href="#" icon={<Mail className="w-6 h-6" />} label="Email" />
            </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const TimelineItem: React.FC<{ role: string; company: string; description: string; achievements?: string[] }> = ({ role, company, description, achievements }) => (
    <div className="relative pl-8 md:pl-12 group">
        {/* Dot on Track */}
        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#111] border border-gray-600 group-hover:border-accent group-hover:bg-accent transition-colors z-10" />
        
        <div className="flex flex-col mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors font-mono">{role}</h3>
        </div>
        <div className="text-sm text-gray-400 font-medium mb-3 font-mono">{company}</div>
        <p className="text-gray-500 leading-relaxed max-w-3xl mb-4 font-sans">
            {description}
        </p>
        
        {achievements && (
            <ul className="space-y-2 mt-4 mb-8">
                {achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-400 leading-relaxed font-sans">
                        <span className="text-accent/50 mr-2.5 mt-1.5 text-[10px] font-mono">{">>"}</span>
                        {item}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const CertCard: React.FC<{ name: string; org: string }> = ({ name, org }) => (
    <div className="flex items-center gap-4 p-4 rounded-md bg-[#0a0a0a] border border-white/5 hover:border-accent/30 transition-colors group">
        <div className="p-2 bg-white/5 rounded text-accent">
            <Award className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-white font-medium text-sm group-hover:text-accent transition-colors font-mono">{name}</h4>
            <p className="text-xs text-gray-500 font-mono">{org}</p>
        </div>
    </div>
);

const TechBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-accent hover:border-accent/30 transition-colors cursor-default font-mono">
        {icon}
        <span>{label}</span>
    </div>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a 
        href={href} 
        aria-label={label}
        className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
    >
        {icon}
    </a>
);

export default AboutPage;
