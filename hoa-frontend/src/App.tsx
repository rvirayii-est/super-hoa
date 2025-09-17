import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResidentDashboard from "./pages/ResidentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLoginClick = () => {
    setShowLogin(true);
    setLoginError("");
  };

  const handleBackToHome = () => {
    setShowLogin(false);
    setLoginError("");
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      setShowLogin(false);
      setLoginError("");
    } else {
      setLoginError(result.error || "Login failed");
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogin(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/resident" replace />
            ) : showLogin ? (
              <Login 
                onLogin={handleLogin}
                onBack={handleBackToHome}
                isLoading={isLoading}
                error={loginError}
              />
            ) : (
              <Index onLoginClick={handleLoginClick} />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/resident" replace />
            ) : (
              <Login 
                onLogin={handleLogin}
                onBack={handleBackToHome}
                isLoading={isLoading}
                error={loginError}
              />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard 
                userEmail={user?.email || ""}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/resident" 
          element={
            isAuthenticated ? (
              <ResidentDashboard 
                userEmail={user?.email || ""}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
