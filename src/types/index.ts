export type Language = 'en' | 'am';

export type UserRole = 'patient' | 'psychiatrist' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  language?: Language;
  createdAt?: string;
}

export type SessionType = 'video' | 'in_person' | 'phone';

export type AppointmentStatus = 'confirmed' | 'cancelled' | 'completed';

export type PaymentStatus = 'unpaid' | 'pending_verification' | 'paid';

export type PaymentMethod = 'telebirr' | 'cbe_birr';

export interface Appointment {
  id: string;
  userId: string;
  psychiatristId: string;
  psychiatristName: string;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  sessionDate: string; // YYYY-MM-DD
  startTime: string;   // e.g., "10:00 AM"
  endTime: string;     // e.g., "10:50 AM"
  sessionType: SessionType;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  location?: string;
  meetingLink?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentWalletNumber?: string;
  paidAmountETB?: number;
  transactionReference?: string;
  paidAt?: string;
}

export interface Review {
  id: string;
  psychiatristId?: string;
  userId?: string;
  userName: string;
  isAnonymous?: boolean;
  rating: number;
  comment: string | {
    en: string;
    am: string;
  };
  date: string;
  verifiedSession?: boolean;
  appointmentId?: string;
}

export interface Psychiatrist {
  id: string;
  name: {
    en: string;
    am: string;
  };
  title: {
    en: string;
    am: string;
  };
  credentials: {
    en: string;
    am: string;
  };
  bio: {
    en: string;
    am: string;
  };
  specializations: {
    en: string[];
    am: string[];
  };
  languages: string[];
  rating: number;
  reviewCount: number;
  experienceYears: number;
  hourlyRateETB: number;
  hourlyRateUSD: number;
  education: {
    en: string[];
    am: string[];
  };
  certifications: {
    en: string[];
    am: string[];
  };
  hospitalAffiliation: {
    en: string;
    am: string;
  };
  avatar: string;
  consultationModes: SessionType[];
  availableDays: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  timeSlots: string[];     // ["09:00 AM", "10:00 AM", ...]
  reviews: Review[];
}

export type ArticleTopic = 'all' | 'anxiety' | 'depression' | 'sleep' | 'stress' | 'mindfulness' | 'relationships';

export interface MentalHealthArticle {
  id: string;
  topic: 'anxiety' | 'depression' | 'sleep' | 'stress' | 'mindfulness' | 'relationships';
  title: {
    en: string;
    am: string;
  };
  summary: {
    en: string;
    am: string;
  };
  readTime: string;
  evidenceBase: {
    en: string;
    am: string;
  };
  medicalReviewer: string;
  actionableSteps: {
    en: string[];
    am: string[];
  };
  fullContent: {
    en: string;
    am: string;
  };
  keyTakeaway: {
    en: string;
    am: string;
  };
  image: string;
}

