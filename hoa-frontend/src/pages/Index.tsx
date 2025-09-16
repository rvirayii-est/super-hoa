import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { DashboardSection } from "@/components/sections/dashboard";
import { Footer } from "@/components/sections/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DashboardSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
