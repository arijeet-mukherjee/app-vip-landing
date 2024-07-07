"use client";
declare global {
  interface Window {
    Tawk_API: any;
  }
}
import { useEffect } from 'react';

const TawkToWidget: React.FC = () => {
  useEffect(() => {
    // Check if document is defined
    if (typeof document !== 'undefined') {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6647b8489a809f19fb3266fc/1hu42fn6v';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.head.appendChild(s1);

      s1.onload = () => {
        if (window.Tawk_API) {
          window.Tawk_API.onLoad = function(){
            window.Tawk_API.showWidget();
          };
        }
      };

      return () => {
        document.head.removeChild(s1);
      };
    }
  }, []);

  return null;
};

export default TawkToWidget;
