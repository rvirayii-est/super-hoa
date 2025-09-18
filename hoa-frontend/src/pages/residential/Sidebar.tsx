import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Building,
  LogOut,
  Home,
  Menu,
  X,
  CreditCard,
  Calendar,
  Settings,
  FileText
} from "lucide-react";
import { getUserInitials, getUserName } from './utils';

interface SidebarProps {
  userEmail: string;
  onLogout: () => void;
  activeModule: string;
  onModuleChange: (module: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

export function Sidebar({
  userEmail,
  onLogout,
  activeModule,
  onModuleChange,
  sidebarOpen,
  setSidebarOpen,
  isMobile
}: SidebarProps) {
  return (
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
      <div className="p-4 border-b flex-shrink-0">
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
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Dashboard Home */}
        <button
          onClick={() => onModuleChange("dashboard")}
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
          onClick={() => onModuleChange("payments")}
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
          onClick={() => onModuleChange("bookings")}
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
          onClick={() => onModuleChange("issues")}
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
          onClick={() => onModuleChange("documents")}
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
      <div className="p-4 border-t flex-shrink-0">
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
  );
}
