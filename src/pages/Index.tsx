import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Stories by Foot | Epic Ladakh Motorcycle Tour Packages & Himalayan Expeditions 2026"
        description="Conquer the mighty Himalayas with Stories by Foot. Premium Leh Ladakh bike trip packages 2026, Hanle, Umling La, and Zanskar loops with backup support, mechanics, and oxygen. Book your ultimate adventure ride today."
        keywords="stories by foot, ladakh bike trip, leh ladakh bike trip package 2026, ladakh packages, manali to leh bike tour, srinagar to leh bike trip, umling la pass ride, zanskar loop, motorcycle tour price, motorbiking himalayas"
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
    </div>
  );
};

export default Index;
