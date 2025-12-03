import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/config/firebase';

/**
 * Component to track page views using Google Analytics (Firebase Analytics)
 * This component should be placed inside the Router to track route changes
 */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
      
      console.log('Page view tracked:', location.pathname);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;
