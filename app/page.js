import TestimonialCarousel from "@/components/testimonial-carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, Book, Calendar, ChevronRight, FileText, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import faqs from "@/data/faqs";
import { getDailyPrompt } from "@/actions/public";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default async function Home() {
  const advice = await getDailyPrompt();
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 gradient-title">
          Your space is MiniPro.<br /> Your story to Tell.
        </h1>
        <p className="text-lg md:text-xl text-pink-800 mb-8">
          Let thoughts drift onto the page, Let moods unfold like morning light, In a quiet place where your mind can breathe.
        </p>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-50 via-transparent to-transparent pointer-events-none z-10" />
          <div className="bg-white rounded-2xl p-4 max-w-full mx-auto relative h-64">
            <div className="border-b border-pink-100 pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-600" />
                <span className="text-pink-900 font-medium">
                  Today&rsquo;s Entry
                </span>
              </div>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-pink-200" />
                <div className="h-3 w-3 rounded-full bg-pink-300" />
                <div className="h-3 w-3 rounded-full bg-pink-400" />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-2">
              <h3 className="text-xl font-semibold text-pink-900">{advice?advice:"My Thoughts today"}</h3>
              <Skeleton className="h-4 bg-pink-100 rounded w-48 mx-auto" />
              <Skeleton className="h-4 bg-pink-100 rounded w-60 mx-auto" />
              <Skeleton className="h-4 bg-pink-100 rounded w-40 mx-auto" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button className="bg-pink-600 px-8 py-6 rounded-full flex items-center gap-2">
              Start Writing <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" className="bg-white px-8 py-6 rounded-full flex border-pink-600 text-pink-600 hover:bg-pink-100">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <section id="features" className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-xl text-pink-900 mb-2">{feature.title}</h3>
                <p className="text-pink-700">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-pink-900">Rich Text Editor</h3>
            <p className="text-lg text-pink-700">Express yourself fully with our powerful editor featuring:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Format text with ease</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Embed links</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
            <div className="flex gap-2 mb-6">
              <div className="h-8 w-8 rounded bg-pink-100" />
              <div className="h-8 w-8 rounded bg-pink-100" />
              <div className="h-8 w-8 rounded bg-pink-100" />
            </div>
            <div className="h-4 bg-pink-50 rounded w-3/4" />
            <div className="h-4 bg-pink-50 rounded w-full" />
            <div className="h-4 bg-pink-50 rounded w-2/3" />
            <div className="h-4 bg-pink-50 rounded w-1/3" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
            <div className="h-40 bg-gradient-to-t from-pink-100 to-pink-50 rounded-lg" />
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-pink-100 rounded" />
              <div className="h-4 w-16 bg-pink-100 rounded" />
              <div className="h-4 w-16 bg-pink-100 rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-pink-900">Mood Analytics</h3>
            <p className="text-lg text-pink-700">Track your emotional journey with powerful analytics:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Visual mood trends</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Pattern recognition</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <TestimonialCarousel />

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-pink-900 mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full mx-auto">
          {faqs.map((faq, index) => {
            return (
             <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger className="text-pink-900 text-lg">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-pink-700">{faq.a}</AccordionContent>
             </AccordionItem>
            )
          })}
          
        </Accordion>
      </div>

      <div className="mt-24">
        <Card className="bg-gradient-to-r from-pink-100 to-amber-100">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">
              Start Reflecting On Your Journey Today
            </h2>
            <p className="text-lg text-pink-700 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who have already discovered the power of digital journaling.
            </p>
            <Link href="/dashboard">
             <Button className="animate-bounce text-white bg-pink-600" size="lg">
              Get Started for Free <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}