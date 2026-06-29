import { z } from 'zod';

/**
 * Validation schemas for the news and feedback APIs.
 */

export const createNewsSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(120),
  content: z
    .string()
    .trim()
    .min(5, 'Content must be at least 5 characters')
    .max(5000),
  category: z
    .enum(['general', 'shipping', 'delay', 'promotion', 'weather'])
    .optional(),
  pinned: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const updateNewsSchema = createNewsSchema.partial();

export const createFeedbackSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .max(20)
    .regex(/^[+()\d][\d\s().-]*$/, 'Please enter a valid phone number'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
  message: z
    .string()
    .trim()
    .min(5, 'Please share a bit more detail')
    .max(2000),
});

export const updateFeedbackSchema = z.object({
  status: z.enum(['new', 'reviewed', 'archived']),
});

export const createBookingSchema = z
  .object({
    serviceType: z.enum(['container', 'air']),
    origin: z.string().trim().min(2, 'Enter the pickup location').max(120),
    destination: z
      .string()
      .trim()
      .min(2, 'Enter the delivery location')
      .max(120),
    weightKg: z
      .number({ message: 'Enter the weight in kg' })
      .positive('Weight must be greater than 0')
      .max(1_000_000),
    description: z.string().trim().max(2000).optional(),
    preferredDate: z.string().trim().min(1, 'Pick a preferred date'),
    deliveryMethod: z.enum(['office-pickup', 'door-delivery']),
    contactName: z.string().trim().min(2, 'Enter your name').max(80),
    contactPhone: z
      .string()
      .trim()
      .min(7, 'Enter a valid phone number')
      .max(20)
      .regex(/^[+()\d][\d\s().-]*$/, 'Enter a valid phone number')
      .optional(),
    contactEmail: z.string().trim().email('Enter a valid email').optional(),
  })
  .refine((d) => Boolean(d.contactPhone) || Boolean(d.contactEmail), {
    message: 'Provide a phone number or email so we can reach you',
    path: ['contactPhone'],
  });

export const updateBookingSchema = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'in-progress',
    'completed',
    'cancelled',
  ]),
});
