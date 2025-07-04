// components/AnalyticsTestPanel.jsx
"use client";

import { useState } from "react";
import {
  trackPortfolioView,
  trackContactForm,
  trackDownload,
  trackSectionView,
  event,
} from "@/lib/gtag";

const AnalyticsTestPanel = () => {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const addEvent = (eventName) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [...prev, { name: eventName, time: timestamp }]);
  };

  const testEvents = [
    {
      name: "Page View",
      action: () => {
        event({
          action: "page_view",
          category: "Test",
          label: "Manual Test",
        });
        addEvent("Page View");
      },
    },
    {
      name: "Portfolio View",
      action: () => {
        trackPortfolioView("Test Project");
        addEvent("Portfolio View");
      },
    },
    {
      name: "Contact Form",
      action: () => {
        trackContactForm("contact_form_test");
        addEvent("Contact Form");
      },
    },
    {
      name: "Download",
      action: () => {
        trackDownload("test-resume.pdf");
        addEvent("Download");
      },
    },
    {
      name: "Section View",
      action: () => {
        trackSectionView("Test Section");
        addEvent("Section View");
      },
    },
  ];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary/80 transition-colors z-50"
        style={{ fontSize: "12px" }}
      >
        🧪 Test GA
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 max-w-sm z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm">Analytics Test Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-3">
        {testEvents.map((test, index) => (
          <button
            key={index}
            onClick={test.action}
            className="w-full text-left px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {test.name}
          </button>
        ))}
      </div>

      <div className="border-t pt-2">
        <h4 className="text-xs font-medium mb-1">Recent Events:</h4>
        <div className="max-h-20 overflow-y-auto">
          {events.slice(-3).map((event, index) => (
            <div
              key={index}
              className="text-xs text-gray-600 dark:text-gray-400"
            >
              {event.time}: {event.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 pt-2 border-t">
        <button
          onClick={() => {
            console.log("GA Status:");
            console.log("- gtag available:", typeof window.gtag);
            console.log(
              "- dataLayer:",
              window.dataLayer?.length || 0,
              "events"
            );
            console.log(
              "- Measurement ID:",
              process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
            );
          }}
          className="w-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          Check Console
        </button>
      </div>
    </div>
  );
};

export default AnalyticsTestPanel;
