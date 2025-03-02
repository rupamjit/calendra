export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  userName: string;
  imageUrl: string;
  events?: string[];
  bookings?: string[];
  avalaibility?: string[];

}
