# React Components Reference — REPLICATE EXACTLY

Every Tailwind class, every animation, every layout detail below MUST be preserved
in the Templ conversion. This is the source of truth for the visual design.

## === AboutPage.tsx ===
```tsx

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
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
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
                {'//'} Senior DevOps & Cloud Architect
            </motion.p>
        </div>

        {/* --- Hero Profile --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-start">
            
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
                            I am a <strong>Senior DevOps & Cloud Architect</strong> with 13+ years of global experience in cloud infrastructure, automation, and distributed systems. My expertise lies in <strong>Kubernetes</strong>, <strong>CI/CD</strong>, cloud migration, monitoring, and disaster recovery.
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
        <div className="mb-32">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="p-4 bg-white/5 rounded-full border border-white/5 shrink-0">
                        <Activity className="w-8 h-8 text-accent animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4 font-mono">Current Mission Log</h3>
                        <ul className="space-y-4 text-gray-400 font-mono text-sm md:text-base">
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1.5 shrink-0">>></span>
                                <span className="leading-relaxed">Building tech communities locally including DevOps Focus Group (DevOps community to learn DevOps), VFC (Vibecoding From Cafe), and many more.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1.5 shrink-0">>></span>
                                <span className="leading-relaxed">Writing my first book called 'How to Get Hired Internationally'.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1.5 shrink-0">>></span>
                                <span className="leading-relaxed">Building a personal safe haven local cloud with tens of stacks, learning along the way.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Experience / Timeline --- */}
        <div className="mb-32">
            {/* Rocket Track Container */}
            <div className="relative ml-4 md:ml-12 space-y-16">
                
                {/* The Track Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dashed border-white/10"></div>
                
                {/* Rocket Icon at Start */}
                <div className="absolute left-[-5.5px] top-0 text-accent filter drop-shadow-[0_0_8px_rgba(255,207,13,0.5)]">
                    <Rocket className="w-4 h-4 transform -rotate-45" />
                </div>
                
                {/* Gradient Trail */}
                <div className="absolute left-0 top-4 bottom-0 w-px bg-gradient-to-b from-accent/50 to-transparent opacity-50" />

                {/* Title Section Next to Rocket */}
                <div className="pl-8 md:pl-12 pt-1 mb-16">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-4 font-mono">
                        <span className="text-accent">01.</span> Professional Journey
                    </h2>
                </div>

                {/* Item 1 */}
                <TimelineItem 
                    role="Senior Cloud & MLOps Engineer"
                    company="AI-Robotics Company - U.S.A (Remote)"
                    description="Building real-time 3D scene reconstruction systems from CCTV video using computer vision and distributed systems."
                    achievements={[
                        "Designed and deployed a distributed ML training pipeline on Kubernetes (GKE + Ray), reducing training time from 18 days to 7 days (-44%).",
                        "Built a hybrid-cloud inference system (on-prem edge + Google Cloud Platform), achieving sub-500ms latency for real-time video analytics.",
                        "Established continuous integration & continuous deployment pipelines for ML models, reducing release cycles from weeks to hours."
                    ]}
                />

                {/* Item 2 */}
                <TimelineItem 
                    role="Cloud Architect"
                    company="GCP Premiere Partner - Hungary (Remote)"
                    description="Specializing in cloud migration, data analytics, and AI solutions for global clients."
                    achievements={[
                        "Delivered 15+ tailored cloud architecture proposals, securing a 70% client win rate.",
                        "Migrated 1,000+ workloads from AKS to GKE across five Kubernetes clusters with minimal downtime, completing the project within a 6-month timeline and 20% budget left.",
                        "Designed microservices architecture with service mesh for financial clients, improving scalability and security.",
                        "Led a cross-functional team of 6 engineers, aligning cloud strategy with C-level stakeholders and cutting operational costs by 35%."
                    ]}
                />

                {/* Item 3 */}
                <TimelineItem 
                    role="Cloud Engineer Manager"
                    company="Digital Identity Provider - Yogyakarta, Indonesia"
                    description="Leading digital identity and electronic signature provider, trusted by 65M+ verified users."
                    achievements={[
                        "Minimized deployment-related downtime from 0.24% to 0.06% per month by implementing a Blue-Green deployment strategy in Kubernetes, surpassing the team's reliability target of 0.1%.",
                        "Managed a team of 15 cloud engineers, reporting directly to the SVP of Engineering.",
                        "Authored and standardized a Kubernetes Troubleshooting Guide, reducing the average mitigation time by 5 minutes and improving team-wide knowledge sharing.",
                        "Trained engineering teams on cloud and security best practices, increasing team independence and expertise in infrastructure management."
                    ]}
                />

                {/* Item 4 */}
                <TimelineItem 
                    role="Cloud Engineer"
                    company="Digital Identity Provider - Yogyakarta, Indonesia"
                    description="Focused on CI/CD automation and cloud infrastructure modernization."
                    achievements={[
                        "Implemented a fully automated CI/CD pipeline using GitLab, Vault, Flux, and Helm for continuous integration and deployment, resulting in a 90%+ decrease in deployment errors.",
                        "Assisted in migrating legacy applications from On-premises to GCP, reducing annual operational costs by 56% and improving system performance.",
                        "Shifted low-duty applications from Google Kubernetes Engine to Cloud Run, reducing monthly infrastructure costs by more than 35%.",
                        "Developed automation scripts using Python and Bash to streamline infrastructure provisioning and configuration management tasks."
                    ]}
                />

                {/* Item 5 */}
                <TimelineItem 
                    role="Systems Administrator (DevOps Team)"
                    company="Hosting Provider - Malang, Indonesia"
                    description="One of Indonesia's most popular providers of domain, hosting, VPS, and cloud services."
                    achievements={[
                        "Improved system performance and reliability by implementing monitoring and logging with Prometheus, Grafana, and the ELK Stack, resulting in a 30% reduction in downtime.",
                        "Increased network uptime by 2% by integrating a third-party network firewall and DDoS flood protection, utilizing Nginx for reverse proxying.",
                        "Implemented network redundancy using BGP and load balancing solutions to reduce network downtime by another 1.2%.",
                        "Decreased server setup time by 50-70% by implementing Ansible for automated configuration management."
                    ]}
                />

                {/* Item 6 */}
                <TimelineItem 
                    role="Technical Support Specialist"
                    company="Hosting Provider - Malang, Indonesia"
                    description="Provided tier-1 and tier-2 support for hosting infrastructure."
                    achievements={[
                        "Delivered fast and effective technical support for customer cases through chat, ticketing system, and phone.",
                        "Collaborated with the Operation Maintenance team to maintain server uptime by coordinating proactive maintenance activities, resulting in a 20% reduction in customer-reported outages.",
                        "Escalated unresolved issues to appropriate internal teams in a proper and timely manner."
                    ]}
                />

                 {/* Item 7 */}
                 <TimelineItem 
                    role="Onsite Technician"
                    company="Hardware Service Center - Jakarta"
                    description="IT solutions and hardware/software provider serving enterprise clients nationwide."
                    achievements={[
                        "Diagnosed and resolved enterprise hardware/software issues on-site.",
                        "Served as the first line of technical support ensuring high client satisfaction."
                    ]}
                />

            </div>
        </div>

        {/* --- Certifications Grid (Only Certs Now) --- */}
        <div className="mb-32">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4 font-mono">
                <span className="text-accent">02.</span> Certifications
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
                        <span className="text-accent/50 mr-2.5 mt-1.5 text-[10px] font-mono">>></span>
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
```

## === AbstractVisual.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Box, TerminalSquare, Activity, GitBranch, Settings } from 'lucide-react';

const AbstractVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center -mt-24" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(5deg) rotateY(5deg)' }}>
      
      {/* Background Universe Nodes (Stars) */}
      <UniverseNode top="10%" left="20%" delay={0} />
      <UniverseNode top="15%" left="80%" delay={2} />
      <UniverseNode top="80%" left="15%" delay={4} />
      <UniverseNode top="75%" left="85%" delay={1} />
      <UniverseNode top="40%" left="90%" delay={3} />
      <UniverseNode top="50%" left="10%" delay={5} />
      
      {/* Connection Lines (Subtle Mesh) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <line x1="20%" y1="10%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        <line x1="80%" y1="15%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        <line x1="15%" y1="80%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        <line x1="85%" y1="75%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
      </svg>

      {/* Background Glows - Brightened */}
      <div className="absolute inset-0 bg-accent/30 blur-[100px] rounded-full transform scale-75 opacity-60" />
      
      {/* Orbital Rings */}
      <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" style={{ transform: 'translateZ(-50px)' }} />
      <div className="absolute w-[420px] h-[420px] border border-white/5 rounded-full animate-[spin_50s_linear_infinite_reverse] opacity-50" style={{ transform: 'translateZ(-20px)' }} />
      <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute w-[220px] h-[220px] border border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" style={{ transform: 'translateZ(20px)' }} />

      {/* Center Astronaut Avatar - Floating Animation */}
      <motion.div 
        className="relative z-20 w-48 h-48 flex items-center justify-center"
        style={{ transform: 'translateZ(50px)' }}
        animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0]
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
      >
         {/* Helmet/Visor Container */}
         <div className="w-full h-full rounded-full border-4 border-white/10 shadow-[0_0_50px_rgba(255,207,13,0.2)] overflow-hidden relative bg-black group">
            
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-indigo-500/10 z-10 mix-blend-overlay" />
            
            {/* Astronaut Image - Public Asset */}
            <img 
                src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop" 
                alt="Astronaut Avatar" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            />
            
            {/* Glass Reflection Effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent z-20 pointer-events-none opacity-50" />
            
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.1] z-10 mix-blend-overlay pointer-events-none" />
         </div>
      </motion.div>

      {/* Orbiting Tech Icons */}
      
      {/* Outer Orbit */}
      <OrbitIcon radius={250} duration={30} delay={0} icon={<KubernetesIcon size={40} />} />
      <OrbitIcon radius={250} duration={30} delay={10} icon={<DockerIcon size={32} />} />
      <OrbitIcon radius={250} duration={30} delay={20} icon={<TerraformIcon size={32} />} />

      {/* Middle Orbit */}
       <OrbitIcon radius={210} duration={25} delay={5} reverse icon={
         <div className="p-2 bg-dark border border-white/20 rounded-lg">
            <Activity className="w-5 h-5 text-green-400" />
         </div>
       } />

      {/* Inner Orbit */}
      <OrbitIcon radius={175} duration={15} delay={0} reverse icon={
         <div className="p-2 bg-dark border border-white/20 rounded-lg">
            <GitBranch className="w-6 h-6 text-[#f05032]" />
         </div>
      } />
      <OrbitIcon radius={175} duration={15} delay={7.5} reverse icon={
         <div className="p-2 bg-dark border border-white/20 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
         </div>
      } />


      {/* Floating Code Snippets */}
      
      {/* Top Right: AWS Resource */}
      <FloatingCard className="absolute top-[10%] right-[5%] z-30" delay={0}>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl w-48 hover:border-accent/30 transition-all duration-300" style={{ transform: 'translateZ(80px)' }}>
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 bg-white/20 rounded w-1/3" />
            <div className="h-2 bg-white/10 rounded w-3/4" />
            <div className="h-2 bg-white/10 rounded w-1/2" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-accent" />
            <span className="text-[10px] text-gray-400 font-mono">aws_eks_cluster</span>
          </div>
        </div>
      </FloatingCard>

      {/* Middle Left: Terminal Log */}
      <FloatingCard className="absolute top-[35%] left-[0%] z-30" delay={1.5}>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl w-44 hover:border-accent/30 transition-all duration-300" style={{ transform: 'translateZ(60px)' }}>
           <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
               <TerminalSquare className="w-3 h-3 text-gray-500" />
               <span className="text-[10px] text-gray-500 font-mono">server.log</span>
           </div>
           <div className="font-mono text-[8px] space-y-1 text-green-400/80">
               <div>> npm start</div>
               <div className="text-gray-400">Starting service...</div>
               <div>✓ Connected to DB</div>
               <div className="animate-pulse">_</div>
           </div>
        </div>
      </FloatingCard>

      {/* Bottom Right: K8s Manifest */}
      <FloatingCard className="absolute bottom-[15%] right-[10%] z-30" delay={2}>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl w-52 hover:border-accent/30 transition-all duration-300" style={{ transform: 'translateZ(100px)' }}>
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="space-y-1.5 font-mono text-[8px] text-gray-500">
             <div className="flex"><span className="text-purple-400">apiVersion:</span>&nbsp;apps/v1</div>
             <div className="flex"><span className="text-purple-400">kind:</span>&nbsp;Deployment</div>
             <div className="flex pl-2"><span className="text-blue-400">name:</span>&nbsp;prod-api</div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Box className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] text-gray-400 font-mono">deployment.yaml</span>
          </div>
        </div>
      </FloatingCard>

    </div>
  );
};

// --- Helper Components ---

const UniverseNode: React.FC<{ top: string; left: string; delay: number }> = ({ top, left, delay }) => (
    <div 
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{ top, left, animationDelay: `${delay}s`, opacity: 0.3 }}
    />
);

const OrbitIcon: React.FC<{ radius: number; duration: number; delay: number; icon: React.ReactNode; reverse?: boolean }> = ({ radius, duration, delay, icon, reverse = false }) => {
    return (
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ 
                width: radius * 2, 
                height: radius * 2,
                animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
                animationDelay: `-${delay}s`,
                transformStyle: 'preserve-3d',
            }}
        >
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    animation: `spin ${duration}s linear infinite ${!reverse ? 'reverse' : ''}`, // Counter-rotate to keep icon upright
                }}
            >
                <div className="bg-dark p-2 rounded-full border border-white/10 shadow-xl hover:border-accent hover:scale-110 transition-all cursor-pointer z-20 relative">
                    {icon}
                </div>
            </div>
             <style>{`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

const FloatingCard: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({ className, delay = 0, children }) => (
    <motion.div
        className={className}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
        {children}
    </motion.div>
);

// --- Tech Icons ---
const KubernetesIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#326ce5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M12 2v4" /><path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" /><path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
    </svg>
);

const DockerIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0db7ed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 10a6 6 0 0 0-6-6H4a2 2 0 0 0-2 2v2" />
        <path d="M22 13h-4.5" />
        <rect x="2" y="10" width="20" height="8" rx="2" />
        <circle cx="6" cy="14" r="1" fill="currentColor" />
        <circle cx="10" cy="14" r="1" fill="currentColor" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
    </svg>
);

const TerraformIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7b42bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8l8-4l8 4v8l-8 4l-8-4z" />
            <path d="M12 4v16" />
            <path d="M4 8l8 4l8-4" />
    </svg>
);

export default AbstractVisual;
```

## === ArticleList.tsx ===
```tsx

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
```

## === BlogPosts.tsx ===
```tsx

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
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight relative inline-block z-10 text-white font-mono flex items-center gap-3">
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
            <div className="space-y-16">
            {ARTICLES.map((article, index) => (
                <div key={index} className="group flex flex-col lg:flex-row gap-10 items-start border-b border-white/5 pb-16 last:border-0 relative">
                
                {/* Subtle row highlight on hover */}
                <div className="absolute -inset-6 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500 -z-10 rounded-lg" />

                {/* Content */}
                <div className="flex-1 space-y-4">
                    <span className="text-sm text-accent font-medium tracking-wide font-mono">{article.date}</span>
                    
                    {/* UPDATED: Changed font-sans to font-mono for consistency */}
                    <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 cursor-pointer leading-tight font-mono">
                    {article.title}
                    </h3>
                    
                    <p className="text-lg text-gray-400 leading-relaxed font-sans">
                    {article.excerpt}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-6 pt-2 font-mono">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">
                        <Clock className="w-3 h-3 text-accent" />
                        <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">
                        <Eye className="w-3 h-3 text-accent" />
                        <span>{article.views}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-2 ml-auto">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-sm text-xs font-medium text-accent border border-white/5 group-hover:border-accent/20 transition-colors">
                            #{tag}
                            </span>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Thumbnail - Reduced size by ~30% */}
                <div className="w-full lg:w-[280px] h-48 rounded-sm overflow-hidden bg-[#111] border border-white/10 shrink-0 shadow-lg relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500">
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
                <button className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-md px-8 py-3 text-sm font-medium tracking-wide backdrop-blur-sm font-mono uppercase">
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
```

## === BooksPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Book } from 'lucide-react';

const BOOKS = [
    {
        title: "The Phoenix Project",
        author: "Gene Kim, Kevin Behr, George Spafford",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop", // Placeholder
        rating: 5,
        review: "The novel that introduced me to DevOps. It perfectly captures the chaos of IT operations and how lean principles can save the day. A must-read for anyone in tech.",
        tags: ["DevOps", "Fiction", "Management"]
    },
    {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop", // Placeholder
        rating: 5,
        review: "The bible of distributed systems. It explains the trade-offs in data systems with incredible clarity. It changed how I think about databases and reliability.",
        tags: ["Architecture", "Data", "Technical"]
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop", // Placeholder
        rating: 4,
        review: "Practical advice for building good habits and breaking bad ones. Essential for maintaining productivity and continuous learning in a fast-paced career.",
        tags: ["Productivity", "Self-Help"]
    },
    {
        title: "Site Reliability Engineering",
        author: "Betsy Beyer, Chris Jones, et al.",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop", // Placeholder
        rating: 5,
        review: "How Google runs production systems. The foundational text for SRE. While not every company is Google, the principles of SLIs, SLOs, and error budgets are universal.",
        tags: ["SRE", "DevOps", "Google"]
    }
];

const BooksPage: React.FC = () => {
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
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> knowledge_base
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} A curated list of books that have shaped my thinking.
            </motion.p>
        </div>

        {/* Books List */}
        <div className="space-y-12">
            {BOOKS.map((book, idx) => (
                <motion.div 
                    key={book.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col md:flex-row gap-8 bg-[#0a0a0a] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-all duration-300 group"
                >
                    {/* Cover */}
                    <div className="w-full md:w-32 h-48 bg-[#151515] rounded-lg shrink-0 overflow-hidden relative shadow-lg">
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <Book className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                            <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors font-mono">{book.title}</h2>
                                <p className="text-gray-400 text-sm font-medium font-mono">{book.author}</p>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < book.rating ? 'text-accent fill-accent' : 'text-gray-700'}`} 
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed mb-4 italic font-sans">
                            "{book.review}"
                        </p>

                        <div className="flex gap-2 font-mono">
                            {book.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-500 uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default BooksPage;
```

## === DeckViewerPage.tsx ===
```tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';

interface DeckViewerPageProps {
  onBack: () => void;
}

const DeckViewerPage: React.FC<DeckViewerPageProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 12;

  const nextSlide = () => setCurrentSlide(prev => Math.min(totalSlides, prev + 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
       {/* --- Standardized Background Section --- */}
       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* 1. Nebula Gradients */}
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           
           {/* 2. Stars & Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

           {/* 3. Floating Debris */}
           <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-yellow-200/20 rounded-full animate-float-slow shadow-[0_0_10px_rgba(255,207,13,0.5)]" />
           <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/10 rounded-full animate-float-medium" />
           <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white/10 rounded-full animate-ping" />

           {/* 4. Hazy Orbital Tracks & Comets */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="group flex items-center space-x-2 text-gray-500 hover:text-white mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Talks</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Viewer */}
            <div className="flex-1">
                <div className="relative aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                    {/* Mock Slide Content */}
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Slide {currentSlide}</h2>
                            <p className="text-gray-500">Zero Trust Networking in Practice</p>
                            <div className="mt-8 w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${(currentSlide / totalSlides) * 100}%` }} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Controls Overlay */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                        <button onClick={prevSlide} disabled={currentSlide === 1} className="p-2 rounded-full bg-black/50 text-white hover:bg-accent hover:text-black disabled:opacity-30 disabled:hover:bg-black/50 disabled:hover:text-white transition-all">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button onClick={nextSlide} disabled={currentSlide === totalSlides} className="p-2 rounded-full bg-black/50 text-white hover:bg-accent hover:text-black disabled:opacity-30 disabled:hover:bg-black/50 disabled:hover:text-white transition-all">
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                {/* Bottom Toolbar */}
                <div className="mt-4 flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-lg p-3 px-6">
                    <span className="text-sm text-gray-400 font-mono">Page {currentSlide} / {totalSlides}</span>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-white"><Download className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-white"><Maximize2 className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* Sidebar info */}
            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Zero Trust Networking</h3>
                    <p className="text-sm text-gray-400 mb-4">Presented at DevOps Days Singapore, 2023.</p>
                    <div className="prose prose-invert text-xs text-gray-500 leading-relaxed">
                        <p>Moving beyond VPNs: Implementing mTLS everywhere using Istio and Cilium. Practical architectural patterns for securing microservices.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DeckViewerPage;
```

## === EngineeringSpotlight.tsx ===
```tsx

import React from 'react';
import { Github, ExternalLink, ArrowRight, Layers, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface EngineeringSpotlightProps {
  onProjectSelect?: (projectId: string) => void;
}

const EngineeringSpotlight: React.FC<EngineeringSpotlightProps> = ({ onProjectSelect }) => {
  return (
    <section className="pt-12 pb-24 relative overflow-hidden bg-dark">
      {/* Cosmic Cloud Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[150px] mix-blend-screen opacity-40" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-30 translate-x-20 -translate-y-10" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-4">
           <div className="flex items-center justify-start">
                <motion.h2 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold tracking-tight flex items-center gap-4 font-mono text-white"
                >
                    <motion.span 
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                        className="text-accent"
                    >
                        [
                    </motion.span>
                    
                    <span>Engineering Spotlight</span>
                    
                    <motion.span 
                         variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                        className="text-accent"
                    >
                        ]
                    </motion.span>
                </motion.h2>
           </div>
          
          <p className="text-xl text-gray-400 whitespace-nowrap pl-4 border-l-2 border-accent/20 font-mono text-sm md:text-base">
            {'//'} A selection of infrastructure and automation projects.
          </p>
        </div>

        {/* Project 1 - Image Right (Default) */}
        <ProjectCard 
            align="right"
            title="KubeGuardian"
            description="An automated Kubernetes cluster security auditor and remediation controller. It scans for misconfigurations against CIS benchmarks and automatically patches non-compliant resources using OPA Gatekeeper policies."
            tech={['Golang', 'Kubernetes Operator', 'OPA', 'Prometheus']}
            image="https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=1600&auto=format&fit=crop"
            repoLink="#"
            demoLink="#"
            onClick={() => onProjectSelect && onProjectSelect('kubeguardian')}
        />

        {/* Project 2 - Image Left (Alternating) */}
        <ProjectCard 
            align="left"
            title="Terraform Drift"
            description="A self-hosted drift detection platform for Terraform state. It periodically checks remote state against actual cloud infrastructure, generating alerts and visual diff reports for DevOps teams."
            tech={['TypeScript', 'Terraform', 'AWS Lambda', 'React']}
            image="https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=1600&auto=format&fit=crop"
            repoLink="#"
            demoLink="#"
            onClick={() => onProjectSelect && onProjectSelect('terraform-drift')}
        />

        {/* See More Link */}
        <div className="flex justify-center pt-8">
             <a href="#" className="group inline-flex items-center space-x-2 text-lg font-medium text-gray-400 hover:text-accent transition-colors font-mono">
                <span>See more projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    image: string;
    repoLink: string;
    demoLink: string;
    align: 'left' | 'right';
    onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, repoLink, demoLink, align, onClick }) => {
    return (
        <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#151515] backdrop-blur-md rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden">
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.1] pointer-events-none" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />

            {/* New Gradient Overlay to match RetroCard */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content Side */}
            <div className={`space-y-6 relative z-10 order-2 ${align === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-3">
                    <h3 
                        onClick={onClick}
                        className={`text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-mono ${onClick ? 'cursor-pointer' : ''}`}
                    >
                        {title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed font-sans">
                        {description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {tech.map((t) => (
                        <div key={t} className="flex items-center space-x-2 px-2.5 py-1 rounded bg-white/5 text-gray-300 text-xs font-mono border border-white/5">
                            {t === 'Kubernetes Operator' ? <Cpu className="w-3 h-3 text-accent" /> : 
                             t === 'Terraform' ? <Database className="w-3 h-3 text-accent" /> :
                             <Layers className="w-3 h-3 text-accent" />}
                            <span>{t}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2 font-mono text-sm">
                    <button 
                        onClick={(e) => {
                            if (onClick) {
                                e.preventDefault();
                                onClick();
                            }
                        }}
                        className="flex items-center space-x-2 bg-white text-black px-5 py-2 rounded-md font-bold hover:bg-accent hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                        <Github className="w-4 h-4" />
                        <span>View Project</span>
                    </button>
                    <a href={demoLink} className="flex items-center space-x-2 px-5 py-2 rounded-md font-bold text-white border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all duration-300">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Site</span>
                    </a>
                </div>
            </div>

            {/* Image Side */}
            <div 
                onClick={onClick}
                className={`relative h-[220px] lg:h-[280px] overflow-hidden bg-[#111] border border-white/10 shadow-2xl rounded-lg order-1 group-hover:-translate-y-2 transition-transform duration-500 ${align === 'right' ? 'lg:order-2' : 'lg:order-1'} ${onClick ? 'cursor-pointer' : ''}`}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-20 z-10 mix-blend-overlay" />
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
            </div>

            {/* Bottom Progress Bar Line */}
            <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
        </div>
    );
};

export default EngineeringSpotlight;
```

## === FeaturedPosts.tsx ===
```tsx

import React from 'react';
import { ArrowRight, Box, GitBranch, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedPosts: React.FC = () => {
  return (
    <section className="pt-24 pb-40 relative overflow-hidden bg-dark">
       {/* 1. Seamless Transition Gradient from Hero */}
       <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-dark via-dark to-transparent z-10 pointer-events-none" />

       {/* 2. Central Cosmic Haze */}
       <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/20 blur-[180px] rounded-full mix-blend-screen opacity-60" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen" />
       </div>

       {/* 3. Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark via-dark to-transparent z-0 pointer-events-none" />

       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Section */}
          <div className="relative text-center mb-32 max-w-3xl mx-auto pt-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center"
            >
                <h2 className="relative z-10 leading-none font-mono tracking-tight text-4xl md:text-6xl font-bold text-white">
                    <span className="text-accent">{'>'}</span> Feature_Highlights
                </h2>

                <div className="mt-8 max-w-2xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-lg md:text-xl text-gray-400 font-mono leading-relaxed text-center px-8">
                            <span className="text-accent">{'//'}</span> Sharing my approach to infrastructure challenges and DevOps mental models.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              <PostCard 
                category="Infrastructure"
                title="Cluster Constellations" 
                subtitle="Navigating the complex galaxy of Kubernetes pods and nodes."
                visual={<K8sVisual />}
                delay={0.1}
              />
              <PostCard 
                category="Automation"
                title="Velocity Thrusters" 
                subtitle="Building resilient CI/CD pipelines for lightspeed delivery."
                visual={<PipelineVisual />}
                delay={0.2}
              />
              <PostCard 
                category="Architecture"
                title="Orbital Mechanics" 
                subtitle="Distributed patterns and high-availability system design."
                visual={<GridVisual />}
                delay={0.3}
              />
          </div>
       </div>
    </section>
  );
};

const PostCard: React.FC<{ category: string; title: string; subtitle: string; visual: React.ReactNode; delay: number }> = ({ category, title, subtitle, visual, delay }) => {
    return (
        <motion.a 
            href="#" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden hover:border-accent/30 transition-all duration-500 flex flex-col h-full hover:shadow-[0_0_30px_rgba(255,207,13,0.05)] hover:-translate-y-1"
        >
             {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

            {/* Visual Container */}
            <div className="h-64 bg-[#0f0f0f] flex items-center justify-center relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-[200%] w-full animate-[scan_4s_linear_infinite]" />
                <div className="transform transition-transform duration-500 group-hover:scale-110 relative z-10 grayscale group-hover:grayscale-0 transition-all">
                    {visual}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col justify-end relative z-10 bg-[#0a0a0a]">
                <div className="mb-3">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/20 px-2 py-1 rounded bg-accent/5 group-hover:bg-accent/10 transition-colors">
                        {category}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-mono">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">{subtitle}</p>
                
                <div className="mt-6 flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors font-mono">
                    <span>{'>'} Initialize Sequence</span>
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
            `}</style>
        </motion.a>
    );
};

const K8sVisual = () => (
    <div className="relative transform scale-100">
        <div className="w-32 h-32 rounded-full border border-white/10 relative flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">
             <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute w-[140%] h-[140%] animate-[spin_8s_linear_infinite_reverse]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full blur-[1px] shadow-[0_0_10px_var(--accent)]" />
             </div>
             <div className="grid grid-cols-2 gap-2 relative z-10">
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-accent/10 border border-accent/50" />
             </div>
        </div>
    </div>
);

const PipelineVisual = () => (
    <div className="flex items-center space-x-2 transform scale-100">
        <div className="relative">
             <div className="w-10 h-10 rounded-lg border border-green-500/30 flex items-center justify-center bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <Box className="w-5 h-5 text-green-500/80" />
             </div>
        </div>
        <div className="w-12 h-1 bg-white/5 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-accent/80 animate-[shimmer_1.5s_infinite]" />
        </div>
        <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/5 shadow-[0_0_15px_rgba(255,207,13,0.1)]">
             <GitBranch className="w-5 h-5 text-accent" />
        </div>
        <div className="w-12 h-1 bg-white/5 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-accent/80 animate-[shimmer_1.5s_infinite] delay-75" />
        </div>
        <Rocket className="w-6 h-6 text-white/80 rotate-45" />
        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
    </div>
);

const GridVisual = () => (
    <div className="relative w-32 h-32 transform rotate-45 scale-75">
        <div className="absolute inset-0 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
            <div className="rounded-xl border border-accent/40 bg-accent/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,207,13,0.1)] animate-pulse" />
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full z-20 shadow-[0_0_10px_white]" />
        <div className="absolute inset-0 border border-white/5 rounded-full scale-150" />
    </div>
);

export default FeaturedPosts;
```

## === Footer.tsx ===
```tsx

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
                            Senior DevOps Architect traversing the unknown domains of cloud infrastructure and distributed systems.
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
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                    
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
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-mono text-gray-600 uppercase tracking-wider">
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

export default Footer;```

## === GuestBookPage.tsx ===
```tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User } from 'lucide-react';

const SIGNATURES = [
    { name: "Alice M.", message: "Love the nebula design! The 3D effect is stunning.", date: "Oct 24, 2024" },
    { name: "DevDan", message: "Great collection of Kubernetes resources. Thanks for sharing.", date: "Oct 22, 2024" },
    { name: "Sarah J.", message: "Your 'Life Outside Tech' page is inspiring. Keep traveling!", date: "Oct 20, 2024" }
];

const GuestBookPage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Logic to submit message would go here
      setMessage("");
      alert("Thanks for signing the guestbook! (Demo)");
  };

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

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> visitor_log
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} Leave a mark on the digital void.
            </motion.p>
        </div>

        {/* Form */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 bg-[#0a0a0a] border border-white/10 rounded-xl p-6"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 font-mono">$ echo "message"</label>
                    <textarea 
                        id="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono text-sm"
                        placeholder="Say hello..."
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-accent text-black font-bold rounded-full hover:bg-accent/80 transition-colors font-mono">
                        <Send className="w-4 h-4" />
                        <span>[ENTER] Sign</span>
                    </button>
                </div>
            </form>
        </motion.div>

        {/* Signatures List */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                cat recent_signatures.log
            </h2>
            {SIGNATURES.map((sig, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="flex gap-4 p-4 border-b border-white/5 last:border-0"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-gray-400">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-white font-mono">{sig.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{sig.date}</span>
                        </div>
                        <p className="text-gray-400 font-sans">{sig.message}</p>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default GuestBookPage;
```

## === Hero.tsx ===
```tsx

import React, { useState } from 'react';
import { Github, Twitter, Mail, Linkedin, Instagram, Youtube, ArrowDown, Sparkles, Send, Loader2, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
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
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Contextual information for the AI
        const systemInstruction = `You are an AI assistant for El Muhammad's personal portfolio.
        
        Professional Profile:
        - Role: Senior DevOps & Cloud Architect
        - Experience: 13+ years globally
        - Status: Currently building a personal cloud 'at home'
        
        Key Expertise:
        - Kubernetes & Cloud-Native Ecosystems
        - MLOps & Distributed Training
        - CI/CD Pipelines & GitOps
        - Cloud Migration & Cost Ops
        - Infrastructure as Code (Terraform, Helm, Ansible)
        - Observability Stacks
        
        Instructions:
        - Act as a knowledgeable, professional, yet approachable digital assistant for El.
        - Answer questions specifically about El's career, skills, and DevOps topics.
        - Keep answers concise (under 50 words preferably) and impactful.
        - If asked about contact info, suggest checking the footer or social links.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        
        setAnswer(response.text || "I couldn't retrieve that information right now.");
    } catch (error) {
        console.error("AI Error:", error);
        setAnswer("Connection to the neural network failed. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center py-24 md:py-0 bg-dark overflow-hidden font-mono">
      
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
                <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tighter leading-none">
                  Hello, I'm <span className="text-accent">El</span><span className="animate-pulse">_</span>
                </h1>
                
                <div className="space-y-6">
                <p className="text-lg text-gray-400 leading-relaxed w-full font-light font-sans">
                    <span className="bg-white/10 text-white px-2 py-0.5 rounded text-sm font-mono mr-2 border border-white/10">
                        Senior DevOps & Cloud Architect
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

            {/* Right Content - Abstract Visual */}
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
    className="text-gray-500 hover:text-accent transition-colors p-2 hover:bg-white/5 rounded"
  >
    {icon}
  </a>
);

export default Hero;
```

## === KudosPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, PenTool, Layout } from 'lucide-react';

const TECH_STACK = [
    { name: "React", description: "UI Library", icon: <Code2 className="w-5 h-5" /> },
    { name: "Tailwind CSS", description: "Styling", icon: <PenTool className="w-5 h-5" /> },
    { name: "Framer Motion", description: "Animations", icon: <Layout className="w-5 h-5" /> },
    { name: "Lucide Icons", description: "Iconography", icon: <Heart className="w-5 h-5" /> }
];

const KudosPage: React.FC = () => {
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> dependencies
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} Appreciation for the tools and people that make this possible.
            </motion.p>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
            <h2 className="text-2xl font-bold text-white mb-8 text-center font-mono">package.json</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {TECH_STACK.map((tech, idx) => (
                    <motion.div 
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300"
                    >
                        <div className="flex justify-center mb-4 text-accent">
                            {tech.icon}
                        </div>
                        <h3 className="text-white font-bold mb-1 font-mono">{tech.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">{tech.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Inspirations / Thanks */}
        <div className="text-center bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 rounded-xl p-10">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">Special Thanks</h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto font-sans">
                To the open source community, the designers who share their work on Dribbble and Pinterest for inspiration, and to the friends who provided feedback on early iterations of this portfolio.
            </p>
            <div className="mt-8">
                <Heart className="w-8 h-8 text-red-500 mx-auto animate-pulse" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default KudosPage;
```

## === LifeOutsideTechPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Coffee, Camera, Plane, MapPin } from 'lucide-react';

const HOBBIES = [
    {
        title: "Gaming",
        icon: <Gamepad2 className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        description: "Exploring virtual worlds. Currently obsessed with Baldur's Gate 3 and Cyberpunk 2077. I enjoy RPGs that allow for deep immersion and complex decision-making."
    },
    {
        title: "Coffee Brewing",
        icon: <Coffee className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        description: "The morning ritual. Dialing in the perfect espresso shot or V60 pour-over. Exploring beans from different regions of Indonesia and Ethiopia."
    },
    {
        title: "Photography",
        icon: <Camera className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
        description: "Capturing moments. Mostly street photography and architectural shots. I love playing with light and shadows in urban environments."
    },
    {
        title: "Traveling",
        icon: <Plane className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
        description: "Solo backpacking and experiencing new cultures. Recently visited Japan and was amazed by the blend of tradition and modernity."
    }
];

const LifeOutsideTechPage: React.FC = () => {
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> offline_mode
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} When the terminal is closed, this is where I traverse.
            </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOBBIES.map((hobby, idx) => (
                <motion.div 
                    key={hobby.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
                >
                    <div className="aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                        <img 
                            src={hobby.image} 
                            alt={hobby.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-accent">
                                {hobby.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white font-mono">{hobby.title}</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed font-sans">
                            {hobby.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Map Section */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-8 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 rounded-xl text-center"
        >
            <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2 font-mono">Based in Indonesia</h3>
            <p className="text-gray-400 font-sans">Exploring the archipelago and beyond. Always looking for the next adventure.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default LifeOutsideTechPage;
```

## === MouseFollower.tsx ===
```tsx

import React, { useEffect, useRef } from 'react';

export const MouseFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Store coordinates in refs to avoid re-renders
  const mouse = useRef({ x: -100, y: -100 }); // Start off-screen
  const ring = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      // Linear Interpolation (Lerp) for smooth delay
      // The 0.15 factor determines the 'weight' or lag of the ring. Higher = faster.
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      
      ring.current.x += dx * 0.15;
      ring.current.y += dy * 0.15;

      if (ringRef.current) {
        // Use translate3d to force hardware acceleration
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      requestRef.current = requestAnimationFrame(animateRing);
    };

    // Start loop
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Inner Dot - Instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }} // Initial off-screen
      />

      {/* Outer Ring - Smooth */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }} // Initial off-screen
      />
    </>
  );
};
```

## === Navbar.tsx ===
```tsx

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

export default Navbar;```

## === PostDetail.tsx ===
```tsx

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

const POSTS_DB: Record<string, any> = {
    '1': {
        title: "Scaling Kubernetes Clusters with Karpenter",
        subtitle: "Why the default Cluster Autoscaler wasn't enough for our ML workloads, and how we reduced provisioning time by 80% using Karpenter.",
        date: "December 10, 2024",
        readTime: "15 min read",
        author: "El Muhammad",
        views: "8,243",
        initialLikes: 342,
        category: "Infrastructure",
        tags: ["Kubernetes", "AWS", "Cost Optimization", "Golang"],
        sections: [
            {
                id: "introduction",
                title: "The Legacy of Autoscaling",
                content: [
                    { type: "text", content: "For the better part of a decade, the Kubernetes Cluster Autoscaler (CA) has been the de facto standard for node scaling. It works by watching for pending pods and then adjusting the size of cloud provider Auto Scaling Groups (ASGs).\n\nWhile this model works reasonably well for steady-state web applications, it begins to fracture under the weight of dynamic, high-velocity workloads like Machine Learning training jobs or CI/CD pipelines. We faced a specific challenge: our ML training jobs required massive burst capacity—sometimes requesting 500+ GPUs in a matter of minutes—and the Cluster Autoscaler was simply too slow." },
                    { type: "text", content: "The core issue lies in the abstraction. The Cluster Autoscaler doesn't actually provision nodes; it asks the ASG to do it. This decoupling introduces latency, race conditions, and worst of all, strict rigidity in instance type selection." }
                ]
            },
            {
                id: "problem",
                title: "Why ASGs Fail at Scale",
                content: [
                    { type: "text", content: "Auto Scaling Groups are designed for homogeneity. You define a launch template with a specific instance type (e.g., m5.2xlarge) and the ASG ensures you have N copies of it. But Kubernetes is heterogeneous by nature. One pod might need 2 vCPUs and 8GB RAM, while another needs 64 vCPUs and 256GB RAM.\n\nTo handle this with CA, you end up creating dozens of node groups:" },
                    { type: "code", language: "yaml", content: `node_groups:
  - name: general-purpose
    instance_types: ["t3.medium", "m5.large"]
  - name: compute-optimized
    instance_types: ["c5.2xlarge"]
  - name: memory-optimized
    instance_types: ["r5.4xlarge"]
  - name: gpu-training
    instance_types: ["p3.2xlarge"]` },
                    { type: "text", content: "This fragmentation leads to 'bin-packing' inefficiencies. If a pod needs just slightly more resources than an available node, CA spins up a whole new large node, leaving the rest of the capacity wasted. Our cost efficiency metric was hovering around 65%, which was unacceptable at our scale." }
                ]
            },
            {
                id: "karpenter",
                title: "Enter Karpenter",
                content: [
                    { type: "text", content: "Karpenter takes a radically different approach. It bypasses ASGs entirely. Instead of managing groups of nodes, Karpenter manages the capacity directly by talking to the EC2 Fleet API. It observes the aggregate resource requests of unschedulable pods and calculates the *exact* set of instances needed to fit them efficiently." },
                    { type: "text", content: "This is 'Groupless Autoscaling'.\n\nWhen a pending pod appears, Karpenter looks at its constraints (node selectors, tolerations, resource requests) and launches the cheapest possible instance that satisfies those constraints. It creates a bespoke node for the workload." },
                    { type: "image", url: "https://karpenter.sh/v0.32/images/karpenter-architecture.png", caption: "Karpenter Architecture Overview (Source: Karpenter Docs)" }
                ]
            },
            {
                id: "implementation",
                title: "Provisioning Strategy",
                content: [
                    { type: "text", content: "Implementing Karpenter required a shift in mindset. We stopped thinking about 'Node Groups' and started thinking about 'Provisioners' (now NodePools in v1beta1). Here is the configuration we deployed for our AI workload:" },
                    { type: "code", language: "yaml", content: `apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: gpu-workload
spec:
  template:
    spec:
      requirements:
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot"]
        - key: node.kubernetes.io/instance-type
          operator: In
          values: ["g4dn.xlarge", "g4dn.2xlarge", "p3.2xlarge"]
        - key: "topology.kubernetes.io/zone"
          operator: In
          values: ["us-east-1a", "us-east-1b"]
  limits:
    resources:
      cpu: 1000
  disruption:
    consolidationPolicy: WhenUnderutilized
    expireAfter: 720h` },
                    { type: "text", content: "Key takeaways from this config:\n1. **Spot Instances**: We heavily leverage Spot instances for training jobs, reducing costs by ~60%.\n2. **Instance Flexibility**: We give Karpenter a list of acceptable GPU types. If `g4dn.xlarge` is out of stock in us-east-1a, it automatically fails over to `g4dn.2xlarge` or tries a different zone.\n3. **Consolidation**: The `WhenUnderutilized` policy is magic. Karpenter actively watches for nodes that are underutilized and will drain them and move pods to smaller nodes or pack them onto existing nodes to save money." }
                ]
            },
            {
                id: "results",
                title: "Real-world Results",
                content: [
                    { type: "text", content: "After running Karpenter in production for 3 months, the results were transformative:" },
                    { type: "code", language: "text", content: `Metric                  | Cluster Autoscaler | Karpenter
------------------------|--------------------|-----------
Avg Provisioning Time   | 4m 30s             | 45s
Bin-packing Efficiency  | 65%                | 92%
Spot Interruption Rate  | High               | Low (Faster recovery)
Cloud Bill (Monthly)    | $45,000            | $31,500` },
                    { type: "text", content: "The provisioning time dropping to under a minute was the game changer. Our data scientists stopped complaining about 'waiting for compute' and could iterate on their models much faster. The cost savings were just the cherry on top." }
                ]
            },
            {
                id: "conclusion",
                title: "Conclusion",
                content: [
                    { type: "text", content: "Karpenter is not just a faster autoscaler; it's a fundamental shift in how we manage Kubernetes infrastructure. It aligns the infrastructure lifecycle with the application lifecycle. If you are running dynamic workloads on AWS EKS, migrating to Karpenter should be your top priority for Q1." }
                ]
            }
        ]
    },
    '7': {
        title: "How I Implemented GitOps with ArgoCD",
        subtitle: "A comprehensive guide to implementing a scalable GitOps workflow using ArgoCD to manage hundreds of applications.",
        date: "June 17, 2024",
        readTime: "10 min read",
        author: "El Muhammad",
        views: "15,102",
        initialLikes: 520,
        category: "CI/CD",
        tags: ["GitOps", "ArgoCD", "Kubernetes"],
        sections: [
            { id: "intro", title: "Why GitOps?", content: [{ type: "text", content: "GitOps provides a single source of truth for your infrastructure..." }] },
            { id: "setup", title: "Installing ArgoCD", content: [{ type: "text", content: "We started by installing ArgoCD via Helm..." }] }
        ]
    }
};

const PostDetail: React.FC<PostDetailProps> = ({ onBack, postId }) => {
  const post = useMemo(() => {
      return POSTS_DB[String(postId)] || POSTS_DB['1'];
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
```

## === PostsPage.tsx ===
```tsx

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar, Tag, Heart, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Mock Data ---
const TOPICS = [
  "All Topics",
  "AI Development Tools",
  "CI/CD & GitOps",
  "Cloud",
  "Infrastructure",
  "Kubernetes",
  "Machine Learning & MLOps",
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Scaling Kubernetes Clusters with Karpenter",
    excerpt: "An in-depth guide on how to implement high-performance node autoscaling for EKS clusters using Karpenter.",
    tags: ["Kubernetes", "Infrastructure"],
    date: "December 10, 2024",
    image: "https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "How I Implemented GitOps with ArgoCD",
    excerpt: "A comprehensive guide to implementing a scalable GitOps workflow using ArgoCD to manage hundreds of applications.",
    tags: ["CI/CD & GitOps"],
    date: "June 17, 2024",
    image: "https://images.unsplash.com/photo-1618401471353-b74afee0ba08?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "My Experience Testing Gemini CLI",
    excerpt: "I spent a few days testing Google's Gemini CLI alongside Claude Code. Here's what I learned about their differences.",
    tags: ["AI Development Tools"],
    date: "November 7, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  }
];

interface PostsPageProps {
  onPostSelect?: (postId: number) => void;
}

const PostsPage: React.FC<PostsPageProps> = ({ onPostSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

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
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
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
```

## === PrivacyPolicyPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
      {/* --- Standardized Background Section --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* 1. Nebula Gradients */}
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           
           {/* 2. Stars & Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

           {/* 3. Floating Debris */}
           <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-yellow-200/20 rounded-full animate-float-slow shadow-[0_0_10px_rgba(255,207,13,0.5)]" />
           <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/10 rounded-full animate-float-medium" />
           <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white/10 rounded-full animate-ping" />

           {/* 4. Hazy Orbital Tracks & Comets */}
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 mb-6 text-accent"
            >
                <Shield className="w-8 h-8" />
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
            >
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Policy</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                Last updated: October 2024
            </motion.p>
        </div>

        {/* Content */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8"
        >
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <EyeOff className="w-5 h-5 text-accent" />
                    Data Collection
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        This portfolio is a static site. I do not collect, store, or process personal data directly. 
                        There are no cookies set by this domain for tracking or advertising purposes.
                    </p>
                    <p>
                        However, third-party services integrated for functionality (such as embedded YouTube videos, Google Analytics, or external fonts) may collect usage data as per their own privacy policies.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-accent" />
                    External Links
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        My portfolio contains links to other websites (GitHub, LinkedIn, Project Demos). I am not responsible for the privacy policies or content of these external sites. I encourage you to read the privacy policies of any third-party sites you visit.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Contact</h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        If you have any questions about this privacy policy, you can contact me via the social links provided in the footer.
                    </p>
                </div>
            </section>
        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
```

## === ProjectDetail.tsx ===
```tsx

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Github, ExternalLink, Shield, Cpu, Activity, CheckCircle, Code2, Terminal, Server, Calendar, Tag, AlertTriangle, HardDrive, Network, Router, BookOpen, Eye, Heart, Share2, MessageSquare, Send, User, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const PROJECTS_DB: Record<string, any> = {
    'kubeguardian': {
        title: "KubeGuardian",
        status: "Production / v2.1.0",
        summary: "An automated Kubernetes cluster security auditor and remediation controller. It scans for misconfigurations against CIS benchmarks and automatically patches non-compliant resources using OPA Gatekeeper policies.",
        views: "12,504",
        initialLikes: 892,
        metrics: [
            { label: "Clusters Secured", value: "14", icon: <Server className="w-4 h-4 text-blue-400" />, trend: "Production" },
            { label: "Policy Violations", value: "-92%", icon: <Shield className="w-4 h-4 text-green-400" />, trend: "Since Deploy" },
            { label: "Auto-Patched", value: "4,200+", icon: <CheckCircle className="w-4 h-4 text-yellow-400" />, trend: "Resources" },
        ],
        techStack: [
            { name: "Golang", type: "Language" },
            { name: "Kubernetes Operator", type: "Pattern" },
            { name: "OPA Gatekeeper", type: "Policy Engine" },
            { name: "Prometheus", type: "Metrics" },
            { name: "Helm", type: "Packaging" },
        ],
        meta: { timeline: "Jan 2023 - Present", role: "Lead Engineer", type: "Open Source" },
        journal: [
            {
                chapter: "01",
                title: "Inception: The Security Drift",
                date: "Jan 12, 2023",
                readTime: "4 min read",
                content: [
                    { type: "text", content: "In a previous role, we managed over 50 Kubernetes clusters. Despite having strict CI/CD pipelines, we constantly found 'configuration drift' in our environments. Developers would apply hotfixes manually, or legacy Helm charts would deploy resources with insecure defaults (running as root, no CPU limits, writable root filesystems)." },
                    { type: "text", content: "We needed a way to not just *detect* these issues (which tools like Trivy or Popeye do well) but to *actively remediate* them without waking up an engineer." }
                ]
            },
            {
                chapter: "02",
                title: "Architecture Design",
                date: "Feb 04, 2023",
                readTime: "5 min read",
                content: [
                    { type: "text", content: "KubeGuardian was designed as a Kubernetes Custom Resource Definition (CRD) and Controller. The architecture consists of three main components:" },
                    { type: "code", language: "text", content: `1. Scanner Agent: Runs scheduled scans against OPA policies.
2. Remediation Controller: Watches for 'Violation' events and applies patches.
3. Webhook: Validates incoming changes to prevent regression.` },
                    { type: "text", content: "The core logic relies on a reconciliation loop. If a Deployment is found to be running as root, KubeGuardian checks if a `SecurityContext` patch exists for that namespace. If so, it applies it." }
                ]
            },
            {
                chapter: "03",
                title: "The OPA Integration",
                date: "Mar 15, 2023",
                readTime: "6 min read",
                content: [
                    { type: "text", content: "We chose Open Policy Agent (OPA) as the policy engine. Defining policies in Rego allowed us to be extremely granular. Here is an example of a Rego policy we used to detect containers running as root:" },
                    { type: "code", language: "rego", content: `package kubernetes.security

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  not container.securityContext.runAsNonRoot
  msg := sprintf("Container '%v' must set runAsNonRoot to true", [container.name])
}` },
                    { type: "text", content: "KubeGuardian parses these violations and maps them to a `RemediationTemplate` CRD." }
                ]
            },
            {
                chapter: "04",
                title: "Safety Rails & Race Conditions",
                date: "Apr 22, 2023",
                readTime: "7 min read",
                content: [
                    { type: "text", content: "Automated patching is dangerous. We learned this the hard way when KubeGuardian restarted a stateful database because it applied a security context change. To prevent this, we implemented:" },
                    { type: "text", content: "1. **Annotation Opt-Out**: Resources can be annotated with `kubeguardian.io/ignore: true`.\n2. **Dry-Run Mode**: Default for all new namespaces.\n3. **Time Windows**: Only patch non-critical workloads during business hours." }
                ]
            },
            {
                chapter: "05",
                title: "Future Roadmap",
                date: "Jun 10, 2023",
                readTime: "3 min read",
                content: [
                    { type: "text", content: "We are currently working on v3.0, which includes AI-driven policy generation. By analyzing historical traffic patterns, KubeGuardian will suggest `NetworkPolicies` to lock down pod-to-pod communication." }
                ]
            }
        ]
    },
    'terraform-drift': {
        title: "Terraform Drift Detector",
        status: "Archived / v1.2",
        summary: "A serverless event-driven architecture that automatically detects manual changes in AWS infrastructure and reports drift back to Slack/Teams.",
        views: "4,120",
        initialLikes: 215,
        metrics: [
            { label: "Executions", value: "24/day", icon: <Activity className="w-4 h-4 text-blue-400" />, trend: "Hourly Checks" },
            { label: "Cost", value: "$0.45/mo", icon: <CheckCircle className="w-4 h-4 text-green-400" />, trend: "Lambda Free Tier" },
            { label: "Drift Detected", value: "14%", icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />, trend: "Avg Rate" },
        ],
        techStack: [
            { name: "AWS Lambda", type: "Compute" },
            { name: "Terraform", type: "IaC" },
            { name: "TypeScript", type: "Language" },
            { name: "DynamoDB", type: "State Store" },
            { name: "Slack API", type: "Notification" },
        ],
        meta: { timeline: "Aug 2022 - Nov 2022", role: "DevOps Engineer", type: "Tooling" },
        journal: [
            {
                chapter: "01",
                title: "The Problem of ClickOps",
                date: "Aug 01, 2022",
                readTime: "3 min read",
                content: [
                    { type: "text", content: "Developers were manually changing security group rules via the AWS Console to debug issues, but forgetting to revert them. Terraform state was constantly out of sync. We needed a way to detect this 'ClickOps' behavior immediately." }
                ]
            },
            {
                chapter: "02",
                title: "Designing the Solution",
                date: "Aug 15, 2022",
                readTime: "4 min read",
                content: [
                    { type: "text", content: "Designed a scheduled Lambda function that pulls the latest Terraform state file, queries the actual AWS resources using the SDK, and computes a diff." },
                    { type: "code", language: "typescript", content: `// Core drift detection logic snippet
const detectDrift = async (resourceId: string, expectedConfig: any) => {
  const actual = await aws.ec2.getSecurityGroup({ GroupId: resourceId });
  const diff = compare(expectedConfig, actual);
  if (diff.hasChanges) {
    await notifySlack(diff);
  }
}` }
                ]
            }
        ]
    }
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ onBack, projectId }) => {
  const project = useMemo(() => {
      return PROJECTS_DB[projectId || 'kubeguardian'] || PROJECTS_DB['kubeguardian'];
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
```

## === ProjectList.tsx ===
```tsx

import React from 'react';
import { Github, ExternalLink, ArrowRight, Layers, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectList: React.FC = () => {
  return (
    <section className="pt-12 pb-24 relative overflow-hidden bg-dark">
      {/* Cosmic Cloud Background - Centralized & Hazed */}
      <div className="absolute inset-0 pointer-events-none -z-10">
           {/* Soft Central Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px] mix-blend-screen opacity-40" />
           
           {/* Secondary Haze */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen opacity-30 translate-x-20 -translate-y-10" />
           
           {/* Subtle Accent Core */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
      </div>

      {/* Bottom Gradient Mask for Seamless Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with Technical Bracket Animation */}
        <div className="space-y-4">
           <div className="flex items-center justify-start">
                <motion.h2 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight flex items-center gap-3 md:gap-4"
                >
                    <motion.span 
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                        className="text-accent font-light"
                    >
                        [
                    </motion.span>
                    
                    <span>Engineering Spotlight</span>
                    
                    <motion.span 
                         variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                        className="text-accent font-light"
                    >
                        ]
                    </motion.span>
                </motion.h2>
           </div>
          
          <p className="text-xl text-gray-400 whitespace-nowrap pl-2 md:pl-4 border-l-2 border-accent/20">
            A selection of infrastructure and automation projects I've engineered.
          </p>
        </div>

        {/* Project 1 - Image Right (Default) */}
        <ProjectCard 
            align="right"
            title="KubeGuardian"
            description="An automated Kubernetes cluster security auditor and remediation controller. It scans for misconfigurations against CIS benchmarks and automatically patches non-compliant resources using OPA Gatekeeper policies."
            tech={['Golang', 'Kubernetes Operator', 'OPA', 'Prometheus']}
            image="https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=1600&auto=format&fit=crop"
            repoLink="#"
            demoLink="#"
        />

        {/* Project 2 - Image Left (Alternating) */}
        <ProjectCard 
            align="left"
            title="Terraform Drift"
            description="A self-hosted drift detection platform for Terraform state. It periodically checks remote state against actual cloud infrastructure, generating alerts and visual diff reports for DevOps teams."
            tech={['TypeScript', 'Terraform', 'AWS Lambda', 'React']}
            image="https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?q=80&w=1600&auto=format&fit=crop"
            repoLink="#"
            demoLink="#"
        />

        {/* See More Link */}
        <div className="flex justify-center pt-8">
             <a href="#" className="group inline-flex items-center space-x-2 text-lg font-medium text-gray-400 hover:text-accent transition-colors">
                <span>See more projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    image: string;
    repoLink: string;
    demoLink: string;
    align: 'left' | 'right';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, repoLink, demoLink, align }) => {
    return (
        <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#0a0a0a]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none blur-xl" />

            {/* Content Side */}
            <div className={`space-y-6 relative z-10 order-2 ${align === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {tech.map((t) => (
                        <div key={t} className="flex items-center space-x-2 px-2.5 py-1 rounded bg-white/5 text-gray-300 text-xs font-mono border border-white/5">
                            {t === 'Kubernetes Operator' ? <Cpu className="w-3 h-3 text-accent" /> : 
                             t === 'Terraform' ? <Database className="w-3 h-3 text-accent" /> :
                             <Layers className="w-3 h-3 text-accent" />}
                            <span>{t}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <a href={repoLink} className="flex items-center space-x-2 bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-accent hover:scale-105 transition-all duration-300">
                        <Github className="w-4 h-4" />
                        <span>View Project</span>
                    </a>
                    <a href={demoLink} className="flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-bold text-white border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all duration-300">
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Live Site</span>
                    </a>
                </div>
            </div>

            {/* Image Side - Height Reduced */}
            <div className={`relative h-[220px] lg:h-[280px] rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl order-1 group-hover:-translate-y-2 transition-transform duration-500 ${align === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-20 z-10 mix-blend-overlay" />
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>
        </div>
    );
};

export default ProjectList;
```

## === ProjectsPage.tsx ===
```tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Globe, Code2, FolderGit2, Cpu, Database, Layers, Terminal, Layout, Shield, Zap, Server, Activity, Heart, MessageSquare, Share2 } from 'lucide-react';

interface ProjectsPageProps {
  onProjectSelect?: (projectId: string) => void;
}

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
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
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
            
            {/* Project 1: KubeGuardian */}
            <ProjectRow 
                title="KubeGuardian"
                description="An automated Kubernetes cluster security auditor and remediation controller. It scans for misconfigurations against CIS benchmarks and automatically patches non-compliant resources using OPA Gatekeeper policies."
                tools={['Golang', 'Kubernetes Operator', 'OPA', 'Prometheus']}
                image="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1600&auto=format&fit=crop"
                mockupType="laptop"
                link="#" 
                repo="#"
                onClick={() => onProjectSelect && onProjectSelect('kubeguardian')}
            />

            {/* Project 2: Terraform Drift */}
            <ProjectRow 
                title="Terraform Drift"
                description="A self-hosted drift detection platform for Terraform state. It periodically checks remote state against actual cloud infrastructure, generating alerts and visual diff reports for DevOps teams to prevent configuration skew."
                tools={['TypeScript', 'Terraform', 'AWS Lambda', 'React']}
                image="https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?q=80&w=1600&auto=format&fit=crop"
                mockupType="laptop"
                link="#"
                repo="#"
                reverse
            />

            {/* Project 3: Argon Mesh */}
            <ProjectRow 
                title="Argon Mesh"
                description="A high-performance Service Mesh visualization dashboard built on top of Istio. Provides real-time traffic topology, latency heatmaps, and mTLS status checks for microservices spanning multiple clusters."
                tools={['Rust', 'WebAssembly', 'Istio', 'Grafana']}
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                mockupType="laptop"
                link="#"
                repo="#"
            />
        </div>

        {/* Archival Projects Grid */}
        <div className="relative">
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3 font-mono">
                <span className="text-accent">./</span> archival_scripts
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ArchivalCard 
                    title="Chaos-Kube"
                    description="Chaos engineering scripts to randomly terminate pods and saturate CPU in dev environments."
                    tags={['Bash', 'Chaos Eng', 'K8s']}
                    icon={<Zap className="w-5 h-5" />}
                    thumbnail="https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=300"
                />
                <ArchivalCard 
                    title="Spot-Bot"
                    description="Automated AWS Spot Instance bidder and node drainer saving 40% on compute costs."
                    tags={['Python', 'Boto3', 'Lambda']}
                    icon={<Terminal className="w-5 h-5" />}
                    thumbnail="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=300"
                />
                <ArchivalCard 
                    title="Ansible-Homelab"
                    description="Complete IaC repository for provisioning bare-metal Proxmox servers and PI-holes."
                    tags={['Ansible', 'Linux', 'Docker']}
                    icon={<Server className="w-5 h-5" />}
                    thumbnail="https://images.unsplash.com/photo-1558494949-efc5e66cdc2f?auto=format&fit=crop&q=80&w=300"
                />
                <ArchivalCard 
                    title="Cert-Sentinel"
                    description="A lightweight operator that monitors SSL certificate expiry and alerts via Slack."
                    tags={['Golang', 'TLS', 'Monitoring']}
                    icon={<Shield className="w-5 h-5" />}
                    thumbnail="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300"
                />
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
```

## === ShortNotesPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';

const NOTES = [
    {
        date: "2024-10-25",
        content: "Just migrated my home router to OPNsense. The VLAN management is so much cleaner than my old consumer gear. #homelab #networking"
    },
    {
        date: "2024-10-15",
        content: "Trying out Ray.io for distributed Python workloads. It feels like what I wanted Spark to be for simple parallel tasks."
    },
    {
        date: "2024-09-28",
        content: "Reminder: Always set resource limits on your Kubernetes pods. A memory leak in one pod shouldn't OOMKill the entire node."
    },
    {
        date: "2024-09-10",
        content: "Reading 'The Staff Engineer's Path'. Crucial insights on navigating the technical leadership track without becoming a manager."
    },
    {
        date: "2024-08-05",
        content: "Vim motion of the day: `ciw` (change inner word). Muscle memory is slowly building up."
    }
];

const ShortNotesPage: React.FC = () => {
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> quick_logs.txt
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} Brain dumps, quick tips, and status updates.
            </motion.p>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NOTES.map((note, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,207,13,0.05)]"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/5 rounded-full text-accent">
                            <Edit3 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed font-sans">
                        {note.content}
                    </p>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ShortNotesPage;
```

## === SitemapPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, Layout, Server, BookOpen, Shield } from 'lucide-react';
import { ViewType } from '../types';

interface SitemapPageProps {
  onNavigate?: (view: ViewType) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  
  // Refactored Data Structure for Grid Layout
  const directories = [
      {
          name: "root",
          icon: <Layout className="w-4 h-4 text-accent" />,
          items: [
              { name: "index.tsx", type: "file", view: 'home' },
              { name: "about.tsx", type: "file", view: 'about' },
              { name: "sitemap.xml", type: "file", view: 'sitemap' },
          ]
      },
      {
          name: "engineering",
          icon: <Server className="w-4 h-4 text-blue-400" />,
          items: [
              { name: "projects.tsx", type: "file", view: 'projects' },
              { name: "blog.tsx", type: "file", view: 'posts' },
              { name: "talks.tsx", type: "file", view: 'talks' },
              { name: "uses.tsx", type: "file", view: 'uses' },
              { name: "stack.json", type: "file", view: 'kudos' },
          ]
      },
      {
          name: "resources",
          icon: <BookOpen className="w-4 h-4 text-green-400" />,
          items: [
              { name: "library.tsx", type: "file", view: 'books' },
              { name: "notes.tsx", type: "file", view: 'notes' },
              { name: "guestbook.tsx", type: "file", view: 'guestbook' },
              { name: "life.tsx", type: "file", view: 'life' },
          ]
      },
      {
          name: "legal",
          icon: <Shield className="w-4 h-4 text-red-400" />,
          items: [
              { name: "privacy.md", type: "file", view: 'privacy' },
              { name: "terms.md", type: "file", view: 'terms' },
          ]
      }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
       {/* --- Standardized Background Section --- */}
       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* 1. Nebula Gradients */}
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           
           {/* 2. Stars & Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

           {/* 3. Floating Debris */}
           <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-yellow-200/20 rounded-full animate-float-slow shadow-[0_0_10px_rgba(255,207,13,0.5)]" />
           <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/10 rounded-full animate-float-medium" />
           <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white/10 rounded-full animate-ping" />

           {/* 4. Hazy Orbital Tracks & Comets */}
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
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
            >
                Directory <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Tree</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                /var/www/html
            </motion.p>
        </div>

        {/* Tree Container - Grid Layout for Lower Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {directories.map((dir, idx) => (
                <motion.div
                    key={dir.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 relative group overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                        <div className="p-2 bg-white/5 rounded-lg">
                            {dir.icon}
                        </div>
                        <h2 className="text-lg font-bold text-white font-mono">{dir.name}/</h2>
                    </div>

                    {/* Children Items */}
                    <ul className="space-y-3 relative z-10">
                        {dir.items.map((item, itemIdx) => (
                            <li key={item.name} className="flex items-center gap-3 group/item">
                                {/* Tree Lines */}
                                <div className="w-4 h-4 border-l border-b border-white/10 rounded-bl-lg -mt-2 ml-1" />
                                
                                <button 
                                    onClick={() => item.view && onNavigate && onNavigate(item.view as ViewType)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition-all font-mono text-sm"
                                >
                                    <FileText className="w-3.5 h-3.5 text-gray-600 group-hover/item:text-accent transition-colors" />
                                    <span className={item.view ? 'group-hover/item:text-accent transition-colors' : ''}>
                                        {item.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Background Decorative */}
                    <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default SitemapPage;```

## === TalksPage.tsx ===
```tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, FileText, Calendar, MapPin, Play, Mic, Heart, MessageSquare, Share2 } from 'lucide-react';
import { ViewType } from '../types';

// --- Types & Mock Data ---
type TalkType = 'All' | 'Conference' | 'Workshop' | 'Meetup';

interface Talk {
    id: number;
    title: string;
    event: string;
    location: string;
    date: string;
    type: TalkType;
    description: string;
    videoLink?: string;
    slidesLink?: string;
    thumbnail: string;
    attendees?: string;
}

const TALKS: Talk[] = [
    {
        id: 1,
        title: "Scaling Prometheus: Lessons from the Trenches",
        event: "KubeCon EU 2024",
        location: "Paris, France",
        date: "March 19, 2024",
        type: "Conference",
        description: "A deep dive into federation, sampling strategies, and high-cardinality battles when scaling metrics for a cluster of 5000+ nodes.",
        videoLink: "#",
        slidesLink: "#",
        thumbnail: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1600&auto=format&fit=crop",
        attendees: "2,500+"
    },
    {
        id: 2,
        title: "Zero Trust Networking in Practice",
        event: "DevOps Days",
        location: "Singapore",
        date: "November 15, 2023",
        type: "Conference",
        description: "Moving beyond VPNs: Implementing mTLS everywhere using Istio and Cilium. Practical architectural patterns for securing microservices.",
        videoLink: "#",
        slidesLink: "#",
        thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop",
        attendees: "800+"
    },
    {
        id: 3,
        title: "Workshop: Building Your First Kubernetes Operator",
        event: "Go Systems Meetup",
        location: "Jakarta, Indonesia",
        date: "August 20, 2023",
        type: "Workshop",
        description: "A 3-hour live coding session teaching the Operator pattern. From CRD design to Controller logic using Kubebuilder and Golang.",
        slidesLink: "#",
        thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
        attendees: "50+"
    },
    {
        id: 4,
        title: "Platform Engineering: The End of DevOps?",
        event: "Tech In Asia Conference",
        location: "Jakarta, Indonesia",
        date: "June 10, 2023",
        type: "Meetup",
        description: "Panel discussion on the evolution of internal developer platforms (IDP) and whether 'DevOps' as a title is becoming obsolete.",
        videoLink: "#",
        thumbnail: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1600&auto=format&fit=crop",
        attendees: "300+"
    }
];

const STATS = [
    { label: "Total Talks", value: "24" },
    { label: "Cities Visited", value: "11" },
    { label: "People Reached", value: "5k+" },
];

interface TalksPageProps {
    onNavigate?: (view: ViewType) => void;
}

const TalksPage: React.FC<TalksPageProps> = ({ onNavigate }) => {
    const [filter, setFilter] = useState<TalkType>('All');

    const filteredTalks = filter === 'All' ? TALKS : TALKS.filter(t => t.type === filter);

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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Header --- */}
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-6 font-mono"
                    >
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span>Live Transmission</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
                    >
                        <span className="text-accent">{'>_'}</span> transmission_logs
                        <span className="animate-pulse ml-2 text-accent">_</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-mono text-sm md:text-base"
                    >
                        {'//'} Keynotes, workshops, and deep-dive sessions from various coordinates.
                    </motion.p>
                </div>

                {/* --- Impact Stats --- */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12 border-y border-white/10 py-8 bg-[#0a0a0a]/30 backdrop-blur-sm rounded-xl">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                            <div className="text-xs text-accent/80 uppercase tracking-widest font-mono">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* --- Controls --- */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl">
                        {['All', 'Conference', 'Workshop', 'Meetup'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t as TalkType)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all font-mono ${
                                    filter === t 
                                    ? 'bg-accent text-black shadow-lg shadow-yellow-500/20 font-bold' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Talks Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTalks.map((talk) => (
                        <TalkCard key={talk.id} talk={talk} onNavigate={onNavigate} />
                    ))}
                </div>

                {/* --- Footer CTA --- */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-8 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-2xl w-full relative overflow-hidden group">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2 font-mono">Initialize Communication?</h3>
                            <p className="text-gray-400 mb-6 font-sans">Open a channel for speaking inquiries at your event.</p>
                            <a href="mailto:hello@example.com" className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-accent transition-colors font-mono">
                                <Mic className="w-4 h-4" />
                                <span>Request Speaker Frequency</span>
                            </a>
                        </div>
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

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Logic for sharing or commenting
    };

    return (
        <div className="flex items-center gap-6 mt-auto pt-4 border-t border-white/5 font-mono">
             <button 
                onClick={handleLike}
                className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-red-500 group"
             >
                 <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
                 <span className={`${isLiked ? 'text-white' : 'text-gray-500'}`}>{likes || 'Like'}</span>
             </button>

             <button 
                onClick={handleAction}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group"
             >
                 <MessageSquare className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                 <span>{initialComments || 'Comment'}</span>
             </button>

             <button 
                onClick={handleAction}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group"
             >
                 <Share2 className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                 <span>Share</span>
             </button>
        </div>
    );
};

const TalkCard: React.FC<{ talk: Talk; onNavigate?: (view: ViewType) => void }> = ({ talk, onNavigate }) => {
    
    const handleViewDeck = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) onNavigate('deck');
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(255,207,13,0.05)]"
        >
            {/* Thumbnail - Top */}
            <div className="w-full h-56 relative shrink-0 overflow-hidden bg-black border-b border-white/5">
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-20 z-10 transition-opacity" />
                <img 
                    src={talk.thumbnail} 
                    alt={talk.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                />
                
                {/* Play Button Overlay if Video Exists */}
                {talk.videoLink && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform hover:bg-accent hover:border-accent hover:text-black text-white">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                    </div>
                )}

                <div className="absolute top-3 left-3 z-20 font-mono">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            talk.type === 'Conference' ? 'bg-blue-600 text-white border-blue-500' :
                            talk.type === 'Workshop' ? 'bg-purple-600 text-white border-purple-500' :
                            'bg-green-600 text-white border-green-500'
                        }`}>
                            {talk.type}
                        </span>
                </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3 font-mono">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            <span>{talk.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            <span>{talk.location}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors leading-tight font-mono">
                        {talk.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4 font-mono">
                        <span className="text-sm font-bold text-gray-300">@ {talk.event}</span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                        {talk.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 font-mono">
                        {talk.videoLink ? (
                            <a href={talk.videoLink} className="flex items-center space-x-2 text-white hover:text-accent transition-colors text-sm font-bold">
                                <Video className="w-4 h-4" />
                                <span>Watch Replay</span>
                            </a>
                        ) : (
                                <span className="flex items-center space-x-2 text-gray-600 text-sm font-bold cursor-not-allowed">
                                <Video className="w-4 h-4" />
                                <span>Recording Unavailable</span>
                            </span>
                        )}

                        <div className="w-px h-4 bg-white/10" />

                        {talk.slidesLink ? (
                            <button onClick={handleViewDeck} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                <FileText className="w-4 h-4" />
                                <span>View Deck</span>
                            </button>
                        ) : (
                            <span className="flex items-center space-x-2 text-gray-600 text-sm font-medium cursor-not-allowed">
                                <FileText className="w-4 h-4" />
                                <span>Deck Private</span>
                            </span>
                        )}
                    </div>

                    <InteractionBar initialLikes={Math.floor(Math.random() * 50) + 5} initialComments={Math.floor(Math.random() * 10)} />
                </div>
            </div>
        </motion.div>
    );
};

export default TalksPage;```

## === TechHighlight.tsx ===
```tsx

import React from 'react';
import { ArrowRight, Box, GitBranch, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const TechHighlight: React.FC = () => {
  return (
    <section className="pt-24 pb-40 relative overflow-hidden bg-dark">
       {/* 1. Seamless Transition Gradient from Hero */}
       <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-dark via-dark to-transparent z-10 pointer-events-none" />

       {/* 2. Central Cosmic Haze */}
       <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 blur-[180px] rounded-full mix-blend-screen opacity-60" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-600/30 blur-[150px] rounded-full mix-blend-screen opacity-50" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/15 blur-[120px] rounded-full mix-blend-screen" />
       </div>

       {/* 3. Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark via-dark to-transparent z-0 pointer-events-none" />

       {/* Inner Container */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          {/* Header Section: Traversing Unknown Domain */}
          <div className="relative text-center mb-32 max-w-4xl mx-auto pt-8">
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center relative"
            >
                {/* 
                    Typography Layering:
                    "Traversing" - Back layer, outlined, monospaced
                    "Unknown Domain" - Front layer, solid white, bold, monospaced
                */}
                
                <h2 className="relative z-10 leading-none tracking-tighter font-mono">
                    <span 
                        className="block text-6xl md:text-8xl lg:text-9xl font-bold opacity-30 select-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-full text-center"
                        style={{ 
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
                            color: 'transparent'
                        }}
                    >
                        TRAVERSING
                    </span>
                    <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-white relative z-20 mt-4 mix-blend-overlay">
                        UNKNOWN DOMAIN
                    </span>
                    <span className="block text-xs text-accent uppercase tracking-[0.5em] mt-6 opacity-80">
                        [ SYSTEM_LOG: INFRASTRUCTURE_EXPLORATION_MODE_ACTIVE ]
                    </span>
                </h2>

                {/* Quote Block - More Compact */}
                <div className="mt-16 max-w-2xl relative border-l-2 border-accent/30 pl-6 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-lg md:text-xl text-gray-400 font-mono leading-relaxed">
                            <span className="text-accent">{'//'}</span> I'm sharing how I approach infrastructure challenges and how my DevOps mental model helps me traverse unknown domain knowledge with clarity and structure.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              <PostCard 
                category="Infrastructure"
                title="Cluster Constellations" 
                subtitle="Navigating the complex galaxy of Kubernetes pods and nodes."
                visual={<K8sVisual />}
                delay={0.1}
              />
              <PostCard 
                category="Automation"
                title="Velocity Thrusters" 
                subtitle="Building resilient CI/CD pipelines for lightspeed delivery."
                visual={<PipelineVisual />}
                delay={0.2}
              />
              <PostCard 
                category="Architecture"
                title="Orbital Mechanics" 
                subtitle="Distributed patterns and high-availability system design."
                visual={<GridVisual />}
                delay={0.3}
              />
          </div>
       </div>
    </section>
  );
};

const PostCard: React.FC<{ category: string; title: string; subtitle: string; visual: React.ReactNode; delay: number }> = ({ category, title, subtitle, visual, delay }) => {
    return (
        <motion.a 
            href="#" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden hover:border-accent/30 transition-all duration-500 flex flex-col h-full hover:shadow-[0_0_30px_rgba(255,207,13,0.05)] hover:-translate-y-1"
        >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

            {/* Visual Container */}
            <div className="h-64 bg-[#0f0f0f] flex items-center justify-center relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-[200%] w-full animate-[scan_4s_linear_infinite]" />
                <div className="transform transition-transform duration-500 group-hover:scale-110 relative z-10 grayscale group-hover:grayscale-0 transition-all">
                    {visual}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col justify-end relative z-10 bg-[#0a0a0a]">
                <div className="mb-3">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/20 px-2 py-1 rounded-sm bg-accent/5">
                        {category}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-mono">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">{subtitle}</p>
                
                <div className="mt-6 flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors font-mono">
                    <span>{'>'} Initialize Sequence</span>
                    <span className="animate-pulse ml-1">_</span>
                </div>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
            `}</style>
        </motion.a>
    );
};

// --- Visual Components (Kept logic, updated styles for space theme) ---

const K8sVisual = () => (
    <div className="relative transform scale-100">
        {/* Central Node / Planet */}
        <div className="w-32 h-32 rounded-full border border-white/10 relative flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">
             <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
             
             {/* Orbiting Pods */}
             <div className="absolute w-[140%] h-[140%] animate-[spin_8s_linear_infinite_reverse]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full blur-[1px] shadow-[0_0_10px_var(--accent)]" />
             </div>
             
             <div className="grid grid-cols-2 gap-2 relative z-10">
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                 <div className="w-6 h-6 rounded bg-accent/10 border border-accent/50" />
             </div>
        </div>
    </div>
);

const PipelineVisual = () => (
    <div className="flex items-center space-x-2 transform scale-100">
        <div className="relative">
             <div className="w-10 h-10 rounded-lg border border-green-500/30 flex items-center justify-center bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <Box className="w-5 h-5 text-green-500/80" />
             </div>
        </div>
        
        {/* Stream */}
        <div className="w-12 h-1 bg-white/5 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-accent/80 animate-[shimmer_1.5s_infinite]" />
        </div>

        <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/5 shadow-[0_0_15px_rgba(255,207,13,0.1)]">
             <GitBranch className="w-5 h-5 text-accent" />
        </div>

        {/* Stream */}
        <div className="w-12 h-1 bg-white/5 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-accent/80 animate-[shimmer_1.5s_infinite] delay-75" />
        </div>

        <Rocket className="w-6 h-6 text-white/80 rotate-45" />
        
        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
    </div>
);

const GridVisual = () => (
    <div className="relative w-32 h-32 transform rotate-45 scale-75">
        <div className="absolute inset-0 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
            <div className="rounded-xl border border-accent/40 bg-accent/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,207,13,0.1)] animate-pulse" />
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl" />
        </div>
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full z-20 shadow-[0_0_10px_white]" />
        <div className="absolute inset-0 border border-white/5 rounded-full scale-150" />
    </div>
);

export default TechHighlight;
```

## === TermsPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Copyright } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[#050505] text-gray-300 font-sans">
      
      {/* --- Standardized Background Section --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* 1. Nebula Gradients */}
           <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffcf0d]/30 rounded-full blur-[120px] opacity-40" />
           <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-40" />
           <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
           
           {/* 2. Stars & Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

           {/* 3. Floating Debris */}
           <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-yellow-200/20 rounded-full animate-float-slow shadow-[0_0_10px_rgba(255,207,13,0.5)]" />
           <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white/10 rounded-full animate-float-medium" />
           <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white/10 rounded-full animate-ping" />

           {/* 4. Hazy Orbital Tracks & Comets */}
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 mb-6 text-accent"
            >
                <FileText className="w-8 h-8" />
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
            >
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Service</span>
            </motion.h1>
        </div>

        {/* Content */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8"
        >
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Copyright className="w-5 h-5 text-accent" />
                    Intellectual Property
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        The content on this website (text, images, code snippets, and project descriptions) is the intellectual property of El Muhammad, unless otherwise noted or attributed to open source licenses.
                    </p>
                    <p>
                        You are free to use the open-source code snippets provided in the blog posts under the MIT License, provided proper attribution is given.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    Disclaimer
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                    <p>
                        The information provided on this portfolio is for educational and informational purposes only. While I strive for accuracy, technology changes rapidly. I am not liable for any errors or omissions, or for any losses, injuries, or damages arising from the display or use of this information.
                    </p>
                    <p>
                        Code snippets are provided "as is" without warranty of any kind. Use them in production environments at your own risk.
                    </p>
                </div>
            </section>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsPage;
```

## === Testimonials.tsx ===
```tsx

import React from 'react';
import { User, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="pt-12 pb-40 relative overflow-hidden bg-dark">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-24">
                 <h2 className="text-6xl md:text-8xl font-handwriting text-white transform -rotate-2">
                    Some good words
                 </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard 
                    role="CTO @ TechFlow"
                    name="Sarah Jenkins"
                    text="El's expertise in Kubernetes architecture completely transformed our deployment pipeline. We went from weekly releases to daily deployments with zero downtime."
                />
                <TestimonialCard 
                    role="Lead DevOps Engineer"
                    name="Marcus Chen"
                    text="One of the most dependable engineers I've worked with. His mental models for distributed systems made complex problems seem trivial to the rest of the team."
                />
                <TestimonialCard 
                    role="Product Manager"
                    name="Elena Rodriguez"
                    text="He doesn't just write code; he builds resilient systems. The monitoring stack El implemented saved us during Black Friday traffic spikes."
                />
            </div>
        </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ role: string; name: string; text: string }> = ({ role, name, text }) => {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-accent/20 transition-colors duration-300 flex flex-col h-full group">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                 <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 group-hover:text-accent transition-colors">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{role}</span>
                    <Star className="w-3 h-3 fill-current" />
                 </div>
            </div>

            {/* Quote Body */}
            <div className="flex-1 mb-8 relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5 rotate-180" />
                <p className="text-lg text-gray-300 leading-relaxed relative z-10 italic">
                    "{text}"
                </p>
            </div>

            {/* User Footer */}
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-accent/20 transition-colors">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">{name}</h4>
                    <span className="text-xs text-gray-500">Verified Client</span>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
```

## === UsesPage.tsx ===
```tsx

import React from 'react';
import { motion } from 'framer-motion';

// Data
const SECTIONS = [
  {
    category: "Workstation",
    items: [
      {
        title: "MacBook Pro 14”",
        description: "M3 Pro 2023, 36GB Memory, 1TB SSD. This MacBook is one of the best investments that I have. I bought the space black version, which looks really good."
      },
      {
        title: "LG UltraFine™ 4K",
        description: "32 Inch LG (32UN880-B). This monitor came with a solid ergonomic arm."
      },
      {
        title: "Logitech MX Master 3S",
        description: "I thought this was overpriced, but I enjoy using it. The shortcut mapping is really good and boosts my productivity."
      },
      {
        title: "Creative Pebble V3",
        description: "I don't like speakers that have too much bass, especially when you have a meeting. This one has a clear sound and good enough bass."
      },
      {
        title: "Keychron K2v2",
        description: "White Backlight, Brown Switch."
      }
    ]
  },
  {
    category: "Furniture",
    items: [
      {
        title: "Stramm Bruno Standing Desk",
        description: "160cm x 80cm. Having a wide desk is one of the greatest choices I have made."
      },
      {
        title: "Press Play Desk Shelf",
        description: "This desk shelf is the small wooden desk that's on top of my standing desk. It's great because it covers the cables and makes things look tidier."
      },
      {
        title: "Pexio Jervis Ergonomic Chair",
        description: "I bought this chair with my first internship paycheck 😝"
      }
    ]
  },
  {
    category: "Accessories",
    items: [
      {
        title: "Mi Computer Monitor Light Bar",
        description: "A must-have, it will lighten up your desk."
      },
      {
        title: "AirPods Pro (2nd Generation)",
        description: "Great for working at a cafe."
      },
      {
        title: "Anker MagGo Wireless Charging Station",
        description: "Simple and effective charger that can charge my phone, AirPods, and Apple Watch all at once."
      }
    ]
  },
  {
    category: "Applications",
    items: [
      {
        title: "Arc",
        description: "Daily Browser"
      },
      {
        title: "Firefox Developer Edition",
        description: "Coding Browser. I use a different browser when coding. Firefox has a stricter CSS rules, which is great so I can catch more bugs earlier."
      },
      {
        title: "Cursor",
        description: "Code Editor"
      },
      {
        title: "Warp",
        description: "Terminal. Previously I used iTerm2 with Fig. Since Fig has been bought now, I switched to Warp for the autocomplete feature.",
        link: "#",
        linkText: "Referral Link"
      },
      {
        title: "Raycast",
        description: "Spotlight Alternative. This is a must-have. I also use Raycast for AI Chat."
      }
    ]
  },
  {
    category: "Subscriptions",
    items: [
      {
        title: "Raycast Pro with Advanced AI",
        description: "Raycast boosts my productivity by a huge margin. I want to support the developers by subscribing to the Pro version. Also, their AI client is pretty nice since I can mix models."
      },
      {
        title: "CleanShot X",
        description: "Good for adding arrows when pointing bugs. I even gave this to some of my friends as a birthday gift 😂."
      },
      {
        title: "Screen Studio",
        description: "I use this for making beautiful demos for my content.",
        link: "#",
        linkText: "Referral Link"
      },
      {
        title: "Google One",
        description: "200GB Storage. For files and photos. I don't like iCloud for backing up photos because they are not cross-platform friendly."
      },
      {
        title: "iCloud+",
        description: "50GB Storage. For saving phone backups, messages, and other data."
      }
    ]
  }
];

const UsesPage: React.FC = () => {
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
        
        {/* Header */}
        <div className="mb-16 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 font-mono"
            >
                <span className="text-accent">{'>_'}</span> hardware_manifest.json
                <span className="animate-pulse ml-2 text-accent">_</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-500 font-mono"
            >
                {'//'} A peek of my workspace and tools.
            </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-24 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group"
        >
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
            <img 
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2000&auto=format&fit=crop" 
                alt="Workspace Setup" 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
             {/* Window Controls Overlay */}
             <div className="absolute top-4 left-4 flex gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm" />
            </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-24">
            {SECTIONS.map((section, idx) => (
                <div key={section.category} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                    {/* Category Title */}
                    <div className="md:col-span-1">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest sticky top-32 font-mono">
                            {section.category}
                        </h2>
                    </div>
                    
                    {/* Items List */}
                    <div className="md:col-span-3 space-y-12">
                        {section.items.map((item, itemIdx) => (
                            <motion.div 
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: itemIdx * 0.1 }}
                                className="group"
                            >
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors font-mono">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-base font-sans">
                                    {item.description}
                                </p>
                                {item.link && (
                                    <a href={item.link} className="inline-flex items-center mt-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-white transition-colors font-mono">
                                        <span className="border-b border-accent/30 hover:border-white pb-0.5">{item.linkText || "View Link"}</span>
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default UsesPage;
```

## === YearlyRetrospective.tsx ===
```tsx

import React from 'react';
import { Eye, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const YearlyRetrospective: React.FC = () => {
  const titleText = "Yearly Retrospective";
  const typingDuration = 0.5; // Optimized speed
  const descriptionDelay = typingDuration + 0.1;
  const cardsDelay = descriptionDelay + 0.2;

  return (
    <section className="pt-24 pb-32 w-full bg-dark relative overflow-hidden">
         
         {/* --- Background Effects --- */}
         <div className="absolute inset-0 pointer-events-none">
             {/* 1. Gradient Transition */}
             <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark to-transparent z-10" />
             
             {/* 2. Nebulas - Optimized: reduced count/complexity if needed, but kept for visual fidelity */}
             <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
             <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full mix-blend-screen" />
             
             {/* 3. Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
         </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-6"> {/* Reduced margin from mb-10 */}
                {/* Typing Title */}
                <div className="flex items-baseline gap-4 mb-2">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tighter leading-none flex items-center relative text-white">
                        <span className="text-accent mr-3 tracking-normal">{'>_'}</span>
                        
                        <div className="relative inline-block">
                            <motion.span
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                viewport={{ once: true }}
                                transition={{ duration: typingDuration, ease: "linear" }}
                                className="inline-block text-white"
                            >
                                {titleText}
                            </motion.span>
                            
                            <motion.span
                                initial={{ left: 0 }}
                                whileInView={{ left: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: typingDuration, ease: "linear" }}
                                className="absolute top-0 bottom-2 w-[0.6em] ml-1"
                            >
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full bg-accent"
                                />
                            </motion.span>
                        </div>
                    </h2>
                </div>
                
                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: descriptionDelay, duration: 0.5 }}
                    className="overflow-hidden"
                >
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-mono md:whitespace-nowrap pl-4 border-l-2 border-accent/20">
                        {'//'} Tracking progress in career and life. A comprehensive log of yearly milestones.
                    </p>
                </motion.div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RetroCard 
                    year="2024" 
                    title="Scaling Systems & Solo Travel" 
                    subtitle="Mastering high-scale architecture while exploring the world solo."
                    views="4,218"
                    delay={cardsDelay}
                />
                <RetroCard 
                    year="2023" 
                    title="The First Architect Role" 
                    subtitle="Navigating the tech winter and stepping into senior leadership."
                    views="2,982"
                    delay={cardsDelay + 0.1}
                />
                <RetroCard 
                    year="2022" 
                    title="Kubernetes Certification" 
                    subtitle="Bootcamp graduation and the beginning of the cloud native journey."
                    views="3,107"
                    delay={cardsDelay + 0.2}
                />
            </div>
        </div>
    </section>
  );
};

const RetroCard: React.FC<{ year: string; title: string; subtitle: string; views: string; delay?: number }> = ({ year, title, subtitle, views, delay = 0 }) => (
    <motion.a 
        href="#" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        className="group relative block h-full min-h-[340px] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
        {/* Subtle Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Big Year Number Background */}
        <div className="absolute -top-8 -right-8 text-[140px] leading-none font-black text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-500 select-none font-mono tracking-tighter z-0">
            {year}
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 flex flex-col h-full">
            
            {/* Top Metadata */}
            <div className="flex justify-between items-start mb-auto">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                    <Calendar className="w-5 h-5" />
                </div>
                
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 group-hover:border-white/10 transition-colors font-mono">
                    <Eye className="w-3 h-3" />
                    {views} Views
                </div>
            </div>

            {/* Bottom Content */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest font-mono">
                       RETROSPECTIVE
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-mono leading-tight">
                    {title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed font-sans border-l border-white/10 pl-4 group-hover:border-accent/30 transition-colors">
                    {subtitle}
                </p>
            </div>
        </div>

        {/* Bottom Progress Bar Line */}
        <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
    </motion.a>
)

export default YearlyRetrospective;
```

## === App.tsx ===
```tsx

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechHighlight from './components/TechHighlight';
import BlogPosts from './components/BlogPosts';
import EngineeringSpotlight from './components/EngineeringSpotlight';
import YearlyRetrospective from './components/YearlyRetrospective';
// import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { MouseFollower } from './components/MouseFollower';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetail from './components/ProjectDetail';
import PostsPage from './components/PostsPage';
import PostDetail from './components/PostDetail';
import TalksPage from './components/TalksPage';
import AboutPage from './components/AboutPage';
import UsesPage from './components/UsesPage';
import LifeOutsideTechPage from './components/LifeOutsideTechPage';
import BooksPage from './components/BooksPage';
import GuestBookPage from './components/GuestBookPage';
import ShortNotesPage from './components/ShortNotesPage';
import KudosPage from './components/KudosPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';
import SitemapPage from './components/SitemapPage';
import DeckViewerPage from './components/DeckViewerPage';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewType } from './types';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    // Reset selections when navigating to main views
    if (['home', 'projects', 'posts', 'talks', 'about', 'uses', 'life', 'books', 'guestbook', 'notes', 'kudos', 'privacy', 'terms', 'sitemap'].includes(view)) {
        setSelectedProject(null);
        setSelectedPost(null);
    }
    window.scrollTo(0, 0);
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    window.scrollTo(0, 0);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    // If we were on home, stay on home but close modal? Or go to projects page?
    // For simplicity, let's go back to the view that triggered it, or default to projects if undefined
    if (currentView === 'home') {
        // stay on home, just clear selection
    } else {
        window.scrollTo(0, 0);
    }
  };

  const handlePostSelect = (postId: string | number) => {
    setSelectedPost(postId);
    window.scrollTo(0, 0);
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
    window.scrollTo(0, 0);
  };
  
  const handleBackToTalks = () => {
      setCurrentView('talks');
      window.scrollTo(0, 0);
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-accent/30 overflow-x-hidden relative cursor-none">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      {/* Main Content with AnimatePresence for Transitions */}
      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
            {selectedProject ? (
               <PageWrapper key="project-detail">
                   <ProjectDetail projectId={selectedProject} onBack={handleBackToProjects} />
               </PageWrapper>
            ) : selectedPost ? (
               <PageWrapper key="post-detail">
                   <PostDetail postId={selectedPost} onBack={handleBackToPosts} />
               </PageWrapper>
            ) : currentView === 'home' ? (
              <PageWrapper key="home">
                <Hero />
                <TechHighlight />
                <EngineeringSpotlight onProjectSelect={handleProjectSelect} />
                <BlogPosts />
                <YearlyRetrospective />
                {/* <Testimonials /> */}
              </PageWrapper>
            ) : currentView === 'projects' ? (
              <PageWrapper key="projects">
                  <ProjectsPage onProjectSelect={handleProjectSelect} />
              </PageWrapper>
            ) : currentView === 'posts' ? (
              <PageWrapper key="posts">
                  <PostsPage onPostSelect={handlePostSelect} />
              </PageWrapper>
            ) : currentView === 'talks' ? (
              <PageWrapper key="talks">
                  <TalksPage onNavigate={handleNavigate} />
              </PageWrapper>
            ) : currentView === 'uses' ? (
              <PageWrapper key="uses">
                  <UsesPage />
              </PageWrapper>
            ) : currentView === 'life' ? (
              <PageWrapper key="life">
                  <LifeOutsideTechPage />
              </PageWrapper>
            ) : currentView === 'books' ? (
              <PageWrapper key="books">
                  <BooksPage />
              </PageWrapper>
            ) : currentView === 'guestbook' ? (
              <PageWrapper key="guestbook">
                  <GuestBookPage />
              </PageWrapper>
            ) : currentView === 'notes' ? (
              <PageWrapper key="notes">
                  <ShortNotesPage />
              </PageWrapper>
            ) : currentView === 'kudos' ? (
              <PageWrapper key="kudos">
                  <KudosPage />
              </PageWrapper>
            ) : currentView === 'privacy' ? (
              <PageWrapper key="privacy">
                  <PrivacyPolicyPage />
              </PageWrapper>
            ) : currentView === 'terms' ? (
              <PageWrapper key="terms">
                  <TermsPage />
              </PageWrapper>
            ) : currentView === 'sitemap' ? (
              <PageWrapper key="sitemap">
                  <SitemapPage onNavigate={handleNavigate} />
              </PageWrapper>
            ) : currentView === 'deck' ? (
              <PageWrapper key="deck">
                  <DeckViewerPage onBack={handleBackToTalks} />
              </PageWrapper>
            ) : (
              <PageWrapper key="about">
                  <AboutPage />
              </PageWrapper>
            )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />

      <MouseFollower />
    </div>
  );
};

// Simple Wrapper for Page Transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        {children}
    </motion.div>
);

export default App;```
## === types.ts ===
```ts
import { LucideIcon } from 'lucide-react';

export type ViewType = 'home' | 'projects' | 'posts' | 'talks' | 'about' | 'uses' | 'life' | 'books' | 'guestbook' | 'notes' | 'kudos' | 'privacy' | 'terms' | 'sitemap' | 'deck';

export interface NavItem {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  image?: string; // For the card style items
  icon?: LucideIcon; // For the list style items
}```
## === metadata.json ===
```json
{
  "name": "Portofolio of DevOps Universe",
  "description": "A dark-themed personal portfolio and blog featuring a rich mega-menu and interactive 3D-style aesthetics.",
  "requestFramePermissions": []
}```
