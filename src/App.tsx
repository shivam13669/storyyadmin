import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages for code splitting
const DestinationsPage = lazy(() => import("./pages/Destinations"));
const DestinationDetailPage = lazy(() => import("./pages/DestinationDetail"));
const ContactPage = lazy(() => import("./pages/Contact"));
const ServicesPage = lazy(() => import("./pages/Services"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials"));
const AboutPage = lazy(() => import("./pages/About"));
const CareersPage = lazy(() => import("./pages/Careers"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const TermsAndConditionPage = lazy(() => import("./pages/TermsAndCondition"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicy"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SupportPage = lazy(() => import("./pages/Support"));

const queryClient = new QueryClient();

import { CurrencyProvider } from "@/context/CurrencyContext";

// Loading component for lazy-loaded pages
const PageLoader = () => <div className="min-h-screen flex items-center justify-center">Loading...</div>;

const App = () => (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
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
                  <Route path="/booking/:packageSlug" element={<BookingPage />} />
                  <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    </AuthProvider>
);

export default App;
