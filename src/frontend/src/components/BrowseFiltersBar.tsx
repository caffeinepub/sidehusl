import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';

interface BrowseFiltersBarProps {
  remoteFilter: boolean | null;
  categoryFilter: string | null;
  barrierFilter: bigint | null;
  sortMode: 'score' | 'recent';
  onRemoteFilterChange: (value: boolean | null) => void;
  onCategoryFilterChange: (value: string | null) => void;
  onBarrierFilterChange: (value: bigint | null) => void;
  onSortChange: (value: 'score' | 'recent') => void;
}

export default function BrowseFiltersBar({
  remoteFilter,
  categoryFilter,
  barrierFilter,
  sortMode,
  onRemoteFilterChange,
  onCategoryFilterChange,
  onBarrierFilterChange,
  onSortChange,
}: BrowseFiltersBarProps) {
  const hasActiveFilters = remoteFilter !== null || categoryFilter !== null || barrierFilter !== null;

  const clearFilters = () => {
    onRemoteFilterChange(null);
    onCategoryFilterChange(null);
    onBarrierFilterChange(null);
  };

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Filters & Sort</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select
            value={remoteFilter === null ? 'all' : remoteFilter ? 'remote' : 'local'}
            onValueChange={(value) => {
              if (value === 'all') onRemoteFilterChange(null);
              else if (value === 'remote') onRemoteFilterChange(true);
              else onRemoteFilterChange(false);
            }}
          >
            <SelectTrigger id="location">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote Only</SelectItem>
              <SelectItem value="local">Local Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={categoryFilter || 'all'}
            onValueChange={(value) => onCategoryFilterChange(value === 'all' ? null : value)}
          >
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Tech">Tech</SelectItem>
              <SelectItem value="Crypto">Crypto</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="barrier">Barrier to Entry</Label>
          <Select
            value={barrierFilter === null ? 'all' : String(barrierFilter)}
            onValueChange={(value) => onBarrierFilterChange(value === 'all' ? null : BigInt(value))}
          >
            <SelectTrigger id="barrier">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="1">Very Low (1)</SelectItem>
              <SelectItem value="2">Low (2)</SelectItem>
              <SelectItem value="3">Medium (3)</SelectItem>
              <SelectItem value="4">High (4)</SelectItem>
              <SelectItem value="5">Very High (5)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={sortMode}
            onValueChange={(value) => onSortChange(value as 'score' | 'recent')}
          >
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Quality Score</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
