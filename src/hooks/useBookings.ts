import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createBooking,
  deleteBooking,
  fetchBookings,
  updateBookingStatus,
} from '@/services/booking';
import type { BookingStatus, CreateBookingInput } from '@/types/booking';

const BOOKINGS_KEY = ['bookings'] as const;

/** List bookings (admin only). */
export function useBookings() {
  return useQuery({
    queryKey: BOOKINGS_KEY,
    queryFn: fetchBookings,
  });
}

/** Submit a booking from the public form. */
export function useCreateBooking() {
  return useMutation({
    mutationFn: (input: CreateBookingInput) => createBooking(input),
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      updateBookingStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY }),
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY }),
  });
}
