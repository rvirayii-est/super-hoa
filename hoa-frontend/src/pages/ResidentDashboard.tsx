import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  CreditCard, 
  Calendar, 
  Settings,
  FileText,
  Building,
  LogOut,
  Home,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Search,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Payment dues data structure (simplified for residents)
interface PaymentDue {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  category: 'monthly_dues' | 'special_assessment' | 'fine' | 'maintenance_fee' | 'other';
  paymentMethod?: string;
  paidDate?: string;
  notes?: string;
}

// Facility booking data structure
interface FacilityBooking {
  id: string;
  facilityName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  purpose: string;
  notes?: string;
  createdDate: string;
}

// Issue report data structure
interface IssueReport {
  id: string;
  title: string;
  description: string;
  category: 'maintenance' | 'security' | 'noise' | 'parking' | 'landscaping' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  location: string;
  reportedDate: string;
  updatedDate?: string;
  photos?: string[];
  responses?: IssueResponse[];
  assignedTo?: string;
}

interface IssueResponse {
  id: string;
  message: string;
  author: string;
  role: 'resident' | 'admin' | 'maintenance';
  timestamp: string;
  isInternal?: boolean;
}

// Document data structure
interface Document {
  id: string;
  title: string;
  category: 'bylaws' | 'policies' | 'meeting_minutes' | 'financial' | 'forms' | 'notices';
  description: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  tags: string[];
}

// Sample data
const residentPaymentDues: PaymentDue[] = [
  {
    id: "1",
    description: "Monthly HOA Dues - March 2024",
    amount: 285.00,
    dueDate: "2024-03-01",
    status: "paid",
    category: "monthly_dues",
    paymentMethod: "Credit Card",
    paidDate: "2024-02-28"
  },
  {
    id: "2",
    description: "Monthly HOA Dues - April 2024",
    amount: 285.00,
    dueDate: "2024-04-01",
    status: "pending",
    category: "monthly_dues"
  },
  {
    id: "3",
    description: "Pool Maintenance Special Assessment",
    amount: 150.00,
    dueDate: "2024-04-15",
    status: "pending",
    category: "special_assessment"
  }
];

const facilityBookings: FacilityBooking[] = [
  {
    id: "1",
    facilityName: "Clubhouse Main Hall",
    bookingDate: "2024-04-20",
    startTime: "14:00",
    endTime: "18:00",
    status: "confirmed",
    purpose: "Birthday Party",
    notes: "Need tables and chairs setup",
    createdDate: "2024-03-15"
  },
  {
    id: "2",
    facilityName: "Tennis Court A",
    bookingDate: "2024-04-05",
    startTime: "09:00",
    endTime: "11:00",
    status: "pending",
    purpose: "Tennis Practice",
    createdDate: "2024-03-20"
  }
];

const issueReports: IssueReport[] = [
  {
    id: "1",
    title: "Broken Pool Light",
    description: "The underwater light in the shallow end of the pool is not working",
    category: "maintenance",
    priority: "medium",
    status: "in_progress",
    location: "Community Pool",
    reportedDate: "2024-03-18",
    assignedTo: "Maintenance Team",
    responses: [
      {
        id: "r1",
        message: "Thank you for reporting this. We have scheduled an inspection for tomorrow.",
        author: "Admin",
        role: "admin",
        timestamp: "2024-03-18T10:30:00Z"
      },
      {
        id: "r2",
        message: "Light has been inspected. We need to order a replacement part. ETA 3-5 business days.",
        author: "Maintenance Team",
        role: "maintenance",
        timestamp: "2024-03-19T14:15:00Z"
      }
    ]
  },
  {
    id: "2",
    title: "Parking Violation",
    description: "Car parked in visitor spot overnight for 3 days",
    category: "parking",
    priority: "low",
    status: "resolved",
    location: "Building A Parking Lot",
    reportedDate: "2024-03-10",
    updatedDate: "2024-03-12",
    responses: [
      {
        id: "r3",
        message: "We have contacted the vehicle owner and issued a warning notice.",
        author: "Security",
        role: "admin",
        timestamp: "2024-03-11T09:00:00Z"
      },
      {
        id: "r4",
        message: "Vehicle has been moved. Issue resolved.",
        author: "Security",
        role: "admin",
        timestamp: "2024-03-12T16:30:00Z"
      }
    ]
  }
];

const documents: Document[] = [
  {
    id: "1",
    title: "Community Bylaws 2024",
    category: "bylaws",
    description: "Updated community bylaws and regulations",
    uploadDate: "2024-01-15",
    fileSize: "2.3 MB",
    fileType: "PDF",
    tags: ["bylaws", "rules", "regulations", "2024"]
  },
  {
    id: "2",
    title: "Pool Usage Policy",
    category: "policies",
    description: "Guidelines for community pool usage and safety",
    uploadDate: "2024-02-01",
    fileSize: "1.1 MB",
    fileType: "PDF",
    tags: ["pool", "policy", "safety", "hours"]
  },
  {
    id: "3",
    title: "March 2024 Board Meeting Minutes",
    category: "meeting_minutes",
    description: "Minutes from the monthly board meeting",
    uploadDate: "2024-03-20",
    fileSize: "850 KB",
    fileType: "PDF",
    tags: ["meeting", "board", "march", "minutes"]
  },
  {
    id: "4",
    title: "Maintenance Request Form",
    category: "forms",
    description: "Form for submitting maintenance requests",
    uploadDate: "2024-01-10",
    fileSize: "450 KB",
    fileType: "PDF",
    tags: ["form", "maintenance", "request", "fillable"]
  }
];

interface ResidentDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export default function ResidentDashboard({ userEmail, onLogout }: ResidentDashboardProps) {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar on mobile when navigating
  const handleModuleChange = (module: string) => {
    setActiveModule(module);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Payment state
  const [paymentDues] = useState<PaymentDue[]>(residentPaymentDues);
  
  // Facility booking state
  const [bookings, setBookings] = useState<FacilityBooking[]>(facilityBookings);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<FacilityBooking | null>(null);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState<Partial<FacilityBooking>>({
    facilityName: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    notes: ""
  });
  
  // Issue report state
  const [issues, setIssues] = useState<IssueReport[]>(issueReports);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueReport | null>(null);
  const [isIssueDrawerOpen, setIsIssueDrawerOpen] = useState(false);
  const [issueFormData, setIssueFormData] = useState<Partial<IssueReport>>({
    title: "",
    description: "",
    category: "maintenance",
    priority: "medium",
    location: ""
  });
  const [newResponse, setNewResponse] = useState("");
  const [isAdmin] = useState(false); // Set to true for admin users
  
  // Document state
  const [documentList] = useState<Document[]>(documents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getUserInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const getUserName = (email: string) => {
    const name = email.split('@')[0];
    return name.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Payment helper functions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTotalOutstanding = () => {
    return paymentDues
      .filter(payment => payment.status !== 'paid')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  // Facility booking CRUD functions
  const handleAddBooking = () => {
    if (bookingFormData.facilityName && bookingFormData.bookingDate && bookingFormData.startTime && bookingFormData.endTime && bookingFormData.purpose) {
      const newBooking: FacilityBooking = {
        id: Date.now().toString(),
        facilityName: bookingFormData.facilityName,
        bookingDate: bookingFormData.bookingDate,
        startTime: bookingFormData.startTime,
        endTime: bookingFormData.endTime,
        status: "pending",
        purpose: bookingFormData.purpose,
        notes: bookingFormData.notes,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setBookings([...bookings, newBooking]);
      setBookingFormData({
        facilityName: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        notes: ""
      });
      setIsBookingDialogOpen(false);
    }
  };

  const handleEditBooking = () => {
    if (selectedBooking && bookingFormData.facilityName && bookingFormData.bookingDate && bookingFormData.startTime && bookingFormData.endTime && bookingFormData.purpose) {
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, ...bookingFormData }
          : booking
      );
      setBookings(updatedBookings);
      setSelectedBooking(null);
      setBookingFormData({
        facilityName: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        notes: ""
      });
      setIsEditBookingOpen(false);
    }
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const openEditBookingDialog = (booking: FacilityBooking) => {
    setSelectedBooking(booking);
    setBookingFormData({
      facilityName: booking.facilityName,
      bookingDate: booking.bookingDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
      purpose: booking.purpose,
      notes: booking.notes || ""
    });
    setIsEditBookingOpen(true);
  };

  // Issue report CRUD functions
  const handleAddIssue = () => {
    if (issueFormData.title && issueFormData.description && issueFormData.location) {
      const newIssue: IssueReport = {
        id: Date.now().toString(),
        title: issueFormData.title,
        description: issueFormData.description,
        category: issueFormData.category || "maintenance",
        priority: issueFormData.priority || "medium",
        status: "open",
        location: issueFormData.location,
        reportedDate: new Date().toISOString().split('T')[0]
      };
      setIssues([...issues, newIssue]);
      setIssueFormData({
        title: "",
        description: "",
        category: "maintenance",
        priority: "medium",
        location: ""
      });
      setIsIssueDialogOpen(false);
    }
  };

  const handleEditIssue = () => {
    if (selectedIssue && issueFormData.title && issueFormData.description && issueFormData.location) {
      const updatedIssues = issues.map(issue =>
        issue.id === selectedIssue.id
          ? { ...issue, ...issueFormData }
          : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue(null);
      setIssueFormData({
        title: "",
        description: "",
        category: "maintenance",
        priority: "medium",
        location: ""
      });
      setIsEditIssueOpen(false);
    }
  };

  const handleDeleteIssue = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const openIssueDrawer = (issue: IssueReport) => {
    setSelectedIssue(issue);
    setIssueFormData({
      title: issue.title,
      description: issue.description,
      category: issue.category,
      priority: issue.priority,
      location: issue.location
    });
    setIsIssueDrawerOpen(true);
  };

  const handleAddResponse = () => {
    if (selectedIssue && newResponse.trim()) {
      const response: IssueResponse = {
        id: Date.now().toString(),
        message: newResponse.trim(),
        author: isAdmin ? "Admin" : getUserName(userEmail),
        role: isAdmin ? "admin" : "resident",
        timestamp: new Date().toISOString()
      };

      const updatedIssues = issues.map(issue =>
        issue.id === selectedIssue.id
          ? { 
              ...issue, 
              responses: [...(issue.responses || []), response],
              updatedDate: new Date().toISOString().split('T')[0]
            }
          : issue
      );
      
      setIssues(updatedIssues);
      setSelectedIssue({
        ...selectedIssue,
        responses: [...(selectedIssue.responses || []), response]
      });
      setNewResponse("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getIssueStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Document search functionality
  const filteredDocuments = documentList.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-80`
          : `${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300`
        } 
        bg-white border-r shadow-sm flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Maryhomes</h1>
                  <p className="text-xs text-muted-foreground">Resident Portal</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-community-blue flex items-center justify-center text-white font-semibold">
              {getUserInitials(userEmail)}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {getUserName(userEmail)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Dashboard Home */}
          <button
            onClick={() => handleModuleChange("dashboard")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeModule === "dashboard" 
                ? "bg-blue-100 text-blue-700 border border-blue-200" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Dashboard</span>}
          </button>

          <Separator className="my-4" />

          {/* Main Modules */}
          <button
            onClick={() => handleModuleChange("payments")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeModule === "payments" 
                ? "bg-blue-100 text-blue-700 border border-blue-200" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <CreditCard className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">My Payments</span>}
          </button>

          <button
            onClick={() => handleModuleChange("bookings")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeModule === "bookings" 
                ? "bg-green-100 text-green-700 border border-green-200" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Calendar className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Book Facilities</span>}
          </button>

          <button
            onClick={() => handleModuleChange("issues")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeModule === "issues" 
                ? "bg-orange-100 text-orange-700 border border-orange-200" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Report Issues</span>}
          </button>

          <button
            onClick={() => handleModuleChange("documents")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeModule === "documents" 
                ? "bg-purple-100 text-purple-700 border border-purple-200" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <FileText className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Documents</span>}
          </button>
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            onClick={onLogout}
            className={`${sidebarOpen ? 'w-full justify-start' : 'w-full justify-center'} flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen ${isMobile ? 'w-full' : ''}`}>
        {/* Top Bar */}
        <header className="bg-white border-b px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="h-8 w-8 p-0 md:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div>
              <h2 className="text-2xl font-bold text-foreground">
                {activeModule === "dashboard" ? "My Dashboard" : 
                 activeModule === "payments" ? "My Payments" :
                 activeModule === "bookings" ? "Facility Bookings" :
                 activeModule === "issues" ? "Issue Reports" :
                 activeModule === "documents" ? "Community Documents" : activeModule}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {activeModule === "dashboard" ? "Welcome back! Here's your community overview" : 
                   activeModule === "payments" ? "View your payment history and outstanding dues" :
                   activeModule === "bookings" ? "Manage your facility reservations" :
                   activeModule === "issues" ? "Report and track community issues" :
                   activeModule === "documents" ? "Access community documents and policies" : `Manage your ${activeModule.toLowerCase()}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-purple-600 border-purple-200 hover:bg-purple-50 hidden sm:flex"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin View
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              {/* Mobile action buttons */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="sm:hidden"
              >
                <Shield className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeModule === "dashboard" ? (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-community-blue mb-2">
                      {formatCurrency(getTotalOutstanding())}
                    </div>
                    <div className="text-sm text-muted-foreground">Outstanding Balance</div>
                    <div className={`text-xs mt-1 ${getTotalOutstanding() === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                      {getTotalOutstanding() === 0 
                        ? '✓ All payments up to date' 
                        : `${paymentDues.filter(p => p.status !== 'paid').length} pending payment(s)`
                      }
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-community-blue mb-2">{bookings.length}</div>
                    <div className="text-sm text-muted-foreground">Facility Bookings</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {bookings.filter(b => b.status === 'confirmed').length} confirmed
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-community-blue mb-2">{issues.length}</div>
                    <div className="text-sm text-muted-foreground">Reported Issues</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {issues.filter(i => i.status === 'open').length} open
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-community-blue mb-2">{documentList.length}</div>
                    <div className="text-sm text-muted-foreground">Available Documents</div>
                    <div className="text-xs text-muted-foreground mt-1">Policies & forms</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Overview */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Payments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-community-blue" />
                      Recent Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {paymentDues.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{payment.description}</p>
                            <p className="text-xs text-muted-foreground">Due: {formatDate(payment.dueDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                            {getStatusBadge(payment.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setActiveModule("payments")}
                    >
                      View All Payments
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-community-blue" />
                      Recent Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {issues.slice(0, 3).map((issue) => (
                        <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{issue.title}</p>
                            <p className="text-xs text-muted-foreground">{issue.location}</p>
                          </div>
                          <div className="text-right">
                            {getIssueStatusBadge(issue.status)}
                            <p className="text-xs text-muted-foreground mt-1">{formatDate(issue.reportedDate)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setActiveModule("issues")}
                    >
                      View All Issues
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : activeModule === "payments" ? (
            /* Payment History View */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-community-blue" />
                  Payment History
                </CardTitle>
                <CardDescription>View your payment history and outstanding dues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentDues.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.description}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{formatDate(payment.dueDate)}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="capitalize">{payment.category.replace('_', ' ')}</TableCell>
                        <TableCell>{payment.paymentMethod || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : activeModule === "bookings" ? (
            /* Facility Bookings CRUD */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-community-blue" />
                        Facility Bookings
                      </CardTitle>
                      <CardDescription>Manage your facility reservations</CardDescription>
                    </div>
                    <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Book Facility
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Book Facility</DialogTitle>
                          <DialogDescription>
                            Reserve a community facility for your event.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="facility">Facility</Label>
                            <Select 
                              value={bookingFormData.facilityName || ""} 
                              onValueChange={(value) => setBookingFormData({...bookingFormData, facilityName: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select facility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Clubhouse Main Hall">Clubhouse Main Hall</SelectItem>
                                <SelectItem value="Clubhouse Meeting Room">Clubhouse Meeting Room</SelectItem>
                                <SelectItem value="Tennis Court A">Tennis Court A</SelectItem>
                                <SelectItem value="Tennis Court B">Tennis Court B</SelectItem>
                                <SelectItem value="Pool Area">Pool Area</SelectItem>
                                <SelectItem value="Playground">Playground</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="bookingDate">Date</Label>
                            <Input
                              id="bookingDate"
                              type="date"
                              value={bookingFormData.bookingDate || ""}
                              onChange={(e) => setBookingFormData({...bookingFormData, bookingDate: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="startTime">Start Time</Label>
                              <Input
                                id="startTime"
                                type="time"
                                value={bookingFormData.startTime || ""}
                                onChange={(e) => setBookingFormData({...bookingFormData, startTime: e.target.value})}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="endTime">End Time</Label>
                              <Input
                                id="endTime"
                                type="time"
                                value={bookingFormData.endTime || ""}
                                onChange={(e) => setBookingFormData({...bookingFormData, endTime: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <Input
                              id="purpose"
                              value={bookingFormData.purpose || ""}
                              onChange={(e) => setBookingFormData({...bookingFormData, purpose: e.target.value})}
                              placeholder="e.g., Birthday Party, Meeting, etc."
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              id="notes"
                              value={bookingFormData.notes || ""}
                              onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                              placeholder="Additional requirements or notes..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddBooking}>Book Facility</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Facility</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.facilityName}</TableCell>
                          <TableCell>
                            <div>
                              <p>{formatDate(booking.bookingDate)}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{booking.purpose}</TableCell>
                          <TableCell>
                            <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openEditBookingDialog(booking)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : activeModule === "issues" ? (
            /* Issue Reports CRUD */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-community-blue" />
                        Issue Reports
                      </CardTitle>
                      <CardDescription>Report and track community issues</CardDescription>
                    </div>
                    <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Report Issue
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Report New Issue</DialogTitle>
                          <DialogDescription>
                            Report a community issue that needs attention.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="issueTitle">Title</Label>
                            <Input
                              id="issueTitle"
                              value={issueFormData.title || ""}
                              onChange={(e) => setIssueFormData({...issueFormData, title: e.target.value})}
                              placeholder="Brief description of the issue"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="issueDescription">Description</Label>
                            <Textarea
                              id="issueDescription"
                              value={issueFormData.description || ""}
                              onChange={(e) => setIssueFormData({...issueFormData, description: e.target.value})}
                              placeholder="Detailed description of the issue..."
                              rows={4}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="issueCategory">Category</Label>
                            <Select 
                              value={issueFormData.category || "maintenance"} 
                              onValueChange={(value) => setIssueFormData({...issueFormData, category: value as IssueReport['category']})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="security">Security</SelectItem>
                                <SelectItem value="noise">Noise</SelectItem>
                                <SelectItem value="parking">Parking</SelectItem>
                                <SelectItem value="landscaping">Landscaping</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="issuePriority">Priority</Label>
                            <Select 
                              value={issueFormData.priority || "medium"} 
                              onValueChange={(value) => setIssueFormData({...issueFormData, priority: value as IssueReport['priority']})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="issueLocation">Location</Label>
                            <Input
                              id="issueLocation"
                              value={issueFormData.location || ""}
                              onChange={(e) => setIssueFormData({...issueFormData, location: e.target.value})}
                              placeholder="e.g., Building A Parking Lot, Pool Area, etc."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsIssueDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddIssue}>Submit Report</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Reported</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell className="font-medium">{issue.title}</TableCell>
                          <TableCell className="capitalize">{issue.category}</TableCell>
                          <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
                          <TableCell>{getIssueStatusBadge(issue.status)}</TableCell>
                          <TableCell>{issue.location}</TableCell>
                          <TableCell>{formatDate(issue.reportedDate)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openIssueDrawer(issue)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteIssue(issue.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : activeModule === "documents" ? (
            /* Documents Read-Only with Search */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-community-blue" />
                        Community Documents
                      </CardTitle>
                      <CardDescription>Access community documents, policies, and forms</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search documents, keywords, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="bylaws">Bylaws</SelectItem>
                        <SelectItem value="policies">Policies</SelectItem>
                        <SelectItem value="meeting_minutes">Meeting Minutes</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="forms">Forms</SelectItem>
                        <SelectItem value="notices">Notices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {filteredDocuments.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-foreground">{doc.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {doc.category.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {doc.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Uploaded: {formatDate(doc.uploadDate)}</span>
                                <span>{doc.fileSize}</span>
                                <span>{doc.fileType}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredDocuments.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No documents found matching your search criteria.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{activeModule}</h3>
                <p className="text-muted-foreground">This section is coming soon!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditBookingOpen} onOpenChange={setIsEditBookingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update your facility reservation details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-facility">Facility</Label>
              <Select 
                value={bookingFormData.facilityName || ""} 
                onValueChange={(value) => setBookingFormData({...bookingFormData, facilityName: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clubhouse Main Hall">Clubhouse Main Hall</SelectItem>
                  <SelectItem value="Clubhouse Meeting Room">Clubhouse Meeting Room</SelectItem>
                  <SelectItem value="Tennis Court A">Tennis Court A</SelectItem>
                  <SelectItem value="Tennis Court B">Tennis Court B</SelectItem>
                  <SelectItem value="Pool Area">Pool Area</SelectItem>
                  <SelectItem value="Playground">Playground</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-bookingDate">Date</Label>
              <Input
                id="edit-bookingDate"
                type="date"
                value={bookingFormData.bookingDate || ""}
                onChange={(e) => setBookingFormData({...bookingFormData, bookingDate: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={bookingFormData.startTime || ""}
                  onChange={(e) => setBookingFormData({...bookingFormData, startTime: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={bookingFormData.endTime || ""}
                  onChange={(e) => setBookingFormData({...bookingFormData, endTime: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-purpose">Purpose</Label>
              <Input
                id="edit-purpose"
                value={bookingFormData.purpose || ""}
                onChange={(e) => setBookingFormData({...bookingFormData, purpose: e.target.value})}
                placeholder="e.g., Birthday Party, Meeting, etc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={bookingFormData.notes || ""}
                onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                placeholder="Additional requirements or notes..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBooking}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Issue Details Drawer */}
      <Drawer open={isIssueDrawerOpen} onOpenChange={setIsIssueDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              {selectedIssue?.title}
            </DrawerTitle>
            <DrawerDescription>
              Issue #{selectedIssue?.id} • Reported on {selectedIssue && formatDate(selectedIssue.reportedDate)}
            </DrawerDescription>
          </DrawerHeader>
          
          {selectedIssue && (
            <div className="px-4 pb-4 overflow-auto flex-1">
              {/* Issue Details */}
              <div className="space-y-6">
                {/* Status and Priority */}
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    {getIssueStatusBadge(selectedIssue.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Priority:</span>
                    {getPriorityBadge(selectedIssue.priority)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Category:</span>
                    <Badge variant="outline" className="capitalize">{selectedIssue.category}</Badge>
                  </div>
                  {selectedIssue.assignedTo && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Assigned to:</span>
                      <span className="text-sm">{selectedIssue.assignedTo}</span>
                    </div>
                  )}
                </div>

                {/* Issue Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground bg-gray-50 p-3 rounded-lg">{selectedIssue.description}</p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h3>
                  <p className="text-muted-foreground">{selectedIssue.location}</p>
                </div>

                {/* Conversation/Responses */}
                <div>
                  <h3 className="font-semibold mb-4">Updates & Responses</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {selectedIssue.responses && selectedIssue.responses.length > 0 ? (
                      selectedIssue.responses.map((response) => (
                        <div key={response.id} className={`p-3 rounded-lg ${
                          response.role === 'admin' || response.role === 'maintenance' 
                            ? 'bg-blue-50 border-l-4 border-blue-400' 
                            : 'bg-gray-50 border-l-4 border-gray-400'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{response.author}</span>
                              <Badge 
                                variant={response.role === 'admin' ? 'default' : response.role === 'maintenance' ? 'secondary' : 'outline'} 
                                className="text-xs"
                              >
                                {response.role}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(response.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No responses yet</p>
                    )}
                  </div>

                  {/* Add Response */}
                  <div className="mt-4 space-y-3">
                    <Label htmlFor="response">Add a response</Label>
                    <Textarea
                      id="response"
                      placeholder="Type your message here..."
                      value={newResponse}
                      onChange={(e) => setNewResponse(e.target.value)}
                      rows={3}
                    />
                    <Button 
                      onClick={handleAddResponse}
                      disabled={!newResponse.trim()}
                      className="w-full"
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
