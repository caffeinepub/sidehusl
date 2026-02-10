import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useBuilderSessions() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<string[]>({
    queryKey: ['builderSessions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUserSessions();
    },
    enabled: !!actor && !actorFetching,
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createBuilderSession();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builderSessions'] });
    },
  });

  return {
    ...query,
    mutateAsync: createMutation.mutateAsync,
    isPending: createMutation.isPending,
  };
}
