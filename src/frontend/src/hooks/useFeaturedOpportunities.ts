import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Opportunity } from '../backend';

export function useFeaturedOpportunities() {
  const { actor, isFetching } = useActor();

  return useQuery<Opportunity[]>({
    queryKey: ['featured-opportunities'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFeaturedOpportunities();
    },
    enabled: !!actor && !isFetching,
  });
}

