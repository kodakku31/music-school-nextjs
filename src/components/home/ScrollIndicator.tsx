'use client';

import { useEffect } from 'react';

export default function ScrollIndicator() {
  useEffect(() => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const storySection = document.getElementById('story');
    
    if (scrollIndicator && storySection) {
      scrollIndicator.addEventListener('click', function() {
        storySection.scrollIntoView({ behavior: 'smooth' });
      });
    }
    
    return () => {
      if (scrollIndicator && storySection) {
        scrollIndicator.removeEventListener('click', function() {
          storySection.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };
  }, []);

  return (
    <div className="scroll-indicator">
      <span>SCROLL</span>
      <div className="scroll-arrow">↓</div>
    </div>
  );
}
