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
        title="Leh Ladakh Bike Trip 2026 | Tour Packages & SUV Road Trips | Stories by Foot"
        description="Experience the ultimate Leh Ladakh bike trip in 2026. Premium Ladakh bike tour packages, SUV road trips, Nubra Valley, Pangong Lake, and Umling La expeditions with full backup support. Book with the best Ladakh travel agency."
        keywords="Leh Ladakh Bike Trip, Ladakh Bike Tour Package, Leh Ladakh Tour Package, Ladakh Road Trip, Ladakh Motorcycle Tour, Ladakh Group Tour, Ladakh SUV Tour, Pangong Lake Tour, Nubra Valley Tour, Umling La Bike Expedition, Royal Enfield Ladakh trip, Delhi to Leh Ladakh bike trip, Manali to Leh bike trip, Srinagar to Leh bike trip, stories by foot"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "TravelAgency",
              "@id": "https://www.storiesbyfoot.com/#travelagency",
              "name": "Stories by Foot",
              "url": "https://www.storiesbyfoot.com",
              "logo": "https://www.storiesbyfoot.com/favicon.ico",
              "image": "https://www.storiesbyfoot.com/favicon.ico",
              "telephone": "+91-6205129118",
              "email": "contact@storiesbyfoot.com",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "91, GK Crystal Home, KL Highway",
                "addressLocality": "SAS Nagar",
                "addressRegion": "Punjab",
                "postalCode": "140307",
                "addressCountry": "IN"
              },
              "areaServed": [
                "Ladakh",
                "Zanskar",
                "Tawang",
                "Bhutan",
                "Nepal",
                "Meghalaya"
              ],
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
                "@id": "https://www.storiesbyfoot.com/#travelagency"
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
