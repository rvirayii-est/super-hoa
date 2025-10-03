import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Invalid credentials. Try: resident@demo.com / demo123");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 flex-col justify-between text-primary-foreground">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="h-10 w-10" />
            <span className="text-3xl font-bold">HOA Connect</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Modern Community Management
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Streamline your homeowners association with our comprehensive management suite.
            </p>
          </div>
        </div>
        
        <div className="space-y-4 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-accent"></div>
            <span>Secure & Reliable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-accent"></div>
            <span>24/7 Access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-accent"></div>
            <span>Mobile Ready</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-8">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">HOA Connect</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="resident@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="demo123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
            <div className="text-xs space-y-2 text-muted-foreground">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Resident:</span>
                <span>resident@demo.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Admin:</span>
                <span>admin@demo.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Staff:</span>
                <span>staff@demo.com</span>
              </div>
              <div className="text-center pt-2 border-t">
                <span className="font-medium text-foreground">Password:</span> demo123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
