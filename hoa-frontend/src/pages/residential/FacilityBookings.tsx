import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { FacilityBooking } from './types';
import { formatDate, formatTime } from './utils';

interface FacilityBookingsProps {
  bookings: FacilityBooking[];
  setBookings: (bookings: FacilityBooking[]) => void;
}

export function FacilityBookings({ bookings, setBookings }: FacilityBookingsProps) {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<FacilityBooking | null>(null);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState<Partial<FacilityBooking>>({
    facilityName: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    notes: ""
  });

  const handleAddBooking = () => {
    if (bookingFormData.facilityName && bookingFormData.bookingDate && bookingFormData.startTime && bookingFormData.endTime && bookingFormData.purpose) {
      const newBooking: FacilityBooking = {
        id: Date.now().toString(),
        facilityName: bookingFormData.facilityName,
        bookingDate: bookingFormData.bookingDate,
        startTime: bookingFormData.startTime,
        endTime: bookingFormData.endTime,
        status: "pending",
        purpose: bookingFormData.purpose,
        notes: bookingFormData.notes,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setBookings([...bookings, newBooking]);
      setBookingFormData({
        facilityName: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        notes: ""
      });
      setIsBookingDialogOpen(false);
    }
  };

  const handleEditBooking = () => {
    if (selectedBooking && bookingFormData.facilityName && bookingFormData.bookingDate && bookingFormData.startTime && bookingFormData.endTime && bookingFormData.purpose) {
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, ...bookingFormData }
          : booking
      );
      setBookings(updatedBookings);
      setSelectedBooking(null);
      setBookingFormData({
        facilityName: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        notes: ""
      });
      setIsEditBookingOpen(false);
    }
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const openEditBookingDialog = (booking: FacilityBooking) => {
    setSelectedBooking(booking);
    setBookingFormData({
      facilityName: booking.facilityName,
      bookingDate: booking.bookingDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
      purpose: booking.purpose,
      notes: booking.notes || ""
    });
    setIsEditBookingOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-community-blue" />
                Facility Bookings
              </CardTitle>
              <CardDescription>Manage your facility reservations</CardDescription>
            </div>
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Book Facility
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Book Facility</DialogTitle>
                  <DialogDescription>
                    Reserve a community facility for your event.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="facility">Facility</Label>
                    <Select 
                      value={bookingFormData.facilityName || ""} 
                      onValueChange={(value) => setBookingFormData({...bookingFormData, facilityName: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select facility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clubhouse Main Hall">Clubhouse Main Hall</SelectItem>
                        <SelectItem value="Clubhouse Meeting Room">Clubhouse Meeting Room</SelectItem>
                        <SelectItem value="Tennis Court A">Tennis Court A</SelectItem>
                        <SelectItem value="Tennis Court B">Tennis Court B</SelectItem>
                        <SelectItem value="Pool Area">Pool Area</SelectItem>
                        <SelectItem value="Playground">Playground</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bookingDate">Date</Label>
                    <Input
                      id="bookingDate"
                      type="date"
                      value={bookingFormData.bookingDate || ""}
                      onChange={(e) => setBookingFormData({...bookingFormData, bookingDate: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={bookingFormData.startTime || ""}
                        onChange={(e) => setBookingFormData({...bookingFormData, startTime: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={bookingFormData.endTime || ""}
                        onChange={(e) => setBookingFormData({...bookingFormData, endTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      value={bookingFormData.purpose || ""}
                      onChange={(e) => setBookingFormData({...bookingFormData, purpose: e.target.value})}
                      placeholder="e.g., Birthday Party, Meeting, etc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={bookingFormData.notes || ""}
                      onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                      placeholder="Additional requirements or notes..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBooking}>Book Facility</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.facilityName}</TableCell>
                  <TableCell>
                    <div>
                      <p>{formatDate(booking.bookingDate)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.purpose}</TableCell>
                  <TableCell>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditBookingDialog(booking)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteBooking(booking.id)}
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

      {/* Edit Booking Dialog */}
      <Dialog open={isEditBookingOpen} onOpenChange={setIsEditBookingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update your facility reservation details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-facility">Facility</Label>
              <Select 
                value={bookingFormData.facilityName || ""} 
                onValueChange={(value) => setBookingFormData({...bookingFormData, facilityName: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clubhouse Main Hall">Clubhouse Main Hall</SelectItem>
                  <SelectItem value="Clubhouse Meeting Room">Clubhouse Meeting Room</SelectItem>
                  <SelectItem value="Tennis Court A">Tennis Court A</SelectItem>
                  <SelectItem value="Tennis Court B">Tennis Court B</SelectItem>
                  <SelectItem value="Pool Area">Pool Area</SelectItem>
                  <SelectItem value="Playground">Playground</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-bookingDate">Date</Label>
              <Input
                id="edit-bookingDate"
                type="date"
                value={bookingFormData.bookingDate || ""}
                onChange={(e) => setBookingFormData({...bookingFormData, bookingDate: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={bookingFormData.startTime || ""}
                  onChange={(e) => setBookingFormData({...bookingFormData, startTime: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={bookingFormData.endTime || ""}
                  onChange={(e) => setBookingFormData({...bookingFormData, endTime: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-purpose">Purpose</Label>
              <Input
                id="edit-purpose"
                value={bookingFormData.purpose || ""}
                onChange={(e) => setBookingFormData({...bookingFormData, purpose: e.target.value})}
                placeholder="e.g., Birthday Party, Meeting, etc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={bookingFormData.notes || ""}
                onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                placeholder="Additional requirements or notes..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBooking}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
