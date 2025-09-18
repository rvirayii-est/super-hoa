import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";
import { PaymentDue } from './types';
import { formatCurrency, formatDate } from './utils';
import { StatusBadge } from './components';

interface PaymentHistoryProps {
  paymentDues: PaymentDue[];
}

export function PaymentHistory({ paymentDues }: PaymentHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-community-blue" />
          Payment History
        </CardTitle>
        <CardDescription>View your payment history and outstanding dues</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentDues.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.description}</TableCell>
                <TableCell>{formatCurrency(payment.amount)}</TableCell>
                <TableCell>{formatDate(payment.dueDate)}</TableCell>
                <TableCell><StatusBadge status={payment.status} /></TableCell>
                <TableCell className="capitalize">{payment.category.replace('_', ' ')}</TableCell>
                <TableCell>{payment.paymentMethod || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
