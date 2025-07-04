// components/GoogleAnalytics.jsx
"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, GA_MEASUREMENT_ID } from "@/lib/gtag";

function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  // Initialize Google Analytics
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    // Load Google Analytics script dynamically
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      page_location: window.location.href,
      page_title: document.title,
    });

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        `script[src*="${GA_MEASUREMENT_ID}"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTracker />
    </Suspense>
  );
}
