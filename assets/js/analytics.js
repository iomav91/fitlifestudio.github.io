// Core event tracking functions
const trackEvent = (category, action, label = null) => {
  gtag('event', action, {
    'event_category': category,
    'event_label': label
  });
};

// Form submission tracking
const trackFormSubmission = () => {
  trackEvent('Form', 'Submit', 'Registration');
};

// Class schedule view tracking
const trackScheduleView = (className) => {
  trackEvent('Schedule', 'View', className);
};

// Pricing plan view tracking
const trackPricingView = (planName) => {
  trackEvent('Pricing', 'View', planName);
};
