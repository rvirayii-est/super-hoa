import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          {/* Sticky Header */}
          <header className="sticky top-0 z-40 bg-background border-b">
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
                  {subtitle && (
                    <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
                  )}
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="sm:hidden">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6 md:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
