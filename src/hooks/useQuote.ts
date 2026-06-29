import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  submitQuoteRequest,
  fetchQuotes,
  updateQuoteStatus,
  deleteQuote,
} from '@/services/quote';
import type { QuoteRequest, QuoteStatus } from '@/types/quote';

const QUOTES_KEY = ['quotes'] as const;

/** Submit a quote request from the public form. */
export function useQuote() {
  return useMutation({
    mutationFn: (request: QuoteRequest) => submitQuoteRequest(request),
  });
}

/** List quote requests (admin only). */
export function useQuotesList() {
  return useQuery({
    queryKey: QUOTES_KEY,
    queryFn: fetchQuotes,
  });
}

/** Update a quote request's status (admin only). */
export function useUpdateQuoteStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: QuoteStatus }) =>
      updateQuoteStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUOTES_KEY }),
  });
}

/** Delete a quote request (admin only). */
export function useDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUOTES_KEY }),
  });
}
