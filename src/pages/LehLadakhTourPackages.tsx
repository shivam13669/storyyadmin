import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1768410318398-fcd1dc09dfc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const highlights = [
  {
    title: "Manali to Leh Highway",
    text: "Cross high passes, river valleys and shifting terrain on one of the most famous road journeys in India.",
  },
  {
    title: "Nubra Valley & Turtuk",
    text: "Sand dunes, double-hump camels and villages close to the Line of Control.",
  },
  {
    title: "Pangong Tso",
    text: "A high-altitude lake whose colours change through the day.",
  },
  {
    title: "Paced for Altitude",
    text: "Acclimatisation days and relaxed rest stops so you are never rushing between passes.",
  },
];

const packages = [
  {
    title: "Leh Ladakh Explorer",
    duration: "7 Days",
    style: "Flexible group",
    text: "Leh, Nubra Valley and Pangong Tso in one well-paced loop with comfortable stays.",
  },
  {
    title: "Ladakh Bike Expedition",
    duration: "9 Days",
    style: "Group ride",
    text: "A guided motorbike route over the Manali–Leh highway with a support vehicle and experienced riders.",
  },
  {
    title: "Srinagar to Manali Bike Trip",
    duration: "12 Days",
    style: "Group ride",
    text: "A long-distance ride across Kashmir, Ladakh and Lahaul with rest days built into the route.",
  },
  {
    title: "Women's Ladakh Journey",
    duration: "7 Days",
    style: "Women-only group",
    text: "Guided sightseeing and short treks in a small group led by a women-friendly travel crew.",
  },
  {
    title: "Offbeat Ladakh Circuit",
    duration: "8 Days",
    style: "Custom route",
    text: "Quieter valleys and lakes such as Tso Moriri, with permits handled for restricted areas.",
  },
  {
    title: "Ladakh Spring Escape",
    duration: "8 Days",
    style: "Small group",
    text: "A spring visit to Leh's villages and monasteries when the valleys are in bloom.",
  },
];

const places = [
  {
    name: "Shanti Stupa",
    text: "A white-domed stupa above Leh with panoramic views of the town and surrounding peaks.",
  },
  {
    name: "Magnetic Hill",
    text: "A stretch of road where vehicles appear to roll uphill, on the Srinagar–Leh highway.",
  },
  {
    name: "Leh Palace",
    text: "A historic palace on Namgyal Hill that overlooks the old town and Leh valley.",
  },
  {
    name: "Pangong Tso",
    text: "A brackish lake stretching into Tibet, famous for its shifting blues and quiet shoreline.",
  },
  {
    name: "Turtuk",
    text: "A Balti village in the Nubra region, known for apricot orchards and its culture.",
  },
  {
    name: "Tso Moriri",
    text: "A calm high-altitude lake in Changthang that feels far removed from the busier routes.",
  },
  {
    name: "Diskit Monastery",
    text: "A hilltop monastery in Nubra with a large Maitreya Buddha statue overlooking the valley.",
  },
  {
    name: "Hall of Fame Museum",
    text: "A museum on the Leh–Kargil road honouring the Indian Army's soldiers and campaigns.",
  },
];

const adventures = [
  "Trekking through high valleys and passes",
  "Quad biking on the Nubra sand dunes",
  "SUV and motorbike expeditions across rough roads",
  "Double-hump camel rides in Hunder",
  "River rafting on the Zanskar and Nimu rivers",
];

const travelTips = [
  "Plan one to three days of rest after arriving in Leh to acclimatise.",
  "Carry the permits required for restricted areas such as Inner Line Permits.",
  "Pack warm layers, sun protection, a power bank and enough cash for remote villages.",
  "Check fuel and road conditions before each day's drive.",
];

const faqs = [
  {
    q: "Are ATMs available in Leh and Ladakh?",
    a: "Leh has a few ATMs, but remote areas often have none. Carry enough cash for villages, homestays and activities.",
  },
  {
    q: "When is the best time to visit Ladakh?",
    a: "Most travellers visit between April and mid-September, when the high passes are open and the skies are clear.",
  },
  {
    q: "Which documents should I carry?",
    a: "Carry a government photo ID, any required permits such as the ILP, your flight tickets, hotel bookings and passport-size photos.",
  },
  {
    q: "How many days do I need?",
    a: "Seven to ten days covers Leh, Nubra Valley and Pangong Tso comfortably. Add more time for Tso Moriri or Zanskar.",
  },
  {
    q: "Should I hire a guide?",
    a: "A local guide is recommended for trekking, rafting and offbeat areas. They add safety and local knowledge.",
  },
];

const LehLadakhTourPackagesPage = () => {
  return (
    <>
      <SEO
        title="Leh Ladakh Tour Packages & Bike Trips | Stories by Foot"
        description="Explore Leh Ladakh tour packages and bike trips covering Pangong Tso, Nubra Valley, Turtuk and the Manali–Leh highway, with flexible group and custom itineraries."
        keywords="leh ladakh tour packages, ladakh bike trip, manali to leh bike trip, nubra valley tour, pangong tso tour, turtuk tour"
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-20 pb-16">
          <section className="px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[520px] flex items-center justify-center text-center">
              <img
                src={HERO_IMAGE}
                alt="Mountain road through the Ladakh highlands"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 px-6 max-w-3xl text-white">
                <p className="uppercase tracking-widest text-sm text-sky-200 mb-3">Ladakh</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Leh Ladakh Tour Packages &amp; Bike Trips
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">
                  Escape the ordinary and discover the high-altitude magic of Ladakh.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Plan Your Trip
                  </Link>
                  <Link
                    to="/destinations"
                    className="bg-white/10 border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20"
                  >
                    Browse Packages
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 mt-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900">About Leh Ladakh Tour Packages</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ladakh rewards slow travel. Our itineraries follow the Manali–Leh highway, Nubra Valley,
                Turtuk and Umling La, with room for sightseeing, bike expeditions and offbeat routes.
                Group departures run from major cities across India, and custom trips can be built around
                your dates.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Popular Ladakh Tour Packages</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <article key={pkg.title} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">{pkg.duration}</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">{pkg.style}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{pkg.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">{pkg.text}</p>
                  <Link
                    to="/contact"
                    className="mt-6 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Enquire Now
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Best Places to Visit in Ladakh</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {places.map((place) => (
                <div key={place.name} className="rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{place.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 mt-20 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Adventure Activities</h2>
              <ul className="mt-6 space-y-3">
                {adventures.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Travel Tips</h2>
              <ul className="mt-6 space-y-3">
                {travelTips.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="container mx-auto px-4 mt-20 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Getting to Ladakh</h2>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li>By air: fly into Leh airport, the main gateway to the region.</li>
                <li>By road: drive the Srinagar–Leh or Manali–Leh highways.</li>
                <li>By train: reach Jammu Tawi and continue by road.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Best Time to Visit</h2>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li>Summer (June–September): all major roads and passes are open.</li>
                <li>Autumn (October–November): clear skies, fewer crowds and golden landscapes.</li>
                <li>Winter (December–March): snow-covered scenery, with limited access and services.</li>
              </ul>
            </div>
          </section>

          <section className="container mx-auto px-4 mt-20 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="container mx-auto px-4 mt-20">
            <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-emerald-600 p-10 text-center text-white">
              <h2 className="text-3xl font-bold">Ready to ride or roam Ladakh?</h2>
              <p className="mt-3 text-white/90">Talk to our travel experts and find the right route for you.</p>
              <Link
                to="/contact"
                className="mt-6 inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default LehLadakhTourPackagesPage;
