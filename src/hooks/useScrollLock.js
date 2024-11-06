import { useEffect } from 'react';

const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      // Save current scroll position
      const scrollPosition = window.pageYOffset;
      // Add styles to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // Get the scroll position from the body's top property
      const scrollPosition = document.body.style.top;
      // Remove styles that prevent scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restore scroll position
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition || '0', 10) * -1);
      }
    }
  }, [isLocked]);
};

export default useScrollLock; 