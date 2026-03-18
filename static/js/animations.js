// Animations - IntersectionObserver for scroll-triggered animations
// Replaces Framer Motion from React components

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger before element is fully visible
      threshold: 0.1
    };

    this.init();
  }

  init() {
    this.setupObservers();
    this.setupTypingAnimation();
  }

  setupObservers() {
    // Create intersection observer for fade-in-up animations
    this.fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerFadeInUp(entry.target);
        }
      });
    }, this.observerOptions);

    // Create intersection observer for staggered animations
    this.staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerStaggeredAnimation(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe elements on page load
    this.observeElements();
  }

  observeElements() {
    // Observe elements with fade-in-up class
    const fadeElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in-up, .animate-fade-in-up-delay, .animate-fade-in-up-delay-2');
    fadeElements.forEach(el => {
      el.classList.add('animate-out'); // Start hidden
      this.fadeObserver.observe(el);
    });

    // Observe elements with stagger animation
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      this.staggerObserver.observe(container);
    });

    // Observe individual stagger items if no container
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
      if (!item.closest('.stagger-container')) {
        item.classList.add('animate-out');
        setTimeout(() => {
          this.fadeObserver.observe(item);
        }, index * 100);
      }
    });

    // Observe card elements for hover prep
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      this.setupCardHoverEffects(card);
    });
  }

  triggerFadeInUp(element) {
    element.classList.remove('animate-out');
    element.classList.add('animate-in');

    // Add fade-in-up animation
    element.style.animation = 'fadeInUp 0.6s ease-out forwards';

    // Unobserve after animating
    this.fadeObserver.unobserve(element);
  }

  triggerStaggeredAnimation(container) {
    const children = container.querySelectorAll('.stagger-item');

    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.remove('animate-out');
        child.classList.add('animate-in');
        child.style.animation = `fadeInUp 0.6s ease-out forwards`;
      }, index * 100); // 100ms delay between each item
    });

    // Unobserve after animating
    this.staggerObserver.unobserve(container);
  }

  setupCardHoverEffects(card) {
    // Add floating animation to cards
    if (card.classList.contains('float-card')) {
      card.style.animation = 'float 6s ease-in-out infinite';
    }

    // Add scan effect to visual containers
    const visualContainer = card.querySelector('.visual-container');
    if (visualContainer) {
      visualContainer.classList.add('relative', 'overflow-hidden');

      // Create scan overlay
      const scanOverlay = document.createElement('div');
      scanOverlay.className = 'scan-overlay';
      scanOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 207, 13, 0.3), transparent);
        transform: translateX(-100%);
        pointer-events: none;
      `;

      visualContainer.appendChild(scanOverlay);

      // Trigger scan on hover
      card.addEventListener('mouseenter', () => {
        scanOverlay.style.animation = 'scan 1.5s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        scanOverlay.style.animation = 'none';
        setTimeout(() => {
          scanOverlay.style.transform = 'translateX(-100%)';
        }, 50);
      });
    }
  }

  setupTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-effect');

    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #ffcf0d';
      element.style.whiteSpace = 'nowrap';
      element.style.overflow = 'hidden';

      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          // Keep cursor blinking
          element.style.animation = 'typing-cursor 1s infinite';
        }
      }, 50);
    });
  }

  // Method to manually trigger animations (for dynamic content)
  observeNewElements() {
    this.observeElements();
  }

  // Destroy observers (for cleanup)
  destroy() {
    if (this.fadeObserver) {
      this.fadeObserver.disconnect();
    }
    if (this.staggerObserver) {
      this.staggerObserver.disconnect();
    }
  }
}

// Additional animation utilities
class AnimationUtils {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';

    const fadeEffect = setInterval(() => {
      if (!element.style.opacity) {
        element.style.opacity = '0';
      }
      if (parseFloat(element.style.opacity) < 1) {
        element.style.opacity = (parseFloat(element.style.opacity) + 0.1).toString();
      } else {
        clearInterval(fadeEffect);
      }
    }, duration / 10);
  }

  static fadeOut(element, duration = 300) {
    const fadeEffect = setInterval(() => {
      if (!element.style.opacity) {
        element.style.opacity = '1';
      }
      if (parseFloat(element.style.opacity) > 0) {
        element.style.opacity = (parseFloat(element.style.opacity) - 0.1).toString();
      } else {
        clearInterval(fadeEffect);
        element.style.display = 'none';
      }
    }, duration / 10);
  }

  static slideDown(element, duration = 300) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';

    const targetHeight = element.scrollHeight + 'px';
    element.style.transition = `height ${duration}ms ease`;
    element.style.height = targetHeight;

    setTimeout(() => {
      element.style.height = '';
      element.style.overflow = '';
      element.style.transition = '';
    }, duration);
  }

  static slideUp(element, duration = 300) {
    element.style.transition = `height ${duration}ms ease`;
    element.style.height = element.offsetHeight + 'px';
    element.style.overflow = 'hidden';

    setTimeout(() => {
      element.style.height = '0';
    }, 10);

    setTimeout(() => {
      element.style.display = 'none';
      element.style.height = '';
      element.style.overflow = '';
      element.style.transition = '';
    }, duration);
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimations = new ScrollAnimations();
  window.AnimationUtils = AnimationUtils;
});

// Re-observe elements when new content is loaded (for HTMX)
document.addEventListener('htmx:afterSwap', () => {
  if (window.scrollAnimations) {
    window.scrollAnimations.observeNewElements();
  }
});