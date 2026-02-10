import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface SubmitOpportunityParams {
  title: string;
  company: string;
  description: string;
  link: string;
  remote: boolean;
  category: string;
  barrierLevel: bigint;
}

export function useSubmitOpportunity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitOpportunityParams) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitOpportunity(
        params.title,
        params.company,
        params.description,
        params.link,
        params.remote,
        params.category,
        params.barrierLevel
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['featured-opportunities'] });
    },
  });
}

