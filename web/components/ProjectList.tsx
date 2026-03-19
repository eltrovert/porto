
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
