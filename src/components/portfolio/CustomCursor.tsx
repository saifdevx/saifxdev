import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Check for touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    // Hide default cursor globally
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    // Direct mouse tracking - no React state for maximum performance
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        cursor.style.opacity = '1';
        glow.style.opacity = '0.15';
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      cursor.style.transform = `translate(-50%, -50%) scale(${isHovering.current ? 1.5 : 1})`;
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      cursor.style.opacity = '0';
      glow.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      cursor.style.opacity = '1';
      glow.style.opacity = '0.15';
    };

    // Hover detection for interactive elements
    const handleElementEnter = () => {
      isHovering.current = true;
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.transform = `translate(-50%, -50%) scale(${isClicking.current ? 0.8 : 1.5})`;
    };

    const handleElementLeave = () => {
      isHovering.current = false;
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.transform = `translate(-50%, -50%) scale(${isClicking.current ? 0.8 : 1})`;
    };

    // Attach hover listeners to all interactive elements
    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll('button, a, [data-hover], input, textarea, [role="button"]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    };

    // Animation loop using requestAnimationFrame for smooth 60fps updates
    const animate = () => {
      // Smooth interpolation for cursor (fast follow)
      const cursorLerp = 0.35;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * cursorLerp;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * cursorLerp;
      
      // Slower interpolation for glow (trailing effect)
      const glowLerp = 0.08;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * glowLerp;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * glowLerp;

      // Apply positions directly to DOM
      cursor.style.left = `${cursorPos.current.x}px`;
      cursor.style.top = `${cursorPos.current.y}px`;
      
      glow.style.left = `${glowPos.current.x - 100}px`;
      glow.style.top = `${glowPos.current.y - 100}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Initial attachment and mutation observer for dynamic elements
    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Cleanup
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) existingStyle.remove();

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot - using CSS transitions instead of framer-motion */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: '12px',
          height: '12px',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'width 0.15s ease-out, height 0.15s ease-out, transform 0.1s ease-out, opacity 0.2s ease-out',
          willChange: 'left, top, width, height, transform',
        }}
      >
        <div
          className="w-full h-full rounded-full bg-white"
        />
      </div>

      {/* Trailing glow effect */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: '200px',
          height: '200px',
          opacity: 0,
          willChange: 'left, top, opacity',
        }}
      >
        <div className="w-full h-full rounded-full bg-primary/30 blur-3xl" />
      </div>
    </>
  );
};

export default CustomCursor;
