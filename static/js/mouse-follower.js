// Mouse Follower - Accent dot + ring with lerp delay
// Converted from React MouseFollower component

class MouseFollower {
  constructor() {
    this.mouse = { x: -100, y: -100 }; // Start off-screen
    this.ring = { x: -100, y: -100 };
    this.requestId = null;

    this.init();
  }

  init() {
    this.createElements();
    this.bindEvents();
    this.startAnimationLoop();
  }

  createElements() {
    // Create dot element
    this.dot = document.createElement('div');
    this.dot.className = 'mouse-follower';
    this.dot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      background: #ffcf0d;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      will-change: transform;
      transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
    `;

    // Create ring element
    this.ring_element = document.createElement('div');
    this.ring_element.className = 'mouse-ring';
    this.ring_element.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 32px;
      height: 32px;
      border: 1px solid rgba(255, 207, 13, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      will-change: transform;
      transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
    `;

    // Append to body
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
    if (this.dot) {
      document.body.removeChild(this.dot);
    }
    if (this.ring_element) {
      document.body.removeChild(this.ring_element);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MouseFollower();
});