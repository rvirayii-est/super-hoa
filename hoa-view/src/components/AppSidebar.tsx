import { Home, Users, Building2, Car, PawPrint, FileText, Bell, DollarSign, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const residentItems = [
  { title: "My Home", url: "/dashboard", icon: Home },
  { title: "Payments", url: "/payments", icon: DollarSign },
  { title: "Requests", url: "/requests", icon: FileText },
  { title: "Vehicles", url: "/vehicles", icon: Car },
  { title: "Pets", url: "/pets", icon: PawPrint },
  { title: "Announcements", url: "/announcements", icon: Bell },
];

const adminItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Members", url: "/admin/members", icon: Users },
  { title: "Properties", url: "/admin/properties", icon: Building2 },
  { title: "Vehicles", url: "/admin/vehicles", icon: Car },
  { title: "Pets", url: "/admin/pets", icon: PawPrint },
  { title: "Complaints", url: "/admin/complaints", icon: FileText },
  { title: "Announcements", url: "/admin/announcements", icon: Bell },
  { title: "Finance", url: "/admin/finance", icon: DollarSign },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  
  const items = user?.role === 'resident' ? residentItems : adminItems;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="font-bold text-lg">HOA Connect</span>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel>
              {user?.role === 'resident' ? 'Resident Portal' : 'Admin Console'}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
