import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CreditCard, 
  Calendar, 
  Users, 
  Shield, 
  Settings,
  FileText,
  Building,
  ChevronRight
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

const modules = [
  { icon: Users, title: "Governance & Administration", description: "Board meetings, by-laws, and policies" },
  { icon: Building, title: "Facilities & Infrastructure", description: "Common areas, utilities, and bookings" },
  { icon: Shield, title: "Security & Safety", description: "Access control and emergency procedures" },
  { icon: Settings, title: "Maintenance & Services", description: "Repair requests and vendor management" },
  { icon: CreditCard, title: "Finance & Transparency", description: "Dues payment and financial reports" },
  { icon: Calendar, title: "Community Engagement", description: "Events, programs, and feedback" },
];

export function DashboardSection() {
  return (
    <section className="py-16 bg-community-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access all community services and stay connected with your neighbors
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
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
                <Button variant="outline" className="w-full">
                  View All Announcements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 hover:bg-accent"
                  >
                    <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-spring">
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-community-blue transition-smooth">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}