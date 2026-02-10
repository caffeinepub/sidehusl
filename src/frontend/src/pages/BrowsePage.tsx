import { useState, useMemo } from 'react';
import { useOpportunities } from '@/hooks/useOpportunities';
import OpportunityCard from '@/components/OpportunityCard';
import BrowseFiltersBar from '@/components/BrowseFiltersBar';
import FeaturedOpportunitiesSection from '@/components/FeaturedOpportunitiesSection';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useSearch, useNavigate } from '@tanstack/react-router';

export default function BrowsePage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/browse' }) as any;
  
  const [remoteFilter, setRemoteFilter] = useState<boolean | null>(
    searchParams?.remote === 'true' ? true : searchParams?.remote === 'false' ? false : null
  );
  const [categoryFilter, setCategoryFilter] = useState<string | null>(searchParams?.category || null);
  const [barrierFilter, setBarrierFilter] = useState<bigint | null>(
    searchParams?.barrier ? BigInt(searchParams.barrier) : null
  );
  const [sortMode, setSortMode] = useState<'score' | 'recent'>(searchParams?.sort || 'score');

  const { data: opportunities, isLoading, error } = useOpportunities(remoteFilter, categoryFilter, barrierFilter);

  // Update URL when filters change
  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams();
    if (newFilters.remote !== null) params.set('remote', String(newFilters.remote));
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.barrier !== null) params.set('barrier', String(newFilters.barrier));
    if (newFilters.sort) params.set('sort', newFilters.sort);
    
    navigate({ 
      to: '/browse',
      search: Object.fromEntries(params.entries())
    });
  };

  const handleRemoteFilterChange = (value: boolean | null) => {
    setRemoteFilter(value);
    updateFilters({ remote: value, category: categoryFilter, barrier: barrierFilter, sort: sortMode });
  };

  const handleCategoryFilterChange = (value: string | null) => {
    setCategoryFilter(value);
    updateFilters({ remote: remoteFilter, category: value, barrier: barrierFilter, sort: sortMode });
  };

  const handleBarrierFilterChange = (value: bigint | null) => {
    setBarrierFilter(value);
    updateFilters({ remote: remoteFilter, category: categoryFilter, barrier: value, sort: sortMode });
  };

  const handleSortChange = (value: 'score' | 'recent') => {
    setSortMode(value);
    updateFilters({ remote: remoteFilter, category: categoryFilter, barrier: barrierFilter, sort: value });
  };

  const sortedOpportunities = useMemo(() => {
    if (!opportunities) return [];
    const sorted = [...opportunities];
    if (sortMode === 'score') {
      sorted.sort((a, b) => Number(b.score) - Number(a.score));
    } else {
      sorted.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    }
    return sorted;
  }, [opportunities, sortMode]);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display mb-2">Browse Opportunities</h1>
        <p className="text-lg text-muted-foreground">
          Discover vetted side hustles in Tech, Crypto, and AI
        </p>
      </div>

      {/* Featured Section */}
      <div className="mb-12">
        <FeaturedOpportunitiesSection />
      </div>

      {/* Filters */}
      <BrowseFiltersBar
        remoteFilter={remoteFilter}
        categoryFilter={categoryFilter}
        barrierFilter={barrierFilter}
        sortMode={sortMode}
        onRemoteFilterChange={handleRemoteFilterChange}
        onCategoryFilterChange={handleCategoryFilterChange}
        onBarrierFilterChange={handleBarrierFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Results */}
      <div className="mt-8">
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load opportunities. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && sortedOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No opportunities found matching your filters.
            </p>
          </div>
        )}

        {!isLoading && !error && sortedOpportunities.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedOpportunities.map((opportunity) => (
              <OpportunityCard key={String(opportunity.id)} opportunity={opportunity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
