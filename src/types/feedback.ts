/**
 * Feedback submitted by users and triaged by admins.
 */

export type FeedbackStatus = 'new' | 'reviewed' | 'archived';

export interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  /** Phone number entered by the user. Optional on legacy records. */
  phone?: string;
  /** 1-5 star rating. */
  rating: number;
  message: string;
  status: FeedbackStatus;
  createdAt: string;
}

export interface CreateFeedbackInput {
  name: string;
  email: string;
  phone: string;
  rating: number;
  message: string;
}

export interface UpdateFeedbackInput {
  status: FeedbackStatus;
}

/**
 * Public-safe shape shown as a homepage testimonial.
 * Deliberately omits email and phone — those stay private to admins.
 */
export interface PublicTestimonial {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
}

export const FEEDBACK_STATUSES: { value: FeedbackStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Featured' },
  { value: 'archived', label: 'Archived' },
];
