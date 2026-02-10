import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, TrendingUp, Users, Target, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-12">
        <h1 className="font-display mb-4">About SIDEHUSL</h1>
        <p className="text-xl text-muted-foreground">
          Your trusted platform for discovering legitimate side hustles in tech and crypto.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            SIDEHUSL was created to solve a critical problem in the gig economy: finding legitimate, 
            valuable opportunities without wading through scams and low-quality listings. We focus 
            exclusively on the tech and cryptocurrency industries, where remote and flexible work 
            opportunities are abundant but often difficult to verify.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our AI-powered screening system evaluates every opportunity for legitimacy and value, 
            helping you focus on what matters most: building your side income.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Community Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Anyone can submit opportunities they've found or created. This crowdsourced 
                  approach ensures a diverse range of options for all skill levels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  AI Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every submission is automatically evaluated using our AI screening system, 
                  which checks for red flags, assesses value, and assigns quality scores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Smart Filtering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Filter opportunities by location (remote/local), category, and barrier to entry. 
                  Find exactly what you're looking for without the noise.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Quality First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Results are sorted by quality score by default, ensuring the best opportunities 
                  rise to the top. No more endless scrolling through questionable listings.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">What We Screen For</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Barrier to Entry</h3>
                <p className="text-muted-foreground">
                  We prioritize opportunities with low barriers to entry, so you can start earning 
                  quickly without extensive prerequisites or upfront investment.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Industry Relevance</h3>
                <p className="text-muted-foreground">
                  All opportunities are categorized and verified to be relevant to the tech and 
                  crypto industries, ensuring you find work in your field of interest.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Content Quality</h3>
                <p className="text-muted-foreground">
                  We evaluate the completeness and clarity of opportunity descriptions to ensure 
                  you have the information you need to make informed decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Legitimacy Signals</h3>
                <p className="text-muted-foreground">
                  Our system looks for red flags and positive signals to help identify potentially 
                  fraudulent or low-value opportunities before they reach you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Transparency Matters</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            We believe in complete transparency. Every opportunity displays its AI screening score 
            and the reasoning behind it. You can see exactly why an opportunity was rated the way 
            it was, helping you make informed decisions.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our screening is deterministic and rule-based, not a black box. While we call it "AI," 
            it's actually a sophisticated set of heuristics designed to catch common issues and 
            highlight quality opportunities.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Get Started</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Ready to find your next side hustle? Browse our curated opportunities or submit one 
            you've discovered. Together, we're building a trusted community for tech and crypto 
            professionals looking to expand their income streams.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/browse" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Browse Opportunities
            </a>
            <a href="/submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Submit Opportunity
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

