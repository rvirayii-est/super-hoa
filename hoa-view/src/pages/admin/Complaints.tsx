import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockComplaints } from "@/lib/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const Complaints = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'new': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <DashboardLayout 
      title="Complaints & Requests" 
      subtitle="Manage resident complaints and service requests"
    >
      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplaints.map((complaint) => (
              <div key={complaint.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{complaint.category}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{complaint.createdAt}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{complaint.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    Property: {complaint.propertyId}
                    {complaint.resolvedAt && ` • Resolved: ${complaint.resolvedAt}`}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">View Details</Button>
                    {complaint.status !== 'resolved' && (
                      <Button size="sm" className="flex-1 sm:flex-none">Update Status</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Complaints;
