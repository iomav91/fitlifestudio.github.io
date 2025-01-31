// Performance monitoring
const trackPageLoadTime = () => {
  window.addEventListener('load', () => {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    
    gtag('event', 'timing_complete', {
      'name': 'load',
      'value': loadTime,
      'event_category': 'Page Load'
    });
  });
};

// First Input Delay monitoring
const trackFID = () => {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      gtag('event', 'FID', {
        'event_category': 'Web Vitals',
        'value': Math.round(entry.processingStart - entry.startTime),
        'event_label': entry.name
      });
    }
  }).observe({type: 'first-input', buffered: true});
};
