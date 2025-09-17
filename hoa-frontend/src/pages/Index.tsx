import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { LandingSection } from "@/components/sections/landing";
import { Footer } from "@/components/sections/footer";

interface IndexProps {
  onLoginClick: () => void;
}

const Index = ({ onLoginClick }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onLoginClick={onLoginClick} />
        <LandingSection onLoginClick={onLoginClick} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
