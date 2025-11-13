import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart, KeyRound, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImage = placeholderImages.find(p => p.id === 'landing-hero');

  const features = [
    {
      icon: <KeyRound className="h-8 w-8 text-primary" />,
      title: "Secure API Key Management",
      description: "Easily register your apps, generate, and manage API keys with built-in revocation and expiration.",
    },
    {
      icon: <Workflow className="h-8 w-8 text-primary" />,
      title: "Real-time Event Collection",
      description: "A high-performance endpoint to collect website and application events with robust validation.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Powerful Analytics",
      description: "Aggregate and query your data with flexible, time-based summaries and deep user-level statistics.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <BarChart className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">AnalytixVerse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Docs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Understand Your Users, Build Better Products
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AnalytixVerse provides a powerful, scalable backend to collect and analyze user events, giving you the insights to drive growth.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  View Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">
                  Read The Docs
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted/50 py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Powerful Features, Simple Interface</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to turn raw data into actionable insights.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-accent/50 rounded-full h-16 w-16 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {heroImage && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Visualize Your Data Flow</h2>
              <p className="mt-4 text-muted-foreground">From collection to visualization, AnalytixVerse gives you a clear picture of user engagement.</p>
            </div>
            <div className="mt-12">
               <div className="aspect-[16/9] overflow-hidden rounded-xl border-2 border-primary/20 shadow-2xl shadow-primary/20">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="h-6 w-6 text-primary" />
            <span className="font-semibold">AnalytixVerse</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} AnalytixVerse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
