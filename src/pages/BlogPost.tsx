import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { blogSeo } from "@/lib/blogSeo";
import { LOGO_URL, seasonYear } from "@/lib/seoShared";
import { newBlogPosts } from "@/lib/blogPosts";
import { destinations } from "@/data/destinations";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Linkedin,
  Share2,
  Sparkles,
} from "lucide-react";

const DEFAULT_FAQS = [
  {
    question: "What is the best time to plan a Ladakh or Himalayan bike trip?",
    answer:
      "The main riding window runs from late May to early October when high passes like Khardung La, Baralacha La, and Tanglang La are open and accessible.",
  },
  {
    question: "Do I need permits for Nubra Valley, Pangong Lake, or Hanle?",
    answer:
      "Yes, Indian travelers require an Inner Line Permit (ILP) and foreign nationals need a Protected Area Permit (PAP) for restricted circuits. Stories by Foot handles all permit paperwork for guided groups.",
  },
  {
    question: "Are backup vehicles and mechanics included on Stories by Foot tours?",
    answer:
      "Yes. All our guided Himalayan expeditions include a dedicated backup vehicle for luggage, an experienced Royal Enfield mechanic, oxygen cylinders, and first-aid support.",
  },
];

const RELATED_CLASSIC = [
  {
    slug: "leh-ladakh-bike-trip-guide",
    title: "Leh Ladakh Bike Trip Guide",
    category: "Ladakh Guide",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&h=560&q=80",
  },
  {
    slug: "things-to-carry-in-ladakh-bike-trip",
    title: "Things to carry in Ladakh bike trip",
    category: "Packing List",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&h=560&q=80",
  },
  {
    slug: "petrol-pump-guide-of-ladakh",
    title: "Petrol Pump Guide of Ladakh",
    category: "Fuel Guide",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&h=560&q=80",
  },
  {
    slug: "zanskar-the-hidden-gem",
    title: "Zanskar the Hidden Gem",
    category: "Zanskar",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=560&q=80",
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const [mobileToc, setMobileToc] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // New creator photos array
  const creatorPhotos = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F51e6c70dbccc449386d0318a5732c576?format=webp&width=800&height=1200",
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F7bd2d26944bc4be992f69ff8310f7547?format=webp&width=800&height=1200",
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2Fc2b7edd47ed44d61ac341825985c36ec?format=webp&width=800&height=1200",
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2Ffce0818769c54a63bffa9c4c526b5cd1?format=webp&width=800&height=1200"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Mock content for the blog post based on the requested design
  const basePost = {
    title: slug === "leh-ladakh-bike-trip-guide"
      ? "The Ultimate Guide to Your Leh Ladakh Bike Trip 2026: Routes, Costs, and the New Frontier"
      : slug === "things-to-carry-in-ladakh-bike-trip"
        ? "The Ultimate Ladakh Bike Trip Packing List 2026: Gear Up Like a Pro"
        : slug === "petrol-pump-guide-of-ladakh"
          ? "Fuel Guide Ladakh: Where to Find Petrol Stations in Ladakh for Your Bike Trip"
          : slug === "zanskar-the-hidden-gem"
            ? "Zanskar Unveiled: The Ultimate Guide to the Kingdom of High Passes"
            : slug === "ladakh-the-land-of-high-passes"
              ? "Ladakh: The Land of High Passes – The Ultimate 2026 Biking Guide"
              : slug === "aryan-s-village-of-india-in-ladakh"
                ? "The Lost Tribe of Alexander: A Journey into the Aryan Valley with Stories by Foot"
                : slug === "pregnancy-tourism-in-ladakh"
                  ? "The Myth of \"Pregnancy Tourism\" <br /> in Ladakh: Setting the Record Straight"
                  : slug?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Blog Post",
    img: slug === "things-to-carry-in-ladakh-bike-trip"
      ? "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&h=600&q=80"
      : slug === "petrol-pump-guide-of-ladakh"
        ? "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&h=600&q=80"
        : slug === "zanskar-the-hidden-gem"
          ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&h=600&q=80"
          : slug === "ladakh-the-land-of-high-passes"
            ? "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&h=600&q=80"
            : slug === "aryan-s-village-of-india-in-ladakh"
              ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&h=600&q=80"
              : slug === "pregnancy-tourism-in-ladakh"
                ? "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&h=600&q=80"
                : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&h=600&q=80",
    authors: slug === "things-to-carry-in-ladakh-bike-trip" || slug === "aryan-s-village-of-india-in-ladakh" || slug === "pregnancy-tourism-in-ladakh"
      ? [creatorPhotos[2]]
      : slug === "petrol-pump-guide-of-ladakh"
        ? [creatorPhotos[3]]
        : slug === "zanskar-the-hidden-gem"
          ? [creatorPhotos[0], creatorPhotos[1]]
          : slug === "ladakh-the-land-of-high-passes"
            ? [creatorPhotos[1]]
            : [creatorPhotos[0], creatorPhotos[1]],
    tags: slug === "things-to-carry-in-ladakh-bike-trip"
      ? ["Adventure", "Ladakh", "Packing List"]
      : slug === "petrol-pump-guide-of-ladakh"
        ? ["Adventure", "Ladakh", "Fuel Guide"]
        : slug === "zanskar-the-hidden-gem"
          ? ["Adventure", "Ladakh", "Zanskar"]
          : slug === "ladakh-the-land-of-high-passes"
            ? ["Adventure", "Ladakh", "Biking Guide"]
            : slug === "aryan-s-village-of-india-in-ladakh"
              ? ["Adventure", "Culture", "Ladakh"]
              : slug === "pregnancy-tourism-in-ladakh"
                ? ["Culture", "Myths", "Ladakh"]
                : ["Adventure", "Ladakh", "Bike Trip"],
    content: slug === "things-to-carry-in-ladakh-bike-trip"
      ? `
      <p>Planning a <strong>Leh Ladakh bike trip package 2026</strong> is an exhilarating feeling, but the difference between a legendary adventure and a difficult ordeal lies in your luggage. When you're riding through the Zanskar Loop or climbing the 19,024ft to <strong>Umling La Pass</strong>, you can't just "pop into a shop" for a forgotten spark plug or a thermal liner.</p>

      <p>At <strong>Stories by Foot</strong> (www.storiesbyfoot.com), we've led thousands of riders across the Himalayas. We've used that experience to curate the definitive Ladakh motorcycle tour essentials list. Whether you are embarking on a <strong>Leh Ladakh bike expedition from Manali</strong> or a shorter 6-day circuit, here is what you need to carry.</p>

      <h3>1. The Rider's Armor: Safety Gear is Non-Negotiable</h3>
      <p>In Ladakh, you "dress for the slide, not the ride." The terrain on the Srinagar to Leh and Manali to Leh highways is unpredictable, featuring everything from loose gravel to deep water crossings.</p>
      <ul>
        <li><strong>Full-Face Helmet:</strong> Must be ISI, DOT, or ECE certified. A modular helmet is great for photography, but a fixed full-face offers better wind protection.</li>
        <li><strong>Riding Jacket & Pants:</strong> Look for all-season textile gear with CE Level 2 armor. Ensure they have a detachable waterproof liner and a thermal layer.</li>
        <li><strong>The Two-Pair Glove Rule:</strong> 1. Pair 1: Light, ventilated gloves for the sunny stretches in the Leh valley. 2. Pair 2: Heavy-duty, waterproof, and windproof winter gloves for crossing <strong>Khardung La</strong> and <strong>Baralacha La</strong>.</li>
        <li><strong>Waterproof Adventure Boots:</strong> Sturdy, ankle-high boots are a must. If using trekking boots, pair them with waterproof gaiters to keep your feet dry during the "Pagla Nala" water crossings.</li>
      </ul>

      <h3>2. Master the Art of Layering: The 3-Layer System</h3>
      <p>Temperatures in 2026 can swing from 25°C in the afternoon sun to -5°C at the top of <strong>Tanglang La</strong>. Don't pack one heavy jacket; pack layers.</p>
      <ul>
        <li><strong>Base Layer:</strong> Moisture-wicking thermal inners (top and bottom) to keep sweat away from your skin.</li>
        <li><strong>Mid Layer:</strong> A fleece hoodie or a lightweight puffer jacket to trap body heat.</li>
        <li><strong>Shell Layer:</strong> Your riding jacket plus a compact raincoat/poncho to block the biting Himalayan wind.</li>
        <li><strong>Balaclava & Buff:</strong> Essential to protect your neck and face from "sun-scald" and dust.</li>
      </ul>

      <h3>3. Bike Spares & Mechanical Toolkit</h3>
      <p>Even if you are on a premium Ladakh motorcycle tour package, carrying a basic "Survival Kit" for your machine is wise.</p>
      <ul>
        <li><strong>Puncture Repair Kit:</strong> Ensure it includes a portable electric inflator or a foot pump (hand pumps are exhausting at high altitudes).</li>
        <li><strong>The "Snap" Spares:</strong> Extra clutch, brake, and accelerator cables. These are the most common points of failure on rocky roads.</li>
        <li><strong>Fluid Backup:</strong> 500ml of engine oil, chain lubricant, and a small bottle of brake fluid.</li>
        <li><strong>The 5L Jerry Can:</strong> Essential for the 365km "Fuel Dead Zone" between Tandi and Karu.</li>
        <li><strong>Veteran Tip:</strong> Carry a 1-meter siphon pipe (clear hose) and a spare key zip-tied to the bike's chassis (never keep it in your pocket!).</li>
      </ul>

      <h3>4. The "Himalayan Pharmacy": Medical Essentials</h3>
      <p>Altitude is the biggest challenge on any Leh Ladakh bike expedition.</p>
      <ul>
        <li><strong>AMS Medication:</strong> Diamox (Acetazolamide) is commonly used to prevent altitude sickness, but <em>only</em> after consulting your doctor.</li>
        <li><strong>Hydration Heroes:</strong> ORS sachets, Glucose powder, and a reusable water bottle.</li>
        <li><strong>Pain Relief:</strong> Paracetamol or Ibuprofen for those inevitable altitude headaches.</li>
        <li><strong>Skin Protection:</strong> SPF 50+ Sunscreen, lip balm with SPF, and mustard oil (veterans use this to prevent dry, bleeding nostrils in the arid cold).</li>
      </ul>

      <h3>5. Electronics and Connectivity for 2026</h3>
      <p>While digital connectivity is improving, parts of the <strong>Hanle</strong> and <strong>Nyoma</strong> sectors remain off-grid.</p>
      <ul>
        <li><strong>Postpaid SIM:</strong> Only Postpaid BSNL, Airtel, or Jio connections work in Ladakh.</li>
        <li><strong>Power Bank:</strong> At least 20,000 mAh. Cold weather drains batteries 30% faster.</li>
        <li><strong>Action Camera (GoPro):</strong> With extra batteries and memory cards.</li>
        <li><strong>Navigation:</strong> Download Offline Google Maps or carry a physical map for the remote stretches near <strong>Tso Moriri</strong>.</li>
      </ul>

      <h3>6. Document Checklist</h3>
      <p>Keep these in a waterproof Ziploc bag in your tank bag:</p>
      <ul>
        <li>Original Driving License and 5 photocopies.</li>
        <li>Vehicle RC, Insurance, and PUC (Pollution Under Control) certificate.</li>
        <li><strong>Inner Line Permits (ILP):</strong> Required for Nubra, Pangong, and Umling La.</li>
        <li>4-6 Passport-sized photographs for check-posts.</li>
      </ul>

      <h3>Ready to Ride with Stories by Foot?</h3>
      <p>At <strong>Stories by Foot</strong>, we handle the heavy lifting. Our <strong>Leh Ladakh bike trip packages 2026</strong> include a backup vehicle, a professional mechanic, and medical-grade oxygen so you can focus on the ride.</p>
      <p>Check out our 2026 Departure Dates at www.storiesbyfoot.com and let's conquer the mountains together!</p>
      `
      : slug === "petrol-pump-guide-of-ladakh"
        ? `
        <p>Embarking on a <strong>Leh Ladakh bike trip package 2026</strong> is the ultimate dream, but in the <strong>Land of High Passes</strong>, your fuel gauge is as important as your GPS. As routes expand to the world's highest motorable road at <strong>Umling La</strong>, the strategy for managing your petrol has changed. In the high-altitude desert, running out of fuel isn't just an inconvenience—it's a safety risk.</p>

        <p>At <strong>Stories by Foot</strong> (www.storiesbyfoot.com), we've mapped every operational pump and hidden fuel point to ensure your <strong>Ladakh motorcycle tour price</strong> includes the peace of mind that you'll never be stranded. Here is the definitive guide to fueling your 2026 Himalayan expedition.</p>

        <p>Finding petrol in the high-altitude wilderness of Ladakh is as much about strategy as it is about geography. For your 2026 expedition, you must plan your fuel stops with precision, especially when heading into the remote eastern sectors.</p>

        <p>Here is the breakdown of fuel availability across your route:</p>

        <h3>The Reliable Hubs</h3>
        <ul>
          <li><strong>Leh (Multiple Stations):</strong> Your primary base. Always leave Leh with a 100% full tank and your jerry cans topped up.</li>
          <li><strong>Karu (Indian Oil Station):</strong> Located about 35km from Leh, this is the last major, reliable station before you branch off toward the Manali highway or the Pangong/Tso Moriri circuits.</li>
          <li><strong>Nubra Valley (Diskit):</strong> You will find an operational petrol station at the T-point of the Nubra and Siachen road. This is the only official fuel point in the valley; do not expect fuel in Turtuk or Panamik.</li>
          <li><strong>Chumathang (1 Petrol Station):</strong> There is a functional petrol station here, making it a vital stop if you are taking the direct route from Leh to Tso Moriri or returning from the Changthang region.</li>
        </ul>

        <h3>The Dead Zone: Pangong to Umling La</h3>
        <p>This is the most critical stretch of the journey where fuel management is a survival skill.</p>
        <ul>
          <li><strong>Tangtse (Near Pangong):</strong> This station is located 40km before you reach Pangong Lake. Fill every spare bottle here if you plan to go further east.</li>
          <li><strong>The 450km Gap:</strong> From Tangtse onward toward Hanle & UmliingLa, you are entering a massive "dead zone." There are no official petrol pumps on the Hanle road for approximately 440km.</li>
          <li><strong>Hanle to Umling La:</strong> There is zero official fuel between Hanle and the summit of <strong>Umling La</strong> (19,024ft). The steep climb will consume fuel significantly faster than usual.</li>
          <li><strong>Nyoma (Unreliable Station):</strong> While there is a small petrol station in Nyoma, it is frequently non-functional or out of stock. Do not rely on it as your primary plan.</li>
        </ul>

        <h3>Black Fuel & Emergency Backups</h3>
        <p>When official pumps fail, the local "black market" is your only choice, though it comes with caveats:</p>
        <ul>
          <li><strong>Availability:</strong> You can often find petrol sold in "black" (in 2-liter bottles or jugs) at high costs in Hanle, Nyoma, and occasionally at small dhabas near Pangong.</li>
          <li><strong>The Cost:</strong> Expect to pay a significant premium—often 50% to 100% above the Leh market rate.</li>
          <li><strong>The Risk:</strong> Quality is never guaranteed. This fuel can sometimes be adulterated or contain debris. If you must use it, always filter it through a fine cloth while pouring it into your tank to protect your fuel injector.</li>
        </ul>

        <h3>Stories by Foot Safety Protocol</h3>
        <p>Because of these dead zones, our <strong>Leh Ladakh bike trip packages 2026</strong> always include a backup vehicle carrying a large reserve of high-quality fuel. This ensures you can conquer <strong>Umling La</strong> without the stress of "fuel anxiety" or the risk of using sub-par black-market petrol.</p>
        `
        : slug === "zanskar-the-hidden-gem"
          ? `
          <p>Zanskar is not just a destination; it is a feeling of raw, untouched isolation. Nestled deep within the Kargil district of Ladakh, this sub-region is arguably the most remote and culturally preserved corner of the Indian Himalayas. For years, Zanskar was a "forbidden" valley, cut off from the world for six months of the year, accessible only by a grueling trek over the frozen Zanskar River (the famous <strong>Chadar Trek</strong>).</p>

          <p>But in 2026, the landscape of travel has changed. New roads have carved through ancient mountains, making this majestic land accessible to the modern adventurer. Here is everything you need to know about where Zanskar is, how to get there, and what awaits you in this high-altitude sanctuary.</p>

          <h3>Where is Zanskar?</h3>
          <p>Geographically, Zanskar is a semi-arid, high-altitude desert located in the eastern section of the Ladakh Union Territory. It is separated from the rest of Ladakh by the towering <strong>Zanskar Mountain Range</strong> and from the Lahaul Valley by the <strong>Great Himalayan Range</strong>. The heart of the valley is <strong>Padum</strong>, which serves as the administrative center and the base for all exploration in the region.</p>

          <h3>How to Reach Zanskar: The 2026 Connectivity Revolution</h3>
          <p>Until recently, there was only one way into Zanskar by road. Today, there are three distinct axes connecting it to the outside world:</p>
          <ul>
            <li><strong>The Classic Route (via Kargil):</strong> The most established path. You travel from Srinagar or Leh to <strong>Kargil</strong>, and then head south toward Padum (approx. 240 km). This route takes you through the stunning <strong>Suru Valley</strong>.</li>
            <li><strong>The New Frontier (The Shinku La Axis):</strong> This is the <strong>Chandigarh-Manali-Darcha-Padum</strong> route. This axis has revolutionized Zanskar travel. By crossing the <strong>Shinku La Pass (16,580 ft)</strong>, you can now enter Zanskar directly from Himachal Pradesh without going to Leh or Kargil first.</li>
            <li><strong>The Zanskar River Route (The Nimmu-Padum Road):</strong> A project decades in the making, the road from Leh (Nimmu) to Padum along the Zanskar River is now largely operational. This provides the shortest and fastest link between the Ladakhi capital and Zanskar, bypassing the high passes that traditionally blocked winter access.</li>
          </ul>

          <h3>Iconic Mountain Passes on the Way</h3>
          <p>Crossing these "La" (passes) is the hallmark of any Zanskar expedition. Each offers a different perspective of the Himalayan scale:</p>
          <ul>
            <li><strong>Shinku La (16,580 ft):</strong> The gateway from Lahaul (Himachal) into Zanskar. It is known for its steep ascent and the legendary "snow walls" early in the season.</li>
            <li><strong>Pensi La (14,400 ft):</strong> Known as the "Gateway to Zanskar" from the Kargil side. It offers the most famous view in the region: the massive <strong>Drang-Drung Glacier</strong>.</li>
            <li><strong>Singe La (16,591 ft) & Sirsir La (15,700 ft):</strong> Located on the offbeat route between Lamayuru and Padum, these passes are for the true adventure seekers, crossing through extremely remote and rugged terrain.</li>
          </ul>

          <h3>Must-Visit Monasteries (Gompas) of Zanskar</h3>
          <p>Zanskar is deeply Buddhist, and its monasteries are some of the most dramatic and ancient in the world:</p>
          <ul>
            <li><strong>Phugtal Monastery:</strong> Built around a natural cave, this monastery looks like a honeycomb clinging to a sheer cliffside. It is one of the world's last truly remote monasteries, accessible only by a 2-3 hour trek from <strong>Purne</strong>.</li>
            <li><strong>Karsha Monastery:</strong> The largest and most important monastery in Zanskar. It overlooks the Padum valley and houses incredible 500-year-old frescoes and a massive collection of religious artifacts.</li>
            <li><strong>Stongdey Monastery:</strong> Perched on a hilltop, it offers the best panoramic views of the entire Zanskar valley floor.</li>
            <li><strong>Sani & Zongkhul Monasteries:</strong> Sani is one of the oldest in the region, while Zongkhul is a cave monastery associated with the great Indian yogi <strong>Naropa</strong>, whose footprints are said to be etched in the rocks.</li>
          </ul>

          <h3>Top Sights You Can't Miss</h3>
          <ul>
            <li><strong>Gonbo Rangjon:</strong> A holy, stand-alone mountain located near the village of <strong>Kargyak</strong>. It is an incredible sight for bikers and campers, standing as a solitary monolith against the sky.</li>
            <li><strong>Drang-Drung Glacier:</strong> Resembling a giant river of ice, this is the largest glacier accessible by road in Ladakh (excluding Siachen).</li>
            <li><strong>Suru Valley:</strong> The approach from Kargil, home to the massive twin peaks of <strong>Nun (7,135m)</strong> and <strong>Kun (7,077m)</strong>.</li>
            <li><strong>Zangla Palace:</strong> The former seat of the Zanskari kings, where the royal family still resides today in a ceremonial capacity.</li>
          </ul>

          <h3>Vital Tips for 2026</h3>
          <ul>
            <li><strong>Fuel & ATM:</strong> Padum has the region's only official petrol pump and ATM. However, both are prone to running out of stock or cash. <strong>Stories by Foot</strong> recommends carrying a minimum of 10-15 liters of spare fuel and ample cash for your Zanskar loop.</li>
            <li><strong>Connectivity:</strong> Mobile network (Postpaid BSNL/Airtel/Jio) is available in Padum, but expect complete "dead zones" once you leave the town for places like Purne or Lingshed.</li>
            <li><strong>Acclimatization:</strong> Do not rush Shinku La. At over 16,500 ft, altitude sickness is a real threat. Spend at least one night in <strong>Jispa</strong> or <strong>Darcha</strong> before making the climb.</li>
          </ul>

          <p>Zanskar is changing, but its spirit remains ancient and wild. Whether you're riding through the dust of the Shinku La or trekking to the silence of Phugtal, this is the ultimate frontier for 2026.</p>
          `
          : slug === "ladakh-the-land-of-high-passes"
            ? `
            <p>Ladakh is more than a destination; it is a spiritual homecoming for the adventurous soul. Known as the "Land of High Passes," this high-altitude desert in the northernmost tip of India offers a landscape so surreal it feels like another planet. At <strong>Stories by Foot</strong> (www.storiesbyfoot.com), we specialize in turning this rugged terrain into a canvas for your most epic travel stories.</p>

            <p>Whether you are looking for a <strong>Leh Ladakh bike trip package 2026</strong> or planning a solo <strong>Leh Ladakh bike expedition from Manali</strong>, understanding the geography, culture, and logistics of this region is the first step toward a successful journey.</p>

            <h3>Where is Ladakh?</h3>
            <p>Ladakh is a Union Territory located between the Kunlun mountain range in the north and the Great Himalayas to the south. It is divided into two districts: <strong>Leh</strong> (the Buddhist heartland) and <strong>Kargil</strong> (the gateway to Kashmir and Zanskar). The region is defined by its stark, treeless mountains, deep turquoise lakes, and ancient Tibetan Buddhist culture.</p>

            <h3>How to Reach Ladakh: The Three Great Axes</h3>
            <p>In 2026, Ladakh is more connected than ever, yet it remains wonderfully isolated. There are three primary ways to enter the region:</p>
            <ul>
              <li><strong>The Manali-Leh Highway:</strong> The most popular route for bikers. It takes you through five high passes, including the mighty <strong>Baralacha La</strong> and <strong>Tanglang La</strong>. This route is famous for its dramatic transitions from the green valleys of Lahaul to the red-rock canyons of Ladakh.</li>
              <li><strong>The Srinagar-Leh Highway:</strong> Often called the "Acclimatization Route." It offers a gentler climb, passing through the lush meadows of Sonamarg, the historic town of <strong>Kargil</strong>, and the unique moon-like landscapes of Lamayuru.</li>
              <li><strong>The Zanskar Axis (New for 2026):</strong> As mentioned in our previous guide, the route from Darcha over <strong>Shinku La</strong> directly into Padum and then to Leh is the newest way to experience the most remote corners of the region.</li>
            </ul>

            <h3>The "Big Three" High Passes</h3>
            <p>No bike trip is complete without conquering these legendary milestones:</p>
            <ul>
              <li><strong>Umling La Pass (19,024 ft):</strong> Currently the world's highest motorable road. Reaching this summit is the ultimate bragging right for any rider in 2026.</li>
              <li><strong>Khardung La (17,582 ft):</strong> The historic gateway to the <strong>Nubra and Shyok Valleys</strong>. It remains one of the most photographed passes in the world.</li>
              <li><strong>Tanglang La (17,480 ft):</strong> The second-highest pass on the Manali-Leh road, known for its sheer scale and the breathtaking views of the Changthang plateau.</li>
            </ul>

            <h3>Iconic Places to Visit</h3>
            <ul>
              <li><strong>Nubra Valley:</strong> Home to the Hunder sand dunes and the famous double-humped Bactrian camels. It's a desert within the mountains.</li>
              <li><strong>Pangong Tso:</strong> A 134-km long lake that changes color from light blue to deep azure throughout the day. It sits right on the Indo-China border.</li>
              <li><strong>Tso Moriri & Puga Valley:</strong> A quieter, more pristine alternative to Pangong. Puga Valley is famous for its geothermal hot springs and borax deposits.</li>
              <li><strong>Hanle:</strong> The village of the stars. It houses the Indian Astronomical Observatory and is a crucial pitstop for those heading to <strong>Umling La</strong>.</li>
              <li><strong>Turtuk:</strong> A picturesque village on the edge of the LoC, offering a unique glimpse into Balti culture and lush apricot orchards.</li>
            </ul>

            <h3>Monasteries: The Spiritual Sentinels</h3>
            <p>The skyline of Ladakh is dotted with ancient "Gompas" (monasteries). Some of the most significant include:</p>
            <ul>
              <li><strong>Thiksey Monastery:</strong> Often called the "Mini Potala" due to its resemblance to the palace in Lhasa.</li>
              <li><strong>Hemis Monastery:</strong> The largest and wealthiest monastery in Ladakh, famous for its annual masked dance festival.</li>
              <li><strong>Diskit Monastery:</strong> Home to the giant 106-foot Maitreya Buddha statue that overlooks the Nubra Valley.</li>
            </ul>

            <h3>Essential Logistics: Fuel and Safety</h3>
            <p>At <strong>Stories by Foot</strong>, we prioritize your safety above all else. Ladakh is beautiful, but it is also unforgiving.</p>
            <ul>
              <li><strong>The 48-Hour Rule:</strong> If you fly into Leh, 2026 regulations mandate a <strong>48-hour mandatory acclimatization period</strong> before you can apply for Inner Line Permits (ILP). We use this time for bike trials and local sightseeing.</li>
              <li><strong>Fuel Strategy:</strong> Remember the "Dead Zones." There is <strong>no fuel on the Hanle road for 350 km</strong>. Always fill up at the many petrol stations in Leh or the one in Karu.</li>
              <li><strong>Connectivity:</strong> Only Postpaid SIMs (BSNL, Airtel, Jio) work in Ladakh. While Leh has 5G, expect zero signal once you cross the high passes into the valleys.</li>
            </ul>

            <h3>The Stories by Foot Difference</h3>
            <p>Our <strong>Leh Ladakh bike trip package 2026</strong> is designed for the modern rider. We provide:</p>
            <ul>
              <li><strong>Backup Vehicles:</strong> Carrying your luggage, spare fuel, and a professional mechanic.</li>
              <li><strong>Medical Support:</strong> Every group is equipped with medical-grade oxygen cylinders to tackle altitude sickness.</li>
              <li><strong>Local Expertise:</strong> From handling your <strong>Inner Line Permits</strong> to finding the best "Thukpa" in a remote village, we take care of the details so you can focus on the ride.</li>
            </ul>
            `
            : slug === "aryan-s-village-of-india-in-ladakh"
              ? `
      <p>When people think of Ladakh, they usually picture the high-altitude deserts of Leh, the turquoise waters of Pangong Tso, or the vast silence of the Zanskar range. But there is a hidden pocket of this cold desert that defies every Ladakhi stereotype. It is a place where the landscape turns lush and green, the air thick with the scent of apricots, and the people look like they've stepped out of a Mediterranean epic.</p>

      <p>Welcome to the <strong>Aryan Valley</strong>, the land of the <strong>Brokpa</strong> community. At <strong>Stories by Foot</strong>, we believe that travel is about more than just miles it's about the stories we bring back. And there is no story more captivating than that of the "Last Pure Aryans" of India.</p>

      <h3>Where is the Aryan Valley?</h3>
      <p>Tucked away in the Batalik sector, about 160 km northwest of Leh, lies the Dhahanu Valley. While Ladakh is primarily inhabited by people of Tibeto-Mongoloid descent, the villages here—<strong>Dah, Hanu, Beama, Garkon, and Darchik</strong>—are home to a racially and culturally distinct tribe.</p>

      <p>Because this region sits at a lower altitude (around 9,000-10,000 ft) compared to the rest of Ladakh, it is significantly warmer. This unique micro-climate allows for the cultivation of lush orchards of <strong>grapes, cherries, walnuts, and apricots</strong>.</p>

      <h3>The Legend: Soldiers of Alexander the Great</h3>
      <p>The most enduring mystery of the Aryan Valley is the origin of its people. The Brokpas (or Drokpas) have sharp features, fair skin, and light-colored eyes. Local legend—and many anthropologists—suggests they are the direct descendants of the Greek soldiers from <strong>Alexander the Great's</strong> army who stayed back after his Indian campaign over 2,000 years ago.</p>

      <p>For centuries, the community practiced strict endogamy (marrying only within the tribe) to preserve their "purity." Walking through these villages today feels like a glitch in the matrix—you are in the heart of the Himalayas, yet surrounded by faces that seem to belong to the shores of the Adriatic.</p>

      <h3>The Flower People of Ladakh</h3>
      <p>If you visit the Aryan Valley with us, the first thing you'll notice is the incredible attire, especially of the women. They are known as the <strong>"Flower Women of Ladakh."</strong></p>

      <p>They wear an elaborate headgear called a <strong>Monthu</strong>, decorated with bright orange Montenga flowers (marigolds), medicinal herbs, and antique silver coins. This isn't just for tourists; it's a daily practice rooted in their animist beliefs. They believe these flowers ward off evil spirits and honor their local deities.</p>

      <p>Unlike the rest of Ladakh which follows Tibetan Buddhism, the Brokpas follow a unique blend of Buddhism and <strong>Bonchos</strong> (an ancient animist religion). They have a deep reverence for the Ibex and sacred fire, and their festivals are a riot of music, traditional wine (Chhang), and communal dancing.</p>

      <h3>What to Visit in the Aryan Valley</h3>
      <ul>
        <li><strong>Dah and Beama:</strong> These are the most accessible villages for travelers. A walk through the narrow lanes of Dah reveals ancient stone houses and a way of life that hasn't changed in centuries.</li>
        <li><strong>The Apricot Orchards:</strong> In late summer, the valley turns orange. The apricots here are some of the sweetest in the world. At <strong>Stories by Foot</strong>, we always stop for a local tasting session.</li>
        <li><strong>The Indus River:</strong> The road to the Aryan Valley follows the mighty Indus as it makes its way toward the border. The views of the river cutting through deep gorges are spectacular.</li>
        <li><strong>Batalik Sector:</strong> For history buffs, the nearby Batalik sector offers a chance to see the rugged peaks that played a crucial role in the 1999 Kargil War.</li>
      </ul>

      <h3>Vital Tips for Your Visit</h3>
      <ul>
        <li><strong>Permits:</strong> No special permits are required to visit the Aryan Valley villages, making it one of the most accessible off-beat destinations in Ladakh.</li>
        <li><strong>Best Season:</strong> June to September. The valley is cut off in winter due to heavy snowfall.</li>
        <li><strong>Local Homestays:</strong> Staying with a Brokpa family is the best way to experience their hospitality and learn their traditions firsthand.</li>
        <li><strong>Photography:</strong> Always ask permission before photographing locals, especially the Flower Women. Respect their space and their stories.</li>
      </ul>

      <h3>Ready to Discover Hidden Ladakh?</h3>
      <p>At <strong>Stories by Foot</strong>, we don't just take you on a bike trip; we immerse you in the living heritage of the Himalayas. The Aryan Valley is one of our most cherished circuits, and it's a place where you'll meet people whose ancestors walked alongside the armies of ancient empires.</p>

      <p>Check out our <strong>Ladakh Travel Packages</strong> at www.storiesbyfoot.com and let's explore the hidden corners of this magical land together.</p>
    `
              : slug === "pregnancy-tourism-in-ladakh"
                ? `
      <p>As you travel through the Aryan Valley with <strong>Stories by Foot</strong>, you'll hear many legends. Some are beautiful like the "Flower Women" who believe blossoms ward off spirits. Some are epic like the claim that the Brokpa people are direct descendants of Alexander the Great's lost army. However, there is one story that often surfaces in dark corners of the internet and sensationalist tabloids: the phenomenon of "Pregnancy Tourism."</p>

      <p>At <strong>Stories by Foot</strong>, our mission is to provide an authentic, grounded, and respectful experience of the Himalayas. That's why I want to address this topic directly and clear the air.</p>

      <h3>What is the "Pregnancy Tourism" Story?</h3>

      <p>The rumor suggests that women from Europe—specifically Germany and Scandinavia—travel to the remote villages of <strong>Dah, Hanu, Darchik, and Garkon</strong> with a very specific, singular goal: to conceive children with Brokpa men. A supposed obsession with inheriting "pure Aryan" genetics, fueled by the Brokpas' distinct Indo-European features like light eyes and fair skin.</p>

      <p><strong>Fact vs. Fiction: The Reality on the Ground</strong></p>

      <p>While this makes for a cinematic (and controversial) heading, the reality is far more nuanced and, frankly, far less sensational.</p>

      <h3>Isolated Incidents vs. Organized Trend</h3>

      <ul>
        <li><strong>Isolated Incidents vs. Organized Trend:</strong> While there have been documented instances most notably featured in the 2006 documentary <em>The Aryan Saga</em> of a few foreign women visiting for this purpose, it is <strong>not a thriving or organized industry</strong>. Anthropologists and local community leaders have long maintained that these are isolated cases rather than a widespread "tourism trend."</li>

        <li><strong>The Myth of Genetic Purity:</strong> Scientifically, the claim of a "pure Aryan bloodline" is a myth. While the Brokpa are genetically and culturally distinct from their Tibeto-Mongoloid neighbors, modern genetic studies suggest a complex, mixed Indo-Tibetan and Dardic ancestry rather than a "pure" line from ancient Greece.</li>

        <li><strong>A Burden on the Community:</strong> For the Brokpa people, these rumors have often been a source of discomfort. Many villagers feel that this narrative reduces their rich, thousand-year-old culture to a mere "genetic exhibit." It fetishizes their appearance while ignoring their agrarian mastery, and their complex animist beliefs.</li>
      </ul>

      <h3>Why This Narrative Persists</h3>

      <p>The story of "Pregnancy Tourism" survives because it hits on powerful human fascinations: mystery, ancient bloodlines, and the exoticization of the Himalayas. In an era of viral content, a few rare occurrences from decades ago have been amplified into a "living rumor" that refuses to die.</p>

      <h3>Travel with Respect and Candor</h3>

      <p>When we visit the Aryan Valley, we encourage our riders to look past the sensationalism. The true beauty of the Brokpa community isn't found in a tabloid headline. It's found in:</p>

      <ul>
        <li>The <strong>lush apricot orchards</strong> they've cultivated in a desert.</li>
        <li>The <strong>Bononah festival</strong>, where they sing to the mountain spirits.</li>
        <li>The <strong>communal resilience</strong> of a people who have lived at the edge of the world for centuries.</li>
      </ul>

      <p>At <strong>Stories by Foot</strong>, we travel to connect, not to exploit. We believe in being supportive peers to the communities we visit, correcting misinformation while celebrating the authentic human stories that make Ladakh so special.</p>

      <p><strong>Let's move beyond the myths and experience the real Aryan Valley.</strong></p>
    `
              : `
      <p>Are you ready to trade the humdrum of the city for the roar of an engine against the backdrop of the world's highest peaks? A <strong>Leh Ladakh bike trip package 2026</strong> is more than just a tour; it's a rite of passage for every adventure rider. At <strong>Stories by Foot</strong> (www.storiesbyfoot.com), we don't just offer trips; we offer the chance to write your own Himalayan saga.</p>

      <p>As we head into the 2026 riding season, the landscape of Ladakh travel is changing. With the recent opening of the <strong>Shinku La Tunnel</strong> and the growing fame of <strong>Umling La</strong>, the "classic" routes are evolving into something even more epic. Whether you are looking for a <strong>Leh Ladakh bike expedition from Delhi</strong> or a specialized <strong>Ladakh motorcycle tour price</strong> that fits your budget, this guide is your roadmap to the heavens.</p>

      <h3>Why 2026 is the Year of the Himalayan Rider</h3>
      <p>The 2026 season is special. Infrastructure developments by the BRO (Border Roads Organization) have made once-impossible routes accessible to those with the right grit.</p>
      <ul>
        <li><strong>The Zanskar Revolution:</strong> The Shinku La Tunnel now provides a more reliable gateway into the Zanskar Valley, cutting down hours of treacherous climbing and opening up an all-weather axis.</li>
        <li><strong>The 19,024ft Club:</strong> Umling La Pass, now officially the world's highest motorable road, has become the "Holy Grail" of our 2026 itineraries.</li>
        <li><strong>Stories by Foot Expertise:</strong> We've mapped these new roads to ensure our riders are the first to witness the untouched beauty of the <strong>Hanle</strong> and <strong>Nyoma</strong> sectors.</li>
      </ul>

      <h3>1. Our Signature Expeditions: The Full Circle</h3>
      <p>At Stories by Foot, we believe in the "Slow Travel" philosophy—even on two wheels. We offer a variety of entry points and circuits to match your experience level and time constraints.</p>

      <h4>Trans Himalayan Ride: Chandigarh to Chandigarh</h4>
      <p>This is the "Big One." For those who want the full transition from the plains to the high-altitude deserts.</p>
      <ul>
        <li><strong>The Route:</strong> Chandigarh – Jammu – Srinagar – Kargil – Lamayuru – Leh – Nubra – Turtuk – Pangong – Hanle – Migla Pass – <strong>Umling La Pass</strong> – Chumathang – Nyoma – Leh – Sarchu/Jispa – Manali – Chandigarh.</li>
        <li><strong>Why it's unique:</strong> You experience both the <strong>Srinagar to Leh</strong> and <strong>Manali to Leh</strong> highways in a single, massive loop. You get the green meadows of Kashmir and the red-rock canyons of the Manali axis.</li>
      </ul>

      <h4>The Classic Thriller: Manali to Leh Bike Tour</h4>
      <p>Starting from the pine forests of Manali, this route takes you through the <strong>Atal Tunnel</strong>, across the Gata Loops, and over the mighty <strong>Tanglang La Pass</strong>. It is the quintessential <strong>Leh Ladakh bike expedition from Manali</strong> that every biker dreams of.</p>

      <h4>The Gradual Climb: Srinagar to Leh</h4>
      <p>Ideal for those worried about AMS (Acute Mountain Sickness). Starting from Srinagar allows your body to adjust to the altitude slowly as you pass through the historic town of Kargil and the "Moonland" of Lamayuru.</p>

      <h3>2. Choosing Your Circuit: 6, 7, or 8 Days?</h3>
      <p>Not everyone has two weeks to spare. We've optimized our shorter <strong>Leh Ladakh bike trip packages 2026</strong> to ensure you don't miss a single "Big" moment.</p>

      <h4>The 6-Day "KhardungLa ChangLa Loop"</h4>
      <p>Designed for the time-crunched rider. We fly you into Leh, spend 48 hours on mandatory acclimatization (the "Golden Rule" of 2026 safety), and then hit the road.</p>
      <ul>
        <li><strong>Focus:</strong> Leh, Khardung La, Nubra Valley, and Pangong Tso.</li>
      </ul>

      <h4>The 7-Day "India's Last Turn" Circuit</h4>
      <p>This adds a crucial day to visit <strong>Turtuk</strong>, the last village of India before the Baltistan border. Walking through the apricot orchards of Turtuk offers a cultural depth that a standard bike trip often misses.</p>

      <h4>The 8-Day "Migla Throne Ride and Ultimate UmlingLa" Tour</h4>
      <p>This is for the riders who want to conquer the "new" Ladakh. This tour is specifically designed to include:</p>
      <ul>
        <li><strong>Migla Pass & Umling La:</strong> Reaching the world's highest point on a motorcycle.</li>
        <li><strong>Hanle:</strong> The dark-sky sanctuary of India.</li>
        <li><strong>Tso Moriri & Puga Valley:</strong> Witnessing the geothermal hot springs and the turquoise majesty of Tso Moriri.</li>
      </ul>

      <h3>3. Understanding the Ladakh Motorcycle Tour Price</h3>
      <p>When you search for <strong>Ladakh motorcycle tour price</strong>, you'll see a wide range. At Stories by Foot, we pride ourselves on transparency. In 2026, a "cheap" tour often means old bikes and no oxygen. We don't play that game.</p>

      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th>Expense Category</th>
            <th>What We Provide</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>The Bike</strong></td>
            <td>Himalayan 450 / Scram 411</td>
            <td>Liquid-cooled engines don't stall at 18,000ft.</td>
          </tr>
          <tr>
            <td><strong>Support</strong></td>
            <td>4x4 Backup Vehicle</td>
            <td>Carries your luggage and a professional mechanic.</td>
          </tr>
          <tr>
            <td><strong>Safety</strong></td>
            <td>Medical-grade Oxygen (Type-D)</td>
            <td>Essential for the <strong>Umling La</strong> and <strong>Khardung La</strong> climbs.</td>
          </tr>
          <tr>
            <td><strong>Permits</strong></td>
            <td>ILP & Environment Fees</td>
            <td>We handle the digital Hanle & Siachen permits for you.</td>
          </tr>
        </tbody>
      </table>

      <h3>4. Iconic Landmarks You'll Conquer</h3>

      <h4>Khardung La & Tanglang La</h4>
      <p>While Umling La is the highest, <strong>Khardung La</strong> remains the sentimental favorite. Our tours ensure you reach the top early in the morning to avoid the tourist convoys, giving you that perfect "Me and My Bike" shot at the summit.</p>

      <h4>The Sand Dunes of Nubra</h4>
      <p>Riding through the Hunder sand dunes on a motorcycle feels like a scene from <em>Dune</em>. We organize stays in high-end Swiss tents so you can relax after a day of desert riding.</p>

      <h4>Hanle & The Road to Umling La</h4>
      <p>The road to <strong>Umling La</strong> via <strong>Hanle</strong> is a masterclass in BRO engineering. It's a smooth, black ribbon of tarmac that cuts through some of the most desolate yet beautiful terrain on the planet. This is the highlight of our <strong>Leh Ladakh bike trip package 2026</strong>.</p>

      <h3>5. Essential Tips for the 2026 Season</h3>

      <h4>The 48-Hour Acclimatization Rule</h4>
      <p>In 2026, Leh authorities are stricter than ever. If you fly into Leh, you <em>cannot</em> apply for permits until 48 hours have passed. We use this time to conduct bike trials and explore local hidden gems like the <strong>Magnetic Hill</strong> and <strong>Pathar Sahib Gurudwara</strong>.</p>

      <h4>Gear Up for All Seasons in One Day</h4>
      <p>In Ladakh, you can get sunburnt and frostbitten in the same hour. We recommend a 3-layer riding jacket, waterproof gloves for the <strong>Zoji La</strong> slush, and high-ankle boots for the river crossings near <strong>Sarchu</strong>.</p>

      <h4>Fuel and Connectivity</h4>
      <p>While 5G has reached Leh and even parts of <strong>Pangong</strong>, the stretch between Hanle and Nyoma remains a dead zone. Our leads carry satellite communication devices and extra fuel cans to ensure we are never truly "lost."</p>

      <h3>6. How to Book with Stories by Foot</h3>
      <p>Ready to join the tribe? Booking your <strong>Leh Ladakh bike expedition from Delhi</strong> or Manali is simple:</p>
      <ol>
        <li><strong>Select Your Date:</strong> Check our 2026 Fixed Departure calendar on www.storiesbyfoot.com.</li>
        <li><strong>Pick Your Ride:</strong> Choose between the classic Royal Enfield Bullet, the versatile Himalayan 450, or bring your own bike.</li>
        <li><strong>Confirm & Prep:</strong> Once you pay your deposit, you'll receive our "Himalayan Survival Guide" and a fitness plan to prepare your lungs for the altitude.</li>
      </ol>

      <h3>Final Thoughts: It's Not Just a Trip, It's a Story</h3>
      <p>Ladakh changes you. There is something about the silence of the <strong>Puga Valley</strong> and the sheer scale of the <strong>Tanglang La Pass</strong> that puts life into perspective. At <strong>Stories by Foot</strong>, we are committed to making sure your story is one of triumph, safety, and pure, unadulterated joy.</p>

      <p>Don't let 2026 pass you by. The mountains are calling, the roads are open, and your bike is waiting.</p>
      <p>Explore our 2026 Ladakh Packages at www.storiesbyfoot.com and let's start riding!</p>
    `
  };

  // New SEO guides live in src/lib/blogPosts.js (data-driven); older posts stay as above.
  const ctx = { destinations, year: seasonYear() };
  const extra = newBlogPosts.find((p) => p.slug === slug);
  const post = extra
    ? {
        title: extra.title(ctx),
        img: extra.img,
        authors: extra.authors.map((i) => creatorPhotos[i]),
        tags: extra.tags,
        content: extra.content(ctx),
      }
    : basePost;
  const pageSeo = extra ? extra.seo(ctx) : blogSeo[slug || ""];

  const titleParts = post.title.split(":");
  const mainTitle = titleParts[0];
  const subTitle = titleParts[1];

  // Dynamic SEO attributes for the blog post
  const cleanTitle = post.title.replace(/<br\s*\/?>/gi, "");
  const seoTitle = `${cleanTitle} | Stories by Foot Blog`;
  const seoDescription = post.content
    ? post.content
        .replace(/<[^>]*>/g, "") // remove HTML tags
        .replace(/\s+/g, " ") // clean whitespace
        .trim()
        .slice(0, 155) + "..."
    : "Read this travel guide on the Stories by Foot blog.";
  
  const seoKeywords = post.tags ? `${post.tags.join(", ")}, stories by foot blog, ladakh biking, zanskar tour` : "stories by foot, ladakh blog, himalayas riding";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.storiesbyfoot.com/blog/${slug}`
    },
    "headline": cleanTitle,
    "image": [
      post.img || "https://www.storiesbyfoot.com/placeholder.svg"
    ],
    "author": {
      "@type": "Organization",
      "name": "Stories by Foot",
      "url": "https://www.storiesbyfoot.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Stories by Foot",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL
      }
    },
    "description": pageSeo?.description ?? seoDescription
  };

  const { toc, processedContent, readTime, quickAnswer } = useMemo(() => {
    const items: { id: string; label: string }[] = [];
    let idx = 0;
    const html = (post.content || "").replace(
      /<h3([^>]*)>([\s\S]*?)<\/h3>/gi,
      (_match, attrs: string, inner: string) => {
        const label = inner.replace(/<[^>]*>/g, "").trim();
        const id = `section-${idx++}`;
        if (label) items.push({ id, label });
        return `<h3${attrs} id="${id}">${inner}</h3>`;
      }
    );
    const plainText = (post.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = plainText.split(" ").filter(Boolean).length;
    const mins = Math.max(4, Math.ceil(words / 200));

    // Extract 3-4 concise points for the "In short" box from paragraphs/list items
    const pMatches = Array.from((post.content || "").matchAll(/<(?:p|li)[^>]*>([\s\S]*?)<\/(?:p|li)>/gi))
      .map((m) => m[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim())
      .filter((t) => t.length >= 40 && t.length <= 220);
    const summary = pMatches.slice(0, 4);
    if (summary.length === 0 && plainText) {
      summary.push(plainText.slice(0, 160) + "...");
    }

    return { toc: items, processedContent: html, readTime: `${mins} min read`, quickAnswer: summary };
  }, [post.content]);

  const relatedArticles = useMemo(() => {
    const extraItems = newBlogPosts.slice(0, 3).map((p, idx) => ({
      slug: p.slug,
      title: p.cardTitle,
      category: p.tags[0] || "Travel Guide",
      readTime: "8 min read",
      image:
        idx === 0
          ? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&h=560&q=80"
          : idx === 1
            ? "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&h=560&q=80"
            : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=560&q=80",
    }));
    return [...RELATED_CLASSIC, ...extraItems].filter((item) => item.slug !== slug).slice(0, 2);
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: cleanTitle, url });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#272127]">
      <SEO
        title={pageSeo?.title ?? seoTitle}
        description={pageSeo?.description ?? seoDescription}
        keywords={pageSeo?.keywords ?? seoKeywords}
        image={post.img}
        // Unknown blog URLs must not be indexed (they would show a duplicate of the default guide).
        noindex={!pageSeo}
        type="article"
        schema={blogSchema}
      />
      <Navigation />

      <main className="blogpost-360 flex-grow pt-16 lg:pt-20">
        <section className="bg-white pb-8 pt-4 text-[#272127] sm:pb-10 sm:pt-6">
          <div className="mx-auto max-w-[1312px] px-5 sm:px-6">
            <span className="inline-flex rounded-full bg-[#e6f5ee] px-5 py-2 text-sm text-[#0d8048]">
              {post.tags[0] || "Travel Guide"}
            </span>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-tight tracking-[-0.02em] text-black sm:text-5xl">
              {cleanTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#4f5354] sm:text-lg">
              {pageSeo?.description ?? seoDescription}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Stories by Foot Editorial Team</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#696969]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Season {seasonYear()}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {readTime}
                </span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-sm text-[#696969] hover:text-[#7b18cc]"
              >
                <Share2 className="h-4 w-4" />
                {copied ? "Copied!" : "Share"}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : `https://www.storiesbyfoot.com/blog/${slug}`
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 hover:bg-slate-50"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <button
              type="button"
              onClick={() => setMobileToc((value) => !value)}
              className="flex w-full items-center justify-between rounded-[2rem] bg-[#f9f2ff] px-5 py-4 text-left font-semibold text-[#334d74] lg:cursor-default"
            >
              <span>Table of contents</span>
              <ChevronDown className={`h-5 w-5 transition lg:hidden ${mobileToc ? "rotate-180" : ""}`} />
            </button>
            <nav
              className={`${
                mobileToc ? "block" : "hidden"
              } rounded-b-[2rem] bg-[#f9f2ff] p-4 lg:block lg:rounded-[2rem] lg:pt-2`}
            >
              <ul className="grid gap-1">
                {toc.length > 0 ? (
                  toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMobileToc(false)}
                        className="flex items-start gap-2 rounded-[1rem] px-2 py-2 text-sm leading-5 text-[#334d74] hover:bg-white hover:text-[#7b18cc]"
                      >
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
                        {item.label}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="px-2 py-2 text-sm text-[#334d74]">Full Expedition Guide</li>
                )}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="mb-5 rounded-[2rem] bg-[#f9f2ff] p-6 sm:p-7">
              <h2 className="text-2xl font-semibold leading-tight text-[#5d1498]">In short</h2>
              <ul className="mt-5 grid gap-3">
                {quickAnswer.map((answer, idx) => (
                  <li key={idx} className="flex gap-3 text-base leading-7 text-[#272127]">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#7b18cc]" />
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={post.img}
              alt={cleanTitle}
              className="mb-8 aspect-[16/8] w-full rounded-[2rem] object-cover"
            />

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: processedContent }} />

            <section className="mt-14 rounded-[2rem] bg-[#f9f2ff] p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#272127]">About the author</h2>
              <div className="mt-5 flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#38095e] text-xs font-bold text-white">
                  SBF
                </span>
                <div>
                  <h3 className="font-bold">Stories by Foot Editorial Team</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Our editorial team turns complex Himalayan routes, permits, and packing logistics into practical guidance for riders and travelers.
                  </p>
                </div>
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[2rem] bg-[#f9f2ff] p-5">
              <Sparkles className="h-7 w-7 text-[#7b18cc]" />
              <h2 className="mt-4 text-xl font-bold leading-tight">Plan your Himalayan expedition.</h2>
              <p className="mt-3 text-sm leading-6 text-[#4f5354]">
                Talk to our team about guided Ladakh &amp; Zanskar tours, rentals, and permits.
              </p>
              <Link
                to="/destinations"
                className="mt-5 inline-flex rounded-full bg-[#e6377a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#bd245a]"
              >
                Explore Packages
              </Link>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold">Related articles</h2>
              <div className="grid gap-4">
                {relatedArticles.map((item) => (
                  <article
                    key={item.slug}
                    className="group flex min-h-[170px] overflow-hidden rounded-[1rem] border border-[#f3f5f8] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(25,55,101,0.12)]"
                  >
                    <Link to={`/blog/${item.slug}`} className="w-2/5 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="p-4">
                      <span className="inline-flex w-fit rounded-full bg-[#f4eaff] px-3 py-1 text-[11px] font-medium text-[#5d1498]">
                        {item.category}
                      </span>
                      <Link
                        to={`/blog/${item.slug}`}
                        className="mt-3 block text-base font-bold leading-tight text-[#272127] hover:text-[#7b18cc]"
                      >
                        {item.title}
                      </Link>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Link
                          to={`/blog/${item.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#7b18cc]"
                        >
                          Read more <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <span className="text-[10px] text-[#696969]">{item.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-6">
          <div className="grid gap-6 rounded-[2rem] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#ffdc79]">
                Better expeditions start here
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-normal text-black sm:text-4xl">
                Give your trip the planning and support it deserves.
              </h2>
              <p className="mt-3 max-w-2xl text-[#4f5354]">
                Bring Royal Enfield rentals, backup vehicles, permits and stays together with an experienced team.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6377a] px-6 py-3 font-semibold text-white hover:bg-[#bd245a]"
            >
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="bg-[#38095e] px-5 py-14 text-white sm:px-6">
          <div className="mx-auto max-w-[900px]">
            <h2 className="font-serif text-3xl font-normal">Frequently asked questions</h2>
            <div className="mt-6">
              {DEFAULT_FAQS.map((faq, index) => (
                <div key={faq.question} className="border-b border-white/40">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold sm:text-lg"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="pb-5 text-base leading-7 text-white/75">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .blogpost-360 {
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-variant-numeric: lining-nums tabular-nums;
        }
        .blogpost-360 .font-serif {
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }
        .blog-content h3:first-child {
          margin-top: 0;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          line-height: 1.25;
          letter-spacing: -0.025em;
          margin-top: 2.25rem;
          margin-bottom: 0;
          font-weight: 700;
          color: #000000;
          scroll-margin-top: 7rem;
        }
        @media (min-width: 640px) {
          .blog-content h3 {
            font-size: 1.875rem;
          }
        }
        .blog-content h4 {
          font-size: 1.15rem;
          line-height: 1.35;
          letter-spacing: -0.02em;
          margin-top: 1.75rem;
          margin-bottom: 0;
          font-weight: 700;
          color: #000000;
        }
        @media (min-width: 640px) {
          .blog-content h4 {
            font-size: 1.25rem;
          }
        }
        .blog-content p {
          margin-top: 1.25rem;
          color: #272127;
          line-height: 1.85;
          font-size: 1rem;
        }
        @media (min-width: 640px) {
          .blog-content p {
            font-size: 1.125rem;
            line-height: 2rem;
          }
        }
        .blog-content strong {
          color: #000000;
          font-weight: 600;
        }
        .blog-content a {
          color: #7b18cc;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-content ul, .blog-content ol {
          margin-top: 1.25rem;
          padding-left: 1.5rem;
          color: #272127;
          font-size: 1rem;
          line-height: 1.75rem;
        }
        @media (min-width: 640px) {
          .blog-content ul, .blog-content ol {
            font-size: 1.125rem;
          }
        }
        .blog-content ul {
          list-style: disc;
          display: grid;
          gap: 0.75rem;
        }
        .blog-content ol {
          list-style: decimal;
          display: grid;
          gap: 1rem;
        }
        .blog-content li {
          padding-left: 0.5rem;
          color: #272127;
        }
        .blog-content ul li::marker {
          color: #7b18cc;
        }
        .blog-content ol li::marker {
          color: #7b18cc;
          font-weight: 700;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          border: 1px solid #d5d9e0;
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .blog-content th, .blog-content td {
          border-bottom: 1px solid #f1f5f9;
          padding: 0.75rem 1rem;
          text-align: left;
          vertical-align: top;
        }
        .blog-content th {
          background-color: #f9f2ff;
          color: #46077a;
          font-weight: 700;
          border-bottom: 1px solid #d5d9e0;
        }
        .blog-content td {
          color: #334155;
        }
        .blog-content blockquote {
          font-size: 1.15rem;
          font-style: italic;
          padding-left: 1.25rem;
          border-left: 4px solid #7b18cc;
          margin: 1.75rem 0;
          color: #4f5354;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
