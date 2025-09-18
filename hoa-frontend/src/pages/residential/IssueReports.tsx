import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Plus, Eye, Trash2, MapPin } from "lucide-react";
import { IssueReport, IssueResponse } from './types';
import { formatDate, formatTimestamp, getUserName } from './utils';
import { IssueStatusBadge, PriorityBadge } from './components';

interface IssueReportsProps {
  issues: IssueReport[];
  setIssues: (issues: IssueReport[]) => void;
  userEmail: string;
  isAdmin?: boolean;
}

export function IssueReports({ issues, setIssues, userEmail, isAdmin = false }: IssueReportsProps) {
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueReport | null>(null);
  const [isIssueDrawerOpen, setIsIssueDrawerOpen] = useState(false);
  const [issueFormData, setIssueFormData] = useState<Partial<IssueReport>>({
    title: "",
    description: "",
    category: "maintenance",
    priority: "medium",
    location: ""
  });
  const [newResponse, setNewResponse] = useState("");

  const handleAddIssue = () => {
    if (issueFormData.title && issueFormData.description && issueFormData.location) {
      const newIssue: IssueReport = {
        id: Date.now().toString(),
        title: issueFormData.title,
        description: issueFormData.description,
        category: issueFormData.category || "maintenance",
        priority: issueFormData.priority || "medium",
        status: "open",
        location: issueFormData.location,
        reportedDate: new Date().toISOString().split('T')[0]
      };
      setIssues([...issues, newIssue]);
      setIssueFormData({
        title: "",
        description: "",
        category: "maintenance",
        priority: "medium",
        location: ""
      });
      setIsIssueDialogOpen(false);
    }
  };

  const handleDeleteIssue = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const openIssueDrawer = (issue: IssueReport) => {
    setSelectedIssue(issue);
    setIsIssueDrawerOpen(true);
  };

  const handleAddResponse = () => {
    if (selectedIssue && newResponse.trim()) {
      const response: IssueResponse = {
        id: Date.now().toString(),
        message: newResponse.trim(),
        author: isAdmin ? "Admin" : getUserName(userEmail),
        role: isAdmin ? "admin" : "resident",
        timestamp: new Date().toISOString()
      };

      const updatedIssues = issues.map(issue =>
        issue.id === selectedIssue.id
          ? { 
              ...issue, 
              responses: [...(issue.responses || []), response],
              updatedDate: new Date().toISOString().split('T')[0]
            }
          : issue
      );
      
      setIssues(updatedIssues);
      setSelectedIssue({
        ...selectedIssue,
        responses: [...(selectedIssue.responses || []), response]
      });
      setNewResponse("");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-community-blue" />
                Issue Reports
              </CardTitle>
              <CardDescription>Report and track community issues</CardDescription>
            </div>
            <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Report Issue
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Report New Issue</DialogTitle>
                  <DialogDescription>
                    Report a community issue that needs attention.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="issueTitle">Title</Label>
                    <Input
                      id="issueTitle"
                      value={issueFormData.title || ""}
                      onChange={(e) => setIssueFormData({...issueFormData, title: e.target.value})}
                      placeholder="Brief description of the issue"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issueDescription">Description</Label>
                    <Textarea
                      id="issueDescription"
                      value={issueFormData.description || ""}
                      onChange={(e) => setIssueFormData({...issueFormData, description: e.target.value})}
                      placeholder="Detailed description of the issue..."
                      rows={4}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issueCategory">Category</Label>
                    <Select 
                      value={issueFormData.category || "maintenance"} 
                      onValueChange={(value) => setIssueFormData({...issueFormData, category: value as IssueReport['category']})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="noise">Noise</SelectItem>
                        <SelectItem value="parking">Parking</SelectItem>
                        <SelectItem value="landscaping">Landscaping</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issuePriority">Priority</Label>
                    <Select 
                      value={issueFormData.priority || "medium"} 
                      onValueChange={(value) => setIssueFormData({...issueFormData, priority: value as IssueReport['priority']})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issueLocation">Location</Label>
                    <Input
                      id="issueLocation"
                      value={issueFormData.location || ""}
                      onChange={(e) => setIssueFormData({...issueFormData, location: e.target.value})}
                      placeholder="e.g., Building A Parking Lot, Pool Area, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsIssueDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddIssue}>Submit Report</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell className="capitalize">{issue.category}</TableCell>
                  <TableCell><PriorityBadge priority={issue.priority} /></TableCell>
                  <TableCell><IssueStatusBadge status={issue.status} /></TableCell>
                  <TableCell>{issue.location}</TableCell>
                  <TableCell>{formatDate(issue.reportedDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openIssueDrawer(issue)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Issue Details Drawer */}
      <Drawer open={isIssueDrawerOpen} onOpenChange={setIsIssueDrawerOpen} direction="right">
        <DrawerContent className="h-screen w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl ml-auto fixed right-0 top-0 rounded-l-lg rounded-r-none border-0">
          <DrawerHeader className="px-4 sm:px-6 py-4 border-b">
            <DrawerTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              {selectedIssue?.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm">
              Issue #{selectedIssue?.id} • Reported on {selectedIssue && formatDate(selectedIssue.reportedDate)}
            </DrawerDescription>
          </DrawerHeader>
          
          {selectedIssue && (
            <div className="px-4 sm:px-6 pb-4 overflow-auto flex-1">
              {/* Issue Details */}
              <div className="space-y-6">
                {/* Status and Priority */}
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <IssueStatusBadge status={selectedIssue.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Priority:</span>
                    <PriorityBadge priority={selectedIssue.priority} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Category:</span>
                    <Badge variant="outline" className="capitalize">{selectedIssue.category}</Badge>
                  </div>
                  {selectedIssue.assignedTo && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Assigned to:</span>
                      <span className="text-sm">{selectedIssue.assignedTo}</span>
                    </div>
                  )}
                </div>

                {/* Issue Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground bg-gray-50 p-3 rounded-lg">{selectedIssue.description}</p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h3>
                  <p className="text-muted-foreground">{selectedIssue.location}</p>
                </div>

                {/* Conversation/Responses */}
                <div className="flex-1">
                  <h3 className="font-semibold mb-4 text-base sm:text-lg">Updates & Responses</h3>
                  <div className="space-y-4 max-h-80 sm:max-h-96 lg:max-h-[500px] overflow-y-auto">
                    {selectedIssue.responses && selectedIssue.responses.length > 0 ? (
                      selectedIssue.responses.map((response) => (
                        <div key={response.id} className={`p-3 sm:p-4 rounded-lg ${
                          response.role === 'admin' || response.role === 'maintenance' 
                            ? 'bg-blue-50 border-l-4 border-blue-400' 
                            : 'bg-gray-50 border-l-4 border-gray-400'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{response.author}</span>
                              <Badge 
                                variant={response.role === 'admin' ? 'default' : response.role === 'maintenance' ? 'secondary' : 'outline'} 
                                className="text-xs"
                              >
                                {response.role}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(response.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No responses yet</p>
                    )}
                  </div>

                  {/* Add Response */}
                  <div className="mt-6 space-y-4 border-t pt-4">
                    <Label htmlFor="response" className="text-sm sm:text-base font-medium">Add a response</Label>
                    <Textarea
                      id="response"
                      placeholder="Type your message here..."
                      value={newResponse}
                      onChange={(e) => setNewResponse(e.target.value)}
                      rows={4}
                      className="min-h-[100px] resize-none"
                    />
                    <Button 
                      onClick={handleAddResponse}
                      disabled={!newResponse.trim()}
                      className="w-full py-3 text-sm sm:text-base"
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DrawerFooter className="px-4 sm:px-6 py-4 border-t">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full py-3 text-sm sm:text-base">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
