import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import GetInTouchModal from "@/components/GetInTouchModal";
import { SUPPORT_CATEGORIES, type SupportTopicItem } from "@/data/supportData";
import {
  ChevronRight,
  CornerDownRight,
  Search,
  Ticket,
  X,
} from "lucide-react";

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const matches: { categoryId: string; category: string; item: SupportTopicItem }[] = [];
    for (const cat of SUPPORT_CATEGORIES) {
      for (const item of cat.items) {
        if (
          item.title.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
        ) {
          matches.push({ categoryId: cat.id, category: cat.title, item });
        }
      }
    }
    return matches.slice(0, 8);
  }, [searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf0e9] text-[#202020]">
      <SEO
        title="Support & FAQs | Help Center | Stories by Foot"
        description="Find support and answers to frequently asked questions about booking, cancellation policies, packing lists, permits, and contact details for Stories by Foot."
        keywords="stories by foot support, ladakh trip help, cancel bike trip booking, road trip faqs, stories by foot email"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I book a trip?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Browse our destinations, select a package, and complete the booking form. You'll receive a confirmation email once your booking is processed.",
              },
            },
            {
              "@type": "Question",
              name: "Can I cancel my booking?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Cancellation policies vary by package. Please check your booking confirmation or contact support for specific cancellation terms.",
              },
            },
            {
              "@type": "Question",
              name: "What should I bring on a trip?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A detailed packing list will be sent to you via email after booking confirmation. It varies based on the destination and type of trip.",
              },
            },
          ],
        }}
      />
      <Navigation />

      <main className="flex-grow pb-[48px]">
        {/* Hero Banner (exact Thrillophilia proportions ~426px) */}
        <section
          className="relative pt-[114px] pb-[148px] sm:pt-[124px] sm:pb-[168px]"
          style={{
            background: "linear-gradient(105deg, #E87838 0%, #DF8255 52%, #C49B98 100%)",
          }}
        >
          {/* Subtle topographic wavy lines */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg
              aria-hidden="true"
              viewBox="0 0 1440 426"
              preserveAspectRatio="none"
              className="h-full w-full opacity-15"
            >
              <path
                d="M-60,95 C220,25 420,185 720,105 C1020,25 1220,175 1500,90"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <path
                d="M-60,165 C240,95 460,255 760,170 C1060,85 1240,230 1500,150"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <path
                d="M-60,240 C260,170 480,315 780,235 C1080,155 1260,290 1500,215"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="relative z-30 mx-auto max-w-[1128px] px-4 text-center sm:px-6 lg:px-0">
            <h1 className="text-[28px] font-bold leading-[1.15] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.06)] sm:text-[40px] sm:leading-[44px]">
              Hello, How Can We Help You?
            </h1>

            {/* Centered Search Bar (max-w 936px, h 60px, border-radius 12px) */}
            <div ref={searchWrapperRef} className="relative mx-auto mt-[40px] max-w-[936px]">
              <div className="flex h-[60px] items-center rounded-[12px] border border-[#e8e8eb] bg-white px-[24px] py-[8px]">
                <Search className="h-5 w-5 shrink-0 text-[#68686A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  placeholder="Search for booking help, permits, refunds, destinations..."
                  className="h-[40px] w-full border-0 bg-transparent pl-[12px] text-[16px] leading-[32px] text-[#202020] outline-none placeholder:text-[#8E8E93] sm:text-[18px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    aria-label="Clear search"
                    className="rounded-md p-1 text-[#68686A] hover:bg-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-[12px] border border-[#e8e8eb] bg-white p-2 text-left shadow-[0_4px_20px_#0000001f]">
                  {searchResults.length > 0 ? (
                    searchResults.map(({ categoryId, category, item }) => (
                      <Link
                        key={`${categoryId}-${item.slug}`}
                        to={`/support/category/${categoryId}/subcategory/${item.slug}`}
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-[#fbf0e9]"
                      >
                        <div>
                          <p className="text-[14px] font-semibold text-[#202020]">{item.title}</p>
                          <p className="text-[12px] text-[#68686A]">{category}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#E9610C]" />
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-4 text-center text-sm text-[#68686A]">
                      No help topics found. Try searching for booking, permits, or refunds.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Gentle convex arch (~28px) transitioning into #fbf0e9 */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-px overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 32"
              preserveAspectRatio="none"
              className="h-[24px] w-full sm:h-[28px]"
            >
              <path
                d="M0,32 C360,0 1080,0 1440,32 L1440,32 L0,32 Z"
                fill="#fbf0e9"
              />
            </svg>
          </div>
        </section>

        {/* 3-Column Category Cards Grid (max-w 1128px, gap 24px, card 360px, p 20px, radius 24px) */}
        <section
          className="relative z-10 mx-auto -mt-[96px] max-w-[1128px] px-4 sm:-mt-[104px] sm:px-6 lg:px-0"
          style={{
            background: "linear-gradient(180deg, transparent 0, #fbf0e9 140px)",
          }}
        >
          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isExpanded = !!expandedCards[category.id];
              const hasMore = category.items.length > 4;
              const visibleItems = isExpanded ? category.items : category.items.slice(0, 4);

              return (
                <div
                  key={category.id}
                  className="flex min-h-[180px] flex-col gap-[16px] rounded-[24px] border-[0.5px] border-[#e8e8eb] bg-white p-[20px] transition-shadow hover:shadow-[0_4px_12px_#0000001a]"
                >
                  <Link
                    to={`/support/category/${category.id}`}
                    className="flex items-center gap-[8px] transition hover:text-[#E9610C]"
                  >
                    <Icon className="h-[20px] w-[20px] shrink-0 text-[#E9610C]" />
                    <h2 className="text-[16px] font-bold leading-[24px] text-[#202020] hover:text-[#E9610C]">
                      {category.title}
                    </h2>
                  </Link>

                  <div className="border-t border-[#f2f2f2]" />

                  <ul className="flex flex-col gap-[4px]">
                    {visibleItems.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={`/support/category/${category.id}/subcategory/${item.slug}`}
                          className="flex min-h-[36px] w-full items-center gap-2 py-[8px] text-left text-[14px] font-medium leading-[20px] text-[#202020] transition hover:text-[#E9610C]"
                        >
                          <CornerDownRight className="h-3.5 w-3.5 shrink-0 text-[#68686A]" />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                    {hasMore && (
                      <li>
                        <button
                          type="button"
                          onClick={() => toggleExpand(category.id)}
                          className="inline-flex h-[32px] w-fit items-center gap-1 rounded-[8px] px-[16px] pl-0 text-[14px] font-normal text-[#E9610C] transition hover:bg-[#FFF5EE]"
                        >
                          <span>{isExpanded ? "Show less" : "Show more"}</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bottom "We're here for you" Card */}
          <div className="mt-[24px] rounded-[24px] border-[0.5px] border-[#e8e8eb] bg-white p-[20px] py-8 text-center">
            <h2 className="text-[24px] font-bold leading-[32px] text-[#202020]">
              We&apos;re here for you
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[14px] font-medium leading-[20px] text-[#68686A]">
              Didn&apos;t find the answer you needed? No worries — our travel experts are ready to assist.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-[12px] sm:flex-row">
              <Link
                to="/support/category/feedback-complaints/subcategory/raise-complaint#submit-ticket-form"
                className="inline-flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[12px] bg-[#F36812] px-[20px] text-[14px] font-semibold text-white transition hover:bg-[#E9610C] sm:w-auto"
              >
                <Ticket className="h-4 w-4" />
                Submit a ticket
              </Link>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex h-[40px] w-full items-center justify-center rounded-[12px] border-[1.5px] border-[#F36812] bg-transparent px-[20px] text-[14px] font-semibold text-[#E9610C] transition hover:bg-[#FFF5EE] sm:w-auto"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <GetInTouchModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default SupportPage;