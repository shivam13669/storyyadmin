import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { buildDestinationSEO, buildListingSEO } from "@/lib/seoShared";
import { destinations } from "@/data/destinations";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  LayoutGrid,
  List,
  Phone,
  SlidersHorizontal,
  Star,
  Tag,
  Truck,
  X,
} from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

const DEPARTURE_MONTHS = [
  "Nov 2026",
  "Dec 2026",
  "Jan 2027",
  "Feb 2027",
  "Mar 2027",
  "Apr 2027",
  "May 2027",
  "Jun 2027",
];

const DURATION_OPTIONS = [
  { id: "up-to-4", label: "Up to 4 days" },
  { id: "5-7", label: "5 – 7 days" },
  { id: "8-10", label: "8 – 10 days" },
  { id: "11-plus", label: "11+ days" },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Nearest Departure" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const FAQS = [
  {
    q: "How do I reserve my seat on an upcoming community trip?",
    a: "Simply click Details on any trip card, choose your preferred departure date and bike/seating option, and complete your booking online. You can also tap the callback icon to speak directly with our expedition experts.",
  },
  {
    q: "Are solo travelers welcome on group departures?",
    a: "Yes! Over 60% of our riders and travelers join solo. Our small-group community departures are designed to help you connect easily with fellow explorers while having full backup and road-captain support.",
  },
  {
    q: "What is included in the trip package price?",
    a: "Packages typically include curated accommodation, breakfast and dinner, experienced road captains, a backup support vehicle for luggage, emergency oxygen cylinders, and inner-line permits. Exact inclusions are listed on each trip's detail page.",
  },
  {
    q: "Can I customize dates or book a private group departure?",
    a: "Absolutely. If fixed community departure dates don't fit your schedule, click Request Callback or visit our Contact page and our team will craft a custom itinerary for your dates.",
  },
];

const parsePriceNum = (priceStr?: string): number => {
  if (!priceStr) return 0;
  const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(num) ? 0 : num;
};

const parseDurationDays = (duration: string): number => {
  const match = duration.match(/(\d+)\s*days?/i);
  if (match) return parseInt(match[1], 10);
  const nightsMatch = duration.match(/(\d+)\s*nights?/i);
  return nightsMatch ? parseInt(nightsMatch[1], 10) + 1 : 6;
};

const formatDateBadge = (dates?: string[], fallbackIdx = 0) => {
  if (dates && dates.length > 0) {
    const d = new Date(dates[0]);
    if (!Number.isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
      const shortText = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}${
        dates.length > 1 ? ` (+${dates.length - 1})` : ""
      }`;
      return { day, month, shortText };
    }
  }
  const defaults = [
    { day: "15", month: "JUN", shortText: "15 Jun (+4)" },
    { day: "22", month: "JUN", shortText: "22 Jun (+5)" },
    { day: "04", month: "JUL", shortText: "4 Jul (+3)" },
    { day: "18", month: "JUL", shortText: "18 Jul (+2)" },
  ];
  return defaults[fallbackIdx % defaults.length];
};

const DestinationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { formatPrice } = useCurrency();

  useLayoutEffect(() => {
    if (location.pathname === "/destinations" || location.pathname.startsWith("/destinations/")) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.key, location.pathname]);

  const pathDest = params.slug || params.dest;
  const searchParams = new URLSearchParams(location.search);
  const queryDest = searchParams.get("dest");
  const destParam = pathDest || queryDest;
  const initialSlug =
    destParam && destinations.some((d) => d.slug === destParam) ? destParam : "all";

  const [activeSlug, setActiveSlug] = useState(initialSlug);
  useLayoutEffect(() => {
    setActiveSlug(initialSlug);
    setSelectedCountries(initialSlug !== "all" ? [initialSlug] : []);
  }, [initialSlug]);

  // Filter & UI state
  const [regionType, setRegionType] = useState<"all" | "international" | "domestic">("all");
  const [pricePreset, setPricePreset] = useState<string>("all");
  const [minPriceSlider, setMinPriceSlider] = useState<number>(0);
  const [maxPriceSlider, setMaxPriceSlider] = useState<number>(300000);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    initialSlug !== "all" ? [initialSlug] : []
  );
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setSortMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSortMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const [openGroups, setOpenGroups] = useState({
    destination: true,
    price: true,
    month: true,
    duration: false,
    country: false,
  });

  const toggleGroup = (key: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isShowingAll = activeSlug === "all";
  const activeDestination = useMemo(
    () => destinations.find((d) => d.slug === activeSlug) ?? destinations[0],
    [activeSlug]
  );

  const allPackages = useMemo(() => {
    return destinations.flatMap((dest) =>
      dest.packages.map((pkg) => ({
        ...pkg,
        destinationSlug: dest.slug,
        destinationName: dest.name,
        destinationRegion: dest.region,
      }))
    );
  }, []);

  const toggleDuration = (id: string) => {
    setSelectedDurations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCountry = (slug: string) => {
    setSelectedCountries((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const basePackages =
    selectedCountries.length > 0 || isShowingAll
      ? allPackages
      : activeDestination.packages.map((pkg) => ({
          ...pkg,
          destinationSlug: activeDestination.slug,
          destinationName: activeDestination.name,
          destinationRegion: activeDestination.region,
        }));

  const filteredPackages = useMemo(() => {
    return basePackages.filter((pkg) => {
      if (selectedCountries.length > 0 && !selectedCountries.includes(pkg.destinationSlug)) {
        return false;
      }

      if (regionType === "domestic" && pkg.destinationRegion.toLowerCase() !== "india") {
        return false;
      }
      if (regionType === "international" && pkg.destinationRegion.toLowerCase() === "india") {
        return false;
      }

      const price = parsePriceNum(pkg.price);
      if (price < minPriceSlider || price > maxPriceSlider) return false;

      if (pricePreset === "under-20k" && price >= 20000) return false;
      if (pricePreset === "20k-50k" && (price < 20000 || price > 50000)) return false;
      if (pricePreset === "50k-100k" && (price < 50000 || price > 100000)) return false;
      if (pricePreset === "100k-plus" && price < 100000) return false;

      if (selectedMonth !== "all" && pkg.availableDates && pkg.availableDates.length > 0) {
        const monthShort = selectedMonth.split(" ")[0];
        const hasMonth = pkg.availableDates.some((dStr) => {
          const d = new Date(dStr);
          return d.toLocaleString("en-US", { month: "short" }) === monthShort;
        });
        if (!hasMonth) return false;
      }

      if (selectedDurations.length > 0) {
        const days = parseDurationDays(pkg.duration);
        const matchesAnyDuration = selectedDurations.some((dur) => {
          if (dur === "up-to-4") return days <= 4;
          if (dur === "5-7") return days >= 5 && days <= 7;
          if (dur === "8-10") return days >= 8 && days <= 10;
          if (dur === "11-plus") return days >= 11;
          return false;
        });
        if (!matchesAnyDuration) return false;
      }

      return true;
    });
  }, [
    basePackages,
    selectedCountries,
    regionType,
    pricePreset,
    minPriceSlider,
    maxPriceSlider,
    selectedMonth,
    selectedDurations,
  ]);

  const displayPackages = useMemo(() => {
    const sorted = [...filteredPackages];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => parsePriceNum(a.price) - parsePriceNum(b.price));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => parsePriceNum(b.price) - parsePriceNum(a.price));
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [filteredPackages, sortBy]);

  const clearAllFilters = () => {
    setRegionType("all");
    setPricePreset("all");
    setMinPriceSlider(0);
    setMaxPriceSlider(300000);
    setSelectedMonth("all");
    setSelectedDurations([]);
    setSelectedCountries([]);
    if (!isShowingAll) {
      navigate("/destinations");
    }
  };

  const seoData = useMemo(
    () => (activeSlug === "all" ? buildListingSEO(destinations) : buildDestinationSEO(activeDestination)),
    [activeSlug, activeDestination]
  );

  const activeSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label ?? "Nearest Departure";

  const renderFilterContent = () => (
    <div>
      {/* 1. Destination */}
      <div className="border-b border-neutral-200">
        <button
          type="button"
          onClick={() => toggleGroup("destination")}
          className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-semibold leading-[22.5px] text-gray-900"
        >
          <span>Destination</span>
          {openGroups.destination ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {openGroups.destination && (
          <div className="px-5 pb-5">
            {[
              { id: "all" as const, label: "All destinations" },
              { id: "international" as const, label: "International" },
              { id: "domestic" as const, label: "Domestic (India)" },
            ].map((opt) => {
              const checked = regionType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRegionType(opt.id)}
                  className="flex w-full cursor-pointer items-center gap-3 py-1.5 text-left text-sm leading-5 text-gray-700 hover:text-gray-900"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      checked ? "border-[#5bc1d5]" : "border-neutral-300"
                    }`}
                  >
                    {checked && <span className="h-2 w-2 rounded-full bg-[#5bc1d5]" />}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Range */}
      <div className="border-b border-neutral-200">
        <button
          type="button"
          onClick={() => toggleGroup("price")}
          className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-semibold leading-[22.5px] text-gray-900"
        >
          <span>Price Range</span>
          {openGroups.price ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {openGroups.price && (
          <div className="px-5 pb-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "under-20k", label: "Under ₹20,000" },
                { id: "20k-50k", label: "₹20,000 – ₹50,000" },
                { id: "50k-100k", label: "₹50,000 – ₹1,00,000" },
                { id: "100k-plus", label: "₹1,00,000+" },
              ].map((pill) => {
                const active = pricePreset === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setPricePreset(active ? "all" : pill.id)}
                    className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm leading-5 transition-colors ${
                      active
                        ? "border-[#5bc1d5] bg-[#5bc1d5]/10 text-[#0e7490] font-medium"
                        : "border-neutral-200 bg-white text-gray-700 hover:border-neutral-300"
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* Dual-Thumb Range Slider */}
            <div className="pt-2">
              <div className="relative flex h-5 items-center">
                <div className="h-1.5 w-full rounded-full bg-neutral-200 relative">
                  <div
                    className="absolute inset-y-0 rounded-full bg-[#5bc1d5]"
                    style={{
                      left: `${(minPriceSlider / 300000) * 100}%`,
                      right: `${100 - (maxPriceSlider / 300000) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className="pointer-events-none absolute z-10 h-5 w-5 rounded-full border-2 border-[#5bc1d5] bg-white shadow"
                  style={{
                    left: `calc(${(minPriceSlider / 300000) * 100}% - ${(minPriceSlider / 300000) * 20}px)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute z-10 h-5 w-5 rounded-full border-2 border-[#5bc1d5] bg-white shadow"
                  style={{
                    left: `calc(${(maxPriceSlider / 300000) * 100}% - ${(maxPriceSlider / 300000) * 20}px)`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={300000}
                  step={5000}
                  value={minPriceSlider}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), maxPriceSlider - 5000);
                    setMinPriceSlider(val);
                  }}
                  aria-label="Minimum price"
                  className="pointer-events-none absolute inset-0 z-20 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab"
                />
                <input
                  type="range"
                  min={0}
                  max={300000}
                  step={5000}
                  value={maxPriceSlider}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), minPriceSlider + 5000);
                    setMaxPriceSlider(val);
                  }}
                  aria-label="Maximum price"
                  className="pointer-events-none absolute inset-0 z-30 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm leading-5 text-gray-600">
                <span>{minPriceSlider === 0 ? "₹0" : formatPrice(minPriceSlider, { fromCurrency: "INR" })}</span>
                <span>
                  {maxPriceSlider >= 300000 ? "₹3,00,000+" : formatPrice(maxPriceSlider, { fromCurrency: "INR" })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Departure Month */}
      <div className="border-b border-neutral-200">
        <button
          type="button"
          onClick={() => toggleGroup("month")}
          className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-semibold leading-[22.5px] text-gray-900"
        >
          <span>Departure Month</span>
          {openGroups.month ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {openGroups.month && (
          <div className="px-5 pb-5 grid grid-cols-3 gap-2">
            {DEPARTURE_MONTHS.map((m) => {
              const [monthName, year] = m.split(" ");
              const active = selectedMonth === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMonth(active ? "all" : m)}
                  className={`cursor-pointer rounded-lg border px-2 py-1.5 text-center text-sm leading-5 transition-colors ${
                    active
                      ? "border-[#5bc1d5] bg-[#5bc1d5]/10 text-[#0e7490] font-medium"
                      : "border-neutral-200 bg-white text-gray-700 hover:border-neutral-300"
                  }`}
                >
                  <span className="block">{monthName}</span>
                  <span className="block">{year}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Duration (Collapsed by default) */}
      <div className="border-b border-neutral-200">
        <button
          type="button"
          onClick={() => toggleGroup("duration")}
          className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-semibold leading-[22.5px] text-gray-900"
        >
          <span>Duration</span>
          {openGroups.duration ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {openGroups.duration && (
          <div className="px-5 pb-5">
            {DURATION_OPTIONS.map((d) => {
              const checked = selectedDurations.includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggleDuration(d.id)}
                  className="flex w-full cursor-pointer items-center gap-3 py-1.5 text-left text-sm leading-5 text-gray-700 hover:text-gray-900"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      checked
                        ? "border-[#5bc1d5] bg-[#5bc1d5] text-white"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    {checked && <Check className="h-3 w-3 stroke-[3]" />}
                  </span>
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Country (Collapsed by default) */}
      <div>
        <button
          type="button"
          onClick={() => toggleGroup("country")}
          className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-semibold leading-[22.5px] text-gray-900"
        >
          <span>Country</span>
          {openGroups.country ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {openGroups.country && (
          <div className="px-5 pb-5">
            {destinations.map((dest) => {
              const checked = selectedCountries.includes(dest.slug);
              return (
                <button
                  key={dest.slug}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggleCountry(dest.slug)}
                  className="flex w-full cursor-pointer items-center gap-3 py-1.5 text-left text-sm leading-5 text-gray-700 hover:text-gray-900"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      checked
                        ? "border-[#5bc1d5] bg-[#5bc1d5] text-white"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    {checked && <Check className="h-3 w-3 stroke-[3]" />}
                  </span>
                  <span>{dest.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-white text-[#111827]"
      style={{ fontFamily: 'Poppins, "Poppins Fallback", sans-serif' }}
    >
      <SEO {...seoData} />
      <Navigation />

      {/* Main Catalog Container */}
      <main className="mx-auto w-full px-4 pt-24 pb-16">
        {/* 1. Catalog Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-[30px] font-semibold leading-9 text-black">
            {isShowingAll ? "Upcoming Community Trips" : `${activeDestination.name} Community Trips`}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Join Stories by Foot's community adventures! Explore upcoming group trips with confirmed dates.
          </p>
        </div>

        {/* 2. Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4">
          <div className="text-sm sm:text-base font-semibold text-[#111827]">
            Showing {displayPackages.length} of {basePackages.length} trips
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {/* Custom Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-gray-500">Sort by</span>
              <div ref={sortDropdownRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={sortMenuOpen}
                  onClick={() => setSortMenuOpen((prev) => !prev)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-neutral-300 md:min-w-52"
                >
                  <span>{activeSortLabel}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      sortMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-1.5 min-w-52 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg"
                  >
                    {SORT_OPTIONS.map((option) => {
                      const isActive = sortBy === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setSortBy(option.value);
                            setSortMenuOpen(false);
                          }}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-neutral-100 ${
                            isActive ? "font-medium text-[#5bc1d5]" : "font-normal text-gray-700"
                          }`}
                        >
                          <span>{option.label}</span>
                          {isActive && <Check className="h-4 w-4 text-[#5bc1d5]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center rounded-lg border border-[#e5e7eb] bg-white p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === "grid" ? "bg-[#1a1a1a] text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === "list" ? "bg-[#1a1a1a] text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Left Sticky Sidebar + Right Cards Grid */}
        <div className="flex items-start gap-6">
          <aside className="hidden lg:block w-[300px] shrink-0 overflow-x-hidden overflow-y-auto rounded-2xl border border-neutral-200 bg-white lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">Filters</h2>
              {(regionType !== "all" ||
                pricePreset !== "all" ||
                minPriceSlider > 0 ||
                maxPriceSlider < 300000 ||
                selectedMonth !== "all" ||
                selectedDurations.length > 0 ||
                selectedCountries.length > 0 ||
                !isShowingAll) && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-[#5bc1d5] hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            {renderFilterContent()}
          </aside>

          <div className="flex-1 min-w-0">
            {displayPackages.length === 0 ? (
              <div className="rounded-2xl border border-[#e5e7eb] bg-gray-50 p-12 text-center">
                <p className="text-lg font-semibold text-gray-900">No matching trips found</p>
                <p className="text-sm text-gray-600 mt-1">
                  Try adjusting your price range, departure month, or destination filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-5 inline-flex items-center rounded-full bg-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#5bc1d5] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-7"
                    : "flex flex-col gap-6"
                }
              >
                {displayPackages.map((pkg, idx) => {
                  const dateInfo = formatDateBadge(pkg.availableDates, idx);
                  const baseInr = parsePriceNum(pkg.price);
                  const oldInr = parsePriceNum(pkg.oldPrice);
                  const days = parseDurationDays(pkg.duration);
                  const pkgUrl = `/destinations/${pkg.destinationSlug}/${pkg.slug}`;
                  const isPink = idx % 2 === 1;

                  return (
                    <div
                      key={`${pkg.destinationSlug}-${pkg.slug}`}
                      className={`group relative flex text-sm transition-all duration-300 ${
                        viewMode === "list"
                          ? "flex-col md:flex-row gap-6 border border-[#e5e7eb] rounded-2xl p-4"
                          : "flex-col"
                      }`}
                    >
                      {/* Image Area */}
                      <Link
                        to={pkgUrl}
                        className={`relative overflow-hidden rounded-2xl block shrink-0 ${
                          viewMode === "list"
                            ? "w-full md:w-[320px] h-[240px]"
                            : "w-full h-[280px] sm:h-[320px]"
                        }`}
                      >
                        <img
                          src={pkg.image || activeDestination.heroImage}
                          alt={pkg.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Top-Left White Date Badge */}
                        <div className="absolute top-3 left-3 z-20 w-[70px] py-2 bg-white rounded-2xl shadow-md text-center">
                          <div className="text-[24px] font-bold leading-none text-[#111827]">
                            {dateInfo.day}
                          </div>
                          <div className="text-[11px] font-semibold uppercase tracking-wide text-[#0284c7] mt-0.5">
                            {dateInfo.month}
                          </div>
                        </div>

                        {/* Top-Right Ribbon Badge */}
                        {pkg.badge && (
                          <div
                            className={`absolute top-3 right-0 z-10 inline-flex items-center gap-1 bg-gradient-to-r ${
                              isPink ? "from-pink-500 to-purple-600" : "from-red-600 to-sky-500"
                            } px-2.5 py-1 text-[12px] font-semibold text-white rounded-l shadow-md`}
                          >
                            {isPink ? <Heart className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                            <span>{pkg.badge}</span>
                          </div>
                        )}
                      </Link>

                      {/* Card Body */}
                      <div className={`flex flex-col flex-1 justify-between ${viewMode === "list" ? "py-1" : "pt-3"}`}>
                        <div>
                          <h2 className="text-[16px] font-semibold leading-6 text-[#111827] min-h-[46px] line-clamp-2">
                            <Link to={pkgUrl} className="hover:text-[#0284c7] transition-colors">
                              {pkg.name}
                            </Link>
                          </h2>

                          {viewMode === "list" && (
                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
                          )}

                          {/* Meta Row */}
                          <div className="mt-3 flex items-center justify-between text-[13.5px] text-gray-600">
                            <span className="inline-flex items-center gap-1 font-medium text-gray-800">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              {pkg.rating} ({pkg.reviews})
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-gray-500" />
                              {dateInfo.shortText}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Truck className="h-3.5 w-3.5 text-gray-500" />
                              {days} days
                            </span>
                          </div>
                        </div>

                        {/* Price & Actions Row */}
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[21px] font-extrabold leading-7 text-[#111827]">
                                {formatPrice(baseInr, { fromCurrency: "INR" })}
                              </span>
                              {oldInr > baseInr && (
                                <span className="text-[12px] font-normal text-gray-500 line-through">
                                  {formatPrice(oldInr, { fromCurrency: "INR" })}
                                </span>
                              )}
                            </div>
                            <p className="text-[12px] font-medium leading-4 text-[#374151]">
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
                              to={pkgUrl}
                              className="inline-flex h-[39px] items-center gap-1 rounded-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-3.5 text-[14px] font-normal text-white transition-colors duration-500 hover:border-[#5bc1d5] hover:bg-[#5bc1d5]"
                            >
                              <ArrowUpRight className="h-4 w-4" />
                              <span>Details</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 4. Frequently Asked Questions Section */}
        <section className="mt-20 pt-14 border-t border-[#e5e7eb]">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-5xl font-semibold text-[#111827]">
              Frequently Asked <span className="text-[#14b8a6]">Questions</span>
            </h2>
            <p className="mt-2 text-base text-[#4b5563]">
              Common questions about our upcoming trips
            </p>
          </div>

          <div className="divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base sm:text-lg font-medium text-[#111827]">{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600 pr-8">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#e5e7eb]">
              <h3 className="text-base font-semibold text-[#111827]">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderFilterContent()}
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 rounded-full border border-[#e5e7eb] py-2.5 text-sm font-medium text-gray-700"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 rounded-full bg-[#1a1a1a] py-2.5 text-sm font-medium text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;