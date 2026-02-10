import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { MapPin, Globe, ExternalLink, Star, TrendingUp } from 'lucide-react';
import type { Opportunity } from '../backend';

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
}

export default function OpportunityCard({ opportunity, featured = false }: OpportunityCardProps) {
  const navigate = useNavigate();

  const barrierLevelText = Number(opportunity.barrierLevel) <= 2 ? 'Low' : Number(opportunity.barrierLevel) <= 4 ? 'Medium' : 'High';
  const scoreColor = Number(opportunity.score) >= 80 ? 'text-green-600 dark:text-green-400' : 
                     Number(opportunity.score) >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                     'text-red-600 dark:text-red-400';

  return (
    <Card className={`hover:shadow-lg transition-shadow ${featured ? 'border-accent' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl line-clamp-2">{opportunity.title}</CardTitle>
          {featured && <Star className="h-5 w-5 text-accent fill-accent shrink-0" />}
        </div>
        <p className="text-sm text-muted-foreground">{opportunity.company}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{opportunity.category}</Badge>
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

        <p className="text-sm text-muted-foreground line-clamp-3">
          {opportunity.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Score:</span>
            <span className={`text-lg font-bold ${scoreColor}`}>
              {Number(opportunity.score)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {opportunity.reason}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          className="flex-1"
          onClick={() => navigate({ to: '/opportunity/$id', params: { id: String(opportunity.id) } })}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="icon"
          asChild
        >
          <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

