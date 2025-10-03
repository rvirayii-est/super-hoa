import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ResidentDashboard from "@/components/dashboard/ResidentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'resident') {
    return <ResidentDashboard />;
  }

  return <AdminDashboard />;
};

export default Dashboard;
