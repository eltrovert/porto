
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
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (view: ViewType, topic?: string) => {
    setCurrentView(view);
    // Reset selections when navigating to main views
    if (['home', 'projects', 'posts', 'talks', 'about', 'uses', 'life', 'books', 'guestbook', 'notes', 'kudos', 'privacy', 'terms', 'sitemap'].includes(view)) {
        setSelectedProject(null);
        setSelectedPost(null);
    }
    // Set topic filter when navigating to posts with a specific topic
    setTopicFilter(view === 'posts' && topic ? topic : null);
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
                <TechHighlight onNavigate={handleNavigate} />
                <EngineeringSpotlight onProjectSelect={handleProjectSelect} onNavigate={handleNavigate} />
                <BlogPosts />
                <YearlyRetrospective onNavigate={handleNavigate} />
                {/* <Testimonials /> */}
              </PageWrapper>
            ) : currentView === 'projects' ? (
              <PageWrapper key="projects">
                  <ProjectsPage onProjectSelect={handleProjectSelect} />
              </PageWrapper>
            ) : currentView === 'posts' ? (
              <PageWrapper key="posts">
                  <PostsPage onPostSelect={handlePostSelect} initialTopic={topicFilter} />
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

export default App;