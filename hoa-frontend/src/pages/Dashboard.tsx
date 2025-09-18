import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  CreditCard, 
  Calendar, 
  Users, 
  Shield, 
  Settings,
  FileText,
  Building,
  ChevronRight,
  LogOut,
  User,
  Home,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const announcements = [
  {
    title: "Monthly Board Meeting",
    date: "March 25, 2024",
    type: "Meeting",
    urgent: false
  },
  {
    title: "Pool Maintenance Schedule",
    date: "March 20-22, 2024", 
    type: "Maintenance",
    urgent: true
  },
  {
    title: "Community Easter Celebration",
    date: "March 30, 2024",
    type: "Event",
    urgent: false
  },
  {
    title: "New Parking Guidelines",
    date: "March 15, 2024",
    type: "Policy",
    urgent: false
  },
  {
    title: "Gym Equipment Upgrade",
    date: "March 10, 2024",
    type: "Facility",
    urgent: false
  }
];

// Payment dues data structure
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

const initialPaymentDues: PaymentDue[] = [
  {
    id: "1",
    description: "Monthly HOA Dues - March 2024",
    amount: 285.00,
    dueDate: "2024-03-01",
    status: "paid",
    category: "monthly_dues",
    paymentMethod: "Credit Card",
    paidDate: "2024-02-28",
    notes: "Paid on time"
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
    category: "special_assessment",
    notes: "One-time assessment for pool equipment upgrade"
  },
  {
    id: "4",
    description: "Late Fee - February 2024",
    amount: 25.00,
    dueDate: "2024-02-15",
    status: "overdue",
    category: "fine",
    notes: "Late payment penalty"
  },
  {
    id: "5",
    description: "Clubhouse Cleaning Fee",
    amount: 75.00,
    dueDate: "2024-03-30",
    status: "pending",
    category: "maintenance_fee",
    notes: "Annual cleaning service fee"
  }
];

const quickActions = [
  { icon: CreditCard, title: "Pay Dues", description: "Monthly HOA dues payment", color: "bg-blue-500" },
  { icon: Calendar, title: "Book Facilities", description: "Reserve clubhouse or courts", color: "bg-green-500" },
  { icon: Settings, title: "Report Issue", description: "Maintenance requests", color: "bg-orange-500" },
  { icon: FileText, title: "Documents", description: "By-laws and policies", color: "bg-purple-500" },
];

const modules = [
  { 
    icon: Users, 
    title: "Governance & Administration", 
    description: "Board meetings, by-laws, and policies", 
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-50",
    activeColor: "bg-blue-100 text-blue-700 border-blue-200"
  },
  { 
    icon: Building, 
    title: "Facilities & Infrastructure", 
    description: "Common areas, utilities, and bookings", 
    color: "bg-green-600",
    hoverColor: "hover:bg-green-50",
    activeColor: "bg-green-100 text-green-700 border-green-200"
  },
  { 
    icon: Shield, 
    title: "Security & Safety", 
    description: "Access control and emergency procedures", 
    color: "bg-red-600",
    hoverColor: "hover:bg-red-50",
    activeColor: "bg-red-100 text-red-700 border-red-200"
  },
  { 
    icon: Settings, 
    title: "Maintenance & Services", 
    description: "Repair requests and vendor management", 
    color: "bg-orange-600",
    hoverColor: "hover:bg-orange-50",
    activeColor: "bg-orange-100 text-orange-700 border-orange-200"
  },
  { 
    icon: CreditCard, 
    title: "Finance & Transparency", 
    description: "Dues payment and financial reports", 
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-50",
    activeColor: "bg-purple-100 text-purple-700 border-purple-200"
  },
  { 
    icon: Calendar, 
    title: "Community Engagement", 
    description: "Events, programs, and feedback", 
    color: "bg-teal-600",
    hoverColor: "hover:bg-teal-50",
    activeColor: "bg-teal-100 text-teal-700 border-teal-200"
  },
];

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
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
  
  // Payment management state
  const [paymentDues, setPaymentDues] = useState<PaymentDue[]>(initialPaymentDues);
  const [selectedPayment, setSelectedPayment] = useState<PaymentDue | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Form state for add/edit
  const [formData, setFormData] = useState<Partial<PaymentDue>>({
    description: "",
    amount: 0,
    dueDate: "",
    status: "pending",
    category: "monthly_dues",
    notes: ""
  });

  const getUserInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const getUserName = (email: string) => {
    const name = email.split('@')[0];
    return name.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // CRUD functions for payment management
  const handleAddPayment = () => {
    if (formData.description && formData.amount && formData.dueDate) {
      const newPayment: PaymentDue = {
        id: Date.now().toString(),
        description: formData.description,
        amount: formData.amount,
        dueDate: formData.dueDate,
        status: formData.status || "pending",
        category: formData.category || "monthly_dues",
        notes: formData.notes
      };
      setPaymentDues([...paymentDues, newPayment]);
      setFormData({
        description: "",
        amount: 0,
        dueDate: "",
        status: "pending",
        category: "monthly_dues",
        notes: ""
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditPayment = () => {
    if (selectedPayment && formData.description && formData.amount && formData.dueDate) {
      const updatedPayments = paymentDues.map(payment =>
        payment.id === selectedPayment.id
          ? { ...payment, ...formData }
          : payment
      );
      setPaymentDues(updatedPayments);
      setSelectedPayment(null);
      setFormData({
        description: "",
        amount: 0,
        dueDate: "",
        status: "pending",
        category: "monthly_dues",
        notes: ""
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePayment = (id: string) => {
    setPaymentDues(paymentDues.filter(payment => payment.id !== id));
  };

  const handleViewPayment = (payment: PaymentDue) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (payment: PaymentDue) => {
    setSelectedPayment(payment);
    setFormData({
      description: payment.description,
      amount: payment.amount,
      dueDate: payment.dueDate,
      status: payment.status,
      category: payment.category,
      notes: payment.notes || ""
    });
    setIsEditDialogOpen(true);
  };

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

  const getTotalOutstanding = () => {
    return paymentDues
      .filter(payment => payment.status !== 'paid')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  return (
    <div className="h-screen bg-background flex relative overflow-hidden">
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
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-full`
          : `${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 h-screen flex-shrink-0`
        } 
        bg-white border-r shadow-sm flex flex-col overflow-hidden
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

          {/* Quick Actions */}
          {sidebarOpen && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Quick Actions
              </p>
            </div>
          )}
          
          {quickActions.map((action, index) => (
            <button
              key={`quick-${index}`}
              onClick={() => {
                if (action.title === "Pay Dues") {
                  setActiveModule("Finance & Transparency");
                }
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <div className={`h-8 w-8 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              {sidebarOpen && (
                <div className="text-left min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{action.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{action.description}</div>
                </div>
              )}
            </button>
          ))}

          <Separator className="my-4" />

          {/* Modules */}
          {sidebarOpen && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Community Services
              </p>
            </div>
          )}

          {modules.map((module, index) => (
            <button
              key={`module-${index}`}
              onClick={() => handleModuleChange(module.title)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeModule === module.title 
                  ? module.activeColor 
                  : `hover:bg-gray-50 text-gray-700 ${module.hoverColor}`
              }`}
            >
              <div className={`h-8 w-8 rounded-lg ${module.color} flex items-center justify-center flex-shrink-0`}>
                <module.icon className="h-4 w-4 text-white" />
              </div>
              {sidebarOpen && (
                <div className="text-left min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{module.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{module.description}</div>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Sign Out Button - Sticky at bottom */}
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
      <div className={`flex-1 flex flex-col h-screen ${isMobile ? 'w-full' : ''}`}>
        {/* Top Bar */}
        <header className="bg-white border-b px-4 sm:px-6 py-4 flex-shrink-0">
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
                {activeModule === "dashboard" ? "Dashboard Overview" : activeModule}
              </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {activeModule === "dashboard" 
                    ? "Welcome back! Here's what's happening in your community" 
                    : `Manage your ${activeModule.toLowerCase()}`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/resident')}
                className="text-green-600 border-green-200 hover:bg-green-50 hidden sm:flex"
              >
                Resident View
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              {/* Mobile action buttons */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/resident')}
                className="sm:hidden"
              >
                Resident
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto overflow-x-hidden">
          {activeModule === "dashboard" ? (
            <div className="space-y-4 sm:space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
                    <div className="text-3xl font-bold text-community-blue mb-2">2</div>
                    <div className="text-sm text-muted-foreground">Active Requests</div>
                    <div className="text-xs text-muted-foreground mt-1">1 maintenance, 1 booking</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-community-blue mb-2">5</div>
                    <div className="text-sm text-muted-foreground">Upcoming Events</div>
                    <div className="text-xs text-muted-foreground mt-1">This month</div>
                  </CardContent>
                </Card>
              </div>

              {/* Announcements */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-community-blue" />
                    Recent Announcements
                  </CardTitle>
                  <CardDescription>Stay updated with community news and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border hover:shadow-sm transition-shadow cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{announcement.title}</h4>
                          {announcement.urgent && (
                            <Badge variant="destructive" className="text-xs">Urgent</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{announcement.date}</span>
                          <Badge variant="outline" className="text-xs">{announcement.type}</Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Announcements
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : activeModule === "Finance & Transparency" ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Payment Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                      {formatCurrency(paymentDues.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0))}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Paid</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">
                      {formatCurrency(paymentDues.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0))}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-600 mb-1">
                      {formatCurrency(paymentDues.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0))}
                    </div>
                    <div className="text-sm text-muted-foreground">Overdue</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-community-blue mb-1">
                      {paymentDues.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Records</div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Management Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-community-blue" />
                        Payment Dues Management
                      </CardTitle>
                      <CardDescription>Manage all your HOA payments and dues</CardDescription>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Payment Due</DialogTitle>
                          <DialogDescription>
                            Create a new payment record for tracking.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={formData.description || ""}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              placeholder="e.g., Monthly HOA Dues - May 2024"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                              id="amount"
                              type="number"
                              step="0.01"
                              value={formData.amount || ""}
                              onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                              id="dueDate"
                              type="date"
                              value={formData.dueDate || ""}
                              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select 
                              value={formData.category || "monthly_dues"} 
                              onValueChange={(value) => setFormData({...formData, category: value as PaymentDue['category']})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly_dues">Monthly Dues</SelectItem>
                                <SelectItem value="special_assessment">Special Assessment</SelectItem>
                                <SelectItem value="fine">Fine</SelectItem>
                                <SelectItem value="maintenance_fee">Maintenance Fee</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select 
                              value={formData.status || "pending"} 
                              onValueChange={(value) => setFormData({...formData, status: value as PaymentDue['status']})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              id="notes"
                              value={formData.notes || ""}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                              placeholder="Additional notes..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddPayment}>Add Payment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewPayment(payment)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openEditDialog(payment)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeletePayment(payment.id)}
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
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const activeModuleData = modules.find(m => m.title === activeModule);
                    if (activeModuleData) {
                      const IconComponent = activeModuleData.icon;
                      return <IconComponent className="h-8 w-8 text-white" />;
                    }
                    return <Home className="h-8 w-8 text-white" />;
                  })()}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{activeModule}</h3>
                <p className="text-muted-foreground">This module is coming soon!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Payment Due</DialogTitle>
            <DialogDescription>
              Update the payment record details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description || ""}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="e.g., Monthly HOA Dues - May 2024"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={formData.amount || ""}
                onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-dueDate">Due Date</Label>
              <Input
                id="edit-dueDate"
                type="date"
                value={formData.dueDate || ""}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select 
                value={formData.category || "monthly_dues"} 
                onValueChange={(value) => setFormData({...formData, category: value as PaymentDue['category']})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly_dues">Monthly Dues</SelectItem>
                  <SelectItem value="special_assessment">Special Assessment</SelectItem>
                  <SelectItem value="fine">Fine</SelectItem>
                  <SelectItem value="maintenance_fee">Maintenance Fee</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select 
                value={formData.status || "pending"} 
                onValueChange={(value) => setFormData({...formData, status: value as PaymentDue['status']})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPayment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              View payment record information.
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="font-semibold">Description</Label>
                <p className="text-sm text-muted-foreground">{selectedPayment.description}</p>
              </div>
              <div className="grid gap-2">
                <Label className="font-semibold">Amount</Label>
                <p className="text-sm text-muted-foreground">{formatCurrency(selectedPayment.amount)}</p>
              </div>
              <div className="grid gap-2">
                <Label className="font-semibold">Due Date</Label>
                <p className="text-sm text-muted-foreground">{formatDate(selectedPayment.dueDate)}</p>
              </div>
              <div className="grid gap-2">
                <Label className="font-semibold">Status</Label>
                <div>{getStatusBadge(selectedPayment.status)}</div>
              </div>
              <div className="grid gap-2">
                <Label className="font-semibold">Category</Label>
                <p className="text-sm text-muted-foreground capitalize">{selectedPayment.category.replace('_', ' ')}</p>
              </div>
              {selectedPayment.paymentMethod && (
                <div className="grid gap-2">
                  <Label className="font-semibold">Payment Method</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.paymentMethod}</p>
                </div>
              )}
              {selectedPayment.paidDate && (
                <div className="grid gap-2">
                  <Label className="font-semibold">Paid Date</Label>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedPayment.paidDate)}</p>
                </div>
              )}
              {selectedPayment.notes && (
                <div className="grid gap-2">
                  <Label className="font-semibold">Notes</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
