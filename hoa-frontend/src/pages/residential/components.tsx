import { Badge } from "@/components/ui/badge";

// Badge components for different status types
export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'paid':
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const IssueStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'open':
      return <Badge variant="destructive">Open</Badge>;
    case 'in_progress':
      return <Badge variant="secondary">In Progress</Badge>;
    case 'resolved':
      return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
    case 'closed':
      return <Badge variant="outline">Closed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case 'urgent':
      return <Badge variant="destructive">Urgent</Badge>;
    case 'high':
      return <Badge variant="destructive" className="bg-orange-500">High</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>;
    case 'low':
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};
