import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { mockMembers } from "@/lib/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Member Management" 
      subtitle="Manage HOA members and residents"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>All Members</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-medium">{member.name}</h3>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <p>Email: {member.email}</p>
                    <p>Phone: {member.phone}</p>
                    <p>Property: {member.propertyId}</p>
                    <p>Move-in: {member.moveInDate}</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-col lg:flex-row">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Edit</Button>
                  <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Members;
