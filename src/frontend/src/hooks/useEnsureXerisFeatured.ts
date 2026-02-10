import { useEffect, useState } from 'react';
import { useActor } from './useActor';
import { useQueryClient } from '@tanstack/react-query';

export function useEnsureXerisFeatured() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!actor || initialized) return;

    const initializeXeris = async () => {
      try {
        await actor.addXerisMiningOpportunity();
        queryClient.invalidateQueries({ queryKey: ['featured-opportunities'] });
        queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      } catch (error) {
        // Silently fail if already exists or other error
        console.log('Xeris initialization skipped:', error);
      } finally {
        setInitialized(true);
      }
    };

    initializeXeris();
  }, [actor, initialized, queryClient]);
}

