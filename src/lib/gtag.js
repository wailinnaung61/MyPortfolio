// lib/gtag.js
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for portfolio interactions
export const trackPortfolioView = (projectName) => {
  event({
    action: 'view_portfolio',
    category: 'Portfolio',
    label: projectName,
  });
};

export const trackContactForm = (action) => {
  event({
    action: action, // 'contact_form_submit', 'contact_form_start', etc.
    category: 'Contact',
    label: 'Contact Form',
  });
};

export const trackDownload = (fileName) => {
  event({
    action: 'download',
    category: 'Downloads',
    label: fileName,
  });
};

export const trackSectionView = (sectionName) => {
  event({
    action: 'section_view',
    category: 'Navigation',
    label: sectionName,
  });
};
