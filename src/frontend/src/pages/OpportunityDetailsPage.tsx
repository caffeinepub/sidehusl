import { useParams, useNavigate } from '@tanstack/react-router';
import { useOpportunity } from '@/hooks/useOpportunity';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Globe, 
  Building2, 
  Tag,
  Shield,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function OpportunityDetailsPage() {
  const { id } = useParams({ from: '/opportunity/$id' });
  const navigate = useNavigate();
  const { data: opportunity, isLoading, error } = useOpportunity(BigInt(id));

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/browse' })} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Opportunity not found or failed to load.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const barrierLevelText = Number(opportunity.barrierLevel) <= 2 ? 'Low' : Number(opportunity.barrierLevel) <= 4 ? 'Medium' : 'High';
  const scoreColor = Number(opportunity.score) >= 80 ? 'text-green-600 dark:text-green-400' : 
                     Number(opportunity.score) >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                     'text-red-600 dark:text-red-400';

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/browse' })} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="font-display mb-2">{opportunity.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{opportunity.company}</span>
                </div>
              </div>
              {opportunity.isFeatured && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline">
                <Tag className="mr-1 h-3 w-3" />
                {opportunity.category}
              </Badge>
              <Badge variant="outline">
                {opportunity.remote ? (
                  <>
                    <Globe className="mr-1 h-3 w-3" />
                    Remote
                  </>
                ) : (
                  <>
                    <MapPin className="mr-1 h-3 w-3" />
                    Local
                  </>
                )}
              </Badge>
              <Badge variant="outline">
                Barrier: {barrierLevelText}
              </Badge>
            </div>

            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                Visit Opportunity
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {opportunity.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                AI Screening Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Quality Score</span>
                  <span className={`text-2xl font-bold ${scoreColor}`}>
                    {Number(opportunity.score)}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Number(opportunity.score)}%` }}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Screening Analysis
                </h4>
                <p className="text-sm text-muted-foreground">
                  {opportunity.reason}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  This opportunity has been automatically evaluated based on multiple factors including 
                  barrier to entry, category relevance, and content quality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Company</span>
                <span className="font-medium">{opportunity.company}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{opportunity.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{opportunity.remote ? 'Remote' : 'Local'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Barrier Level</span>
                <span className="font-medium">{barrierLevelText}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-medium">
                  {new Date(Number(opportunity.createdAt) / 1000000).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

