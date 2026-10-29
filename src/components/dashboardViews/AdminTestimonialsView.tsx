import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { deleteTestimonial } from "@/lib/api";
import {
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Mail,
  MapPin,
  Star,
  ThumbsUp,
  TrendingUp,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";

export interface Testimonial {
  id: number;
  userId: number;
  userName: string;
  email: string;
  tripName: string;
  quote: string;
  rating: number;
  role?: string;
  location?: string;
  highlight?: string;
  submittedDate: string;
  isVisible: boolean;
  type?: "feedback" | "complaint";
  status?: "pending" | "in_review" | "resolved" | "closed";
  priority?: "low" | "normal" | "high" | "urgent";
  adminResponse?: string;
}

interface AdminTestimonialsViewProps {
  testimonials: Testimonial[];
  onDataChange: () => void;
  initialTab?: "feedback" | "complaint" | "ratings";
}

interface FeedbackItemMeta {
  type: "feedback" | "complaint";
  status: "pending" | "in_review" | "resolved" | "closed";
  priority: "low" | "normal" | "high" | "urgent";
  adminResponse: string;
}

export function AdminTestimonialsView({
  testimonials,
  onDataChange,
  initialTab = "feedback",
}: AdminTestimonialsViewProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"feedback" | "complaint" | "ratings">(initialTab);
  const [filter, setFilter] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Local state storage for statuses and admin responses (persists in session)
  const [metaState, setMetaState] = useState<Record<number, FeedbackItemMeta>>(() => {
    try {
      const saved = localStorage.getItem("crm_feedback_meta");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveMetaState = (newState: Record<number, FeedbackItemMeta>) => {
    setMetaState(newState);
    try {
      localStorage.setItem("crm_feedback_meta", JSON.stringify(newState));
    } catch (e) {
      console.error("Failed to save feedback meta:", e);
    }
  };

  const [selectedFeedback, setSelectedFeedback] = useState<Testimonial | null>(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [newStatus, setNewStatus] = useState<"pending" | "in_review" | "resolved" | "closed">("pending");

  // Merge testimonials with local meta
  const enrichedTestimonials = useMemo(() => {
    return testimonials.map((t) => {
      const meta = metaState[t.id];
      const inferredType: "feedback" | "complaint" = t.rating <= 2 ? "complaint" : "feedback";
      const inferredStatus: "pending" | "in_review" | "resolved" | "closed" = t.isVisible
        ? "resolved"
        : "pending";
      const inferredPriority: "low" | "normal" | "high" | "urgent" =
        t.rating <= 1 ? "urgent" : t.rating <= 2 ? "high" : "normal";

      return {
        ...t,
        type: meta?.type || t.type || inferredType,
        status: meta?.status || t.status || inferredStatus,
        priority: meta?.priority || t.priority || inferredPriority,
        adminResponse: meta?.adminResponse || t.adminResponse || "",
      };
    });
  }, [testimonials, metaState]);

  // Statistics
  const stats = useMemo(() => {
    const feedbackOnly = enrichedTestimonials.filter((t) => t.type === "feedback");
    const complaintsOnly = enrichedTestimonials.filter((t) => t.type === "complaint");

    return {
      total: enrichedTestimonials.length,
      totalFeedback: feedbackOnly.length,
      totalComplaints: complaintsOnly.length,
      pending: enrichedTestimonials.filter((t) => t.status === "pending").length,
      inReview: enrichedTestimonials.filter((t) => t.status === "in_review").length,
      resolved: enrichedTestimonials.filter((t) => t.status === "resolved").length,
      closed: enrichedTestimonials.filter((t) => t.status === "closed").length,
      avgRating: enrichedTestimonials.length
        ? (
            enrichedTestimonials.reduce((sum, item) => sum + item.rating, 0) /
            enrichedTestimonials.length
          ).toFixed(1)
        : "5.0",
      ratingCounts: [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: enrichedTestimonials.filter((t) => Math.round(t.rating) === stars).length,
      })),
    };
  }, [enrichedTestimonials]);

  const updateFeedbackStatus = (
    id: number,
    status: "pending" | "in_review" | "resolved" | "closed",
    responseMsg?: string
  ) => {
    const current = enrichedTestimonials.find((t) => t.id === id);
    if (!current) return;

    const nextMeta: Record<number, FeedbackItemMeta> = {
      ...metaState,
      [id]: {
        type: current.type || "feedback",
        status,
        priority: current.priority || "normal",
        adminResponse: responseMsg !== undefined ? responseMsg : current.adminResponse || "",
      },
    };

    saveMetaState(nextMeta);
    toast({
      title: "Updated",
      description: `Status updated to ${status.replace("_", " ")}`,
    });
  };

  const handleDeleteTestimonial = async (testimonialId: number) => {
    setLoading(true);
    try {
      await deleteTestimonial(testimonialId);
      toast({ title: "Success", description: "Feedback removed successfully" });
      onDataChange();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove feedback",
      });
    } finally {
      setLoading(false);
      setDeleteConfirmId(null);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in_review":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type?: string) => {
    return type === "complaint" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800";
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredItems = enrichedTestimonials.filter((item) => {
    if (activeTab === "feedback" && item.type !== "feedback") return false;
    if (activeTab === "complaint" && item.type !== "complaint") return false;

    if (filter === "all") return true;
    if (filter === "feedback") return item.type === "feedback";
    if (filter === "complaints") return item.type === "complaint";
    return item.status === filter;
  });

  const formatDateTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return format(d, "MMM dd, yyyy h:mm a");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Feedback Management</h1>
          <p className="text-muted-foreground mt-2">
            Review and respond to customer feedback and complaints
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Filter feedback" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Feedback</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="feedback">Feedback Only</SelectItem>
              <SelectItem value="complaints">Complaints Only</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={onDataChange} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tab Navigation (Pill switcher like CRMManagement) */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("feedback")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "feedback"
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ThumbsUp className="w-4 h-4 inline mr-2" />
          Feedback
        </button>
        <button
          onClick={() => setActiveTab("complaint")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "complaint"
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Complaints
        </button>
        <button
          onClick={() => setActiveTab("ratings")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "ratings"
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Star className="w-4 h-4 inline mr-2" />
          Response Ratings
        </button>
      </div>

      {/* FEEDBACK TAB CONTENT */}
      {activeTab === "feedback" && (
        <>
          {/* Stats Cards Grid (5 cards with colorful square icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted0 rounded-lg flex items-center justify-center text-white">
                    <ThumbsUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.totalFeedback}</div>
                    <div className="text-sm text-muted-foreground">Total Feedback</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.resolved}</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.inReview}</div>
                    <div className="text-sm text-muted-foreground">In Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-background0 rounded-lg flex items-center justify-center text-white">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.closed}</div>
                    <div className="text-sm text-muted-foreground">Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback List Card */}
          <Card className="rounded-2xl shadow-md border-0 bg-white">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>
                Showing {filteredItems.length} of {stats.totalFeedback} feedback items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <Badge className={getTypeColor(item.type)}>
                              {item.type}
                            </Badge>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace("_", " ")}
                            </Badge>
                            {item.rating && (
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= Math.round(item.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm text-muted-foreground ml-1">
                                  ({item.rating}/5)
                                </span>
                              </div>
                            )}
                          </div>

                          <h3 className="font-semibold text-foreground mb-1">
                            {item.tripName || "Tour Feedback"}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            "{item.quote}"
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              <span>{item.userName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{item.email}</span>
                            </div>
                            {item.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{item.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatDateTime(item.submittedDate)}</span>
                            </div>
                          </div>

                          {item.adminResponse && (
                            <div className="mt-3 p-3 bg-muted border border-blue-100 rounded-lg text-xs text-blue-900">
                              <span className="font-semibold">Admin Response:</span> {item.adminResponse}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center sm:flex-col gap-2 flex-shrink-0">
                          {/* Quick Actions */}
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateFeedbackStatus(item.id, "in_review", "Under review by admin.")
                              }
                              className="text-primary border-input hover:bg-muted text-xs h-8"
                            >
                              Start Review
                            </Button>
                          )}

                          {item.status === "in_review" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateFeedbackStatus(
                                  item.id,
                                  "resolved",
                                  "Feedback acknowledged and resolved."
                                )
                              }
                              className="text-green-600 border-green-300 hover:bg-green-50 text-xs h-8"
                            >
                              Mark Resolved
                            </Button>
                          )}

                          {/* View Details Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedFeedback(item);
                                  setAdminResponse(item.adminResponse || "");
                                  setNewStatus(item.status || "pending");
                                  if (item.status === "pending") {
                                    updateFeedbackStatus(item.id, "in_review");
                                  }
                                }}
                                className="text-xs h-8"
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl">
                              <DialogHeader>
                                <DialogTitle>Feedback Details</DialogTitle>
                                <DialogDescription>
                                  View customer feedback and manage response
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4 pt-2">
                                <div className="flex flex-wrap gap-2">
                                  <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                                  <Badge className={getPriorityColor(item.priority)}>
                                    {item.priority}
                                  </Badge>
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status.replace("_", " ")}
                                  </Badge>
                                </div>

                                <div>
                                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                    Trip / Subject:
                                  </h4>
                                  <p className="text-base font-medium text-foreground">{item.tripName}</p>
                                </div>

                                <div>
                                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                    Customer Feedback:
                                  </h4>
                                  <div className="p-3 bg-background rounded-lg text-sm text-foreground italic border border-border">
                                    "{item.quote}"
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                    Customer Rating:
                                  </h4>
                                  <div className="flex items-center gap-2 bg-yellow-50 p-2.5 rounded-lg border border-yellow-100">
                                    <div className="flex space-x-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-5 h-5 ${
                                            star <= Math.round(item.rating)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm font-semibold text-yellow-900">
                                      {item.rating}/5 -{" "}
                                      {item.rating === 1
                                        ? "Poor"
                                        : item.rating === 2
                                        ? "Fair"
                                        : item.rating === 3
                                        ? "Good"
                                        : item.rating === 4
                                        ? "Very Good"
                                        : "Excellent"}
                                    </span>
                                  </div>
                                </div>

                                <div className="p-3 bg-background rounded-lg text-xs space-y-1 text-muted-foreground border border-border">
                                  <p>
                                    <strong className="text-foreground">Name:</strong> {item.userName}
                                  </p>
                                  <p>
                                    <strong className="text-foreground">Email:</strong> {item.email}
                                  </p>
                                  {item.location && (
                                    <p>
                                      <strong className="text-foreground">Location:</strong> {item.location}
                                    </p>
                                  )}
                                  <p>
                                    <strong className="text-foreground">Date:</strong> {formatDateTime(item.submittedDate)}
                                  </p>
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-foreground mb-1">
                                    Update Status:
                                  </label>
                                  <Select
                                    value={newStatus}
                                    onValueChange={(val: any) => setNewStatus(val)}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="in_review">In Review</SelectItem>
                                      <SelectItem value="resolved">Resolved</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-foreground mb-1">
                                    Admin Response / Internal Notes:
                                  </label>
                                  <Textarea
                                    value={adminResponse}
                                    onChange={(e) => setAdminResponse(e.target.value)}
                                    placeholder="Enter your response or resolution notes..."
                                    rows={3}
                                  />
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <Button
                                    className="flex-1 bg-primary hover:bg-primary-hover"
                                    onClick={() => {
                                      updateFeedbackStatus(item.id, newStatus, adminResponse);
                                    }}
                                  >
                                    Save & Update Feedback
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-8"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">No feedback found</p>
                    <p className="text-xs text-muted-foreground mt-1">Customer reviews and feedback will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* COMPLAINTS TAB CONTENT */}
      {activeTab === "complaint" && (
        <>
          {/* Complaints Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {enrichedTestimonials.filter((t) => t.type === "complaint" && t.status === "pending").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending Complaints</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.totalComplaints}</div>
                    <div className="text-sm text-muted-foreground">Total Complaints</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {enrichedTestimonials.filter((t) => t.type === "complaint" && t.status === "resolved").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-background0 rounded-lg flex items-center justify-center text-white">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {enrichedTestimonials.filter((t) => t.type === "complaint" && t.status === "closed").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complaints List */}
          <Card className="rounded-2xl shadow-md border-0 bg-white">
            <CardHeader>
              <CardTitle>Complaints</CardTitle>
              <CardDescription>Manage and respond to customer complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrichedTestimonials.filter((f) => f.type === "complaint").length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-foreground mb-1">No complaints found</h3>
                    <p className="text-sm text-muted-foreground">There are no customer complaints at the moment.</p>
                  </div>
                ) : (
                  enrichedTestimonials
                    .filter((f) => f.type === "complaint")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status.replace("_", " ")}
                              </Badge>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${
                                      star <= Math.round(item.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <h3 className="font-semibold text-foreground mb-1">{item.tripName}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.quote}</p>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                <span>{item.userName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5" />
                                <span>{item.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDateTime(item.submittedDate)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap sm:flex-col gap-2 flex-shrink-0">
                            {item.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateFeedbackStatus(item.id, "in_review", "Under review by admin.")
                                }
                                className="text-primary border-input hover:bg-muted text-xs h-8"
                              >
                                Start Review
                              </Button>
                            )}
                            {(item.status === "pending" || item.status === "in_review") && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateFeedbackStatus(
                                    item.id,
                                    "resolved",
                                    "Complaint has been addressed and resolved."
                                  )
                                }
                                className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                              >
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* RESPONSE RATINGS TAB CONTENT */}
      {activeTab === "ratings" && (
        <div className="space-y-6">
          {/* Ratings Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted0 rounded-lg flex items-center justify-center text-white">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                    <div className="text-sm text-muted-foreground">Total Ratings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.avgRating}</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                    <ThumbsUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {enrichedTestimonials.filter((t) => t.rating >= 4).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Positive (4-5★)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.total ? Math.round((enrichedTestimonials.filter((t) => t.rating >= 4).length / stats.total) * 100) : 100}%
                    </div>
                    <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rating Breakdown Card */}
          <Card className="rounded-2xl shadow-md border-0 bg-white">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Breakdown of all customer review ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.ratingCounts.map(({ stars, count }) => {
                  const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16 text-sm font-medium text-foreground">
                        <span>{stars}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-yellow-400 h-full rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="w-16 text-right text-xs text-muted-foreground font-medium">
                        {count} ({pct}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              This feedback will be permanently deleted from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteConfirmId && handleDeleteTestimonial(deleteConfirmId)}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
