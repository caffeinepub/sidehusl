import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Opportunity } from '../backend';

export function useOpportunity(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Opportunity>({
    queryKey: ['opportunity', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getOpportunity(id);
    },
    enabled: !!actor && !isFetching,
  });
}

