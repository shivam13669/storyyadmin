import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Download, Filter, Search, Mail, Phone, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { UserDetailsModal } from "@/components/UserDetailsModal";

interface User {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string | null;
  countryCode: string;
  signupDate: string;
  isSuspended: boolean;
  gender?: string;
  role?: string;
}

interface CustomerManagementViewProps {
  users: User[];
  onDataChange: () => void;
}

export function CustomerManagementView({ users, onDataChange }: CustomerManagementViewProps) {
  // Filter out admins - only show customers
  const customersOnly = users.filter((u) => u.role !== "admin");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState(customersOnly);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active filter count
  const activeFiltersCount =
    (genderFilter !== "all" ? 1 : 0) +
    (periodFilter !== "all" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0);

  // Real-time filtering
  const applyFilters = (
    query = searchQuery,
    gender = genderFilter,
    period = periodFilter,
    status = statusFilter
  ) => {
    let list = customersOnly;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (user) =>
          (user.fullName && user.fullName.toLowerCase().includes(q)) ||
          (user.email && user.email.toLowerCase().includes(q)) ||
          (user.mobileNumber && user.mobileNumber.includes(q))
      );
    }

    if (gender !== "all") {
      if (gender === "Not Specified") {
        list = list.filter((u) => !u.gender || u.gender === "");
      } else {
        list = list.filter(
          (u) => u.gender && u.gender.toLowerCase() === gender.toLowerCase()
        );
      }
    }

    if (period !== "all") {
      const now = new Date();
      list = list.filter((u) => {
        const signup = new Date(u.signupDate);
        if (isNaN(signup.getTime())) return true;
        const diffDays = Math.ceil(
          Math.abs(now.getTime() - signup.getTime()) / (1000 * 60 * 60 * 24)
        );
        switch (period) {
          case "7days":
            return diffDays <= 7;
          case "30days":
            return diffDays <= 30;
          case "90days":
            return diffDays <= 90;
          case "thisMonth":
            return (
              signup.getMonth() === now.getMonth() &&
              signup.getFullYear() === now.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    if (status !== "all") {
      if (status === "active") {
        list = list.filter((u) => !u.isSuspended);
      } else if (status === "suspended") {
        list = list.filter((u) => u.isSuspended);
      }
    }

    setFilteredUsers(list);
  };

  const handleResetFilters = () => {
    setGenderFilter("all");
    setPeriodFilter("all");
    setStatusFilter("all");
    applyFilters(searchQuery, "all", "all", "all");
  };

  // Update filteredUsers when users list changes
  useEffect(() => {
    applyFilters(searchQuery, genderFilter, periodFilter, statusFilter);
  }, [users]);

  // Calculate metrics based on real customer data
  const totalCustomers = customersOnly.length;
  const maleCustomers = customersOnly.filter((u) => u.gender?.toLowerCase() === "male").length;
  const femaleCustomers = customersOnly.filter((u) => u.gender?.toLowerCase() === "female").length;
  const othersCustomers = customersOnly.filter((u) => u.gender?.toLowerCase() === "other").length;
  const notSpecifiedCustomers = customersOnly.filter((u) => !u.gender || u.gender === "").length;
  const thisMonth = customersOnly.filter(
    (u) => {
      const d = new Date(u.signupDate);
      return !isNaN(d.getTime()) && d.getMonth() === new Date().getMonth();
    }
  ).length;

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return name.substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-amber-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-cyan-500",
    ];
    return colors[id % colors.length];
  };

  const getNumericCountryCode = (code: string) => {
    const countryCodeMap: { [key: string]: string } = {
      IN: "91",
      US: "1",
      UK: "44",
      CA: "1",
      AU: "61",
      DE: "49",
      FR: "33",
      JP: "81",
    };
    return countryCodeMap[code] || code;
  };

  const isValidMobileNumber = (mobileNumber: string | null) => {
    return !!mobileNumber && !mobileNumber.startsWith("GOOGLE_");
  };

  const handleExportList = () => {
    const headers = ["Full Name", "Email", "Phone", "Registration Date"];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map((user) => {
        const dateObj = new Date(user.signupDate);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        return [
          user.fullName,
          user.email,
          isValidMobileNumber(user.mobileNumber)
            ? `+${getNumericCountryCode(user.countryCode)} ${user.mobileNumber}`
            : "",
          formattedDate,
        ];
      }),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Customer Management</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage and view all registered customers in your healthcare system
          </p>
        </div>
        <Button onClick={handleExportList} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export List
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-blue-600">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customer</p>
                <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-blue-600">👨</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Male Customer</p>
                <p className="text-2xl font-bold text-gray-900">{maleCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-pink-600">👩</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Female Customer</p>
                <p className="text-2xl font-bold text-gray-900">{femaleCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-purple-600">👤</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Others Customers</p>
                <p className="text-2xl font-bold text-gray-900">{othersCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-gray-600">🤷</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Not Specified</p>
                <p className="text-2xl font-bold text-gray-900">{notSpecifiedCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-orange-600">📅</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter (CRM Popover Filter UI) */}
      <Card className="border border-gray-200 shadow-md rounded-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, phone, or blood group..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  applyFilters(e.target.value, genderFilter, periodFilter, statusFilter);
                }}
                className="pl-10 h-10 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all"
              />
            </div>

            {/* CRM Style Filter Popover */}
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 h-10 border-gray-300">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span>Filter</span>
                  {activeFiltersCount > 0 && (
                    <span className="px-1.5 py-0.5 text-xs bg-blue-600 text-white font-semibold rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-5 space-y-4 shadow-xl border-gray-200 bg-white z-50" align="end">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Filter Customers</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600 hover:text-blue-700 h-auto p-0 flex items-center gap-1"
                      onClick={handleResetFilters}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset All
                    </Button>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-medium text-gray-700">Gender</Label>
                  <Select
                    value={genderFilter}
                    onValueChange={(val) => {
                      setGenderFilter(val);
                      applyFilters(searchQuery, val, periodFilter, statusFilter);
                    }}
                  >
                    <SelectTrigger className="mt-1 h-9 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all">
                      <SelectValue placeholder="All Genders" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Not Specified">Not Specified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-gray-700">Registration Period</Label>
                  <Select
                    value={periodFilter}
                    onValueChange={(val) => {
                      setPeriodFilter(val);
                      applyFilters(searchQuery, genderFilter, val, statusFilter);
                    }}
                  >
                    <SelectTrigger className="mt-1 h-9 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all">
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-medium text-gray-700">Account Status</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={(val) => {
                      setStatusFilter(val);
                      applyFilters(searchQuery, genderFilter, periodFilter, val);
                    }}
                  >
                    <SelectTrigger className="mt-1 h-9 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-all">
                      <SelectValue placeholder="All Accounts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="all">All Accounts</SelectItem>
                      <SelectItem value="active">Active Only</SelectItem>
                      <SelectItem value="suspended">Suspended Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleResetFilters();
                      setFilterOpen(false);
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setFilterOpen(false)}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <Card className="border-0 shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Customers List</CardTitle>
          <CardDescription>Complete list of registered customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm uppercase ${getAvatarColor(
                        user.id
                      )}`}
                    >
                      {getInitials(user.fullName)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{user.fullName}</h4>
                      <div className="flex flex-col gap-1 text-sm text-gray-600 mt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {user.email}
                        </span>
                        {isValidMobileNumber(user.mobileNumber) ? (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" /> +{getNumericCountryCode(user.countryCode)}{" "}
                            {user.mobileNumber}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400">
                            <Phone className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-600">
                      Joined: {format(new Date(user.signupDate), "dd/MM/yyyy")}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      aria-label="View customer"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-600">
                <p className="text-base font-medium">No customers found matching your criteria</p>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 text-blue-600"
                    onClick={handleResetFilters}
                  >
                    Reset all filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onDataChange={onDataChange}
          showActions={false}
        />
      )}
    </div>
  );
}
