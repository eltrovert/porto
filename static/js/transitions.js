// Transitions - View Transitions API integration with HTMX
// Replaces Framer Motion page transitions from React

class PageTransitions {
  constructor() {
    this.isTransitioning = false;
    this.init();
  }

  init() {
    this.setupHTMXIntegration();
    this.setupViewTransitions();
  }

  setupHTMXIntegration() {
    // Before HTMX request
    document.addEventListener('htmx:beforeRequest', (e) => {
      this.beforeTransition(e);
    });

    // Before HTMX swaps content
    document.addEventListener('htmx:beforeSwap', (e) => {
      this.handleViewTransition(e);
    });

    // After HTMX swaps content
    document.addEventListener('htmx:afterSwap', (e) => {
      this.afterTransition(e);
    });

    // Handle HTMX errors
    document.addEventListener('htmx:responseError', (e) => {
      this.handleTransitionError(e);
    });
  }

  setupViewTransitions() {
    // Check if View Transitions API is supported
    this.supportsViewTransitions = 'startViewTransition' in document;

    // Add CSS for fallback transitions
    if (!this.supportsViewTransitions) {
      this.addFallbackStyles();
    }
  }

  beforeTransition(event) {
    this.isTransitioning = true;

    // Add loading state to triggering element
    const triggerElement = event.target;
    if (triggerElement) {
      triggerElement.classList.add('loading');
    }

    // Show loading indicator if it exists
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '1';
    }
  }

  handleViewTransition(event) {
    if (this.supportsViewTransitions && !this.isReducedMotion()) {
      // Use View Transitions API
      const transition = document.startViewTransition(() => {
        // This function will be called after the transition starts
        return Promise.resolve();
      });

      // Handle transition completion
      transition.finished.then(() => {
        this.cleanupTransition();
      }).catch(() => {
        this.cleanupTransition();
      });
    } else {
      // Fallback transition
      this.handleFallbackTransition(event);
    }
  }

  handleFallbackTransition(event) {
    const targetElement = event.target;

    if (targetElement) {
      // Fade out current content
      targetElement.style.transition = 'opacity 0.3s ease';
      targetElement.style.opacity = '0';

      setTimeout(() => {
        // Content will be swapped by HTMX here
        // Then fade in new content in afterTransition
      }, 300);
    }
  }

  afterTransition(event) {
    const targetElement = event.target;

    if (targetElement) {
      // Fade in new content for fallback
      if (!this.supportsViewTransitions) {
        targetElement.style.opacity = '0';
        setTimeout(() => {
          targetElement.style.transition = 'opacity 0.3s ease';
          targetElement.style.opacity = '1';
        }, 50);
      }

      // Re-initialize animations for new content
      if (window.scrollAnimations) {
        window.scrollAnimations.observeNewElements();
      }

      // Scroll to top of new content
      this.scrollToTop();
    }

    this.cleanupTransition();
  }

  handleTransitionError(event) {
    console.warn('Transition error:', event.detail);
    this.cleanupTransition();
  }

  cleanupTransition() {
    this.isTransitioning = false;

    // Remove loading states
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
      el.classList.remove('loading');
    });

    // Hide loading indicator
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '0';
    }
  }


  addFallbackStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .page-transition-enter {
        opacity: 0;
        transform: translateY(20px);
      }

      .page-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s ease;
      }

      .page-transition-exit {
        opacity: 1;
        transform: translateY(0);
      }

      .page-transition-exit-active {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
      }

      .loading {
        position: relative;
        overflow: hidden;
      }

      .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ffcf0d, transparent);
        animation: loading-sweep 1.5s infinite;
      }

      @keyframes loading-sweep {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Public method to trigger manual transitions
  static triggerTransition(element, callback) {
    if ('startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => {
        callback();
        return Promise.resolve();
      });
    } else {
      callback();
    }
  }
}

// Utility functions for custom transitions
class TransitionUtils {
  static fadeTransition(element, newContent) {
    return new Promise((resolve) => {
      element.style.transition = 'opacity 0.3s ease';
      element.style.opacity = '0';

      setTimeout(() => {
        element.innerHTML = newContent;
        element.style.opacity = '1';
        setTimeout(() => {
          element.style.transition = '';
          resolve();
        }, 300);
      }, 300);
    });
  }

  static slideTransition(element, newContent, direction = 'left') {
    return new Promise((resolve) => {
      const translateValue = direction === 'left' ? '-100%' : '100%';

      element.style.transition = 'transform 0.3s ease';
      element.style.transform = `translateX(${translateValue})`;

      setTimeout(() => {
        element.innerHTML = newContent;
        element.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;

        setTimeout(() => {
          element.style.transform = 'translateX(0)';
          setTimeout(() => {
            element.style.transition = '';
            resolve();
          }, 300);
        }, 50);
      }, 300);
    });
  }

  static scaleTransition(element, newContent) {
    return new Promise((resolve) => {
      element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      element.style.transform = 'scale(0.95)';
      element.style.opacity = '0';

      setTimeout(() => {
        element.innerHTML = newContent;
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
        setTimeout(() => {
          element.style.transition = '';
          resolve();
        }, 300);
      }, 300);
    });
  }
}

// Initialize transitions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.pageTransitions = new PageTransitions();
  window.TransitionUtils = TransitionUtils;
});

// Add CSS for View Transitions API
if ('startViewTransition' in document) {
  const style = document.createElement('style');
  style.textContent = `
    ::view-transition-old(root) {
      animation: fade-out 0.3s ease;
    }

    ::view-transition-new(root) {
      animation: fade-in 0.3s ease;
    }

    @keyframes fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Custom transition for specific elements */
    .view-transition-slide::view-transition-old(root) {
      animation: slide-out-left 0.3s ease;
    }

    .view-transition-slide::view-transition-new(root) {
      animation: slide-in-right 0.3s ease;
    }

    @keyframes slide-out-left {
      from { transform: translateX(0); }
      to { transform: translateX(-100%); }
    }

    @keyframes slide-in-right {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
}