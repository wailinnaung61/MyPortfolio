# Google Analytics Setup Guide

## Prerequisites

1. You need a Google Analytics account
2. You need to create a Google Analytics 4 (GA4) property

## Setup Steps

### 1. Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or create a new property
4. Follow the setup wizard:
   - Enter your website name
   - Select your reporting time zone and currency
   - Configure your business information
5. Create a Web stream for your website
6. Copy your **Measurement ID** (starts with "G-")

### 2. Configure Environment Variables

1. Open your `.env.local` file
2. Replace `your-ga-measurement-id` with your actual Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 3. Deploy and Test

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Visit your website and navigate through different sections
3. Check Google Analytics Real-time reports to see if data is being tracked

## What's Been Configured

### Files Created/Modified:

- ✅ `src/lib/gtag.js` - Google Analytics utility functions
- ✅ `src/components/GoogleAnalytics.jsx` - GA component
- ✅ `src/hooks/useAnalytics.js` - Custom hook for section tracking
- ✅ `src/app/layout.jsx` - Added GA to root layout
- ✅ `src/app/page.jsx` - Added tracking imports
- ✅ `.env.local` - Environment variables
- ✅ `.env.template` - Updated template

### Analytics Events Configured:

- **Page Views**: Automatic tracking of page navigation
- **Section Views**: Track when users view different portfolio sections
- **Portfolio Views**: Track portfolio project interactions
- **Contact Form**: Track form interactions
- **Downloads**: Track file downloads (like resume)

### Custom Events Available:

```javascript
import {
  trackPortfolioView,
  trackContactForm,
  trackDownload,
} from "@/lib/gtag";

// Track portfolio project view
trackPortfolioView("Project Name");

// Track contact form submission
trackContactForm("contact_form_submit");

// Track resume download
trackDownload("resume.pdf");
```

## Using Section Tracking (Optional)

To track when users view specific sections, you can use the intersection observer hook:

```javascript
import { useIntersectionObserver } from "@/hooks/useAnalytics";

const MySection = () => {
  const sectionRef = useIntersectionObserver("About Section");

  return <section ref={sectionRef}>{/* Your section content */}</section>;
};
```

## Production Deployment

When deploying to production:

1. Add your production GA Measurement ID to your hosting platform's environment variables
2. Make sure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
3. Verify tracking is working in Google Analytics

## Privacy Considerations

- Consider adding a cookie consent banner if required by your jurisdiction
- Review Google Analytics data retention settings
- Consider implementing GA4's enhanced privacy features

## Testing

- Use Google Analytics DebugView for real-time debugging
- Install Google Analytics Debugger browser extension
- Check browser's Network tab to verify gtag requests
