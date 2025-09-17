import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Building2, Calendar } from "lucide-react";

interface HeroSectionProps {
  onLoginClick?: () => void;
}

export function HeroSection({ onLoginClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-30" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Maryhomes
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your premier residential community portal for seamless governance, 
            modern amenities, and exceptional living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-community-navy hover:bg-blue-50 shadow-medium"
              onClick={onLoginClick}
            >
              Resident Portal
            </Button>
            <Button size="lg" className="bg-white text-community-navy hover:bg-blue-50 shadow-medium">
              View Announcements
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Users, label: "Families", value: "248" },
            { icon: Building2, label: "Units", value: "312" },
            { icon: Shield, label: "Security", value: "24/7" },
            { icon: Calendar, label: "Established", value: "2018" },
          ].map((stat) => (
            <Card key={stat.label} className="p-6 bg-white/10 backdrop-blur border-white/20 text-center">
              <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}