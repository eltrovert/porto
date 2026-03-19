
import React from 'react';
import { Github, ExternalLink, ArrowRight, Layers, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import astroProjects from "../data/astro-projects.json";
import { ViewType } from '../types';

interface EngineeringSpotlightProps {
  onProjectSelect?: (projectId: string) => void;
  onNavigate?: (view: ViewType) => void;
}

// Use top 2 pinned projects
const pinnedProjects = astroProjects.filter(p => p.pinned);
const project1 = pinnedProjects[0];
const project2 = pinnedProjects[1];

const fixImage = (img: string) => img.replace('/assets/images/projects/', '/images/projects/');
const deriveSlug = (url: string) => url.split('/').pop() || '';

const PROJECT_TECH: Record<string, string[]> = {
  "homelab-infrastructure": ["Kubernetes", "Terraform", "Proxmox", "Ansible"],
  "mlops-ai-infrastructure": ["MLOps", "Ray", "Kubernetes", "Python"],
  "cloud-migration-journey": ["GCP", "AWS", "Kubernetes", "Terraform"],
};

const EngineeringSpotlight: React.FC<EngineeringSpotlightProps> = ({ onProjectSelect, onNavigate }) => {
  const slug1 = deriveSlug(project1.url);
  const slug2 = deriveSlug(project2.url);

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
                    className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight flex items-center gap-2 sm:gap-4 font-mono text-white"
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

          <p className="text-gray-400 pl-4 border-l-2 border-accent/20 font-mono text-xs sm:text-sm md:text-base">
            {'//'} A selection of infrastructure and automation projects.
          </p>
        </div>

        {/* Project 1 - Image Right (Default) */}
        <ProjectCard
            align="right"
            title={project1.name}
            description={project1.description}
            tech={PROJECT_TECH[slug1] || ["Infrastructure"]}
            image={fixImage(project1.image)}
            repoLink="#"
            demoLink="#"
            onClick={() => onProjectSelect && onProjectSelect(slug1)}
        />

        {/* Project 2 - Image Left (Alternating) */}
        <ProjectCard
            align="left"
            title={project2.name}
            description={project2.description}
            tech={PROJECT_TECH[slug2] || ["Infrastructure"]}
            image={fixImage(project2.image)}
            repoLink="#"
            demoLink="#"
            onClick={() => onProjectSelect && onProjectSelect(slug2)}
        />

        {/* See More Link */}
        <div className="flex justify-center pt-8">
             <button onClick={() => onNavigate && onNavigate('projects')} className="group inline-flex items-center space-x-2 text-lg font-medium text-gray-400 hover:text-accent transition-colors font-mono cursor-pointer bg-transparent border-none">
                <span>See more projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
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
        <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center bg-[#151515] backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden">
            
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
                        className={`text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-mono ${onClick ? 'cursor-pointer' : ''}`}
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
                        className="flex items-center space-x-2 bg-white text-black px-5 py-3 rounded-md font-bold hover:bg-accent hover:scale-105 transition-all duration-300 cursor-pointer min-h-[44px]"
                    >
                        <Github className="w-4 h-4" />
                        <span>View Project</span>
                    </button>
                    <a href={demoLink} className="flex items-center space-x-2 px-5 py-3 rounded-md font-bold text-white border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all duration-300 min-h-[44px]">
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
