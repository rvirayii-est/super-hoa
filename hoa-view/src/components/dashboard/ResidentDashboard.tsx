import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, Car, PawPrint, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockVehicles, mockPets, mockComplaints, mockPayments, mockAnnouncements } from "@/lib/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const ResidentDashboard = () => {
  const { user } = useAuth();
  
  const userVehicles = mockVehicles.filter(v => v.propertyId === user?.propertyId);
  const userPets = mockPets.filter(p => p.propertyId === user?.propertyId);
  const userComplaints = mockComplaints.filter(c => c.propertyId === user?.propertyId);
  const userPayments = mockPayments.filter(p => p.propertyId === user?.propertyId).slice(0, 3);
  
  const currentBalance = 0;
  const nextDueDate = "Nov 1, 2025";

  return (
    <DashboardLayout 
      title="My Home Status" 
      subtitle={`Welcome back, ${user?.name}`}
    >
      {/* Balance Overview */}
      <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                Account Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                ${currentBalance.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                Next payment due: {nextDueDate}
              </p>
              <Button className="mt-4">Pay Dues</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Open Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {userComplaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length}
              </div>
              <p className="text-sm text-muted-foreground">
                Active complaints and requests
              </p>
              <Button variant="outline" className="mt-4">Submit Request</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">${payment.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{payment.method} • {payment.reference}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{payment.status}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grid Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Vehicles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-accent" />
                Registered Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{vehicle.plate}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.make} {vehicle.model} • {vehicle.color}
                    </p>
                  </div>
                ))}
                {userVehicles.length === 0 && (
                  <p className="text-sm text-muted-foreground">No vehicles registered</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PawPrint className="h-5 w-5 text-accent" />
                Registered Pets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userPets.map((pet) => (
                  <div key={pet.id} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{pet.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} • {pet.registrationNo}
                    </p>
                  </div>
                ))}
                {userPets.length === 0 && (
                  <p className="text-sm text-muted-foreground">No pets registered</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnnouncements.slice(0, 2).map((announcement) => (
                  <div key={announcement.id} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {announcement.publishedAt}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints/Requests */}
        <Card>
          <CardHeader>
            <CardTitle>My Requests</CardTitle>
            <CardDescription>Track your complaints and service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{complaint.category}</p>
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={complaint.status === 'resolved' ? 'secondary' : 'default'}>
                      {complaint.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{complaint.createdAt}</p>
                  </div>
                </div>
              ))}
              {userComplaints.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No requests submitted</p>
              )}
            </div>
          </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default ResidentDashboard;
