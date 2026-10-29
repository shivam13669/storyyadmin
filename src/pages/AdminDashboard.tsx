import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LogOut,
  BarChart3,
  Users,
  Briefcase,
  FileText,
  Settings,
  Menu,
  X,
  Activity,
  Calendar,
  Star,
  RefreshCw,
  Home,
  ChevronDown,
  LineChart,
  Users2,
  UserCheck,
  Search,
  Filter,
  Bell,
  Shield,
  User as UserIcon,
  Lock,
  Palette,
  Database,
  KeyRound,
  CheckCircle2,
  Plus,
  LayoutList,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getAllUsers as getAllUsersFromAPI, getAllBookings, getAllTestimonials, Booking, Testimonial } from "@/lib/api";
import type { User } from "@/lib/db";
import { Coupon } from "@/utils/couponUtils";
import { format } from "date-fns";
import { AdminBookingsView } from "@/components/dashboardViews/AdminBookingsView";
import { AdminTestimonialsView } from "@/components/dashboardViews/AdminTestimonialsView";
import { AdminCouponsView } from "@/components/dashboardViews/AdminCouponsView";
import { AdminReportsView } from "@/components/dashboardViews/AdminReportsView";
import { CustomerManagementView } from "@/components/dashboardViews/CustomerManagementView";
import { UserManagementSystemView } from "@/components/dashboardViews/UserManagementSystemView";
import { AdminOTPManagementView } from "@/components/dashboardViews/AdminOTPManagementView";
import { CreateAdminUser } from "@/components/CreateAdminUser";
import { ChangePasswordModal } from "@/components/ChangePasswordModal";
import { changeUserPassword } from "@/lib/api";

const AdminDashboard = () => {
  const { user, isAuthenticated, isAdmin, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeNav, setActiveNav] = useState("overview");
  const [customerTab, setCustomerTab] = useState("customer");
  const [adminTab, setAdminTab] = useState("management");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState<"all" | "active" | "suspended">("all");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("security");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [bookingNotifs, setBookingNotifs] = useState(true);
  const [reviewNotifs, setReviewNotifs] = useState(true);
  const [securityNotifs, setSecurityNotifs] = useState(true);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Redirect if not admin
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      return;
    }

    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, isAuthenticated, authLoading, navigate]);

  // Load data
  const loadData = async () => {
    setLoading(true);
    try {
      const [usersResponse, bookingsResponse, testimonialsResponse, couponsResponse] = await Promise.all([
        getAllUsersFromAPI(),
        getAllBookings(),
        getAllTestimonials(),
        fetch('/api/coupons').then(res => res.json()).catch(() => ({ coupons: [] })),
      ]);
      setUsers(usersResponse.users || []);
      setBookings(bookingsResponse.bookings || []);
      setTestimonials(testimonialsResponse.testimonials || []);
      setCoupons(couponsResponse.coupons || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({ title: "Error", description: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    await changeUserPassword(user.id, oldPassword, newPassword);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate stats
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const visibleTestimonials = testimonials.filter((t) => t.isVisible).length;
  const pendingTestimonialsCount = testimonials.filter((t) => !t.isVisible).length;
  const suspendedAdminsCount = users.filter((u) => u.role === "admin" && u.isSuspended).length;
  const unreadNotifsCount = pendingBookings + pendingTestimonialsCount + suspendedAdminsCount;

  // Header quick search matches across dashboard
  const searchResults = searchQuery.trim()
    ? [
        ...users
          .filter(
            (u) =>
              u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              u.email?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3)
          .map((u) => ({
            title: u.fullName || "User",
            subtitle: u.email,
            type: u.role === "admin" ? "Admin" : "Customer",
            section: u.role === "admin" ? "admin" : "customers",
          })),
        ...bookings
          .filter(
            (b) =>
              b.tripName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.id.toString().includes(searchQuery)
          )
          .slice(0, 3)
          .map((b) => ({
            title: b.tripName,
            subtitle: `Booking #${b.id} • ${b.status}`,
            type: "Booking",
            section: "bookings",
          })),
        ...testimonials
          .filter(
            (t) =>
              t.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.quote?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 2)
          .map((t) => ({
            title: t.userName,
            subtitle: `${t.rating}★ Review`,
            type: "Review",
            section: "reviews",
          })),
      ]
    : [];

  const stats = [
    {
      label: "Total Customers",
      value: users.filter(u => u.role !== "admin").length,
      icon: Users,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "Registered users",
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: Briefcase,
      color: "bg-green-50",
      iconColor: "text-green-600",
      description: "All trip bookings",
    },
    {
      label: "Confirmed Trips",
      value: confirmedBookings,
      icon: CheckCircleIcon,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
      description: "Confirmed reservations",
    },
    {
      label: "Pending Bookings",
      value: pendingBookings,
      icon: Calendar,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
      description: "Awaiting confirmation",
    },
    {
      label: "Reviews & Ratings",
      value: testimonials.length,
      icon: Star,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      description: "User testimonials",
    },
    {
      label: "Published Reviews",
      value: visibleTestimonials,
      icon: FileText,
      color: "bg-pink-50",
      iconColor: "text-pink-600",
      description: "Visible testimonials",
    },
  ];

  const recentUsers = users.filter(u => u.role !== "admin").slice(-3).reverse();
  const recentBookings = bookings.slice(-5).reverse();
  const recentTestimonials = testimonials.slice(-5).reverse();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filtered admins list
  const filteredAdmins = users
    .filter((u) => u.role === "admin")
    .filter((admin) => {
      if (adminStatusFilter === "active" && admin.isSuspended) return false;
      if (adminStatusFilter === "suspended" && !admin.isSuspended) return false;
      if (!adminSearch.trim()) return true;
      const query = adminSearch.toLowerCase();
      return (
        (admin.fullName && admin.fullName.toLowerCase().includes(query)) ||
        (admin.email && admin.email.toLowerCase().includes(query)) ||
        (admin.mobileNumber && admin.mobileNumber.toLowerCase().includes(query))
      );
    });

  // Don't render content until auth is verified
  // Show NotFound if not authenticated, loading while auth is loading or not admin
  if (!authLoading && !isAuthenticated) {
    return <NotFound />;
  }

  if (authLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 admin-dashboard">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">
            Stories by <span className="text-secondary">Foot</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm text-slate-300 hover:text-white"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span>Go to Home</span>
          </button>

          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "admin", label: "Admin", icon: Users },
            { id: "customers", label: "Customers", icon: Users },
            { id: "bookings", label: "Bookings", icon: Briefcase },
            { id: "reviews", label: "Customer Feedback", icon: FileText },
            { id: "coupons", label: "Coupons", icon: Briefcase },
            { id: "otp", label: "OTP Management", icon: Shield },
            { id: "reports", label: "Reports & Analytics", icon: LineChart },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-orange-400 hover:text-orange-300 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar with Search & Notifications (CRM Features integrated smoothly) */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="min-w-0 hidden md:block">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Admin Dashboard</h2>
              <p className="text-xs sm:text-sm text-gray-600">Complete overview of your travel operations</p>
            </div>

            {/* Header Search Bar (CRM Style) */}
            <div className="relative hidden sm:block ml-0 md:ml-4" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search customers, bookings, reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="pl-10 pr-4 py-2 w-60 lg:w-80 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-xs"
              />
              {/* Quick Search Results Dropdown */}
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden divide-y divide-gray-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setActiveNav(item.section);
                          setSearchQuery("");
                          setSearchFocused(false);
                        }}
                        className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between text-sm transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                        <Badge variant="outline" className="text-xs uppercase">{item.type}</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-500">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Refresh Data Button */}
            <Button
              onClick={loadData}
              disabled={loading}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 px-2 sm:px-3"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden md:inline">Refresh Data</span>
            </Button>
            <Button
              onClick={loadData}
              disabled={loading}
              variant="outline"
              size="sm"
              className="sm:hidden p-2"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>

            {/* Notification Bell Button & Dropdown (CRM Feature) */}
            <div className="relative" ref={notifMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadNotifsCount > 9 ? "9+" : unreadNotifsCount}
                  </span>
                )}
              </Button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h4 className="font-semibold text-gray-900 text-sm">Notifications</h4>
                    <span className="text-xs text-blue-600 font-medium">
                      {unreadNotifsCount} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {pendingBookings > 0 && (
                      <div
                        onClick={() => {
                          setActiveNav("bookings");
                          setNotificationsOpen(false);
                        }}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <Calendar className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-gray-900">
                              {pendingBookings} Pending Bookings
                            </p>
                            <p className="text-xs text-gray-500">Trip reservations awaiting confirmation</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {pendingTestimonialsCount > 0 && (
                      <div
                        onClick={() => {
                          setActiveNav("reviews");
                          setNotificationsOpen(false);
                        }}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <Star className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-gray-900">
                              {pendingTestimonialsCount} Pending Reviews
                            </p>
                            <p className="text-xs text-gray-500">New customer reviews awaiting approval</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {suspendedAdminsCount > 0 && (
                      <div
                        onClick={() => {
                          setActiveNav("admin");
                          setNotificationsOpen(false);
                        }}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <Shield className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-gray-900">
                              {suspendedAdminsCount} Suspended Admin(s)
                            </p>
                            <p className="text-xs text-gray-500">Accounts requiring administrative review</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {unreadNotifsCount === 0 && (
                      <div className="p-6 text-center text-xs text-gray-500">
                        All notifications cleared! System is up to date.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                  A
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-900 hidden sm:block">
                  Admin
                </span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/");
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 font-medium text-sm"
                  >
                    <Home className="w-4 h-4" />
                    Go to Home
                  </button>
                  <button
                    onClick={() => {
                      setIsPasswordModalOpen(true);
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 font-medium text-sm"
                  >
                    <Settings className="w-4 h-4" />
                    Change Password
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : activeNav === "overview" ? (
            <>
              {/* Statistics Cards Grid (Exact Original Layout & Font Sizes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  // Determine which section to navigate to based on card label
                  const getNavigationSection = (label: string) => {
                    switch (label) {
                      case "Total Customers":
                        return "customers";
                      case "Total Bookings":
                      case "Confirmed Trips":
                      case "Pending Bookings":
                        return "bookings";
                      case "Reviews & Ratings":
                      case "Published Reviews":
                        return "reviews";
                      default:
                        return "overview";
                    }
                  };

                  return (
                    <Card
                      key={index}
                      className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-2xl"
                      onClick={() => {
                        setActiveNav(getNavigationSection(stat.label));
                        setSidebarOpen(false);
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                          </div>
                          <div className={`${stat.color} p-3 rounded-xl`}>
                            <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Main Grid - Row 1: Users, Bookings, Reviews */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Customers */}
                <Card className="border-0 shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Recent Customers
                    </CardTitle>
                    <CardDescription>Latest registrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentUsers.length > 0 ? (
                        recentUsers.map((u) => (
                          <div key={u.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{u.fullName}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                            <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                              {u.role === "admin" ? "Admin" : "User"}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No travelers yet</p>
                      )}
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="w-full mt-4 text-primary"
                      onClick={() => {
                        setActiveNav("customers");
                        setSidebarOpen(false);
                      }}
                    >
                      View all customers →
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Bookings */}
                <Card className="border-0 shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Bookings
                    </CardTitle>
                    <CardDescription>Latest trip bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentBookings.length > 0 ? (
                        recentBookings.map((b) => (
                          <div key={b.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{b.tripName}</p>
                              <p className="text-xs text-gray-500">
                                {format(new Date(b.tripDate), "MMM dd, yyyy")}
                              </p>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(b.status)}`}>
                              {b.status}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No bookings yet</p>
                      )}
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="w-full mt-4 text-primary"
                      onClick={() => {
                        setActiveNav("bookings");
                        setSidebarOpen(false);
                      }}
                    >
                      View all bookings →
                    </Button>
                  </CardContent>
                </Card>

                {/* Reviews & Testimonials */}
                <Card className="border-0 shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Recent Reviews
                    </CardTitle>
                    <CardDescription>User testimonials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentTestimonials.length > 0 ? (
                        recentTestimonials.map((t) => (
                          <div key={t.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{t.userName}</p>
                              <p className="text-xs text-gray-500">⭐ {t.rating} rating</p>
                            </div>
                            <Badge variant={t.isVisible ? "default" : "secondary"}>
                              {t.isVisible ? "Public" : "Hidden"}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No reviews yet</p>
                      )}
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="w-full mt-4 text-primary"
                      onClick={() => {
                        setActiveNav("reviews");
                        setSidebarOpen(false);
                      }}
                    >
                      View all reviews →
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* System Overview */}
              <Card className="border-0 shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Overview
                  </CardTitle>
                  <CardDescription>Real-time travel system metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{users.filter(u => u.role !== "admin").length}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Customers</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{bookings.length}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Bookings</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-emerald-600">{confirmedBookings}</div>
                      <div className="text-sm text-gray-600 mt-1">Confirmed</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-amber-600">{pendingBookings}</div>
                      <div className="text-sm text-gray-600 mt-1">Pending</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{testimonials.length}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Reviews</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-pink-600">{visibleTestimonials}</div>
                      <div className="text-sm text-gray-600 mt-1">Published</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : activeNav === "reports" ? (
            <AdminReportsView bookings={bookings} users={users} testimonials={testimonials} />
          ) : activeNav === "customers" ? (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Customers</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Manage customers and user accounts
                </p>
              </div>

              {/* Tab Navigation (CRM Style) */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setCustomerTab("customer")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    customerTab === "customer"
                      ? "bg-white text-[#1e88e5] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Customers
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerTab("users")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    customerTab === "users"
                      ? "bg-white text-[#1e88e5] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  User Management
                </button>
              </div>

              {/* Tabs Section */}
              <Tabs value={customerTab} onValueChange={setCustomerTab} className="space-y-6">
                {/* CUSTOMER TAB */}
                <TabsContent value="customer">
                  <CustomerManagementView users={users} onDataChange={loadData} />
                </TabsContent>

                {/* USER MANAGEMENT TAB */}
                <TabsContent value="users">
                  <UserManagementSystemView users={users} onDataChange={loadData} />
                </TabsContent>
              </Tabs>
            </div>
          ) : activeNav === "admin" ? (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Manage admin users and permissions
                </p>
              </div>

              {/* Tab Navigation (CRM Style) */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setAdminTab("management")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    adminTab === "management"
                      ? "bg-white text-[#1e88e5] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                  Manage Admins
                </button>
                <button
                  type="button"
                  onClick={() => setAdminTab("create")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    adminTab === "create"
                      ? "bg-white text-[#1e88e5] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Create Admin
                </button>
              </div>

              <Tabs value={adminTab} onValueChange={setAdminTab} className="space-y-6">

                {/* ADMIN MANAGEMENT TAB */}
                <TabsContent value="management" className="space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-0 shadow-md rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-3 rounded-xl">
                            <span className="text-2xl font-bold text-blue-600">👥</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Admins</p>
                            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === "admin").length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-3 rounded-xl">
                            <span className="text-2xl font-bold text-green-600">✅</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Active Admins</p>
                            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === "admin" && !u.isSuspended).length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-orange-100 p-3 rounded-xl">
                            <span className="text-2xl font-bold text-orange-600">⛔</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Suspended</p>
                            <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === "admin" && u.isSuspended).length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Search and Filter (CRM Style Popover Filter) */}
                  <Card className="border border-gray-200 shadow-md rounded-2xl bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex-1 w-full relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                          <Input
                            placeholder="Search by name, email, or username..."
                            value={adminSearch}
                            onChange={(e) => setAdminSearch(e.target.value)}
                            className="pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all"
                          />
                        </div>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                              <Filter className="w-4 h-4" />
                              Filter
                              {adminStatusFilter !== "all" && (
                                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold">
                                  1
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 bg-white p-4 shadow-lg border border-gray-200 rounded-xl z-50" align="end">
                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">Status</label>
                              <Select
                                value={adminStatusFilter}
                                onValueChange={(val: "all" | "active" | "suspended") => setAdminStatusFilter(val)}
                              >
                                <SelectTrigger className="w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white z-50">
                                  <SelectItem value="all">All</SelectItem>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admin Users List */}
                  <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
                    <CardHeader>
                      <CardTitle>Admin Users</CardTitle>
                      <CardDescription>All admin accounts in the system</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      {filteredAdmins.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-900">Email</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-900">Phone</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-900">Joined</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAdmins.map((admin) => (
                                <tr
                                  key={admin.id}
                                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                  <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">{admin.fullName}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="text-sm text-gray-700">{admin.email}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="text-sm text-gray-700">+{admin.countryCode} {admin.mobileNumber}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span
                                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                        admin.isSuspended
                                          ? "bg-red-100 text-red-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {admin.isSuspended ? "Suspended" : "Active"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                      <p className="font-medium">{format(new Date(admin.signupDate), "dd/MM/yyyy")}</p>
                                      <p className="text-xs text-gray-600">{format(new Date(admin.signupDate), "h:mm a")}</p>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-600">
                          <p>No admin users found matching your criteria</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* CREATE ADMIN TAB */}
                <TabsContent value="create">
                  <CreateAdminUser onSuccess={() => { loadData(); setAdminTab("management"); }} />
                </TabsContent>
              </Tabs>
            </div>
          ) : activeNav === "bookings" ? (
            <AdminBookingsView bookings={bookings} users={users} />
          ) : activeNav === "reviews" ? (
            <AdminTestimonialsView testimonials={testimonials} onDataChange={loadData} />
          ) : activeNav === "coupons" ? (
            <AdminCouponsView initialCoupons={coupons} onDataChange={loadData} />
          ) : activeNav === "otp" ? (
            <AdminOTPManagementView />
          ) : activeNav === "settings" ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="h-6 w-6 text-gray-700" />
                    Settings
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Manage your account settings and system preferences</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs uppercase font-semibold">
                    {user?.role || "ADMIN"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {user?.fullName || "Admin"}
                  </Badge>
                </div>
              </div>

              {/* Settings Tabs (Full-width strip like before with blue active selection) */}
              <div className="grid w-full grid-cols-2 sm:grid-cols-5 bg-gray-100 p-1 rounded-xl h-auto gap-1">
                {[
                  { id: "account", label: "Account", icon: UserIcon },
                  { id: "security", label: "Security", icon: Lock },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "appearance", label: "Appearance", icon: Palette },
                  { id: "system", label: "System", icon: Database },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = settingsTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSettingsTab(tab.id)}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <Tabs value={settingsTab} onValueChange={setSettingsTab} className="space-y-6">

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                  <Card className="border-0 shadow-md rounded-2xl bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                        Account Information
                      </CardTitle>
                      <CardDescription>View and manage your administrator account details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Full Name</p>
                          <p className="text-base font-semibold text-gray-900 mt-1">{user?.fullName || "—"}</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Email Address</p>
                          <p className="text-base font-semibold text-gray-900 mt-1">{user?.email || "—"}</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                          <p className="text-base font-semibold text-gray-900 mt-1">
                            +{user?.countryCode || "91"} {user?.mobileNumber || "—"}
                          </p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Role & Permissions</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge className="bg-blue-600 text-white">Administrator</Badge>
                            <Badge variant="outline">Full Access</Badge>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Member Since</p>
                          <p className="text-base font-semibold text-gray-900 mt-1">
                            {user?.signupDate && !isNaN(new Date(user.signupDate).getTime())
                              ? format(new Date(user.signupDate), "MMMM dd, yyyy")
                              : "—"}
                          </p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Account Status</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                            <span className="text-sm font-semibold text-green-700">Active</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <Card className="border-0 shadow-md rounded-2xl bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Lock className="h-5 w-5 text-blue-600" />
                        Password & Security
                      </CardTitle>
                      <CardDescription>Manage your password and security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2.5 rounded-xl">
                            <KeyRound className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">Account Password</div>
                            <div className="text-xs text-gray-500">Regularly updating your password keeps your account secure</div>
                          </div>
                        </div>
                        <Button
                          onClick={() => setIsPasswordModalOpen(true)}
                          className="sm:w-auto"
                        >
                          Change Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                  <Card className="border-0 shadow-md rounded-2xl bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Bell className="h-5 w-5 text-blue-600" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>Configure how and when you receive system alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive email summaries for critical updates and booking events</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailNotifs}
                          onChange={(e) => setEmailNotifs(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Booking Alerts</p>
                          <p className="text-xs text-gray-500">Get notified immediately when new trip reservations are created</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={bookingNotifs}
                          onChange={(e) => setBookingNotifs(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Customer Feedback & Reviews</p>
                          <p className="text-xs text-gray-500">Instant notification when a customer submits feedback or a review</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={reviewNotifs}
                          onChange={(e) => setReviewNotifs(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Security & Admin Alerts</p>
                          <p className="text-xs text-gray-500">Alerts regarding admin login activities and permission updates</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={securityNotifs}
                          onChange={(e) => setSecurityNotifs(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button
                          onClick={() => toast({ title: "Success", description: "Notification preferences saved" })}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Save Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-6">
                  <Card className="border-0 shadow-md rounded-2xl bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Palette className="h-5 w-5 text-blue-600" />
                        Theme & Appearance
                      </CardTitle>
                      <CardDescription>Customize the look and feel of your admin dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 border-2 border-blue-600 rounded-xl bg-blue-50/30 cursor-pointer">
                          <div className="w-full h-20 bg-gray-100 rounded-lg mb-3 border border-gray-200 flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-700">Light Mode</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">Light (Default)</p>
                          <p className="text-xs text-gray-500 mt-1">Clean and crisp daylight contrast</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 opacity-75 cursor-pointer hover:border-gray-300 transition-colors">
                          <div className="w-full h-20 bg-slate-900 rounded-lg mb-3 border border-slate-800 flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">Dark Mode</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">Dark</p>
                          <p className="text-xs text-gray-500 mt-1">High-contrast dark theme</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 opacity-75 cursor-pointer hover:border-gray-300 transition-colors">
                          <div className="w-full h-20 bg-gradient-to-r from-gray-100 to-slate-900 rounded-lg mb-3 border border-gray-200 flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-800">System</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">System Sync</p>
                          <p className="text-xs text-gray-500 mt-1">Match device operating system</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* System Tab */}
                <TabsContent value="system" className="space-y-6">
                  <Card className="border-0 shadow-md rounded-2xl bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Database className="h-5 w-5 text-blue-600" />
                        System Configuration
                      </CardTitle>
                      <CardDescription>System-wide metrics and database configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">System Status</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-semibold text-green-700">Online & Healthy</span>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Database</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">SQLite (Local Storage)</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">API Version</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">v1.0.0 (Express)</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                          <p className="text-xs text-gray-500 font-medium">Server Port</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">5000 (Backend) / 5000 (Vite)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : null}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />
    </div>
  );
};

// Helper component for CheckCircle icon
function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default AdminDashboard;
