import React from 'react';
import Link  from 'next/link';
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, BarChart2, CheckCircle, PlayCircle, Shield, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoCloud from '@/components/LogoCloud';
import HeroIllustration from '@/components/HeroIllustration';
import TestimonialCard from '@/components/TestimonialCard';
import PricingCard from '@/components/PricingCard';
import LeadMagnetForm from '@/components/LeadMagnetForm';

const Index = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-white">
        {/* Background gradient with overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-navy-800 via-navy-700 to-accent-blue/90 z-0"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 z-0" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
             }}></div>
             
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <div className="inline-block bg-white/10 backdrop-blur-xs px-4 py-1 rounded-full text-sm font-medium text-accent-blue mb-2">
                AI-Powered Sales Coaching
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Transform Your Sales Calls Into <span className="text-accent-blue">Coaching Insights</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-xl">
                Upload your sales call transcripts and get personalized coaching, objection handling advice, and performance metrics in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent-blue hover:bg-accent-blue/90 text-white font-medium">
                  <Link href="/signup">Start for Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-medium">
                  <Link href="#how-it-works" className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    How It Works
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent-blue" />
                No credit card required for 14-day trial
              </p>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-accent-blue/20 rounded-full z-0 animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -right-10 -bottom-4 w-32 h-32 bg-accent-teal/20 rounded-full z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-gray-50 to-white"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
              Key Features
            </span>
            <h2 className="text-4xl font-bold text-navy-800 mb-4">Powerful Sales Coaching at Your Fingertips</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SalesCoach.guru helps you improve your sales calls with AI-powered insights and personalized coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-lg shadow-blue-100/60 border border-gray-200 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Easy Transcript Upload</h3>
                <p className="text-gray-600">
                  Upload transcripts in multiple formats and get insights in seconds. No complicated setup required.
                </p>
              </div>
              <div className="h-2 bg-linear-to-r from-blue-500 to-blue-600"></div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-lg shadow-teal-100/60 border border-gray-200 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="h-14 w-14 bg-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Detailed Analytics</h3>
                <p className="text-gray-600">
                  Get comprehensive metrics on talk time, questions asked, objections handled, and customer sentiment.
                </p>
              </div>
              <div className="h-2 bg-linear-to-r from-teal-500 to-teal-600"></div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-lg shadow-purple-100/60 border border-gray-200 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="h-14 w-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Secure & Private</h3>
                <p className="text-gray-600">
                  Your sales data stays private. We use enterprise-grade encryption to protect all your information.
                </p>
              </div>
              <div className="h-2 bg-linear-to-r from-purple-500 to-purple-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl accent-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-linear-to-tr accent-teal/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="bg-navy-800/10 text-navy-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-navy-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with SalesCoach.guru is simple and takes just minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-linear-to-br from-blue-500 to-blue-700 text-white rounded-2xl flex items-center justify-center mb-6 font-semibold text-lg shadow-lg shadow-blue-200 transform transition-transform duration-300 hover:scale-110">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Upload className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Upload Transcripts</h3>
              <p className="text-gray-600">
                Upload your sales call transcripts in TXT, PDF, VTT, DOC, or DOCX format.
              </p>
              <div className="mt-6 flex justify-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Step 1</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-linear-to-br from-accent-teal to-teal-700 text-white rounded-2xl flex items-center justify-center mb-6 font-semibold text-lg shadow-lg shadow-teal-200 transform transition-transform duration-300 hover:scale-110">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your calls for objections, sentiment, talk time, and more.
              </p>
              <div className="mt-6 flex justify-center">
                <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">Step 2</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-linear-to-br from-purple-500 to-purple-700 text-white rounded-2xl flex items-center justify-center mb-6 font-semibold text-lg shadow-lg shadow-purple-200 transform transition-transform duration-300 hover:scale-110">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Get Coaching</h3>
              <p className="text-gray-600">
                Receive personalized coaching advice and actionable insights to improve your sales calls.
              </p>
              <div className="mt-6 flex justify-center">
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Step 3</span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-navy-800 hover:bg-navy-700 text-white">
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-linear-to-br from-navy-800 via-navy-700 to-navy-900"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
             }}></div>
             
        {/* Blurred circles */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-blue opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-teal opacity-20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-accent-blue text-sm font-medium mb-6">
                <div className="w-2 h-2 rounded-full bg-accent-blue mr-2 animate-pulse"></div>
                Free Tool
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Try Our Free Sales Objection Analyzer</h2>
              <p className="text-xl text-gray-300 mb-8">
                Paste a section of your sales call where a customer raised an objection, and see how our AI can help you handle it better.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-accent-blue/20 shrink-0 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-accent-blue" />
                  </div>
                  <p className="text-white font-medium">Identify objection type and underlying concerns</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-accent-blue/20 shrink-0 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-accent-blue" />
                  </div>
                  <p className="text-white font-medium">Get suggested responses that actually work</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-accent-blue/20 shrink-0 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-accent-blue" />
                  </div>
                  <p className="text-white font-medium">Improve your objection handling skills instantly</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-8 shadow-xl relative">
              <div className="absolute -top-4 -right-4 bg-accent-blue text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                100% Free
              </div>
              <LeadMagnetForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of sales professionals who are improving their calls with SalesCoach.guru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="The objection handling advice alone is worth the price. I've seen a 15% increase in my close rate since using SalesCoach.guru."
              name="Sarah Johnson"
              title="Account Executive, TechCorp"
              rating={5}
            />
            <TestimonialCard 
              quote="As a new sales rep, this tool has been invaluable for my training. I can learn from my calls and improve much faster."
              name="Michael Chen"
              title="SDR, GrowthSoft"
              rating={5}
            />
            <TestimonialCard 
              quote="I was skeptical at first, but the insights are spot on. It's like having a sales coach review every one of my calls."
              name="Jessica Miller"
              title="Sales Manager, FinServe"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-800 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that&apos;s right for you. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Basic"
              price="29"
              description="Perfect for individual sales reps."
              features={[
                "Up to 20 transcript uploads per month",
                "Basic sentiment analysis",
                "Objection identification",
                "Performance metrics",
                "Email support"
              ]}
              cta="Start Free Trial"
              highlighted={false}
            />
            <PricingCard 
              title="Pro"
              price="79"
              description="Ideal for serious sales professionals."
              features={[
                "Up to 100 transcript uploads per month",
                "Advanced sentiment analysis",
                "Objection library with counters",
                "Detailed coaching recommendations",
                "Performance trends over time",
                "Priority email support"
              ]}
              cta="Start Free Trial"
              highlighted={true}
            />
            <PricingCard 
              title="Team"
              price="199"
              description="For sales teams of up to 5 members."
              features={[
                "Up to 500 transcript uploads per month",
                "Team performance dashboard",
                "Comparative analysis",
                "Custom objection library",
                "Advanced reporting",
                "Priority phone & email support"
              ]}
              cta="Start Free Trial"
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-700 text-white text-center">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your sales conversations?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of sales professionals who are using AI to improve their sales skills and close more deals.
          </p>
          <Button asChild size="lg" className="font-medium">
            <Link href="/signup">Get Started Today <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

