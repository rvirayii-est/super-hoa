import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Building2 } from "lucide-react";
import { mockProperties } from "@/lib/mockData";
import DashboardLayout from "@/components/DashboardLayout";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = mockProperties.filter(property =>
    property.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Property Management" 
      subtitle="Manage HOA properties and units"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>All Properties</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by unit, address, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">{property.unit}</CardTitle>
                    </div>
                    <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{property.address}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="outline">{property.type}</Badge>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="font-medium">{property.ownerName}</p>
                      <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="ghost" size="sm" className="flex-1">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Properties;
