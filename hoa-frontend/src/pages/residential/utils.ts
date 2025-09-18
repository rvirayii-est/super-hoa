import { PaymentDue } from './types';

export const getUserInitials = (email: string) => {
  const name = email.split('@')[0];
  return name.substring(0, 2).toUpperCase();
};

export const getUserName = (email: string) => {
  const name = email.split('@')[0];
  return name.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timeString: string) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getTotalOutstanding = (paymentDues: PaymentDue[]) => {
  return paymentDues
    .filter(payment => payment.status !== 'paid')
    .reduce((total, payment) => total + payment.amount, 0);
};

