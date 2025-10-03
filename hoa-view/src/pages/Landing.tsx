import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users, FileText, DollarSign, Bell, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Building2, title: "Property Management", description: "Track properties, units, and assignments with ease" },
    { icon: Users, title: "Member Portal", description: "Self-service dashboard for residents" },
    { icon: FileText, title: "Complaints & Requests", description: "Streamlined ticketing workflow" },
    { icon: DollarSign, title: "Finance & Bookkeeping", description: "Complete dues, payments, and expense tracking" },
    { icon: Bell, title: "Announcements", description: "Keep your community informed" },
    { icon: Shield, title: "Role-Based Access", description: "Secure permissions for residents, staff, and admin" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">HOA Connect</span>
          </div>
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Modern HOA Management
            <span className="text-accent block mt-2">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your homeowners association with our comprehensive platform. 
            Manage members, properties, finances, and communications all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/login')} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Manage Your HOA
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your HOA?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join modern HOA communities using our platform to streamline operations and improve resident satisfaction.
          </p>
          <Button size="lg" onClick={() => navigate('/login')} className="text-lg px-8">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 HOA Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
