"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "@/components/PricingCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

// Pricing plans data
const pricingPlans = {
  monthly: [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individual sales reps",
      price: "$49",
      period: "/month",
      features: [
        "10 transcript uploads per month",
        "Basic sentiment analysis",
        "Objection identification",
        "Performance metrics",
        "1 user",
        "Email support",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
    },
    {
      id: "pro",
      name: "Professional",
      description: "Ideal for growing sales teams",
      price: "$99",
      period: "/month",
      features: [
        "50 transcript uploads per month",
        "Advanced sentiment analysis",
        "Detailed objection handling insights",
        "Customizable reports",
        "5 users",
        "Priority email & chat support",
        "Export data in various formats",
      ],
      buttonText: "Get Pro",
      buttonVariant: "default",
      isPopular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large sales organizations",
      price: "$249",
      period: "/month",
      features: [
        "Unlimited transcript uploads",
        "Full sentiment & tone analysis",
        "Custom AI coaching models",
        "Team performance analytics",
        "Unlimited users",
        "24/7 dedicated support",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ],
  annual: [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individual sales reps",
      price: "$39",
      period: "/month, billed annually",
      features: [
        "10 transcript uploads per month",
        "Basic sentiment analysis",
        "Objection identification",
        "Performance metrics",
        "1 user",
        "Email support",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
    },
    {
      id: "pro",
      name: "Professional",
      description: "Ideal for growing sales teams",
      price: "$79",
      period: "/month, billed annually",
      features: [
        "50 transcript uploads per month",
        "Advanced sentiment analysis",
        "Detailed objection handling insights",
        "Customizable reports",
        "5 users",
        "Priority email & chat support",
        "Export data in various formats",
      ],
      buttonText: "Get Pro",
      buttonVariant: "default",
      isPopular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large sales organizations",
      price: "$199",
      period: "/month, billed annually",
      features: [
        "Unlimited transcript uploads",
        "Full sentiment & tone analysis",
        "Custom AI coaching models",
        "Team performance analytics",
        "Unlimited users",
        "24/7 dedicated support",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ],
};

// FAQ data
const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "Our 14-day free trial gives you full access to all features in our Professional plan. No credit card required until you decide to continue. You can cancel anytime during the trial period with no obligation.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can easily upgrade or downgrade your plan at any time through your account settings. When upgrading, you'll be billed the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
  },
  {
    question: "What file formats do you support for transcripts?",
    answer:
      "We support a wide range of transcript formats including TXT, PDF, VTT, DOC, and DOCX. If you have transcripts in other formats, please contact our support team to discuss options.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We employ industry-standard encryption and security practices. Your data is stored securely and never shared with third parties. We are fully compliant with GDPR and other privacy regulations.",
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer:
      "Yes, our Enterprise plan includes customization options for larger organizations. This includes custom AI coaching models tailored to your specific sales methodology, custom integrations with your existing tools, and dedicated account management.",
  },
];

const Pricing = () => {
  const [pricingPeriod, setPricingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {/* Hero section with decorative elements */}
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl transform translate-y-1/2"></div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
                  Transparent Pricing
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Choose Your Perfect Plan
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Accelerate your sales performance with AI-powered coaching. All
                plans include a{" "}
                <span className="font-semibold text-blue-600">
                  14-day free trial
                </span>
                .
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10"
              >
                <Tabs
                  defaultValue="monthly"
                  value={pricingPeriod}
                  onValueChange={(value) =>
                    setPricingPeriod(value as "monthly" | "annual")
                  }
                  className="inline-flex bg-white p-1.5 rounded-lg shadow-sm border border-gray-200"
                >
                  <TabsList className="grid w-72 grid-cols-2 bg-gray-100/70">
                    <TabsTrigger
                      value="monthly"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="annual"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Annual{" "}
                      <span className="ml-1.5 text-xs font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                        Save 20%
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </motion.div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative"
            >
              {/* Pricing cards with improved visuals */}
              {pricingPlans[pricingPeriod].map((plan) => (
                <motion.div
                  key={plan.id}
                  variants={itemVariants}
                  className="relative"
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium px-4 py-1 rounded-full flex items-center">
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div
                    className={`bg-white rounded-2xl shadow-xl border ${
                      plan.isPopular
                        ? "border-blue-200 ring-2 ring-blue-500/20"
                        : "border-gray-200"
                    } overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
                  >
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                      <p className="text-gray-500 mt-2 min-h-12">
                        {plan.description}
                      </p>

                      <div className="mt-6">
                        <span className="text-4xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <div className="px-8 pb-8 flex-grow">
                      <div className="border-t border-gray-100 pt-6 mb-6">
                        <ul className="space-y-4">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className={`w-full py-6 ${
                          plan.isPopular
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            : plan.buttonVariant === "outline"
                            ? "border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                        }`}
                      >
                        {plan.buttonText}
                        {plan.isPopular && (
                          <ArrowRight className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Added compare features section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-6xl mx-auto mt-20 text-center"
            >
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center mx-auto">
                <span>Compare all features</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section with improved styling */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mt-4">
                  Got questions? We've got answers to help you make the right
                  decision.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`border border-gray-200 rounded-xl overflow-hidden transition-colors duration-200 ${
                      activeFaq === index
                        ? "bg-blue-50/50 border-blue-200"
                        : "bg-white"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full p-6 text-left"
                    >
                      <h3
                        className={`text-lg font-semibold ${
                          activeFaq === index
                            ? "text-blue-700"
                            : "text-gray-900"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`h-6 w-6 flex items-center justify-center rounded-full border ${
                          activeFaq === index
                            ? "border-blue-300 bg-blue-100 text-blue-600"
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
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Custom solution CTA with enhanced background styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative py-20 text-white overflow-hidden"
        >
          {/* Enhanced background with patterns and gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-64 bg-white rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/4 opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-full h-64 bg-white rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/4 opacity-20"></div>

              {/* Decorative dots pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/5 p-12 rounded-3xl border border-white/10 shadow-2xl">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/20 text-sm font-medium">
                Enterprise Solution
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Need a custom solution?
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Our enterprise plan is tailored to your specific needs. Contact
                our sales team to discuss how we can help optimize your sales
                coaching process.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg font-medium shadow-lg shadow-blue-900/20 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Testimonials section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  Trusted by Sales Teams Everywhere
                </h2>
                <p className="text-gray-600 mt-4">
                  See what our customers have to say about their experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote:
                      "The AI-powered coaching has transformed how our team handles objections. We've seen a 34% increase in close rates.",
                    author: "Sarah Johnson",
                    role: "Sales Director, TechCorp",
                  },
                  {
                    quote:
                      "The insights from our call transcripts were game-changing. We identified patterns we never would have seen otherwise.",
                    author: "Michael Chen",
                    role: "VP of Sales, GrowthSoft",
                  },
                  {
                    quote:
                      "Worth every penny. The ROI was clear within the first month as our team's performance dramatically improved.",
                    author: "Jessica Martinez",
                    role: "Sales Manager, Innovate Inc",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="text-gray-700 mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Pricing;
