
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
