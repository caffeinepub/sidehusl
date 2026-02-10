import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSubmitOpportunity } from '@/hooks/useSubmitOpportunity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function SubmitOpportunityPage() {
  const navigate = useNavigate();
  const { mutate: submitOpportunity, isPending } = useSubmitOpportunity();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    link: '',
    remote: true,
    category: 'Tech',
    barrierLevel: '1',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company/Source is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    } else if (!formData.link.startsWith('http://') && !formData.link.startsWith('https://')) {
      newErrors.link = 'Link must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    submitOpportunity(
      {
        title: formData.title,
        company: formData.company,
        description: formData.description,
        link: formData.link,
        remote: formData.remote,
        category: formData.category,
        barrierLevel: BigInt(formData.barrierLevel),
      },
      {
        onSuccess: (id) => {
          toast.success('Opportunity submitted successfully!');
          navigate({ to: '/opportunity/$id', params: { id: String(id) } });
        },
        onError: (error) => {
          toast.error('Failed to submit opportunity');
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display mb-2">Submit an Opportunity</h1>
        <p className="text-lg text-muted-foreground">
          Share a side hustle opportunity in Tech, Crypto, or AI with the community. All submissions are automatically screened by AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opportunity Details</CardTitle>
          <CardDescription>
            Provide as much detail as possible to help others evaluate this opportunity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Freelance Web Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">
                Company/Source <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                placeholder="e.g., Upwork, Fiverr, or company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the opportunity, requirements, and what makes it valuable..."
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">
                Link <span className="text-destructive">*</span>
              </Label>
              <Input
                id="link"
                type="url"
                placeholder="https://example.com/opportunity"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className={errors.link ? 'border-destructive' : ''}
              />
              {errors.link && (
                <p className="text-sm text-destructive">{errors.link}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="barrierLevel">Barrier to Entry</Label>
                <Select
                  value={formData.barrierLevel}
                  onValueChange={(value) => setFormData({ ...formData, barrierLevel: value })}
                >
                  <SelectTrigger id="barrierLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Very Low (1)</SelectItem>
                    <SelectItem value="2">Low (2)</SelectItem>
                    <SelectItem value="3">Medium (3)</SelectItem>
                    <SelectItem value="4">High (4)</SelectItem>
                    <SelectItem value="5">Very High (5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="remote">Remote Opportunity</Label>
                <p className="text-sm text-muted-foreground">
                  Can this be done remotely from anywhere?
                </p>
              </div>
              <Switch
                id="remote"
                checked={formData.remote}
                onCheckedChange={(checked) => setFormData({ ...formData, remote: checked })}
              />
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Your submission will be automatically screened by AI for validity and value. 
                High-quality opportunities will be prioritized in search results.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Opportunity
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/browse' })}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
