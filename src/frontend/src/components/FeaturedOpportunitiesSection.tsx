import { useFeaturedOpportunities } from '@/hooks/useFeaturedOpportunities';
import OpportunityCard from './OpportunityCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Star, AlertCircle } from 'lucide-react';

export default function FeaturedOpportunitiesSection() {
  const { data: featured, isLoading, error } = useFeaturedOpportunities();

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-6 w-6 text-accent fill-accent" />
          <h2 className="text-3xl font-bold">Featured Opportunities</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load featured opportunities.
        </AlertDescription>
      </Alert>
    );
  }

  if (!featured || featured.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-accent fill-accent" />
        <h2 className="text-3xl font-bold">Featured Opportunities</h2>
      </div>
      <p className="text-muted-foreground mb-6">
        Hand-picked opportunities verified for quality and legitimacy
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((opportunity) => (
          <OpportunityCard key={Number(opportunity.id)} opportunity={opportunity} featured />
        ))}
      </div>
    </div>
  );
}

