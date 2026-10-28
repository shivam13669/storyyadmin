import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { destinationIconMap, destinations } from "@/data/destinations";
import { ArrowRight, Bike, Calendar, MapPin, MapPinned, Star, Filter, SortAsc } from "lucide-react";
import { useCurrency, parsePrice } from "@/context/CurrencyContext";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";
import { MobileFilterDrawer } from "@/components/MobileFilterDrawer";
import { MobileSortSheet } from "@/components/MobileSortSheet";

const DestinationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { formatPrice } = useCurrency();
  const destinationScrollRef = useRef<HTMLDivElement>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [canScrollRight, setCanScrollRight] = useState(true);

  useLayoutEffect(() => {
    if (location.pathname === "/destinations" || location.pathname.startsWith("/destinations/")) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.key, location.pathname]);

  // Read the 'dest' path parameter or 'dest' query parameter to set initial destination
  const pathDest = params.slug || params.dest;
  const searchParams = new URLSearchParams(location.search);
  const queryDest = searchParams.get("dest");
  const destParam = pathDest || queryDest;
  const initialSlug = destParam && destinations.some((d) => d.slug === destParam)
    ? destParam
    : "all";

  const [activeSlug, setActiveSlug] = useState(initialSlug);

  // Update activeSlug when URL parameters change
  useLayoutEffect(() => {
    setActiveSlug(initialSlug);
  }, [initialSlug]);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All",
    priceRange: "All",
    minPrice: 0,
    maxPrice: 100000,
    rating: "All",
  });

  // Check if destination scroll container can scroll right
  const checkScroll = () => {
    if (destinationScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = destinationScrollRef.current;
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useLayoutEffect(() => {
    checkScroll();
    const container = destinationScrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const isShowingAll = activeSlug === "all";
  const activeDestination = useMemo(
    () => destinations.find((d) => d.slug === activeSlug) ?? destinations[0],
    [activeSlug]
  );

  const allPackages = useMemo(() => {
    return destinations.flatMap(dest =>
      dest.packages.map(pkg => ({ ...pkg, destinationSlug: dest.slug, destinationName: dest.name, destinationRegion: dest.region }))
    );
  }, []);

  const basePackages = isShowingAll ? allPackages : activeDestination.packages.map(pkg => ({
    ...pkg,
    destinationSlug: activeDestination.slug,
    destinationName: activeDestination.name,
    destinationRegion: activeDestination.region
  }));

  const filteredPackages = useMemo(() => {
    return basePackages.filter(pkg => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      if (searchLower && !pkg.name.toLowerCase().includes(searchLower) && !pkg.description.toLowerCase().includes(searchLower)) {
        return false;
      }

      // Category filter
      if (filters.category !== "All" && pkg.categories) {
        if (!pkg.categories.includes(filters.category)) {
          return false;
        }
      }

      // Price range filter (dropdown)
      if (filters.priceRange !== "All") {
        const priceStr = pkg.price.replace(/[₹,]/g, "");
        const price = parseInt(priceStr);

        if (filters.priceRange === "₹0 - ₹25,000") {
          if (price > 25000) return false;
        } else if (filters.priceRange === "₹25,000 - ₹40,000") {
          if (price < 25000 || price > 40000) return false;
        } else if (filters.priceRange === "₹40,000+") {
          if (price < 40000) return false;
        }
      }

      // Slider price range filter
      const priceStr = pkg.price.replace(/[₹,]/g, "");
      const price = parseInt(priceStr);
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.rating !== "All") {
        const minRating = parseFloat(filters.rating);
        if (pkg.rating < minRating) {
          return false;
        }
      }

      return true;
    });
  }, [basePackages, filters]);

  const displayPackages = useMemo(() => {
    let sorted = [...filteredPackages];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ""));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ""));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ""));
          return priceB - priceA;
        });
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        });
        break;
      default: // relevance
        break;
    }

    return sorted;
  }, [filteredPackages, sortBy]);

  // Dynamic SEO attributes
  const seoData = useMemo(() => {
    const listElements = filteredPackages.slice(0, 15).map((pkg, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://www.storiesbyfoot.com/destinations/${pkg.destinationSlug}/${pkg.slug}`
    }));

    if (activeSlug === "all") {
      return {
        title: "Himalayan Adventure Tour Packages & Bike Expeditions 2026 | Stories by Foot",
        description: "Browse all Himalayan adventure tour packages by Stories by Foot. Premium motorcycle expeditions in Ladakh, Zanskar, Bhutan, Meghalaya, and Nepal. Choose your epic road trip today!",
        keywords: "himalayan tour packages, adventure tours, bike trip package, stories by foot destinations, motorbiking in india, ladakh packages, tawang bike trip, bhutan tour",
        schema: {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Himalayan Adventure Tour Packages",
          "numberOfItems": filteredPackages.length,
          "itemListElement": listElements
        }
      };
    }

    const name = activeDestination?.name || "Himalayan";
    const tagline = activeDestination?.tagline || "Rugged passes and starry desert skies";

    // Customize description for Ladakh particularly to emphasize user keywords
    let desc = `Explore premium ${name} tour packages with Stories by Foot. ${tagline}. Our guided expeditions offer full backup support, mechanic, and safety gear.`;
    if (activeSlug === "ladakh") {
      desc = `Conquer Ladakh with our expert-guided Leh Ladakh bike trip packages 2026. Ride Khardung La, Pangong Tso, and Umling La with full backup vehicle, mechanic, and oxygen support.`;
    } else if (activeSlug === "zanskar") {
      desc = `Adventure deep into Zanskar Valley with Stories by Foot. Ride Shinku La Pass, explore remote monasteries, and cross Drang-Drung Glacier on our premium motorcycle tours.`;
    }

    return {
      title: `${name} Tour Packages & Biking Expeditions 2026 | Stories by Foot`,
      description: desc,
      keywords: `${name.toLowerCase()} packages, ${name.toLowerCase()} bike trip, stories by foot ${name.toLowerCase()}, ${name.toLowerCase()} tour, best time to visit ${name.toLowerCase()}`,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TouristDestination",
            "name": name,
            "description": desc,
            "touristType": "Adventure Enthusiasts, Motorcycle Riders",
            "includesPlace": {
              "@type": "Place",
              "name": name,
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": name
              }
            }
          },
          {
            "@type": "ItemList",
            "name": `${name} Tour Packages`,
            "numberOfItems": filteredPackages.length,
            "itemListElement": listElements
          }
        ]
      }
    };
  }, [activeSlug, activeDestination, filteredPackages]);

  const handleOpenPackage = (packageSlug: string, destinationSlug: string) => {
    navigate(`/destinations/${destinationSlug}/${packageSlug}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO {...seoData} />
      <Navigation />

      <main className="pb-20">
        {/* Mobile Filter and Sort Buttons - Sticky Unified Container */}
        <div className="sticky top-16 z-30 bg-white border-b border-border lg:hidden">
          <div className="flex h-12">
            {/* Sort Button */}
            <button
              onClick={() => setShowMobileSort(true)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <SortAsc className="h-4 w-4" />
              <span>Sort</span>
            </button>

            {/* Divider */}
            <div className="w-px bg-border"></div>

            {/* Filter Button */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Destination Selector */}
        <section className="pt-16 lg:pt-24 mb-8 lg:mb-12">
          <div className="container mx-auto px-4">
            <div
              ref={destinationScrollRef}
              className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-2 py-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
            <Link
              to="/destinations"
              onClick={() => setActiveSlug("all")}
              aria-pressed={activeSlug === "all"}
              className={[
                "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 snap-start min-w-max",
                activeSlug === "all"
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-md",
              ].join(" ")}
            >
              <span>All Destinations</span>
            </Link>
            {destinations.map((d) => {
              const Icon = destinationIconMap[d.icon];
              const active = d.slug === activeSlug;
              return (
                <Link
                  key={d.slug}
                  to={`/destinations/${d.slug}`}
                  onClick={() => setActiveSlug(d.slug)}
                  aria-pressed={active}
                  className={[
                    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 snap-start min-w-max",
                    active
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-md",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                  <span>{d.name}</span>
                </Link>
              );
            })}
            </div>
            <div className="text-center mt-2 text-xs text-muted-foreground md:hidden">
              ← Scroll to view more →
            </div>
          </div>
        </section>

        {/* Filters and Packages Container */}
        <section className="container mx-auto px-4 mt-8">
          <div className="flex gap-6">
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Packages grid */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-4">Showing {displayPackages.length} package{displayPackages.length !== 1 ? 's' : ''}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                {displayPackages.map((pkg) => (
                  <Card
                    key={`${pkg.destinationSlug}-${pkg.slug}`}
                    role="link"
                    tabIndex={0}
                    aria-label={`View details for ${pkg.name}`}
                    onClick={() => handleOpenPackage(pkg.slug, pkg.destinationSlug)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleOpenPackage(pkg.slug, pkg.destinationSlug);
                      }
                    }}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md card-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                {pkg.image && (
                  <div className="relative h-80 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 bottom-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-white" /> {pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}
                      <span className="text-white/80">({pkg.reviews})</span>
                    </span>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <button
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${i === 0 ? 'bg-white w-5' : 'bg-white/50 w-1.5'}`}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold leading-snug line-clamp-2">{pkg.name}</h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {pkg.destinationRegion}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {['3D', '4D', '5D'].slice(0, 3).map((day, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 rounded bg-muted text-foreground">
                        {day} {pkg.destinationRegion?.split(' ')[0]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-foreground">{formatPrice(parsePrice(pkg.price) ?? 0, { fromCurrency: "INR" })}</span>
                      {pkg.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{formatPrice(parsePrice(pkg.oldPrice) ?? 0, { fromCurrency: "INR" })}</span>
                      )}
                      {pkg.badge && (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">{pkg.badge}</span>
                      )}
                    </div>

                    <div className="mt-3 flex w-full gap-2">
                      <Button
                        asChild
                        variant="default"
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Link
                          to={`/destinations/${pkg.destinationSlug}/${pkg.slug}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          View itinerary
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Link
                          to={`/booking/${pkg.slug}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                  </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileFilterDrawer
        isOpen={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <MobileSortSheet
        isOpen={showMobileSort}
        onClose={() => setShowMobileSort(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

    </div>
  );
};

export default DestinationsPage;
