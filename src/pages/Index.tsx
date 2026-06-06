import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";

const Index = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState("100vh");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "resize-iframe") {
        setIframeHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col pt-16 min-h-screen">
      <SEO
        title="Stories by Foot | Epic Ladakh Motorcycle Tour Packages & Himalayan Expeditions 2026"
        description="Conquer the mighty Himalayas with Stories by Foot. Premium Leh Ladakh bike trip packages 2026, Hanle, Umling La, and Zanskar loops with backup support, mechanics, and oxygen. Book your ultimate adventure ride today."
        keywords="stories by foot, ladakh bike trip, leh ladakh bike trip package 2026, ladakh packages, manali to leh bike tour, srinagar to leh bike trip, umling la pass ride, zanskar loop, motorcycle tour price, motorbiking himalayas"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.storiesbyfoot.com/#organization",
              "name": "Stories by Foot",
              "url": "https://www.storiesbyfoot.com",
              "logo": "https://www.storiesbyfoot.com/favicon.ico",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-6205129118",
                "contactType": "customer service",
                "email": "contact@storiesbyfoot.com"
              },
              "sameAs": [
                "https://www.instagram.com/storiesbyfoot/"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://www.storiesbyfoot.com/#website",
              "url": "https://www.storiesbyfoot.com",
              "name": "Stories by Foot",
              "publisher": {
                "@id": "https://www.storiesbyfoot.com/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.storiesbyfoot.com/destinations?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        }}
      />
      <Navigation />

      <iframe
        ref={iframeRef}
        src="/cliffhanger/index.html"
        style={{ height: iframeHeight }}
        className="w-full border-none block"
        scrolling="no"
        title="Cliffhanger Home"
      />
    </div>
  );
};

export default Index;
