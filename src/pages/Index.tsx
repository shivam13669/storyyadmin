import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Star,
  ShieldCheck,
  Compass,
  Award,
  Headphones,
  Wallet,
  Sparkles,
  Ticket,
  Truck,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import VibeSection from "@/components/VibeSection";
import ExploreCategories from "@/components/ExploreCategories";
import { destinations } from "@/data/destinations";
import { buildHomeSEO } from "@/lib/seoShared";
import { useCurrency, parsePrice } from "@/context/CurrencyContext";
import heroExtraImg from "@/assets/hero.webp";

const HERO_SLIDES = [
  {
    image: heroExtraImg,
    eyebrow: "EXPEDITIONS • TRAVEL • ADVENTURE",
    titlePrefix: "Explore Beyond",
    titleSecondLinePrefix: "the",
    titleItalic: "Ordinary.",
    subtitle: "Ladakh, Spiti, Zanskar, Bhutan, Nepal & Beyond",
    ctaLabel: "Explore Expeditions",
    ctaTo: "/destinations",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fb43a1ae1012c4304b871c14da4052c20?format=webp&width=1920&height=1080",
    eyebrow: "EXPERT GUIDES • TRUSTED SAFETY",
    titlePrefix: "Explore With",
    titleSecondLinePrefix: "",
    titleItalic: "Confidence.",
    subtitle: "Road Captains, Backup Vehicles & 24/7 Mountain Support",
    ctaLabel: "Get in touch",
    ctaTo: "/contact",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fe413e4f9377b436f9b2830f4d4d696c4?format=webp&width=1920&height=1080",
    eyebrow: "ULTIMATE ADVENTURE • MOTORBIKE TOURS",
    titlePrefix: "Conquer",
    titleSecondLinePrefix: "the",
    titleItalic: "Himalayas.",
    subtitle: "High Passes, Alpine Lakes & Uncharted Mountain Trails",
    ctaLabel: "Explore Tours",
    ctaTo: "/destinations",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fcb35e2849362485493f50fa8a980c199?format=webp&width=1920&height=1080",
    eyebrow: "HIGH PASSES • STARRY SKIES",
    titlePrefix: "Unforgettable",
    titleSecondLinePrefix: "",
    titleItalic: "Expeditions.",
    subtitle: "Ladakh, Spiti, Zanskar, Bhutan, Nepal, Sikkim & Tawang",
    ctaLabel: "Start Your Journey",
    ctaTo: "/destinations",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2F9594b942348f416db273b387c03cbfbc?format=webp&width=1920&height=1080",
    eyebrow: "DISCOVER • HIDDEN GEMS",
    titlePrefix: "Unveil",
    titleSecondLinePrefix: "the",
    titleItalic: "Unknown.",
    subtitle: "Remote Monasteries, Frozen Valleys & Living Root Bridges",
    ctaLabel: "Explore Tours",
    ctaTo: "/destinations",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2F5061e66c75644089a066b3dc02fb3282?format=webp&width=1920&height=1080",
    eyebrow: "CREATE • LASTING MEMORIES",
    titlePrefix: "Journey of",
    titleSecondLinePrefix: "a",
    titleItalic: "Lifetime.",
    subtitle: "Small-Group Adventures Crafted by Himalayan Veterans",
    ctaLabel: "Get in touch",
    ctaTo: "/contact",
  },
];

const HERO_CATEGORIES = [
  {
    title: "Balloon Flights",
    image: "/cliffhanger/images/cta-1-368x420.jpg",
    to: "/destinations",
  },
  {
    title: "Mountain Holiday",
    image: "/cliffhanger/images/cta-2-368x420.jpg",
    to: "/destinations/ladakh",
  },
  {
    title: "Beach Holidays",
    image: "/cliffhanger/images/cta-3-368x420.jpg",
    to: "/destinations",
  },
];

const POPULAR_DESTINATIONS = [
  {
    slug: "ladakh",
    name: "Ladakh",
    packagesLabel: "5+ Packages",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fe413e4f9377b436f9b2830f4d4d696c4?format=webp&width=800",
  },
  {
    slug: "zanskar",
    name: "Zanskar",
    packagesLabel: "2+ Packages",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fcb35e2849362485493f50fa8a980c199?format=webp&width=800",
  },
  {
    slug: "tawang",
    name: "Tawang",
    packagesLabel: "2+ Packages",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fb43a1ae1012c4304b871c14da4052c20?format=webp&width=800",
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    packagesLabel: "2+ Packages",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2F9594b942348f416db273b387c03cbfbc?format=webp&width=800",
  },
  {
    slug: "nepal",
    name: "Nepal",
    packagesLabel: "2+ Packages",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2F5061e66c75644089a066b3dc02fb3282?format=webp&width=800",
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    packagesLabel: "2+ Packages",
    image:
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=600&auto=format&fit=crop",
  },
];

const DEST_PASTEL_BGS = ["#e0edff", "#fef0cb", "#ecf8db"];

const HOT_TOURS = [
  {
    title: "Trans Himalayan Ride",
    to: "/destinations/ladakh/trans-himalayan-ride",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F4115ef14871b4c9f98220cd4c098fc4d%2Ffd209fc8b4f148bc938f2bae1f79a749?format=webp",
    rating: 4.9,
    reviews: 315,
    priceInr: 25499,
    oldPriceInr: 32999,
    duration: "11 days",
    day: "15",
    month: "JUN",
    dateText: "15 Jun (+4)",
    badge: "#1 Selling",
    badgeGradient: "from-pink-500 to-purple-600",
  },
  {
    title: "Khardungla Changla Loop",
    to: "/destinations/ladakh/khardungla-changla-loop",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F4115ef14871b4c9f98220cd4c098fc4d%2Fec67ce82355543d1b932ec13c367b77b?format=webp",
    rating: 4.9,
    reviews: 428,
    priceInr: 18333,
    oldPriceInr: 46200,
    duration: "6 days",
    day: "22",
    month: "JUN",
    dateText: "22 Jun (+5)",
    badge: "Save ₹2,000",
    badgeGradient: "from-red-600 to-sky-500",
  },
  {
    title: "India's Last Turn",
    to: "/destinations/ladakh/indias-last-turn",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fcb35e2849362485493f50fa8a980c199?format=webp&width=800",
    rating: 4.8,
    reviews: 512,
    priceInr: 21999,
    oldPriceInr: 40590,
    duration: "7 days",
    day: "04",
    month: "JUL",
    dateText: "4 Jul (+3)",
    badge: "Top Rated",
    badgeGradient: "from-pink-500 to-purple-600",
  },
  {
    title: "Ultimate Umlingla",
    to: "/destinations/ladakh/ultimate-umlingla",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fe413e4f9377b436f9b2830f4d4d696c4?format=webp&width=800",
    rating: 4.9,
    reviews: 284,
    priceInr: 24999,
    oldPriceInr: 34999,
    duration: "8 days",
    day: "18",
    month: "JUL",
    dateText: "18 Jul (+2)",
    badge: "Limited Spots",
    badgeGradient: "from-red-600 to-sky-500",
  },
];

const SERVICES = [
  {
    icon: Compass,
    title: "Personalized Matching",
    description: "Every route, bike, and stay is tailored to match your riding style and comfort.",
  },
  {
    icon: Award,
    title: "Wide Variety of Tours",
    description: "Curated circuits across Ladakh, Zanskar, Spiti, Tawang, Bhutan, Nepal & Meghalaya.",
  },
  {
    icon: ShieldCheck,
    title: "Military-Grade Safety",
    description: "Backup vehicles, oxygen support, certified road captains, and vetted mechanics.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated on-ground coordination and round-the-clock assistance throughout your trip.",
  },
  {
    icon: Sparkles,
    title: "Handpicked Stays",
    description: "Warm boutique camps and mountain lodges selected for comfort and authenticity.",
  },
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    description: "Transparent pricing with zero hidden fees and flexible batch departures.",
  },
];

const DEPARTURE_SLOTS = [
  { day: "15", month: "JUN", dateText: "15 Jun (+4)" },
  { day: "22", month: "JUN", dateText: "22 Jun (+5)" },
  { day: "04", month: "JUL", dateText: "4 Jul (+3)" },
  { day: "18", month: "JUL", dateText: "18 Jul (+2)" },
  { day: "02", month: "AUG", dateText: "2 Aug (+4)" },
  { day: "14", month: "AUG", dateText: "14 Aug (+3)" },
];

const ALL_HOT_TOURS = (() => {
  const featured = HOT_TOURS.map((t) => ({ ...t, destSlug: "ladakh" }));
  const featuredTos = new Set(featured.map((t) => t.to));
  let slotIdx = 0;

  const extra = destinations.flatMap((dest) =>
    dest.packages
      .filter((pkg) => !featuredTos.has(`/destinations/${dest.slug}/${pkg.slug}`))
      .map((pkg) => {
        const slot = DEPARTURE_SLOTS[slotIdx++ % DEPARTURE_SLOTS.length];
        const priceInr = parsePrice(pkg.price) || 24999;
        const oldPriceInr = pkg.oldPrice ? parsePrice(pkg.oldPrice) : undefined;
        const daysMatch = pkg.duration.match(/(\d+)\s*days?/i);
        const shortDuration = daysMatch ? `${daysMatch[1]} days` : pkg.duration;
        return {
          title: pkg.name,
          to: `/destinations/${dest.slug}/${pkg.slug}`,
          destSlug: dest.slug,
          image: pkg.image || dest.heroImage,
          rating: pkg.rating || 4.8,
          reviews: pkg.reviews || 120,
          priceInr,
          oldPriceInr,
          duration: shortDuration,
          day: slot.day,
          month: slot.month,
          dateText: slot.dateText,
          badge: pkg.badge || "Popular",
          badgeGradient: slotIdx % 2 === 0 ? "from-pink-500 to-purple-600" : "from-red-600 to-sky-500",
        };
      })
  );

  return [...featured, ...extra];
})();

const Index = () => {
  const homeSEO = buildHomeSEO(destinations);
  const { formatPrice } = useCurrency();
  const [activeSlide, setActiveSlide] = useState(0);
  const [aboutTab, setAboutTab] = useState<"about" | "why" | "mission">("about");
  const [selectedDest, setSelectedDest] = useState<string>("all");
  const [budgetFilter, setBudgetFilter] = useState<"all" | "under25" | "25to50" | "above50">("all");
  const [tourIndex, setTourIndex] = useState(0);
  const [mobileTourIndex, setMobileTourIndex] = useState(0);
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const destMenuRef = useRef<HTMLDivElement>(null);
  const mobileToursRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destMenuRef.current && !destMenuRef.current.contains(e.target as Node)) {
        setDestMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTours = ALL_HOT_TOURS.filter((tour) => {
    if (selectedDest !== "all" && tour.destSlug !== selectedDest) return false;
    if (budgetFilter === "under25" && tour.priceInr >= 25000) return false;
    if (budgetFilter === "25to50" && (tour.priceInr < 25000 || tour.priceInr > 50000)) return false;
    if (budgetFilter === "above50" && tour.priceInr <= 50000) return false;
    return true;
  });

  const maxTourIndex = Math.max(0, filteredTours.length - 4);
  const safeTourIndex = Math.min(tourIndex, maxTourIndex);
  const totalSlidesCount = maxTourIndex + 1;

  const scrollMobileTourTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(filteredTours.length - 1, idx));
    setMobileTourIndex(clamped);
    const container = mobileToursRef.current;
    if (!container) return;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : container.clientWidth * 0.86;
    container.scrollTo({ left: clamped * step, behavior: "smooth" });
  };

  const handleMobileTourScroll = () => {
    const container = mobileToursRef.current;
    if (!container) return;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : container.clientWidth * 0.86;
    if (step > 0) {
      const idx = Math.round(container.scrollLeft / step);
      setMobileTourIndex(Math.max(0, Math.min(filteredTours.length - 1, idx)));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="w-full flex flex-col bg-white text-[#181A1F] font-sans">
      <SEO
        title={homeSEO.title}
        description={homeSEO.description}
        keywords={homeSEO.keywords}
        image={homeSEO.image}
        url={homeSEO.url}
        schema={homeSEO.schema}
      />
      <Navigation />

      <main>
      {/* 1. Full-Bleed Editorial Hero Section */}
      <section className="relative h-[480px] sm:h-[86vh] sm:min-h-[600px] sm:max-h-[820px] w-full overflow-hidden bg-slate-950">
        <img
          src={currentSlide.image}
          alt={
            currentSlide.titlePrefix
              ? `${currentSlide.titlePrefix} ${currentSlide.titleItalic}`
              : "Stories by Foot Travel Packages"
          }
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Editorial Scrim Overlay - uniform dim level matching hero.png */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45 sm:from-black/10 sm:via-black/30 sm:to-black/60" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Hero Content - Left aligned on mobile (matching original), Right aligned on desktop */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1380px] items-center justify-start sm:justify-end px-5 pr-12 sm:px-8 lg:px-14 pt-14 sm:pt-12">
          <div className="max-w-2xl flex flex-col text-left sm:text-center items-start sm:items-center">
            {/* Eyebrow */}
            <div className="mb-3 sm:mb-5 flex items-center gap-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/90">
              <span className="hidden sm:inline-block h-px w-14 bg-white/45" />
              <span>{currentSlide.eyebrow}</span>
              <span className="hidden sm:inline-block h-px w-14 bg-white/45" />
            </div>

            {/* Main Serif Headline (2-line editorial balance across all slides) */}
            <h1 className="font-serif text-[34px] sm:text-6xl lg:text-[72px] font-bold leading-[1.06] sm:leading-[1.05] tracking-tight text-white drop-shadow-sm">
              {currentSlide.titlePrefix}
              <br />
              {currentSlide.titleSecondLinePrefix ? `${currentSlide.titleSecondLinePrefix} ` : ""}
              <span className="italic font-semibold text-[#F29938]">{currentSlide.titleItalic}</span>
            </h1>

            {/* Optional Subtitle */}
            {"subtitle" in currentSlide && currentSlide.subtitle && (
              <p className="mt-3 sm:mt-5 font-serif text-sm sm:text-lg md:text-[21px] text-white/95 font-normal tracking-wide max-w-xl">
                {currentSlide.subtitle}
              </p>
            )}

            {/* Glassy Pill CTA */}
            <Link
              to={currentSlide.ctaTo}
              className="mt-5 sm:mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/75 bg-black/25 px-6 py-2.5 sm:px-8 sm:py-3 font-serif text-sm sm:text-[15px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-slate-950"
            >
              {currentSlide.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right-Side Vertical Slide Pagination Dots (hidden on mobile, visible on sm+) */}
        <div className="hidden sm:flex absolute right-3.5 sm:right-8 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2.5 sm:gap-3">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-colors duration-200 ${idx === activeSlide
                ? "bg-[#01b3a7]"
                : "bg-[#b5b5b5]/80 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </section>

      {/* 1.5. Featured Category Cards (Non-overlapping clean stack on mobile, overlapping on desktop) */}
      <section className="relative z-20 pt-8 sm:pt-0 sm:-mt-24 pb-10 bg-white sm:bg-transparent">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
            {HERO_CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                to={cat.to}
                className="group relative aspect-[368/410] overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <h2 className="absolute bottom-6 inset-x-4 text-center font-serif text-xl sm:text-2xl font-semibold text-white tracking-wide drop-shadow">
                  {cat.title}
                </h2>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 font-serif text-sm sm:text-base font-medium text-[#181A1F] hover:text-[#c78529] transition-colors border-b border-stone-300 pb-1"
            >
              Other Tours
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Popular Destinations Section (Matching Mockup Layout) */}
      <section id="popular-destinations" className="pt-8 pb-14 sm:pt-10 sm:pb-16 bg-gradient-to-b from-white to-[#fefefe]">
        <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 mb-2">
                <span className="h-px w-4 bg-[#F29938]" />
                <span className="h-1 w-1 rounded-full bg-[#F29938]" />
                <span className="h-px w-6 bg-[#F29938]" />
                <span className="ml-1">Popular Destinations</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#181A1F] leading-tight">
                Journey to <span className="italic font-medium text-[#F29938]">Incredible</span> Places
              </h2>
            </div>

            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#181A1F] hover:text-[#c78529] transition-colors self-start sm:self-auto"
            >
              View All Destinations
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Desktop 6-Col / Tablet 3-Col / Mobile Horizontal Scroll (matching Go4Explore Popular Things To Do) */}
          <div
            className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4"
            style={{ fontFamily: 'Poppins, "Poppins Fallback", sans-serif' }}
          >
            {POPULAR_DESTINATIONS.map((dest, idx) => {
              const isVariantA = idx % 2 === 0;
              const bgColor = DEST_PASTEL_BGS[idx % DEST_PASTEL_BGS.length];
              return (
                <Link
                  key={dest.slug}
                  to={`/destinations/${dest.slug}`}
                  style={{ backgroundColor: bgColor }}
                  className={`group flex flex-col p-3 pb-[18px] relative overflow-hidden shadow-[0_5px_10px_rgba(99,99,99,0.45)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 ${isVariantA
                    ? "rounded-[20px_80px_20px_20px]"
                    : "rounded-[80px_20px]"
                    }`}
                >
                  <div
                    className={`relative aspect-square w-full overflow-hidden ${isVariantA
                      ? "rounded-[16px_68px_16px_16px]"
                      : "rounded-[68px_16px]"
                      }`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:450ms] group-hover:scale-[1.08]"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-3.5 text-left">
                    <h3 className="text-[16px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#0b0f19] truncate">
                      {dest.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[12.5px] font-semibold leading-6 text-[#374151]">
                      <Ticket className="h-3.5 w-3.5 shrink-0" />
                      <span>{dest.packagesLabel}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div
            className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory -ml-2 -mr-5 pr-5 pt-2 pb-6 scrollbar-hide"
            style={{ fontFamily: 'Poppins, "Poppins Fallback", sans-serif' }}
          >
            {POPULAR_DESTINATIONS.map((dest, idx) => {
              const isVariantA = idx % 2 === 0;
              const bgColor = DEST_PASTEL_BGS[idx % DEST_PASTEL_BGS.length];
              return (
                <Link
                  key={dest.slug}
                  to={`/destinations/${dest.slug}`}
                  style={{ backgroundColor: bgColor }}
                  className={`group flex w-[255px] shrink-0 snap-start flex-col p-3 pb-[18px] relative overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.08)] ${isVariantA
                    ? "rounded-[20px_80px_20px_20px]"
                    : "rounded-[80px_20px]"
                    }`}
                >
                  <div
                    className={`relative aspect-square w-full overflow-hidden ${isVariantA
                      ? "rounded-[16px_68px_16px_16px]"
                      : "rounded-[68px_16px]"
                      }`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-3.5 text-left">
                    <h3 className="text-[14px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#0b0f19] truncate">
                      {dest.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] font-semibold leading-6 text-[#374151]">
                      <Ticket className="h-3.5 w-3.5 shrink-0" />
                      <span>{dest.packagesLabel}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Hot Tours Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#fefefe]">
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2.5">
                <span className="h-px w-8 bg-[#F29938]" />
                <span>Curated Departures</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#181A1F] leading-tight">
                Hot <span className="italic font-medium text-[#F29938]">Tours</span>
              </h2>
            </div>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#181A1F] hover:text-[#c78529] transition-colors"
            >
              Browse All Packages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Filter Pills Row (single horizontal line on mobile, wrapped on desktop) */}
          <div className="relative mb-8" ref={destMenuRef}>
            <div className="flex flex-nowrap md:flex-wrap items-center gap-2.5 overflow-x-auto md:overflow-visible -mx-3 px-3 md:mx-0 md:px-0 pb-1 md:pb-0 scrollbar-hide">
              {/* Destination Dropdown Pill */}
              <button
                type="button"
                onClick={() => setDestMenuOpen((prev) => !prev)}
                className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${selectedDest !== "all"
                  ? "border-[#181A1F] bg-[#181A1F] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
              >
                <span>
                  {selectedDest === "all"
                    ? "All Destinations"
                    : destinations.find((d) => d.slug === selectedDest)?.name || "All Destinations"}
                </span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {[
                { id: "under25" as const, label: "Under ₹25K" },
                { id: "25to50" as const, label: "₹25K to ₹50K" },
                { id: "above50" as const, label: "Above ₹50K" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    setBudgetFilter(budgetFilter === pill.id ? "all" : pill.id);
                    setTourIndex(0);
                    setDestMenuOpen(false);
                  }}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${budgetFilter === pill.id
                    ? "border-[#181A1F] bg-[#181A1F] text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                >
                  {pill.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setSelectedDest("all");
                  setBudgetFilter("all");
                  setTourIndex(0);
                  setDestMenuOpen(false);
                }}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${selectedDest === "all" && budgetFilter === "all"
                  ? "border-[#181A1F] bg-[#181A1F] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
              >
                All Upcoming Trips
              </button>
            </div>

            {destMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-gray-200 bg-white py-1.5 shadow-xl z-30">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDest("all");
                    setTourIndex(0);
                    setDestMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 ${selectedDest === "all" ? "font-semibold text-[#181A1F]" : "text-gray-700"
                    }`}
                >
                  All Destinations
                </button>
                {destinations.map((dest) => (
                  <button
                    key={dest.slug}
                    type="button"
                    onClick={() => {
                      setSelectedDest(dest.slug);
                      setTourIndex(0);
                      setDestMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 ${selectedDest === dest.slug ? "font-semibold text-[#181A1F]" : "text-gray-700"
                      }`}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredTours.length === 0 ? (
            <div className="rounded-2xl bg-[#FAF8F5] py-12 text-center text-slate-600">
              No trips match this filter.{" "}
              <button
                type="button"
                onClick={() => {
                  setSelectedDest("all");
                  setBudgetFilter("all");
                  setTourIndex(0);
                  setDestMenuOpen(false);
                }}
                className="font-semibold text-[#181A1F] underline ml-1"
              >
                Show all trips
              </button>
            </div>
          ) : (
            <>
              {/* Desktop 4-Column Smooth Sliding Track */}
              <div
                className="hidden lg:block overflow-hidden"
                style={{ fontFamily: 'Poppins, "Poppins Fallback", sans-serif' }}
              >
                <div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(calc(-${safeTourIndex} * (100% + 24px) / 4))`,
                  }}
                >
                  {filteredTours.map((tour) => (
                    <div
                      key={tour.to}
                      className="group relative flex w-[calc((100%-72px)/4)] shrink-0 flex-col text-sm"
                    >
                      {/* Top Rounded Image with Floating Badges */}
                      <Link
                        to={tour.to}
                        className="relative h-[300px] sm:h-[320px] w-full overflow-hidden rounded-2xl block"
                      >
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Top-Left Date Badge */}
                        <div className="absolute top-3 left-3 z-20 w-[68px] py-2 bg-white rounded-2xl shadow-md text-center">
                          <div className="text-[24px] font-bold leading-none text-gray-900">
                            {tour.day}
                          </div>
                          <div className="text-[11px] font-semibold uppercase tracking-wide text-[#0369a1] mt-0.5">
                            {tour.month}
                          </div>
                        </div>

                        {/* Top-Right Gradient Ribbon Badge */}
                        <div
                          className={`absolute top-3 right-0 z-10 bg-gradient-to-r ${tour.badgeGradient} px-2.5 py-1 text-[12px] font-semibold text-white rounded-l shadow-md`}
                        >
                          {tour.badge}
                        </div>
                      </Link>

                      {/* Card Content Below Image */}
                      <div className="pt-3.5 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-[16px] font-semibold leading-6 text-[#111827] line-clamp-2">
                            <Link to={tour.to} className="hover:text-[#0284c7] transition-colors">
                              {tour.title}
                            </Link>
                          </h3>

                          {/* Meta Row: Rating | Date | Duration */}
                          <div className="mt-2 flex items-center justify-between text-[13px] text-gray-600">
                            <span className="inline-flex items-center gap-1 font-medium text-gray-800">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              {tour.rating} ({tour.reviews})
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-gray-500" />
                              {tour.dateText}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Truck className="h-3.5 w-3.5 text-gray-500" />
                              {tour.duration}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Price & Action Row */}
                        <div className="mt-4 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[21px] font-extrabold leading-7 text-[#111827]">
                                {formatPrice(tour.priceInr)}
                              </span>
                              {tour.oldPriceInr && (
                                <span className="text-[12px] font-normal text-gray-500 line-through">
                                  {formatPrice(tour.oldPriceInr)}
                                </span>
                              )}
                            </div>
                            <p className="text-[12px] font-medium leading-4 text-gray-700 whitespace-nowrap">
                              per person + 5% GST
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              to="/contact"
                              aria-label="Request callback"
                              className="flex h-[37px] w-[37px] items-center justify-center rounded-full border-2 border-[#171717] text-[#1a1a1a] transition-colors duration-300 hover:border-[#5bc1d5] hover:bg-[#5bc1d5] hover:text-white"
                            >
                              <Phone className="h-4 w-4" />
                            </Link>
                            <Link
                              to={tour.to}
                              className="inline-flex h-[39px] items-center gap-1 rounded-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-3.5 text-[14px] font-normal text-white transition-colors duration-500 hover:border-[#5bc1d5] hover:bg-[#5bc1d5]"
                            >
                              <ArrowUpRight className="h-4 w-4" />
                              <span>Details</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile & Tablet Horizontal Touch Scroll + Next/Prev Synced Carousel */}
              <div
                ref={mobileToursRef}
                onScroll={handleMobileTourScroll}
                className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory -mr-3 pr-3 pb-2 scrollbar-hide"
                style={{ fontFamily: 'Poppins, "Poppins Fallback", sans-serif' }}
              >
                {filteredTours.map((tour) => (
                  <div
                    key={tour.to}
                    className="group relative flex w-[84vw] max-w-[330px] sm:w-[calc((100%-16px)/2)] sm:max-w-none shrink-0 snap-start flex-col text-sm"
                  >
                    <Link
                      to={tour.to}
                      className="relative h-[300px] sm:h-[320px] w-full overflow-hidden rounded-2xl block"
                    >
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />

                      <div className="absolute top-3 left-3 z-20 w-[68px] py-2 bg-white rounded-2xl shadow-md text-center">
                        <div className="text-[24px] font-bold leading-none text-gray-900">
                          {tour.day}
                        </div>
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-[#0369a1] mt-0.5">
                          {tour.month}
                        </div>
                      </div>

                      <div
                        className={`absolute top-3 right-0 z-10 bg-gradient-to-r ${tour.badgeGradient} px-2.5 py-1 text-[12px] font-semibold text-white rounded-l shadow-md`}
                      >
                        {tour.badge}
                      </div>
                    </Link>

                    <div className="pt-3.5 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-[16px] font-semibold leading-6 text-[#111827] line-clamp-2">
                          <Link to={tour.to} className="hover:text-[#0284c7] transition-colors">
                            {tour.title}
                          </Link>
                        </h3>

                        <div className="mt-2 flex items-center justify-between text-[13px] text-gray-600">
                          <span className="inline-flex items-center gap-1 font-medium text-gray-800">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {tour.rating} ({tour.reviews})
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500" />
                            {tour.dateText}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Truck className="h-3.5 w-3.5 text-gray-500" />
                            {tour.duration}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[21px] font-extrabold leading-7 text-[#111827]">
                              {formatPrice(tour.priceInr)}
                            </span>
                            {tour.oldPriceInr && (
                              <span className="text-[12px] font-normal text-gray-500 line-through">
                                {formatPrice(tour.oldPriceInr)}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] font-medium leading-4 text-gray-700 whitespace-nowrap">
                            per person + 5% GST
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to="/contact"
                            aria-label="Request callback"
                            className="flex h-[37px] w-[37px] items-center justify-center rounded-full border-2 border-[#171717] text-[#1a1a1a] transition-colors duration-300 hover:border-[#5bc1d5] hover:bg-[#5bc1d5] hover:text-white"
                          >
                            <Phone className="h-4 w-4" />
                          </Link>
                          <Link
                            to={tour.to}
                            className="inline-flex h-[39px] items-center gap-1 rounded-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-3.5 text-[14px] font-normal text-white transition-colors duration-500 hover:border-[#5bc1d5] hover:bg-[#5bc1d5]"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                            <span>Details</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Desktop Bottom Controls (Dots + Prev/Next) */}
          {totalSlidesCount > 1 && (
            <div className="hidden lg:flex mt-8 items-center justify-between">
              <div className="flex items-center gap-1">
                {Array.from({ length: totalSlidesCount }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Slide to card ${idx + 1}`}
                    onClick={() => setTourIndex(idx)}
                    className="flex h-6 min-w-[24px] items-center justify-center rounded-full"
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${safeTourIndex === idx
                        ? "w-5 bg-[#5bc1d5]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-5 text-sm font-medium">
                <button
                  type="button"
                  disabled={safeTourIndex === 0}
                  onClick={() => setTourIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={safeTourIndex >= maxTourIndex}
                  onClick={() => setTourIndex((i) => Math.min(maxTourIndex, i + 1))}
                  className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile/Tablet Bottom Controls (Synced with both Swipe Scroll and Next/Prev) */}
          {filteredTours.length > 1 && (
            <div className="flex lg:hidden mt-6 items-center justify-between gap-3">
              <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
                {filteredTours.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Slide to card ${idx + 1}`}
                    onClick={() => scrollMobileTourTo(idx)}
                    className="flex h-6 min-w-[24px] shrink-0 items-center justify-center rounded-full"
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${mobileTourIndex === idx
                        ? "w-5 bg-[#5bc1d5]"
                        : "w-2 bg-gray-300"
                        }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm font-medium shrink-0">
                <button
                  type="button"
                  disabled={mobileTourIndex === 0}
                  onClick={() => scrollMobileTourTo(mobileTourIndex - 1)}
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={mobileTourIndex >= filteredTours.length - 1}
                  onClick={() => scrollMobileTourTo(mobileTourIndex + 1)}
                  className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-950 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3.5. Explore Categories Section (Travel Your Way) */}
      <ExploreCategories />

      {/* 4. Discover New Horizons (About / Why Choose Us / Mission) */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/cliffhanger/images/index-3-556x382.jpg"
                  alt="Discover New Horizons with Stories by Foot"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 mb-2.5">
                <span className="h-px w-8 bg-[#C25E00]" />
                <span>Our Philosophy</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#181A1F] mb-6">
                Discover New <span className="italic font-medium text-[#C25E00]">Horizons</span>
              </h2>

              {/* Tabs - Original clean horizontal underline tabs */}
              <div className="flex flex-wrap gap-6 sm:gap-8 border-b border-stone-200 mb-6">
                {[
                  { id: "about" as const, label: "About Us" },
                  { id: "why" as const, label: "Why Choose Us" },
                  { id: "mission" as const, label: "Our Mission" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAboutTab(tab.id)}
                    className={`-mb-px pb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] border-b-2 transition-colors ${aboutTab === tab.id
                      ? "border-[#C25E00] text-[#181A1F]"
                      : "border-transparent text-slate-600 hover:text-[#181A1F]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {aboutTab === "about" && (
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Stories by Foot is dedicated to delivering unforgettable Himalayan expeditions and curated
                  mountain journeys across Ladakh, Zanskar, Spiti, Tawang, Bhutan, Nepal, and Meghalaya.
                  We combine deep local knowledge with reliable logistics so every mile feels effortless.
                </p>
              )}
              {aboutTab === "why" && (
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  With experienced road captains, dedicated backup vehicles, emergency oxygen support, and
                  handpicked boutique stays, we prioritize your safety and comfort across India's highest
                  motorable passes.
                </p>
              )}
              {aboutTab === "mission" && (
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Our mission is to help travelers experience remote mountain cultures responsibly while
                  turning challenging high-altitude routes into lifelong memories and genuine stories.
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F29938] px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-[#d89639] transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-2.5 text-sm font-medium text-slate-800 hover:border-slate-900 transition-colors"
                >
                  About Stories by Foot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Services Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 mb-2.5">
              <span className="h-px w-8 bg-[#C25E00]" />
              <span>What We Offer</span>
              <span className="h-px w-8 bg-[#C25E00]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#181A1F]">
              Crafted for <span className="italic font-medium text-[#C25E00]">Seamless</span> Expeditions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="rounded-2xl bg-[#FAF8F5] p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F29938]/15 text-[#b7771d]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#181A1F] mb-2">{svc.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{svc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. First-class Impressions Banner */}
      <section className="relative py-24 overflow-hidden bg-slate-950 text-white">
        <img
          src="/cliffhanger/images/parallax-1-1920x850.jpg"
          alt="First-class Impressions"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
            First-class Impressions
            <br />
            <span className="italic font-medium text-[#F29938]">are Waiting for You!</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/85 max-w-xl mx-auto">
            Browse our curated Himalayan expeditions and find your dream mountain adventure.
          </p>
          <Link
            to="/destinations"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F29938] px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-[#d89639] transition-colors"
          >
            Book a Tour Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 7.5. Real Travel Stories Section (Vibe with Us) */}
      <VibeSection />

      {/* 8. Nature Reimagined CTA */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Nature Reimagined CTA Card */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-white bg-cover bg-center shadow-xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1920&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
            <div className="relative z-10 max-w-xl">
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
                Nature Reimagined
                <br />
                <span className="italic text-[#F29938]">Visit us.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/85">
                Ready to ride the highest passes and wake up beside alpine lakes? Let us plan your next story.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F29938] px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-[#d89639] transition-colors"
              >
                Plan Your Expedition
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default Index;