import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Settings } from "lucide-react";
import { PaymentDue, FacilityBooking, IssueReport } from './types';
import { formatCurrency, formatDate, getTotalOutstanding } from './utils';
import { StatusBadge, IssueStatusBadge } from './components';

interface DashboardOverviewProps {
  paymentDues: PaymentDue[];
  bookings: FacilityBooking[];
  issues: IssueReport[];
  documents: any[];
  onModuleChange: (module: string) => void;
}

export function DashboardOverview({ 
  paymentDues, 
  bookings, 
  issues, 
  documents, 
  onModuleChange 
}: DashboardOverviewProps) {
  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-community-blue mb-2">
              {formatCurrency(getTotalOutstanding(paymentDues))}
            </div>
            <div className="text-sm text-muted-foreground">Outstanding Balance</div>
            <div className={`text-xs mt-1 ${getTotalOutstanding(paymentDues) === 0 ? 'text-green-600' : 'text-orange-600'}`}>
              {getTotalOutstanding(paymentDues) === 0 
                ? '✓ All payments up to date' 
                : `${paymentDues.filter(p => p.status !== 'paid').length} pending payment(s)`
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-community-blue mb-2">{bookings.length}</div>
            <div className="text-sm text-muted-foreground">Facility Bookings</div>
            <div className="text-xs text-muted-foreground mt-1">
              {bookings.filter(b => b.status === 'confirmed').length} confirmed
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-community-blue mb-2">{issues.length}</div>
            <div className="text-sm text-muted-foreground">Reported Issues</div>
            <div className="text-xs text-muted-foreground mt-1">
              {issues.filter(i => i.status === 'open').length} open
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-community-blue mb-2">{documents.length}</div>
            <div className="text-sm text-muted-foreground">Available Documents</div>
            <div className="text-xs text-muted-foreground mt-1">Policies & forms</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-community-blue" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentDues.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{payment.description}</p>
                    <p className="text-xs text-muted-foreground">Due: {formatDate(payment.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                    <StatusBadge status={payment.status} />
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onModuleChange("payments")}
            >
              View All Payments
            </Button>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-community-blue" />
              Recent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {issues.slice(0, 3).map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{issue.title}</p>
                    <p className="text-xs text-muted-foreground">{issue.location}</p>
                  </div>
                  <div className="text-right">
                    <IssueStatusBadge status={issue.status} />
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(issue.reportedDate)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onModuleChange("issues")}
            >
              View All Issues
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
