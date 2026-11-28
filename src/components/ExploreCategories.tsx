import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  title: string;
  description: string;
  to: string;
  accent: string;
  circleBg: string;
  icon: ReactNode;
  photo: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    title: "Backpacking Trips",
    description: "For the wanderers and budget explorers.",
    to: "/destinations",
    accent: "#2755B0",
    circleBg: "rgb(234, 242, 255)",
    photo: "/images/vibe1.jpg",
    icon: (
      <svg viewBox="0 0 40 40" className="h-[38px] w-[38px]" fill="none">
        <path d="M14 10V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="9" y="10" width="22" height="24" rx="6" fill="#F29938" stroke="#111827" strokeWidth="1.8" />
        <path d="M13 10h14v7a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-7Z" fill="#FFF" stroke="#111827" strokeWidth="1.8" />
        <rect x="13" y="23" width="14" height="7" rx="2" fill="#FFF" stroke="#111827" strokeWidth="1.6" />
        <path d="M17 16v3M23 16v3" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Weekend Getaways",
    description: "Short trips. Big memories.",
    to: "/destinations/ladakh",
    accent: "#f59e0b",
    circleBg: "rgb(254, 243, 219)",
    photo: "/images/vibe2.jpg",
    icon: (
      <svg viewBox="0 0 40 40" className="h-[38px] w-[38px]" fill="none">
        <rect x="6" y="13" width="28" height="16" rx="4" fill="#F29938" stroke="#111827" strokeWidth="1.8" />
        <path d="M6 21h28" stroke="#111827" strokeWidth="1.6" />
        <rect x="9" y="16" width="6" height="5" rx="1" fill="#FFF" stroke="#111827" strokeWidth="1.4" />
        <rect x="17" y="16" width="6" height="5" rx="1" fill="#FFF" stroke="#111827" strokeWidth="1.4" />
        <rect x="25" y="16" width="6" height="5" rx="1" fill="#FFF" stroke="#111827" strokeWidth="1.4" />
        <path d="M12 10h16l2 3H10l2-3Z" fill="#FFF" stroke="#111827" strokeWidth="1.6" />
        <circle cx="13" cy="30" r="3" fill="#FFF" stroke="#111827" strokeWidth="1.8" />
        <circle cx="27" cy="30" r="3" fill="#FFF" stroke="#111827" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "International Trips",
    description: "Explore the world beyond borders.",
    to: "/destinations/bhutan",
    accent: "#8b5cf6",
    circleBg: "rgb(241, 234, 253)",
    photo: "/images/vibe3.jpg",
    icon: (
      <svg viewBox="0 0 40 40" className="h-[38px] w-[38px]" fill="none">
        <path
          d="M32 8L24.5 15.5L11 12L8.5 14.5L19 21L14 26L9.5 25L7.5 27L13 30.5L16.5 36L18.5 34L17.5 29.5L22.5 24.5L29 35L31.5 32.5L28 19L35.5 11.5C36.5 10.5 36.5 8.8 35.5 7.8C34.5 6.8 33 7 32 8Z"
          fill="#F29938"
          stroke="#111827"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Adventure Treks",
    description: "For thrill-seekers and nature lovers.",
    to: "/destinations/zanskar",
    accent: "#10b981",
    circleBg: "rgb(234, 248, 237)",
    photo: "/images/vibe4.jpg",
    icon: (
      <svg viewBox="0 0 40 40" className="h-[38px] w-[38px]" fill="none">
        <path d="M5 33L16 14L23 25L27 19L35 33H5Z" fill="#F29938" stroke="#111827" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 21L16 14L20 21" fill="#FFF" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M27 10V6M27 6L32 8L27 10" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Honeymoon Trips",
    description: "Romantic escapes, made unforgettable.",
    to: "/destinations/meghalaya",
    accent: "#ec4899",
    circleBg: "rgb(254, 234, 242)",
    photo: "/cliffhanger/images/cta-3-368x420.jpg",
    icon: (
      <svg viewBox="0 0 40 40" className="h-[38px] w-[38px]" fill="none">
        <path
          d="M20 33s-9.5-6.2-12.5-11.5C5.2 17.5 7 12 12 11c2.8-.6 5.6.8 7 3 1.4-2.2 4.2-3.6 7-3 5 1 6.8 6.5 4.5 10.5C29.5 26.8 20 33 20 33Z"
          fill="#F29938"
          stroke="#111827"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M16 7l1.5 2.5M24 7l-1.5 2.5M20 5.5v3" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Corporate Trips",
    description: "Travel that builds stronger teams.",
    to: "/contact",
    accent: "#0284c7",
    circleBg: "rgb(232, 244, 252)",
    photo: "/cliffhanger/images/cta-2-368x420.jpg",
    icon: (
      <svg viewBox="0 0 40 40" className="h-[38px] w-[38px]" fill="none">
        <path
          d="M8 21l6-6c1.5-1.5 4-1.5 5.5 0l2.5 2.5 4-4c1.5-1.5 4-1.5 5.5 0l2.5 2.5-9.5 11.5c-1.5 1.5-4 1.5-5.5 0L8 21Z"
          fill="#F29938"
          stroke="#111827"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M15 26l3 3M19 24l3 3" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const CategoryCard = ({ cat }: { cat: CategoryItem }) => {
  return (
    <Link
      to={cat.to}
      style={{ "--card-accent": cat.accent } as CSSProperties}
      className="group relative flex h-[386px] flex-col justify-between overflow-hidden rounded-[26px] bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 [backface-visibility:hidden] hover:-translate-y-2 hover:shadow-[0_20px_42px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)]"
    >
      {/* Top Content */}
      <div className="flex flex-col items-center px-4 pt-[26px] pb-0 text-center">
        <div
          className="mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: cat.circleBg }}
        >
          {cat.icon}
        </div>

        <h3 className="text-[16px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#111827] min-h-[42px] mb-2 flex items-center justify-center text-center">
          {cat.title}
        </h3>

        <p className="text-[13px] font-medium leading-[1.45] text-[#4b5563] min-h-[38px] mb-4 flex items-center justify-center text-center">
          {cat.description}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F29938] text-white transition-colors duration-300 group-hover:bg-[color:var(--card-accent)] group-hover:text-white">
          <ArrowRight className="h-4 w-4 stroke-[2.25]" />
        </div>
      </div>

      {/* Bottom Photo with CSS Alpha Mask Fade (eliminates subpixel top-edge seam) */}
      <div
        className="relative h-[120px] w-full overflow-hidden mt-auto"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.45) 32%, black 68%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.45) 32%, black 68%)",
        }}
      >
        <img
          src={cat.photo}
          alt={cat.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>
    </Link>
  );
};

const ExploreCategories = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-[#f4f7fc] via-[#f8faff] to-white overflow-hidden">
      {/* Subtle Dotted World-Map Style Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px] opacity-75"
        style={{
          backgroundImage: "radial-gradient(#cfdcf0 1.45px, transparent 1.45px)",
          backgroundSize: "12px 12px",
          maskImage:
            "radial-gradient(ellipse 35% 45% at 22% 38%, black 30%, transparent 75%), radial-gradient(ellipse 38% 50% at 54% 32%, black 35%, transparent 78%), radial-gradient(ellipse 28% 42% at 80% 42%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 35% 45% at 22% 38%, black 30%, transparent 75%), radial-gradient(ellipse 38% 50% at 54% 32%, black 35%, transparent 78%), radial-gradient(ellipse 28% 42% at 80% 42%, black 30%, transparent 75%)",
        }}
      />

      <div
        className="relative z-[5] w-full max-w-[1320px] px-3 mx-auto text-[var(--default-color,#35211f)]"
        style={{ fontFamily: 'Poppins, "Poppins Fallback", sans-serif' }}
      >
        {/* Left-Aligned Header Area (matching Journey to Incredible Places & Hot Tours) */}
        <div className="relative mb-10 text-left">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2.5">
            <span className="h-px w-8 bg-[#F29938]" />
            <span>Curated Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight text-[#181A1F]">
            Travel Your <span className="italic font-medium text-[#F29938]">Way</span>
          </h2>
          <p className="mt-2 font-sans text-sm sm:text-base text-slate-600 max-w-xl">
            Handpicked journeys crafted around how you love to travel.
          </p>
        </div>

        {/* Desktop 6-Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.title} cat={cat} />
          ))}
        </div>

        {/* Tablet 3-Column Grid */}
        <div className="hidden md:grid lg:hidden md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.title} cat={cat} />
          ))}
        </div>

        {/* Mobile Horizontal Swipeable Row */}
        <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory -mr-3 pr-3 pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="w-[215px] snap-start shrink-0">
              <CategoryCard cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
