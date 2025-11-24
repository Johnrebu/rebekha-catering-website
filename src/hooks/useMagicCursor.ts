import { useEffect } from 'react';

export const useMagicCursor = () => {
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return;

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'magic-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
      opacity: 0;
      will-change: transform, opacity;
    `;
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'magic-cursor-follower';
    follower.style.cssText = `
      position: fixed;
      width: 32px;
      height: 32px;
      border: 1.5px solid rgba(255, 255, 255, 0.4);
      background: transparent;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transition: width 0.25s ease, height 0.25s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease;
      mix-blend-mode: difference;
      opacity: 0;
      will-change: transform, width, height;
    `;
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let isHovering = false;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Show cursors instantly
      if (cursor.style.opacity === '0') {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
      }
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    };

    // Hover effect on interactive elements - optimized with event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      
      if (isInteractive && !isHovering) {
        isHovering = true;
        cursor.style.opacity = '0';
        cursor.style.transform = 'translate(-50%, -50%) scale(0)';
        follower.style.width = '65px';
        follower.style.height = '65px';
        follower.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        follower.style.background = 'rgba(255, 255, 255, 0.08)';
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        cursor.style.opacity = '1';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.width = '32px';
        follower.style.height = '32px';
        follower.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        follower.style.background = 'transparent';
      }
    };

    // Optimized animation loop with higher speeds
    const animate = () => {
      // Increased speeds for faster response
      const speed = 0.5; // Increased from 0.15
      const followerSpeed = 0.3; // Increased from 0.1
      
      // Calculate new positions
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      followerX += (mouseX - followerX) * followerSpeed;
      followerY += (mouseY - followerY) * followerSpeed;
      
      // Use transform for better performance (GPU accelerated)
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      
      requestAnimationFrame(animate);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseover', handleMouseOver);

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseover', handleMouseOver);
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
      if (document.body.contains(follower)) document.body.removeChild(follower);
    };
  }, []);
};
