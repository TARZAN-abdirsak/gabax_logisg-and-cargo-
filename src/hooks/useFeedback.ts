import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteFeedback,
  fetchApprovedFeedback,
  fetchFeedback,
  submitFeedback,
  updateFeedbackStatus,
} from '@/services/feedback';
import type { CreateFeedbackInput, FeedbackStatus } from '@/types/feedback';

const FEEDBACK_KEY = ['feedback'] as const;

/** List feedback (admin only). */
export function useFeedbackList() {
  return useQuery({
    queryKey: FEEDBACK_KEY,
    queryFn: fetchFeedback,
  });
}

/** Public, admin-featured testimonials for the homepage. */
export function useApprovedFeedback() {
  return useQuery({
    queryKey: ['feedback', 'public'],
    queryFn: fetchApprovedFeedback,
    refetchInterval: 60_000,
  });
}

/** Submit feedback from the public form. */
export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (input: CreateFeedbackInput) => submitFeedback(input),
  });
}

export function useUpdateFeedbackStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: FeedbackStatus }) =>
      updateFeedbackStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY }),
  });
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFeedback(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY }),
  });
}
