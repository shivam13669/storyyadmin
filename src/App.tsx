import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import DestinationsPage from "./pages/Destinations";
import DestinationDetailPage from "./pages/DestinationDetail";
import ContactPage from "./pages/Contact";
import ServicesPage from "./pages/Services";
import TestimonialsPage from "./pages/Testimonials";
import AboutPage from "./pages/About";
import CareersPage from "./pages/Careers";
import BlogPage from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookingPage from "./pages/BookingPage";
import TermsAndConditionPage from "./pages/TermsAndCondition";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import CookiePolicyPage from "./pages/CookiePolicy";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SupportPage from "./pages/Support";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

import { CurrencyProvider } from "@/context/CurrencyContext";
import Footer from "@/components/Footer";

const AppContent = () => {
  const location = useLocation();
  // Hide footer on dashboard pages
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');
  const isHome = location.pathname === "/";
  const [iframeHeight, setIframeHeight] = useState("100vh");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "resize-iframe") {
        setIframeHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <ScrollToTop />
        <div 
          style={{ 
            position: isHome ? "relative" : "absolute",
            top: isHome ? "auto" : "-99999px",
            left: isHome ? "auto" : "-99999px",
            width: "100%",
            height: isHome ? "auto" : "0px",
            overflow: "hidden",
            visibility: isHome ? "visible" : "hidden",
            opacity: isHome ? 1 : 0,
            pointerEvents: isHome ? "auto" : "none"
          }} 
          className="w-full bg-white pt-16"
        >
          <iframe
            src="/cliffhanger/index.html"
            style={{ height: iframeHeight }}
            className="w-full border-none block"
            scrolling="no"
            title="Cliffhanger Home"
          />
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:slug" element={<DestinationsPage />} />
                <Route path="/destinations/:slug/:packageSlug" element={<DestinationDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/booking/:packageSlug" element={<BookingPage />} />
                <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </CurrencyProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
);

export default App;
