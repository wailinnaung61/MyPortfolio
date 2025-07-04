# How to Test Google Analytics Implementation

## 🔧 **Prerequisites**

Make sure your Google Analytics Measurement ID is set correctly in your `.env.local` file:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XKLGWDJ74J
```

## 🌐 **Method 1: Real-time Reports (Recommended)**

1. **Open Google Analytics:**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Select your property with ID `G-XKLGWDJ74J`

2. **Navigate to Real-time Reports:**
   - Click on "Reports" in the left sidebar
   - Click on "Realtime" → "Overview"

3. **Test Your Website:**
   - Open your website: `http://localhost:3001` (or current port)
   - Navigate through different sections
   - You should see activity appear in real-time (within 30 seconds)

## 🔍 **Method 2: Browser Developer Tools**

### Check if GA Script is Loading:

1. **Open Developer Tools** (F12)
2. **Go to Network Tab**
3. **Refresh your page**
4. **Look for these requests:**
   - `gtag/js?id=G-XKLGWDJ74J` (script loading)
   - `collect?` or `g/collect?` (data sending)

### Check Console for GA Activity:

1. **Open Console Tab**
2. **Type this command to check if gtag is loaded:**

   ```javascript
   window.gtag;
   ```

   Should return a function, not `undefined`

3. **Check dataLayer:**
   ```javascript
   window.dataLayer;
   ```
   Should return an array with events

## 🛠 **Method 3: Google Analytics Debugger Extension**

1. **Install Extension:**
   - Chrome: [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   - Firefox: [GA Debug](https://addons.mozilla.org/en-US/firefox/addon/ga-debug/)

2. **Enable Debugger:**
   - Click the extension icon
   - Visit your website
   - Check console for detailed GA logs

## 📊 **Method 4: Test Custom Events**

Add this to your browser console to test custom events:

```javascript
// Test a custom event
window.gtag("event", "test_event", {
  event_category: "Test",
  event_label: "Manual Test",
  value: 1,
});
```

## 🎯 **Method 5: Test Your Portfolio-Specific Events**

### Test Section Tracking:

```javascript
// Import the function (in browser console after page loads)
// Test section view tracking
window.gtag("event", "section_view", {
  event_category: "Navigation",
  event_label: "About Section",
});
```

### Test Portfolio Interaction:

```javascript
// Test portfolio view
window.gtag("event", "view_portfolio", {
  event_category: "Portfolio",
  event_label: "Sample Project",
});
```

## ✅ **Method 6: Verification Checklist**

### In Google Analytics Real-time:

- [ ] **Active Users**: Should show 1 when you're browsing
- [ ] **Page Views**: Should increment as you navigate
- [ ] **Events**: Custom events should appear in real-time
- [ ] **Pages and Screens**: Should show your page paths

### In Browser Console:

- [ ] No JavaScript errors related to gtag
- [ ] `window.gtag` function exists
- [ ] `window.dataLayer` contains events
- [ ] Network requests to Google Analytics

### In Network Tab:

- [ ] `gtag/js` script loads successfully (status 200)
- [ ] `collect` requests sent to Google Analytics
- [ ] Requests contain your Measurement ID

## 🚨 **Common Issues & Solutions**

### Issue: No Real-time Data

**Solutions:**

1. Check if Measurement ID is correct
2. Verify environment variables are loaded (restart dev server)
3. Check browser's ad blocker isn't blocking GA
4. Ensure you're looking at the correct GA property

### Issue: Script Not Loading

**Solutions:**

1. Check console for JavaScript errors
2. Verify HTTPS in production (GA requires HTTPS)
3. Check if script is blocked by ad blocker

### Issue: Events Not Firing

**Solutions:**

1. Check event syntax in console
2. Verify gtag function is available
3. Test with manual events first

## 🔬 **Advanced Testing**

### Test Page Views:

```javascript
// Manually trigger a page view
window.gtag("config", "G-XKLGWDJ74J", {
  page_location: window.location.href,
  page_title: document.title,
});
```

### Check Configuration:

```javascript
// Check if GA is properly configured
console.log("DataLayer:", window.dataLayer);
console.log("Gtag function:", typeof window.gtag);
console.log("Current URL:", window.location.href);
```

## 📱 **Testing in Production**

When you deploy to production:

1. **Update environment variables** on your hosting platform
2. **Test with your production domain**
3. **Verify in GA Real-time reports**
4. **Check for HTTPS** (required for GA4)

## 🎯 **Expected Results**

If everything is working correctly, you should see:

- **Real-time users**: Your visits in GA dashboard
- **Page views**: Tracking your navigation
- **Custom events**: Portfolio interactions, section views
- **No console errors**: Clean JavaScript execution

---

**✨ Quick Test Command:**
Open your website and paste this in console:

```javascript
if (window.gtag) {
  console.log("✅ Google Analytics is loaded!");
  window.gtag("event", "test_analytics", {
    event_category: "Testing",
    event_label: "Manual Test",
  });
  console.log("📊 Test event sent!");
} else {
  console.log("❌ Google Analytics not loaded");
}
```
