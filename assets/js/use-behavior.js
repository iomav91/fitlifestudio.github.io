// Scroll depth tracking
const trackScrollDepth = () => {
  let scrollMarks = [25, 50, 75, 100];
  let marks = new Set();
  
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    
    scrollMarks.forEach(mark => {
      if (scrollPercent >= mark && !marks.has(mark)) {
        marks.add(mark);
        trackEvent('Scroll', 'Depth', `${mark}%`);
      }
    });
  });
};

// Time on page tracking
const trackTimeOnPage = () => {
  const intervals = [30, 60, 120, 300]; // seconds
  intervals.forEach(interval => {
    setTimeout(() => {
      trackEvent('Engagement', 'Time', `${interval}s`);
    }, interval * 1000);
  });
};
