import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Opportunity } from '../backend';

export function useOpportunities(
  remoteFilter: boolean | null,
  categoryFilter: string | null,
  barrierFilter: bigint | null
) {
  const { actor, isFetching } = useActor();

  return useQuery<Opportunity[]>({
    queryKey: ['opportunities', remoteFilter, categoryFilter, barrierFilter?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOpportunities(remoteFilter, categoryFilter, barrierFilter);
    },
    enabled: !!actor && !isFetching,
  });
}

