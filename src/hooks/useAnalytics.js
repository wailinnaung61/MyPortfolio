// hooks/useAnalytics.js
import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/gtag';

export const useIntersectionObserver = (sectionName, options = {}) => {
  const elementRef = useRef(null);
  const hasBeenViewed = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed.current) {
          trackSectionView(sectionName);
          hasBeenViewed.current = true;
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionName, options]);

  return elementRef;
};
