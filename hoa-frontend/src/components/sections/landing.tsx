import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CreditCard, 
  Calendar, 
  Settings,
  FileText,
  ChevronRight,
  LogIn
} from "lucide-react";

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
  }
];

const quickActions = [
  { icon: CreditCard, title: "Pay Dues", description: "Monthly HOA dues payment", color: "bg-blue-500" },
  { icon: Calendar, title: "Book Facilities", description: "Reserve clubhouse or courts", color: "bg-green-500" },
  { icon: Settings, title: "Report Issue", description: "Maintenance requests", color: "bg-orange-500" },
  { icon: FileText, title: "Documents", description: "By-laws and policies", color: "bg-purple-500" },
];

interface LandingSectionProps {
  onLoginClick: () => void;
}

export function LandingSection({ onLoginClick }: LandingSectionProps) {
  return (
    <section className="py-16 bg-community-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Stay connected with your community. Sign in to access all services and manage your account.
          </p>
          <Button 
            onClick={onLoginClick}
            size="lg" 
            className="bg-community-blue hover:bg-community-blue/90"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In to Access Full Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-2">
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
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
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
                <div className="text-center p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Sign in to view all announcements and participate in community discussions</p>
                  <Button variant="outline" onClick={onLoginClick}>
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Preview */}
          <div>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Available Services</CardTitle>
                <CardDescription>Sign in to access these services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="w-full p-4 rounded-lg border bg-muted/30 opacity-75"
                  >
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Button onClick={onLoginClick} className="w-full">
                    Sign In to Access Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
