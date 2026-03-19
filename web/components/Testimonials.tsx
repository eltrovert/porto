
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
