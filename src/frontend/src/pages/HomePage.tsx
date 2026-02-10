import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Shield, Zap, TrendingUp, Sparkles } from 'lucide-react';
import FeaturedOpportunitiesSection from '@/components/FeaturedOpportunitiesSection';
import { useEnsureXerisFeatured } from '@/hooks/useEnsureXerisFeatured';

export default function HomePage() {
  const navigate = useNavigate();
  useEnsureXerisFeatured();

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Bleed */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/sidehusl-hero-full.dim_1920x900.jpg"
            alt="SIDEHUSL AI - Build your side hustle today"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Overlay Gradient for stronger contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/98 via-background/85 to-background/98 dark:from-background/95 dark:via-background/80 dark:to-background/95" />
          {/* Additional accent gradient wash for visual impact */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 mix-blend-overlay" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-sm font-bold shadow-glow-sm">
                <Sparkles className="h-4 w-4" />
                AI-Powered App Builder
              </span>
            </div>
            <h1 className="font-display text-hero-glow">
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                SIDEHUSL AI, BUILD YOUR SIDE HUSTLE TODAY!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto font-medium text-hero-glow">
              Create your own AI-powered web app in minutes. No coding required. 
              Turn your ideas into reality with our intelligent app builder.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate({ to: '/builder' })} 
                className="shadow-glow text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-2 border-primary/50"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Open AI App Builder
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate({ to: '/browse' })}
                className="text-lg px-8 py-6 border-2 border-primary/30 hover:bg-primary/10"
              >
                Browse Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display mb-4">Why Choose SIDEHUSL?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We use AI to screen every opportunity for legitimacy and value, so you can focus on what matters.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Screened</h3>
              <p className="text-muted-foreground">
                Every opportunity is automatically evaluated for validity and value, filtering out scams and low-quality listings.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Low Barrier to Entry</h3>
              <p className="text-muted-foreground">
                Focus on opportunities that don't require extensive experience or upfront investment. Start earning quickly.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tech & Crypto Focus</h3>
              <p className="text-muted-foreground">
                Specialized in the tech and cryptocurrency industries, where remote and flexible opportunities thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <FeaturedOpportunitiesSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-12 text-center">
            <h2 className="font-display mb-4">Ready to Start Your Side Hustle?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse hundreds of vetted opportunities or submit your own for the community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/browse' })}>
                Explore Opportunities
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/submit' })}>
                Submit Opportunity
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
