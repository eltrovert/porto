// Mouse Follower - Accent dot + ring with lerp delay
// Converted from React MouseFollower component to match exactly

class MouseFollower {
  constructor() {
    this.mouse = { x: -100, y: -100 }; // Start off-screen
    this.ring = { x: -100, y: -100 };
    this.requestId = null;

    this.init();
  }

  init() {
    this.getElements();
    this.bindEvents();
    this.startAnimationLoop();
  }

  getElements() {
    // Use existing elements from base.templ instead of creating new ones
    this.dot = document.getElementById('mouse-dot');
    this.ring_element = document.getElementById('mouse-ring');

    // If elements don't exist, create them (fallback)
    if (!this.dot || !this.ring_element) {
      this.createElements();
    } else {
      // Ensure proper initial positioning
      this.dot.style.transform = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)';
      this.ring_element.style.transform = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)';
    }
  }

  createElements() {
    // Fallback: Create elements if they don't exist in HTML
    this.dot = document.createElement('div');
    this.dot.id = 'mouse-dot';
    this.dot.className = 'fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform';
    this.dot.style.transform = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)';

    this.ring_element = document.createElement('div');
    this.ring_element.id = 'mouse-ring';
    this.ring_element.className = 'fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full pointer-events-none z-[9998] will-change-transform';
    this.ring_element.style.transform = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring_element);
  }

  handleMouseMove = (e) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    // Update dot position instantly
    if (this.dot) {
      this.dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  }

  animateRing = () => {
    // Linear Interpolation (Lerp) for smooth delay
    // The 0.15 factor determines the 'weight' or lag of the ring. Higher = faster.
    const dx = this.mouse.x - this.ring.x;
    const dy = this.mouse.y - this.ring.y;

    this.ring.x += dx * 0.15;
    this.ring.y += dy * 0.15;

    if (this.ring_element) {
      // Use translate3d to force hardware acceleration
      this.ring_element.style.transform = `translate3d(${this.ring.x}px, ${this.ring.y}px, 0) translate(-50%, -50%)`;
    }

    this.requestId = requestAnimationFrame(this.animateRing);
  }

  bindEvents() {
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
  }

  startAnimationLoop() {
    this.requestId = requestAnimationFrame(this.animateRing);
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MouseFollower();
});