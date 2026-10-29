import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Film,
  Instagram,
  Menu,
  Search,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";

const SITE = "https://www.deshvideshtravels.com";
const S3 = "https://deshvideshstrapi.s3.ap-south-1.amazonaws.com/";
const img = (name: string) => `${S3}${name}`;
const href = (path: string) => (path === "#" ? "#" : `${SITE}${path}`);

const LOGO_LIGHT = "https://deshvideshprod.s3.ap-south-1.amazonaws.com/website-static/logo-light-theme.webp";
const LOGO = "https://deshvideshprod.s3.ap-south-1.amazonaws.com/website-static/logo.webp";
const HERO_VIDEO = "https://video.gumlet.io/6898677fc34d4aa0c864379a/69609523195f98d9e15ada21/main.mp4";
const HERO_POSTER = "https://video.gumlet.io/6898677fc34d4aa0c864379a/69609523195f98d9e15ada21/thumbnail-1-0.png?v=1767937342425";

const PRIMARY = "#5bc1d5";

const navItems = [
  { label: "home", path: "/", dropdown: false },
  { label: "explore", path: "/explore", dropdown: false },
  { label: "best sellers", path: "#", dropdown: true },
  { label: "Domestic", path: "#", dropdown: true },
  { label: "International", path: "#", dropdown: true },
  { label: "upcoming trips", path: "/upcoming-trips", dropdown: false },
  { label: "more", path: "#", dropdown: true },
];

const popularPackages = [
  { title: "Ladakh Bike Trip Srinagar to Manali", text: "Explore rugged roads and scenic passes on two wheels." },
  { title: "Leh Ladakh with Turtuk", text: "Discover hidden gems and the northernmost village of India." },
  { title: "Leh Ladakh Bike Trip", text: "Travel light and connect with like-minded explorers." },
  { title: "Girls Leh Ladakh Adventure", text: "Cover major passes and breathtaking valleys." },
  { title: "Manali to Leh Bike Trip", text: "A perfect road trip experience across high mountain passes." },
];

const places = [
  {
    name: "Shanti Stupa",
    text: "Built in 1991 by a Japanese Buddhist monk, this white-domed stupa offers panoramic views of Leh and is a symbol of peace. It houses relics of Buddha preserved by the 14th Dalai Lama.",
    location: "Shanti Stupa Road, Leh",
    timings: "5 AM – 9 PM",
    best: "July – September",
  },
  {
    name: "Magnetic Hill",
    text: "This natural wonder creates an optical illusion where vehicles appear to defy gravity. A must-see for travelers seeking unique experiences.",
    location: "Srinagar-Leh Road",
    timings: "24x7",
    best: "June – October",
  },
  {
    name: "Leh Palace",
    text: "Also known as the Lachen Palkar Palace, built in 1600, offering stunning views of Leh and a glimpse of Tibetan culture. Special occasions like Galdan Namchot make it extra magical.",
    location: "Namgyal Hill, Leh",
    timings: "8 AM – 5 PM",
    best: "June – September",
  },
  {
    name: "Pangong Tso",
    text: "The world-famous brackish water lake changes color with light and time of day, making it a photographer’s paradise.",
    location: "Leh District",
    timings: "24x7",
    best: "May – September",
  },
  {
    name: "Turtuk",
    text: "A picturesque village near the Line of Control, known for apricots and its unique Balti culture.",
    location: "Nubra, Leh District",
    timings: "24x7",
    best: "April – September",
  },
  {
    name: "Tso Moriri",
    text: "A tranquil high-altitude lake in the Changthang plateau, less crowded and perfect for peace seekers.",
    note: "Inner Line Permit required.",
    location: "Changthang Region",
    timings: "24x7",
    best: "June – August",
  },
  {
    name: "Diskit Monastery",
    text: "The oldest and largest monastery in Nubra Valley, famous for the 33-meter Buddha statue and the Dosmoche Festival.",
    location: "Diskit, Leh District",
    timings: "7 AM – 1 PM, 2 PM – 7 PM",
    best: "May – October",
  },
  {
    name: "Hall of Fame Museum",
    text: "A tribute to the Indian Army soldiers, perfect for history enthusiasts.",
    location: "Leh-Kargil Road, Leh",
    timings: "9 AM – 1 PM, 2 PM – 7 PM (Closed Monday)",
  },
];

const adventures = [
  { label: "Trekking", text: "Explore Himalayan trails with difficulty levels from easy to advanced (May – September)." },
  { label: "Quad Biking", text: "A thrilling ride in the Nubra Valley’s Adventure Valley (June – September, ₹1,000–1,200)." },
  { label: "SUV Expedition", text: "Traverse breathtaking mountain routes in comfort (June – September)." },
  { label: "Bike Expedition", text: "Ideal for first-timers and adventure seekers alike (June – September)." },
  { label: "Double Hump Camel Safari", text: "Ride Bactrian camels in Hunder’s sand dunes (June – September, ₹750–1,400)." },
  { label: "River Rafting", text: "Enjoy the Zanskar, Padum, and Nimu rivers with gushing waters and majestic mountains (June – August, ₹2,000–3,500)." },
];

const eatPlaces = [
  { name: "The Tibetan Kitchen", text: "Classic Tibetan cuisine; try momos and Mariani." },
  { name: "Gesmo Restaurant", text: "Multi-cuisine dishes and freshly baked goodies." },
  { name: "Chopsticks Noodle Bar", text: "Asian and Tibetan delicacies under a cozy ambiance." },
  { name: "Lamayuru Restaurant", text: "Vegetarian-friendly with Tibetan and international cuisine." },
  { name: "Lehvenda Cafe", text: "Aromatic coffees, pizzas, and a relaxed atmosphere." },
];

const shopPlaces = [
  { name: "Moti Market", text: "Traditional Tibetan handicrafts and souvenirs." },
  { name: "Zanskar Valley Market", text: "Authentic cultural items from Ladakh." },
  { name: "Main Bazaar", text: "Clothing, artifacts, and everyday essentials." },
  { name: "Tibetan Handicraft Emporium", text: "Carpets, jewelry, rare books, and old paintings." },
];

const reachWays = [
  { label: "By Air", text: "Leh Airport connects major Indian cities like Delhi, Mumbai, and Srinagar." },
  { label: "By Road", text: "Choose from the Srinagar-Leh Highway (434 km) or the Manali-Leh Highway. Roads provide scenic views and better acclimatization." },
  { label: "By Train", text: "Nearest station is Jammu Tawi; onward journey by cab or bus via Manali." },
];

const tips = [
  { label: "Bike & Gear", text: "Choose suitable bikes and riding gear for safety." },
  { label: "Permits", text: "Carry Inner Line Permit (ILP) or Protected Areas Permit (PAP) if required." },
  { label: "Essentials", text: "Power banks, extra fuel, warm clothes, cash, and photography equipment." },
  { label: "Acclimatization", text: "Allow 1–3 days to adjust to high altitudes." },
];

const seasons = [
  { label: "Summer (July – September)", text: "Peak season with moderate temperatures and vibrant festivals." },
  { label: "Autumn (October – December)", text: "Fewer crowds and pleasant weather." },
  { label: "Winter (January – March)", text: "Snowy landscapes and frozen lakes for adventure enthusiasts." },
];

type Trip = {
  title: string;
  type: string;
  rating?: string;
  reviews?: number;
  isNew?: boolean;
  days: number;
  price: number;
  prevPrice?: number;
  save?: number;
  slug: string;
  images: string[];
};

const trips: Trip[] = [
  {
    title: "9 Days Thrilling Leh Ladakh Tour Package with Umling La",
    type: "Group",
    rating: "4.9",
    reviews: 100,
    days: 9,
    price: 28999,
    prevPrice: 30999,
    save: 2000,
    slug: "/trip/thrilling-leh-ladakh-tour-umling-la",
    images: [
      "pexels_vikashkr50_18646435_60812513cb.jpg",
      "pexels_julia_volk_5201114_641b75ac20.jpg",
      "pexels_julia_volk_5201838_e64bc8b7cd.jpg",
      "pexels_qaarif_12372704_ec81747f40.jpg",
      "pexels_syed_mehrooz_55232591_18836749_034545f7ad.jpg",
      "pexels_pavithra_selvam_296480871_14147976_61293582a5.jpg",
    ],
  },
  {
    title: "Ultimate Ladakh Bike Trip Srinagar to Manali | 12 Days",
    type: "Group",
    rating: "5",
    reviews: 10,
    days: 12,
    price: 42999,
    prevPrice: 48999,
    save: 6000,
    slug: "/trip/ultimate-ladakh-bike-trip-srinagar-to-manali",
    images: [
      "Leh_Ulti_Package_b65780260f.png",
      "vivek_LW_64_K_Nwfc1k_unsplash_647150ea5b.jpg",
      "mayur_arvind_XP_4y_DOMY_Fy_M_unsplash_6900664a55.jpg",
      "gurv_gupta_Xq_Ng_O_Si_Wqg4_unsplash_3436a72c84.jpg",
      "suraj_tomer_Bhaizo18vl_A_unsplash_b23447aa96.jpg",
      "rutpratheep_nilpechr_20_UM_2yp8_Mu0_unsplash_832ebb9c09.jpg",
    ],
  },
  {
    title: "7 Days Leh Ladakh Tour Package With Turtuk - Nubra - Pangong",
    type: "FIT",
    rating: "4.9",
    reviews: 100,
    days: 7,
    price: 27999,
    prevPrice: 32999,
    save: 5000,
    slug: "/trip/leh-ladakh-tour-package-with-turtuk",
    images: [
      "nomad_bikers_ch_Mjcf_Iz_ak_unsplash_555c88ea3d.jpg",
      "nomad_bikers_6qubr8_Zbw14_unsplash_e0ae3f1435.jpg",
    ],
  },
  {
    title: "11 Day Leh Ladakh Bike Trip – Hanle, Umling La & Tso Moriri",
    type: "Group",
    rating: "4.9",
    reviews: 200,
    days: 11,
    price: 35999,
    prevPrice: 40999,
    save: 5000,
    slug: "/trip/11-day-leh-ladakh-bike-trip-hanle-umling-la-tso-moriri",
    images: [
      "IMG_7800_8faf90a177.jpg",
      "pixels_of_life_ED_Pdk_Sc_Qh_DQ_unsplash_03dadf6bef.jpg",
      "pixels_of_life_I_Jfp_V_Yl_Rv5_I_unsplash_4549cc43f4.jpg",
      "prabhav_kashyap_godavarthy_X_Tro_PP_Nq6_JA_unsplash_757faaf774.jpg",
      "vamshi_vangapally_f_H_B_Sv_Ye_X5g_unsplash_e0c08ce757.jpg",
      "thugbong_Z6t_Zdo_C2bn_M_unsplash_353b9b859c.jpg",
    ],
  },
  {
    title: "11 Days Ladakh Tour Package with Umling La - Manali - Leh - Srinagar",
    type: "Group",
    rating: "4.9",
    reviews: 100,
    days: 11,
    price: 37999,
    prevPrice: 43999,
    save: 6000,
    slug: "/trip/11-days-ladakh-tour-umling-la-manali-leh-srinagar",
    images: [
      "pexels_qaarif_12372704_ec81747f40.jpg",
      "pexels_syed_mehrooz_55232591_18836749_034545f7ad.jpg",
      "pexels_julia_volk_5201838_e64bc8b7cd.jpg",
      "pexels_vikashkr50_18646435_60812513cb.jpg",
      "pexels_pavithra_selvam_296480871_14147976_61293582a5.jpg",
      "pexels_moments_immortalized_313795_909376_d719acbbd3.jpg",
    ],
  },
  {
    title: "Ladakh Apricot Blossom Special: 8-Day Spring Journey",
    type: "Group",
    rating: "5",
    reviews: 70,
    days: 8,
    price: 24999,
    prevPrice: 29999,
    save: 5000,
    slug: "/trip/ladakh-apricot-blossom-special",
    images: [
      "apricot_ad04997afd.png",
      "apricot_4_0c9f492c0c.jpg",
      "apricot_2_30c4507f18.png",
      "matt_johnson_URH_oen_Pt1o_unsplash_339c610454.jpg",
      "apricot_2_9d918ef0f9.png",
    ],
  },
  {
    title: "Zanskar Valley Expedition 2026",
    type: "Group",
    rating: "4.9",
    reviews: 60,
    days: 7,
    price: 24999,
    prevPrice: 29999,
    save: 3500,
    slug: "/trip/zanskar-valley-expedition",
    images: [
      "zanskar_d046bd2d7a.png",
      "Gonbok_Rangan_c24c17a1b6.webp",
      "Atal_Tunnel_cf241abd38.webp",
      "Phugtal_Gompa_e1c1abdb65.webp",
    ],
  },
  {
    title: "Hemis Festival Ladakh 2026",
    type: "Group",
    rating: "4.9",
    reviews: 100,
    days: 8,
    price: 21999,
    prevPrice: 25499,
    slug: "/trip/hemis-festival-ladakh-trip",
    images: [
      "hemis_festival_ladakh_trip_131687dd8e.png",
      "matt_johnson_URH_oen_Pt1o_unsplash_339c610454.jpg",
      "Nubra_Valley_4b70da31d4.webp",
      "Pangong_Tso_b939ed3ba0.webp",
    ],
  },
];

const allTrips: Trip[] = [
  ...trips,
  {
    title: "All Girls Leh Ladakh Adventure",
    type: "Group",
    isNew: true,
    days: 7,
    price: 26999,
    slug: "/trip/all-girls-ladakh-trip",
    images: [
      "IMG_8403_f665dd61c1.jpg",
      "IMG_8279_bdebff1bc9.JPEG",
      "IMG_0795_15e0227146.JPG",
      "jeet_patel_Zc_OG_7_Qh2_N_I_unsplash_820e201a08.jpg",
      "prabhav_kashyap_godavarthy_X_Tro_PP_Nq6_JA_unsplash_a0b6493380.jpg",
      "chinh_le_duc_8_DG_9zd_Ucx_Vg_unsplash_57873b9cf4.jpg",
    ],
  },
  {
    title: "Off beat Leh to Leh Trip",
    type: "Group",
    rating: "4.9",
    reviews: 105,
    days: 7,
    price: 25999,
    prevPrice: 27999,
    save: 2000,
    slug: "/trip/offbeat-leh-trip-turtuk",
    images: [
      "mountains_6740498_1280_2f238044ce.jpg",
      "monastery_397885_1280_d14ea2d0d3.jpg",
      "ladakh_2300904_1280_d7a0cac0e2.jpg",
      "milky_way_8153503_1280_695b8552a3.jpg",
      "nature_7852762_1280_24398f9fa3.jpg",
      "pixels_of_life_I_Jfp_V_Yl_Rv5_I_unsplash_ba5d7e65d3.jpg",
    ],
  },
  {
    title: "8-Day Leh Ladakh Tour Package with Turtuk and Tso Moriri",
    type: "Group",
    rating: "4.9",
    reviews: 100,
    days: 8,
    price: 29999,
    slug: "/trip/8-day-leh-ladakh-tour-turtuk-tso-moriri",
    images: [
      "pexels_moments_immortalized_313795_909376_d719acbbd3.jpg",
      "pexels_simon73_735002_73b8b5a382.jpg",
      "pexels_julia_volk_5200951_f1faff7d6f.jpg",
      "pexels_travelwithanvish_14477905_659c6eab62.jpg",
      "pexels_julia_volk_5205083_a281fb2ab4.jpg",
      "pexels_rajendra_2735739_7e208c7036.jpg",
    ],
  },
];

const faqs = [
  {
    q: "Are ATMs available in Leh & Ladakh, and should travelers carry cash for remote areas?",
    a: "Leh has four ATMs, but remote areas may lack access. Carry sufficient cash for villages and adventure activities.",
  },
  {
    q: "What is the best time of year to visit Leh & Ladakh for sightseeing and adventure?",
    a: "April to mid-September is ideal. Summer has clear skies and autumn offers fewer crowds with golden landscapes.",
  },
  {
    q: "Which important documents and permits should travelers carry for Leh & Ladakh trips?",
    a: "Carry government ID, Inner Line Permit (ILP) or Protected Area Permit (PAP), flight tickets, hotel bookings, and photos.",
  },
  {
    q: "How many days are required to comfortably explore Leh & Ladakh’s main attractions?",
    a: "7–10 day trip is ideal to cover Leh, Nubra Valley, Pangong Tso, Tso Moriri, and other scenic destinations.",
  },
  {
    q: "Should travelers hire guides for trekking, rafting, or offbeat areas in Leh & Ladakh?",
    a: "Yes, guides provide safety, local knowledge, and access to hidden scenic spots in trekking, rafting, or remote areas.",
  },
];

const ladakhCards = [
  { label: "Ladakh", title: "Stargazing Camp", image: "pexels_vikashkr50_18646435_60812513cb.jpg" },
  { label: "Ladakh", title: "Snowy Highlands", image: "pexels_julia_volk_5201838_e64bc8b7cd.jpg" },
  { label: "Ladakh", title: "Mountain Ride", image: "pexels_qaarif_12372704_ec81747f40.jpg" },
  { label: "Ladakh", title: "Ladakhi Camel", image: "pexels_syed_mehrooz_55232591_18836749_034545f7ad.jpg" },
  { label: "Ladakh", title: "Open Road", image: "IMG_7800_8faf90a177.jpg" },
  { label: "Ladakh", title: "Starry Lake", image: "thugbong_Z6t_Zdo_C2bn_M_unsplash_353b9b859c.jpg" },
  { label: "Ladakh", title: "Indus River", image: "prabhav_kashyap_godavarthy_X_Tro_PP_Nq6_JA_unsplash_757faaf774.jpg" },
  { label: "Ladakh", title: "Pangong Blue", image: "jeet_patel_Zc_OG_7_Qh2_N_I_unsplash_820e201a08.jpg" },
  { label: "⭐Join Us", title: "This Could Be You", image: "IMG_0795_15e0227146.JPG" },
];

const relatedTags = [
  "#LadakhTravelGuide",
  "#TravelGuide",
  "#AcclimatizationIs",
  "#InnerLine",
  "#Guide2026",
  "#ThrillingLehLadakhTourUmlingLa",
  "#UltimateLadakhBikeTripSrinagarToManali",
  "#LehLadakhTourPackageWithTurtuk",
];

const blogs = [
  {
    title: "Ladakh Apricot Blossom Festival 2026: Where Spring Paints the Himalayas Pink",
    image: "apricot_blossom_festival_in_lada_efdece2831.webp",
    path: "/travel-blogs/ladakh-apricot-blossom",
  },
  {
    title: "Complete Ladakh Travel Guide – Everything You Need to Know Before Visiting",
    image: "lake_2594425_1280_4b162d3826.jpg",
    path: "/travel-blogs/complete-ladakh-travel-guide",
  },
  {
    title: "Ladakh Trip Cost Guide: How Much Does a Ladakh Trip Really Cost?",
    image: "man_1850181_640_fbfdb26545.jpg",
    path: "/travel-blogs/ladakh-trip-cost-guide",
  },
  {
    title: "Hanle Observatory in Ladakh: Dark Sky Reserve, Stargazing & Travel Guide",
    image: "darshan_chudasama_v1o_GB_Un_XV_Ds_unsplash_a10467b9b5.jpg",
    path: "/travel-blogs/Hanle-Observatory-in-Ladakh",
  },
  {
    title: "Where to Travel in India: Best Destinations Based on Your Travel Style",
    image: "Where_to_Travel_in_India_3fb1bdbae6.jpg",
    path: "/travel-blogs/india-travel-guide",
  },
  {
    title: "Zanskar vs Ladakh: Which One Should You Choose for Your Himalayan Trip?",
    image: "Zanskar_vs_Ladakh_74412b111a.jpg",
    path: "/travel-blogs/zanskar-vs-ladakh",
  },
];

const footerExplore = [
  ["Upcoming Trips", "/upcoming-trips"],
  ["Christmas & New Year Sale", "/christmas-new-year-tour-packages"],
  ["Weekend Trips", "/category/weekend-tour-packages"],
  ["Long Weekend", "/category/long-weekend-tour-packages"],
  ["Experiential Trips", "/experiential-tour-packages"],
  ["Events & Festivals", "/events-and-festivals"],
  ["Travel Blogs", "/travel-blogs"],
  ["Corporate Tours", "/corporate-tours"],
  ["Gift Cards", "/gift-cards"],
  ["Write for Us", "/write-for-us"],
];
const footerAbout = [
  ["Our Story", "/about-us"],
  ["Testimonials", "/testimonials"],
  ["Careers", "/careers"],
  ["Who Travel With Us", "/who-travel-with-us"],
  ["What We Offer", "/what-we-offer"],
];
const footerSupport = [
  ["Contact Us", "/contact-us"],
  ["Book Now", "/book-now"],
  ["Payment", "/payment"],
  ["No COST EMI", "/no-cost-emi"],
  ["Feedback Form", "#"],
  ["Visa Assistance", "#"],
];
const footerTerms = [
  ["Disclaimer", "/disclaimer"],
  ["Terms & Conditions", "/terms-condition"],
  ["Customer Success & Support", "/customer-success-&-support"],
  ["Privacy", "/privacy-policy"],
  ["Cancellation", "/cancellation-policy"],
];

const socials = ["youtube", "instagram", "linkedin", "whatsapp", "Phone"];

const Stars = ({ rating }: { rating: string }) => {
  const value = Math.round(Number(rating));
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const ImageSlider = ({ images, alt, className }: { images: string[]; alt: string; className: string }) => {
  const [index, setIndex] = useState(0);
  const count = images.length;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={img(images[index])} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setIndex((index - 1 + count) % count)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-gray-800 hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setIndex((index + 1) % count)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-gray-800 hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TripCard = ({ trip }: { trip: Trip }) => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="relative">
      <ImageSlider images={trip.images} alt={trip.title} className="h-56 w-full" />
      {trip.save && (
        <span className="absolute left-0 top-3 rounded-r-full bg-gradient-to-r from-red-500 to-sky-400 px-3 py-1 text-xs font-semibold text-white">
          Save ₹{trip.save.toLocaleString("en-IN")}
        </span>
      )}
      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800">
        {trip.type}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-4">
      {trip.isNew ? (
        <span className="text-xs font-semibold text-emerald-600">New</span>
      ) : (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Stars rating={trip.rating!} />
          <span>
            {trip.rating} ({trip.reviews})
          </span>
        </div>
      )}
      <h3 className="mt-2 text-base font-semibold leading-snug text-gray-900">{trip.title}</h3>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-gray-600">{trip.days} days</p>
          <span className="mt-1 inline-block rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700">
            {trip.days}-days package
          </span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">₹{trip.price.toLocaleString("en-IN")}</p>
          {trip.prevPrice && (
            <p className="text-sm text-gray-400 line-through">₹{trip.prevPrice.toLocaleString("en-IN")}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <a
          href={href("/contact-us")}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Request
        </a>
        <a
          href={href(trip.slug)}
          className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-white hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
        >
          Details
        </a>
      </div>
    </div>
  </div>
);

const LehLadakhTourPackagesPage = () => {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ladakhRowRef = useRef<HTMLDivElement>(null);
  const blogRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.title;
    document.title = "Leh Ladakh Tour Package – From ₹24,999";
    return () => {
      document.title = previous;
    };
  }, []);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const scrollRow = (ref: RefObject<HTMLDivElement>, direction: number) => {
    ref.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div className="lh-page min-h-screen bg-white text-gray-800">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          .lh-page { font-family: 'Poppins', sans-serif; }
          @keyframes lh-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .lh-ticker { animation: lh-ticker 30s linear infinite; }`}
      </style>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3">
          <a href={href("/")} className="shrink-0">
            <img src={LOGO_LIGHT} alt="Desh Videsh Logo" className="h-12 w-auto" />
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={href(item.path)}
                className="flex items-center gap-1 text-sm lowercase text-gray-700 hover:text-[#5bc1d5]"
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} />}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={href("#")} aria-label="Instagram" className="rounded-full p-2 text-gray-700 hover:bg-gray-100 md:hidden">
              <Instagram size={18} />
            </a>
            <button type="button" aria-label="Search" className="rounded-full p-2 text-gray-700 hover:bg-gray-100">
              <Search size={18} />
            </button>
            <button type="button" aria-label="Open Menu" className="rounded-full p-2 text-gray-700 hover:bg-gray-100 lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="pb-24 md:pb-16">
        <section className="px-4">
          <div className="relative overflow-hidden rounded-3xl">
            <video
              ref={videoRef}
              className="h-[600px] w-full object-cover md:h-[700px] 2xl:h-[760px]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_POSTER}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl 2xl:text-7xl">Leh Ladakh Tour Packages &amp; Bike Trips</h1>
              <p className="mt-4 text-lg md:text-2xl">Escape the Ordinary, Embrace the Magic of Ladakh</p>
              <div className="mt-6 rounded-full px-6 py-2 text-sm font-medium text-white" style={{ backgroundColor: PRIMARY }}>
                Starting from <span className="ml-1 text-lg font-bold">₹21,999</span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute bottom-20 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-neutral-900/90 px-5 py-4 text-white">
              <p className="text-sm md:text-base">
                Need help deciding? <span className="font-semibold">Talk to our travel experts</span>
              </p>
              <a
                href={href("/contact-us")}
                className="rounded-full px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                Request Callback
              </a>
            </div>
          </div>
        </section>

        <div className="mt-4 overflow-hidden whitespace-nowrap py-2 text-sm font-medium" style={{ color: PRIMARY }}>
          <div className="lh-ticker inline-flex w-max">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="px-6">
                Early Bird Ladakh 2026 Discounts Live!
              </span>
            ))}
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-[1000px] px-4">
          <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div className={aboutExpanded ? "" : "max-h-36 overflow-hidden"}>
              <h2 className="text-3xl font-bold text-gray-900">About Leh Ladakh Tour Packages &amp; Bike Trips</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-gray-600">
                <p>Let&apos;s be honest, Ladakh isn&apos;t just a trip. It&apos;s the one you keep talking about for years after you&apos;re back.</p>
                <p>
                  The kind of place where you&apos;re riding through a high mountain pass in the morning, sitting by the edge of Pangong Tso in
                  the afternoon, and falling asleep under the clearest sky you&apos;ve ever seen at night. It doesn&apos;t feel real until you&apos;re
                  actually there.
                </p>
                <p>
                  At Desh Videsh Travels, we&apos;ve been taking people to Ladakh for years — and we know exactly what makes a Ladakh trip genuinely
                  great versus just another tour package. That&apos;s why every itinerary we design is built around real experiences. Not rushed.
                  Not overcrowded. Just you, the mountains, and the kind of freedom that&apos;s hard to find anywhere else.
                </p>
                <p>
                  We offer Leh Ladakh tour packages covering everything from the dramatic roads of the Manali–Leh highway and the sand dunes of
                  Nubra Valley to the remote border village of Turtuk and the world&apos;s highest motorable road at Umling La. Whether you want a
                  classic sightseeing tour, an all-out bike expedition, a girls-only group trip, or an offbeat route most travellers never
                  discover — we&apos;ve got the right package waiting for you.
                </p>
                <p>
                  Departures are available from Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Ahmedabad and Kolkata — so no matter where you&apos;re
                  starting from, getting to Ladakh has never been easier.
                </p>
                <p>
                  Early bird discounts for 2026 are already live. So if Ladakh is on your mind, there&apos;s no better time to stop planning and
                  start packing.
                </p>
              </div>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Why Choose Leh Ladakh?</h3>
              <div className="mt-4 space-y-4 leading-relaxed text-gray-600">
                <p>
                  Close your eyes and feel the crisp mountain air. Open them, and you’ll be greeted by turquoise rivers, rugged mountains, and a sky
                  so clear it feels surreal. Leh Ladakh, located at altitudes ranging from 2,800 meters to 4,500 meters, is home to the{" "}
                  <strong className="text-gray-900">world’s highest motorable pass</strong> at 19,000 feet.
                </p>
                <p>
                  Leh, the capital, sits at 11,000 ft above sea level and serves as the starting point of your adventure. Explore iconic spots like{" "}
                  <strong className="text-gray-900">Magnetic Hill, Leh Palace, and Shanti Stupa</strong>, and discover the unique blend of adventure,
                  culture, and serene beauty that defines this Himalayan gem. If you want a deeper understanding of Ladakh’s travel routes, permits,
                  acclimatization tips, seasonal insights and detailed itinerary planning before selecting your package, explore our comprehensive{" "}
                  <a href={href("/travel-blogs/complete-ladakh-travel-guide")} className="font-medium text-[#5bc1d5] underline">
                    Ladakh Travel Guide
                  </a>{" "}
                  to plan your journey with clarity and confidence.
                </p>
              </div>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Popular Leh Ladakh Tour Packages</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {popularPackages.map((pkg) => (
                  <li key={pkg.title}>
                    <strong className="text-gray-900">{pkg.title}</strong> – {pkg.text}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Best Places to Visit in Leh Ladakh</h3>
              <div className="mt-4 space-y-6">
                {places.map((place) => (
                  <div key={place.name}>
                    <h4 className="text-lg font-semibold text-gray-900">{place.name}</h4>
                    <p className="mt-1 text-gray-600">
                      {place.name === "Diskit Monastery" ? (
                        <>
                          The oldest and largest monastery in <strong className="text-gray-900">Nubra Valley</strong>, famous for the 33-meter Buddha
                          statue and the <strong className="text-gray-900">Dosmoche Festival</strong>.
                        </>
                      ) : place.name === "Leh Palace" ? (
                        <>
                          Also known as the Lachen Palkar Palace, built in 1600, offering stunning views of Leh and a glimpse of Tibetan culture. Special
                          occasions like <strong className="text-gray-900">Galdan Namchot</strong> make it extra magical.
                        </>
                      ) : (
                        place.text
                      )}
                    </p>
                    {place.note && <p className="mt-1 text-sm font-medium text-gray-700">{place.note}</p>}
                    <div className="mt-2 grid gap-1 text-sm text-gray-600 sm:grid-cols-3">
                      <p>
                        <span className="font-medium text-gray-900">Location:</span> {place.location}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">Timings:</span> {place.timings}
                      </p>
                      {place.best && (
                        <p>
                          <span className="font-medium text-gray-900">Best Time:</span> {place.best}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-600">
                If you&apos;re looking for something truly unique, don’t miss the short but magical apricot blooming season. This guide to the{" "}
                <a href={href("/travel-blogs/ladakh-apricot-blossom")} className="font-medium text-[#5bc1d5] underline">
                  Ladakh apricot blossom season
                </a>{" "}
                shows you when and where to witness it.
              </p>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Adventure Activities in Leh Ladakh</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {adventures.map((item) => (
                  <li key={item.label}>
                    <strong className="text-gray-900">{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-gray-600">
                For many travelers, Ladakh is all about the thrill of the journey. If you&apos;re planning an epic road trip, this detailed{" "}
                <a href={href("#")} className="font-medium text-[#5bc1d5] underline">
                  Ladakh bike trip guide
                </a>{" "}
                covers routes, permits and everything you need to know before hitting the road.
              </p>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Best Places to Eat in Leh</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {eatPlaces.map((item) => (
                  <li key={item.name}>
                    <strong className="text-gray-900">{item.name}:</strong> {item.text}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Best Places to Shop in Leh</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {shopPlaces.map((item) => (
                  <li key={item.name}>
                    <strong className="text-gray-900">{item.name}:</strong> {item.text}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">How to Reach Leh Ladakh</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {reachWays.map((item) => (
                  <li key={item.label}>
                    <strong className="text-gray-900">{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Travel Tips for Leh Ladakh</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {tips.map((item) => (
                  <li key={item.label}>
                    <strong className="text-gray-900">{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Best Time to Visit</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                {seasons.map((item) => (
                  <li key={item.label}>
                    <strong className="text-gray-900">{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-gray-600">
                Choosing the right time to visit Ladakh can completely shape your experience from clear blue skies to snow-covered landscapes. Here’s a
                detailed breakdown of the{" "}
                <a href={href("#")} className="font-medium text-[#5bc1d5] underline">
                  best time to visit Ladakh
                </a>{" "}
                based on weather, accessibility and experiences.
              </p>

              <h3 className="mt-10 text-2xl font-bold text-gray-900">Book Now</h3>
              <p className="mt-4 text-gray-600">
                Leh Ladakh tour package with Desh Videsh Travels today and embark on a journey filled with adventure, breathtaking landscapes, and
                cultural experiences that will stay with you forever!
              </p>
            </div>

            {!aboutExpanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-14 h-24 bg-gradient-to-t from-white to-transparent" />
            )}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setAboutExpanded(!aboutExpanded)}
                className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
              >
                {aboutExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1400px] px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">Community Trips 2026 (Early Bird Offers)</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1400px] px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">All Tour Packages</h2>
          <p className="mt-2 text-center text-gray-600">Explore all the trips available for this destination.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allTrips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[900px] px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-2 text-center text-gray-600">Common questions about visiting this destination</p>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto mt-16 max-w-[1400px] px-4">
          <div className="relative">
            <div ref={ladakhRowRef} className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
              {ladakhCards.map((card) => (
                <div key={card.title} className="relative h-80 w-72 shrink-0 snap-start overflow-hidden rounded-2xl">
                  <img src={img(card.image)} alt={card.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-sky-200">{card.label}</span>
                    <p className="text-lg font-semibold">{card.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollRow(ladakhRowRef, -1)}
                className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollRow(ladakhRowRef, 1)}
                className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1000px] px-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">Related Links</h2>
            <p className="mt-2 text-gray-600">Quick tags and primary links for travellers researching this guide.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {relatedTags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1400px] px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">Related Blogs</h2>
          <p className="mt-2 text-center text-gray-600">Read our latest travel blogs and guides</p>
          <div className="relative mt-10">
            <div ref={blogRowRef} className="flex snap-x gap-6 overflow-x-auto pb-4 [scrollbar-width:none]">
              {blogs.map((blog) => (
                <a
                  key={blog.path}
                  href={href(blog.path)}
                  className="group flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={img(blog.image)}
                      alt={blog.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="p-4 font-semibold leading-snug text-gray-900">{blog.title}</p>
                </a>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <a href={href("/travel-blogs")} className="text-sm font-medium" style={{ color: PRIMARY }}>
                View All
              </a>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => scrollRow(blogRowRef, -1)}
                  className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollRow(blogRowRef, 1)}
                  className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1000px] px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Our Related Searches</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Leh Ladakh Tour Packages Delhi", "Leh Ladakh tour packages from Mumbai"].map((term) => (
              <span key={term} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {term}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 text-gray-300">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Memories are Waiting,
              <br />
              let&apos;s make them together!
            </h2>
            <a
              href={href("/upcoming-trips")}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Upcoming Trips
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((name) => (
              <a
                key={name}
                href={href("#")}
                className="rounded-full border border-gray-600 px-4 py-1.5 text-sm capitalize hover:border-[#5bc1d5] hover:text-white"
              >
                {name}
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Explore", links: footerExplore },
              { title: "About Us", links: footerAbout },
              { title: "Support", links: footerSupport },
              { title: "Terms & Info", links: footerTerms },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="text-base font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {column.links.map(([label, path]) => (
                    <li key={label}>
                      <a href={href(path)} className="hover:text-white">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 border-t border-gray-700 pt-10 md:grid-cols-2">
            <div className="space-y-4 text-sm">
              <h3 className="text-base font-semibold text-white">Contact Info</h3>
              <div>
                <p className="font-medium text-white">Registered Office:</p>
                <p>H. No. 288 Yadav Colony,</p>
                <p>Near Guru Dental Clinic</p>
                <p>Rajiv Gandhi Marg,</p>
                <p>Ballabgarh, Faridabad,</p>
                <p>Haryana - 121004</p>
              </div>
              <div>
                <p className="font-medium text-white">Corporate Office:</p>
                <p>Office A-13, Innov8 Graphix 2,</p>
                <p>Sector 62 Noida,</p>
                <p>Uttar Pradesh - 201301</p>
              </div>
              <div>
                <p className="font-medium text-white">Business Hours:</p>
                <p>Mon - Sat: 11:00 AM - 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 text-sm">
              <div className="flex items-center gap-3">
                <img src={LOGO} alt="logo" className="h-10 w-auto" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
                <p>
                  © 2026 RAAHGIR TRAVELS PRIVATE LIMITED All Rights Reserved.
                </p>
                <div className="flex items-center gap-4">
                  <span>ENG · INR</span>
                  <span>Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around bg-neutral-900 py-3 text-xs text-white md:hidden">
        <a href={href("#")} className="flex flex-col items-center gap-1">
          <Menu size={18} />
          Menu
        </a>
        <a href={href("/explore")} className="flex flex-col items-center gap-1">
          <Compass size={18} />
          Explore
        </a>
        <a href={href("/reels")} className="flex flex-col items-center gap-1">
          <Film size={18} />
          Reels
        </a>
        <a href={href("#")} className="flex flex-col items-center gap-1">
          <Search size={18} />
          Search
        </a>
      </nav>
    </div>
  );
};

export default LehLadakhTourPackagesPage;
