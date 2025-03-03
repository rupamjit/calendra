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

export interface FormData {
  title: string;
  description: string;
  duration: number;
  isPrivate: boolean;
}

export interface Event {
  createdAt: string;
  description: string;
  id: string;
  isPrivate: boolean;
  duration: number;
  title: string;
  userId: true;
  _count: {
    bookings: number;
  };
  updatedAt: string;
}
