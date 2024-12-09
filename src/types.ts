export interface Customer {
    customerName: string;
    customerEmail: string;
    customerContactNumber: number;
    customerPassword: string; 
  }
  export interface Vendor {
    vendorName: string;
    vendorEmail: string;
    vendorContactNumber: number;
    vendorPassword: string;
  }
  export interface Ticket {
    ticketId: number;
    eventId: number;
    vendorId: number;
    customerId: number | null;
    status: boolean;
  }
  export interface Event {
    eventName: string;
    eventLocation: string;
    eventDate: string;
    eventTicketPrice: number;
    eventTotalTickets: number;
  }
  