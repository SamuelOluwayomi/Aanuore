import { useEffect } from 'react';

/**
 * Lightweight Global Scroll Reveal Hook
 * Automatically attaches an IntersectionObserver to all elements with `data-reveal`
 */
export function useScrollReveal() {
  useEffect(() => {
    // If reduced motion is preferred, reveal everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // Unobserve after animating in once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px', // triggers slightly before scrolling fully into view
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
