"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  PlayCircle,
  Shield,
  Upload,
  Sparkles,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoCloud from "@/components/LogoCloud";
import HeroIllustration from "@/components/HeroIllustration";
import TestimonialCard from "@/components/TestimonialCard";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import LandingPagePricing from "@/components/LandingPagePricing";
import { useState } from "react";
import { DemoModal } from "@/components/DemoModal";

const Index = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-white">
        {/* Background gradient with overlay */}
        <div className="absolute inset-0 bg-[#1B2D41] z-0"></div>

        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <div className="inline-block bg-white/10 backdrop-blur-xs px-4 py-1 rounded-full text-sm font-medium text-[#E1766E] mb-2">
                AI-Powered Sales Coaching
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight font-playfair">
                Unlock Your Team's Hidden Wins. In Just One Call.
              </h1>
              <p className="text-xl text-gray-200 max-w-xl">
                Most sales teams train like it's 2015—guesswork, generic
                scripts, and zero insight into real call performance. With
                CloseDash, you'll finally see what's working in the moment—and
                turn it into more revenue by next week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E1766E] hover:bg-[#E1766E]/90 text-white font-medium"
                >
                  <Link href="/signup">
                    Upload a Transcript, Get a Free Analysis
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-medium"
                >
                  <Link
                    href="#how-it-works"
                    className="flex items-center gap-2"
                  >
                    <PlayCircle className="h-5 w-5" />
                    How It Works
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#E1766E]" />
                No tools to install. No credit card required. Just results.
              </p>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div
                  className="absolute -left-6 -top-6 w-24 h-24 bg-[#E1766E]/20 rounded-full z-0 animate-pulse"
                  style={{ animationDuration: "4s" }}
                ></div>
                <div
                  className="absolute -right-10 -bottom-4 w-32 h-32 bg-[#1B2D41]/20 rounded-full z-0 animate-pulse"
                  style={{ animationDuration: "6s" }}
                ></div>
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF9] relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-gray-50 to-[#FDFBF9]"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="bg-[#E1766E]/10 text-[#E1766E] px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
              The Transformation
            </span>
            <h2 className="text-4xl font-bold text-[#1B2D41] mb-4 font-playfair">
              From Guesswork to Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly how your rep handled objections—and what would've
              closed the deal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-white rounded-xl shadow-lg shadow-blue-100/60 border border-gray-200 overflow-hidden group hover:-translate-y-2 transition-all duration-300 relative">
              <div className="p-8">
                <div className="h-14 w-14 bg-[#1B2D41] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <X className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1B2D41] mb-3 font-playfair">
                  Before CloseDash
                </h3>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-[#E1766E] shrink-0 mt-1" />
                    <span>
                      Reps don't know why they're losing deals—just that they
                      are.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-[#E1766E] shrink-0 mt-1" />
                    <span>
                      Managers are buried in call recordings, guessing at
                      coaching.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-[#E1766E] shrink-0 mt-1" />
                    <span>
                      CEOs update playbooks twice a year—and hope it sticks.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 right-0 rounded-b-xl h-2 bg-gradient-to-r from-[#1B2D41] to-[#1B2D41]/80"></div>
            </div>

            {/* After */}
            <div className="bg-white rounded-xl shadow-lg shadow-blue-100/60 border border-gray-200 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="h-14 w-14 bg-[#E1766E] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1B2D41] mb-3 font-playfair">
                  After CloseDash
                </h3>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#E1766E] shrink-0 mt-1" />
                    <span>
                      Reps feel confident because they finally see what they're
                      doing right—and what to fix—on every call.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#E1766E] shrink-0 mt-1" />
                    <span>
                      Managers coach in minutes, not hours, with instant
                      visibility into objections and deal-killers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#E1766E] shrink-0 mt-1" />
                    <span>
                      Execs update scripts weekly—backed by data, not gut feel.
                      Velocity goes up. So does revenue.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="h-2 bg-gradient-to-r from-[#E1766E] to-[#E1766E]/80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF9] to-[#FDFBF9]/30"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-[#1B2D41]/5 to-[#1B2D41]/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#E1766E]/5 to-[#E1766E]/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#1B2D41]/10 to-[#E1766E]/10 text-[#1B2D41] px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block border border-[#1B2D41]/30">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-[#1B2D41] mb-4 tracking-tight font-playfair">
              Simple Process, Powerful Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with CloseDash is simple and takes just minutes.
            </p>
          </div>

          {/* Connected steps with line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connection line (visible on md and up screens) */}
            {/* <div className="hidden md:block absolute top-24 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-[#1B2D41] via-[#E1766E] to-[#1B2D41]"></div> */}

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1B2D41]/20 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="h-20 w-20 bg-gradient-to-br from-[#1B2D41] to-[#1B2D41]/80 text-white rounded-full flex items-center justify-center mb-6 font-semibold text-lg shadow-lg shadow-[#1B2D41]/20 transform transition-all duration-500 group-hover:scale-110 relative z-10">
                  <Upload className="h-8 w-8" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl w-full">
                <h3 className="text-xl font-semibold text-[#1B2D41] mb-3 font-playfair">
                  Upload One Call
                </h3>
                <p className="text-gray-600 min-h-[5.5rem]">
                  Send us a sales call transcript (we'll handle the formatting).
                  No integrations. No setup.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="bg-[#1B2D41]/10 text-[#1B2D41] text-xs px-3 py-1 rounded-full font-medium">
                    Step 1
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#E1766E]/20 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="h-20 w-20 bg-gradient-to-br from-[#E1766E] to-[#E1766E]/80 text-white rounded-full flex items-center justify-center mb-6 font-semibold text-lg shadow-lg shadow-[#E1766E]/20 transform transition-all duration-500 group-hover:scale-110 relative z-10">
                  <BarChart2 className="h-8 w-8" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl w-full">
                <h3 className="text-xl font-semibold text-[#1B2D41] mb-3 font-playfair">
                  Get the Hidden Data
                </h3>
                <p className="text-gray-600">
                  We analyze the conversation using CloseDash's Inside Engine™️
                  — breaking down objection handling, frameworks used, gaps in
                  talk time, and more.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="bg-[#E1766E]/10 text-[#E1766E] text-xs px-3 py-1 rounded-full font-medium">
                    Step 2
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1B2D41]/20 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="h-20 w-20 bg-gradient-to-br from-[#1B2D41] to-[#1B2D41]/80 text-white rounded-full flex items-center justify-center mb-6 font-semibold text-lg shadow-lg shadow-[#1B2D41]/20 transform transition-all duration-500 group-hover:scale-110 relative z-10">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl w-full">
                <h3 className="text-xl font-semibold text-[#1B2D41] mb-3 font-playfair">
                  See Exactly What to Fix
                </h3>
                <p className="text-gray-600">
                  You'll get a hyper-specific report showing what worked, what
                  didn't, and the next 3 things to tweak. You'll wish you had
                  this months ago.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="bg-[#1B2D41]/10 text-[#1B2D41] text-xs px-3 py-1 rounded-full font-medium">
                    Step 3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF9] to-[#FDFBF9]/30"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#1B2D41]/5 to-[#E1766E]/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-[#E1766E]/5 to-[#1B2D41]/5 rounded-full blur-3xl transform translate-y-1/2"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-[#1B2D41]/10 to-[#E1766E]/10 text-[#1B2D41] px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block border border-[#1B2D41]/30">
              What Others Are Saying
            </span>
            <h2 className="text-4xl font-bold text-[#1B2D41] mb-4 tracking-tight font-playfair">
              Real Results from Real Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              And yes, these results came from analyzing every call — not just
              cherry-picked wins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This was the first time I felt like I knew what was happening on our sales calls—without sitting through hours of recordings."
              name="Rachel K."
              title="VP of Revenue, B2B SaaS"
              gradientFrom="[#1B2D41]"
              gradientTo="[#1B2D41]/80"
            />
            <TestimonialCard
              quote="Our reps went from winging it to winning it. We rewrote our talk tracks in a week—and closed 3 deals from changes we made off the first transcript."
              name="Jared M."
              title="CEO, Marketing Agency"
              gradientFrom="[#E1766E]"
              gradientTo="[#E1766E]/80"
            />
            <TestimonialCard
              quote="I was stuck in the middle of the pack. CloseDash gave me a map to the top spot. I literally saw the patterns holding me back."
              name="Devin S."
              title="AE, Cybersecurity Startup"
              gradientFrom="[#1B2D41]"
              gradientTo="[#1B2D41]/80"
            />
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2D41] via-[#1B2D41]/90 to-[#1B2D41]/80"></div> */}

      {/* Background pattern */}
      {/* <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div> */}

      {/* Blurred circles */}
      {/* <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#E1766E] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#1B2D41] opacity-20 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[#E1766E] text-sm font-medium mb-6">
                <div className="w-2 h-2 rounded-full bg-[#E1766E] mr-2 animate-pulse"></div>
                Free Analysis
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight font-playfair">
                Get Your Free Sales Call Analysis
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Upload a sales call transcript and get instant insights on how
                to improve your performance and close more deals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-[#E1766E]/20 shrink-0 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-[#E1766E]" />
                  </div>
                  <p className="text-white font-medium">
                    Identify key moments and objection patterns
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-[#E1766E]/20 shrink-0 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-[#E1766E]" />
                  </div>
                  <p className="text-white font-medium">
                    Get actionable coaching recommendations
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-[#E1766E]/20 shrink-0 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-[#E1766E]" />
                  </div>
                  <p className="text-white font-medium">
                    Transform your sales conversations instantly
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-8 shadow-xl relative">
              <div className="absolute -top-4 -right-4 bg-[#E1766E] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                100% Free
              </div>
              <LeadMagnetForm />
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-[#FDFBF9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#1B2D41] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about CloseDash and how it can
              help transform your sales conversations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Will this work for my industry?",
                answer:
                  "Yes. CloseDash analyzes real conversations, not scripts—so whether you sell software, services, or something in between, the feedback is tailored to your buyer interactions.",
              },
              {
                question: "How fast can I get insights?",
                answer:
                  "In less than 24 hours. Upload a transcript today, get your personalized report tomorrow.",
              },
              {
                question: "Do I have to train my whole team?",
                answer:
                  "Nope. Start with just one rep (even just one call). CloseDash fits into your workflow—no new dashboards to learn, no team-wide rollout required.",
              },
              {
                question: "What does it cost?",
                answer:
                  "Your first analysis is 100% free. After that, we offer flexible pricing based on team size and volume—always ROI-backed.",
              },
              {
                question: "Will my reps actually use it?",
                answer:
                  "They already do. Our best users are mid-pack reps who want to grow and managers who are tired of wasting time guessing what's wrong. CloseDash gives them a fast feedback loop they actually enjoy.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-xl overflow-hidden transition-colors duration-200 ${
                  activeFaq === index
                    ? "bg-[#1B2D41]/5 border-[#E1766E]/20"
                    : "bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-6 text-left"
                >
                  <h3
                    className={`text-lg font-serif ${
                      activeFaq === index ? "text-[#E1766E]" : "text-[#1B2D41]"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`h-6 w-6 flex items-center justify-center rounded-full border ${
                      activeFaq === index
                        ? "border-[#E1766E] bg-[#E1766E]/10 text-[#E1766E]"
                        : "border-gray-300 bg-gray-100 text-gray-500"
                    }`}
                  >
                    {activeFaq === index ? "-" : "+"}
                  </div>
                </button>

                {activeFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden text-white">
        {/* Enhanced background with navy gradients and patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2D41] via-[#1B2D41]/90 to-[#1B2D41]/80">
          <div className="absolute inset-0">
            {/* Decorative dots pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            {/* Glowing orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#E1766E] rounded-full blur-3xl opacity-10 transform -translate-y-1/2 -translate-x-1/4"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1B2D41] rounded-full blur-3xl opacity-10 transform translate-y-1/2 translate-x-1/4"></div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-[#1B2D41]/40 p-12 rounded-2xl border border-[#1B2D41]/30 shadow-2xl">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 bg-[#E1766E]/20 rounded-full border border-[#E1766E]/20">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-[#E1766E]" />
              <span className="text-sm font-medium text-[#E1766E]">
                Your Sales Playbook Just Got a Reality Check
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-6 font-playfair">
              The old way? Train once, hope for the best, guess why reps miss
              quota.
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              The CloseDash way? Analyze every call, rewrite the playbook
              weekly, and unlock growth sitting right under your nose.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              You're one transcript away from seeing your team differently.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-[#E1766E] hover:bg-[#E1766E]/90 px-8 py-6 text-lg font-medium shadow-lg shadow-[#E1766E]/30 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-[#E1766E]/20"
            >
              <Link href="/signup">
                Get My Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <LandingPagePricing />

      <Footer />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
};

export default Index;
