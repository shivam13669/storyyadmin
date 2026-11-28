import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown, LayoutDashboard, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { CurrencyPicker } from "./CurrencyPicker";
import { LoginModal } from "./LoginModal";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/photopng.png";

const destinationDropdownItems = [
  { name: "All Destinations", to: "/destinations" },
  { name: "Ladakh", to: "/destinations/ladakh" },
  { name: "Zanskar", to: "/destinations/zanskar" },
  { name: "Tawang", to: "/destinations/tawang" },
  { name: "Bhutan", to: "/destinations/bhutan" },
  { name: "Nepal", to: "/destinations/nepal" },
  { name: "Meghalaya", to: "/destinations/meghalaya" },
];

const experiencesDropdownItems = [
  { name: "Our Services", to: "/services" },
  { name: "Testimonials", to: "/testimonials" },
  { name: "Careers", to: "/careers" },
];

const getFirstName = (fullName: string): string => {
  return fullName.trim().split(/\s+/)[0] || fullName;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"destinations" | "experiences" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrencyWithRegion } = useCurrency();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const headerBgClass =
    isHome && !scrolled
      ? "bg-transparent border-b border-transparent"
      : "bg-slate-950/90 backdrop-blur-lg border-b border-white/10 shadow-lg";

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${headerBgClass}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex shrink-0 items-center gap-2.5 no-underline group">
            <img
              src={logoImg}
              alt="Stories by Foot logo"
              className="h-9 w-auto sm:h-10 flex-shrink-0 object-contain"
            />
            <span className="font-serif text-xl sm:text-[22px] font-medium tracking-tight text-white whitespace-nowrap">
              Stories by <span className="text-[#F29938]">Foot</span>
            </span>
          </Link>

          {/* Desktop Navigation - Editorial Serif Links */}
          <div ref={navDropdownRef} className="hidden lg:flex items-center gap-5 xl:gap-8 font-serif whitespace-nowrap">
            <Link
              to="/"
              className={`relative py-1.5 text-[15px] tracking-wide transition-colors ${
                isActive("/") ? "text-white" : "text-white/85 hover:text-white"
              }`}
            >
              Home
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-[#F29938] transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0"
                }`}
              />
            </Link>

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("destinations")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/destinations"
                className={`flex items-center gap-1.5 py-1.5 text-[15px] tracking-wide transition-colors ${
                  isActive("/destinations") ? "text-white" : "text-white/85 hover:text-white"
                }`}
              >
                Destinations
                <ChevronDown className="h-3.5 w-3.5 opacity-80" />
              </Link>
              {openDropdown === "destinations" && (
                <div className="absolute left-0 top-full pt-2 w-48 z-[100] font-sans">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl py-2">
                    {destinationDropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Experiences Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("experiences")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/services"
                className={`flex items-center gap-1.5 py-1.5 text-[15px] tracking-wide transition-colors ${
                  isActive("/services") || isActive("/testimonials")
                    ? "text-white"
                    : "text-white/85 hover:text-white"
                }`}
              >
                Experiences
                <ChevronDown className="h-3.5 w-3.5 opacity-80" />
              </Link>
              {openDropdown === "experiences" && (
                <div className="absolute left-0 top-full pt-2 w-48 z-[100] font-sans">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl py-2">
                    {experiencesDropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`relative py-1.5 text-[15px] tracking-wide transition-colors ${
                isActive("/blog") ? "text-white" : "text-white/85 hover:text-white"
              }`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`relative py-1.5 text-[15px] tracking-wide transition-colors ${
                isActive("/about") ? "text-white" : "text-white/85 hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`relative py-1.5 text-[15px] tracking-wide transition-colors ${
                isActive("/contact") ? "text-white" : "text-white/85 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Currency + Auth */}
          <div className="hidden lg:flex shrink-0 items-center gap-3">
            <CurrencyPicker value={currency} onChange={setCurrencyWithRegion} />

            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 whitespace-nowrap text-white/90 hover:text-white font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Hi, {getFirstName(user.fullName)}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/15 rounded-xl shadow-2xl py-2 z-[100]">
                    <Link
                      to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {isAdmin ? "Admin Dashboard" : "Dashboard"}
                    </Link>
                    <Link
                      to="/support"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Support & FAQ
                    </Link>
                    <hr className="border-white/10 my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="px-3 pt-2 pb-4 space-y-1 bg-slate-950/95 border border-white/10 backdrop-blur-xl rounded-2xl mt-1 shadow-2xl">
              {[
                { name: "Home", to: "/" },
                { name: "Destinations", to: "/destinations" },
                { name: "Experiences & Services", to: "/services" },
                { name: "Testimonials", to: "/testimonials" },
                { name: "Blog", to: "/blog" },
                { name: "About", to: "/about" },
                { name: "Contact", to: "/contact" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="px-3 pt-3 space-y-2.5 border-t border-white/10 mt-2">
                <div className="flex items-center gap-2">
                  <CurrencyPicker value={currency} onChange={setCurrencyWithRegion} className="flex-1" />
                  {!isAuthenticated && user === null && (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        setIsOpen(false);
                      }}
                      className="flex-none px-4 py-2 rounded-md bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      Login
                    </button>
                  )}
                </div>

                {isAuthenticated && user && (
                  <div className="space-y-1 pt-1">
                    <Link
                      to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                      className="flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {isAdmin ? "Admin Dashboard" : "Dashboard"}
                    </Link>
                    <Link
                      to="/support"
                      className="flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Support & FAQ
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
};

export default Navigation;
