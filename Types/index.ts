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


export interface AvailabilityData {
  days?: {
    id: string;
    avalaibilityId: string;
    day: DayOfWeek;
    timeGap: number;
    startTime: Date;
    endTime: Date;
  }[];
  id?: string;
  userId?: string;
  monday?: { isAvailable: boolean; startTime: string; endTime: string };
  tuesday?: { isAvailable: boolean; startTime: string; endTime: string };
  wednesday?: { isAvailable: boolean; startTime: string; endTime: string };
  thursday?: { isAvailable: boolean; startTime: string; endTime: string };
  friday?: { isAvailable: boolean; startTime: string; endTime: string };
  saturday?: { isAvailable: boolean; startTime: string; endTime: string };
  sunday?: { isAvailable: boolean; startTime: string; endTime: string };
  timeGap?: number;
}