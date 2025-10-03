import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Car, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockProperties, mockMembers, mockVehicles, mockComplaints } from "@/lib/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Total Properties", value: mockProperties.length, icon: Building2, color: "text-blue-500" },
    { label: "Active Members", value: mockMembers.filter(m => m.status === 'active').length, icon: Users, color: "text-green-500" },
    { label: "Registered Vehicles", value: mockVehicles.length, icon: Car, color: "text-purple-500" },
    { label: "Open Complaints", value: mockComplaints.filter(c => c.status !== 'resolved').length, icon: FileText, color: "text-orange-500" },
  ];

  return (
    <DashboardLayout 
      title="Admin Console" 
      subtitle={`Welcome back, ${user?.name} • ${user?.role}`}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button onClick={() => navigate('/admin/members')} className="h-20">
                <Users className="mr-2 h-5 w-5" />
                Manage Members
              </Button>
              <Button onClick={() => navigate('/admin/properties')} className="h-20">
                <Building2 className="mr-2 h-5 w-5" />
                Manage Properties
              </Button>
              <Button onClick={() => navigate('/admin/complaints')} className="h-20">
                <FileText className="mr-2 h-5 w-5" />
                View Complaints
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMembers.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{complaint.category}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{complaint.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
