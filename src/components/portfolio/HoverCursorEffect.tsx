import { useEffect, useRef } from "react";

/**
 * HoverCursorEffect
 * Keeps the default OS cursor, but adds a tiny animated ring/glow that appears
 * only when hovering interactive elements (buttons/links/inputs/etc.).
 * Uses requestAnimationFrame + direct DOM writes for 60fps.
 */
const HoverCursorEffect = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    // No cursor effect on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const ring = ringRef.current;
    if (!ring) return;

    const show = () => {
      if (!visible.current) {
        visible.current = true;
        ring.style.opacity = "1";
      }
    };

    const hide = () => {
      visible.current = false;
      ring.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      show();
    };

    const onLeaveWindow = () => hide();

    const onEnterInteractive = () => {
      hovering.current = true;
      ring.dataset.state = "hover";
    };

    const onLeaveInteractive = () => {
      hovering.current = false;
      ring.dataset.state = "idle";
    };

    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        "button, a, [data-hover], input, textarea, select, [role=\"button\"]"
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    const animate = () => {
      // Fast follow (near-instant, but still smooth)
      const lerp = hovering.current ? 0.55 : 0.45;
      pos.current.x += (mouse.current.x - pos.current.x) * lerp;
      pos.current.y += (mouse.current.y - pos.current.y) * lerp;

      ring.style.left = `${pos.current.x}px`;
      ring.style.top = `${pos.current.y}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("mouseleave", onLeaveWindow);

    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseleave", onLeaveWindow);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="fixed pointer-events-none z-[9998]"
      style={{
        opacity: 0,
        transform: "translate(-50%, -50%)",
        transition: "opacity 150ms ease",
        willChange: "left, top, opacity",
      }}
    >
      {/* idle */}
      <div
        className="rounded-full border border-border/70 bg-background/10 backdrop-blur"
        style={{
          width: 18,
          height: 18,
          boxShadow: "0 0 0 0 hsl(var(--primary) / 0)",
          transition:
            "width 140ms ease, height 140ms ease, box-shadow 160ms ease, border-color 160ms ease",
        }}
        data-part="ring"
      />
      <style>{`
        [data-state='hover'] [data-part='ring']{
          width: 34px;
          height: 34px;
          border-color: hsl(var(--primary) / 0.55);
          box-shadow:
            0 0 0 6px hsl(var(--primary) / 0.10),
            0 0 30px hsl(var(--primary) / 0.25);
        }
      `}</style>
    </div>
  );
};

export default HoverCursorEffect;
