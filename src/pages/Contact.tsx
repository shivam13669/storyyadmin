import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Contact Us | Stories by Foot | Ladakh & Himalayan Trips Support"
        description="Get in touch with the Stories by Foot team. Contact us for booking enquiries, customized Ladakh tour itineraries, Spiti, Zanskar loops and direct assistance."
        keywords="stories by foot contact, book ladakh trip, contact stories by foot, support stories by foot, customize ladakh itinerary"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Stories by Foot",
          "description": "Get in touch with the Stories by Foot team for booking enquiries, customized itineraries, Spiti, and Zanskar loop tours.",
          "url": "https://www.storiesbyfoot.com/contact",
          "mainEntity": {
            "@type": "TravelAgency",
            "name": "Stories by Foot",
            "telephone": "+91-6205129118",
            "email": "contact@storiesbyfoot.com"
          }
        }}
      />
      <Navigation />
      <main className="pt-16">
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
