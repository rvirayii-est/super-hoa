import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Shield, Menu } from "lucide-react";

// Import all residential components
import {
  DashboardOverview,
  PaymentHistory,
  FacilityBookings,
  IssueReports,
  Documents,
  Sidebar,
  // Data and types
  residentPaymentDues,
  facilityBookings,
  issueReports,
  documents,
  PaymentDue,
  FacilityBooking,
  IssueReport
} from './residential';

interface ResidentDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export default function ResidentDashboard({ userEmail, onLogout }: ResidentDashboardProps) {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Component state
  const [paymentDues] = useState<PaymentDue[]>(residentPaymentDues);
  const [bookings, setBookings] = useState<FacilityBooking[]>(facilityBookings);
  const [issues, setIssues] = useState<IssueReport[]>(issueReports);
  const [documentList] = useState(documents);

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

  // Get page title and description
  const getPageInfo = () => {
    switch (activeModule) {
      case "dashboard":
        return {
          title: "My Dashboard",
          description: "Welcome back! Here's your community overview"
        };
      case "payments":
        return {
          title: "My Payments",
          description: "View your payment history and outstanding dues"
        };
      case "bookings":
        return {
          title: "Facility Bookings",
          description: "Manage your facility reservations"
        };
      case "issues":
        return {
          title: "Issue Reports",
          description: "Report and track community issues"
        };
      case "documents":
        return {
          title: "Community Documents",
          description: "Access community documents and policies"
        };
      default:
        return {
          title: activeModule,
          description: `Manage your ${activeModule.toLowerCase()}`
        };
    }
  };

  const pageInfo = getPageInfo();

  // Render active module content
  const renderModuleContent = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <DashboardOverview
            paymentDues={paymentDues}
            bookings={bookings}
            issues={issues}
            documents={documentList}
            onModuleChange={handleModuleChange}
          />
        );
      case "payments":
        return <PaymentHistory paymentDues={paymentDues} />;
      case "bookings":
        return (
          <FacilityBookings
            bookings={bookings}
            setBookings={setBookings}
          />
        );
      case "issues":
        return (
          <IssueReports
            issues={issues}
            setIssues={setIssues}
            userEmail={userEmail}
            isAdmin={false}
          />
        );
      case "documents":
        return <Documents documents={documentList} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{activeModule}</h3>
              <p className="text-muted-foreground">This section is coming soon!</p>
            </div>
          </div>
        );
    }
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
      <Sidebar
        userEmail={userEmail}
        onLogout={onLogout}
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />

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
                  {pageInfo.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {pageInfo.description}
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
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto overflow-x-hidden">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
}
