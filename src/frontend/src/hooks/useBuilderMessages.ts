import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BuilderMessage, Variant_user_assistant } from '../backend';

export function useBuilderMessages(sessionId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<BuilderMessage[]>({
    queryKey: ['builderMessages', sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.getSessionMessages(sessionId);
    },
    enabled: !!actor && !actorFetching && !!sessionId,
  });

  const appendMutation = useMutation({
    mutationFn: async ({
      sessionId,
      role,
      content,
    }: {
      sessionId: string;
      role: Variant_user_assistant;
      content: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.appendBuilderMessage(sessionId, role, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['builderMessages', variables.sessionId] });
    },
  });

  return {
    ...query,
    mutateAsync: appendMutation.mutateAsync,
    isPending: appendMutation.isPending,
  };
}
