import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Users, Building, Shield, Settings, FileText, CreditCard, Calendar } from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: FileText, label: "Governance", href: "/governance" },
  { icon: Users, label: "Residents", href: "/residents" },
  { icon: Building, label: "Facilities", href: "/facilities" },
  { icon: Shield, label: "Security", href: "/security" },
  { icon: Settings, label: "Maintenance", href: "/maintenance" },
  { icon: CreditCard, label: "Finance", href: "/finance" },
  { icon: Calendar, label: "Community", href: "/community" },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      {navigationItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-smooth"
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
        </Button>
      ))}
    </nav>
  );
}