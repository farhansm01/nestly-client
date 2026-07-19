import Hero from "@/components/landing/Hero";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import CategoriesSection from "@/components/landing/CategoriesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import AIHighlightsSection from "@/components/landing/AIHighlightsSection";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import NewsletterCTA from "@/components/landing/NewsletterCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProperties />
      <CategoriesSection />
      <HowItWorks />
      <AIHighlightsSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterCTA />
    </div>
  );
}
