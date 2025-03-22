"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "@/components/PricingCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    answer: "Our 14-day free trial gives you full access to all features in our Professional plan. No credit card required until you decide to continue. You can cancel anytime during the trial period with no obligation.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can easily upgrade or downgrade your plan at any time through your account settings. When upgrading, you'll be billed the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
  },
  {
    question: "What file formats do you support for transcripts?",
    answer: "We support a wide range of transcript formats including TXT, PDF, VTT, DOC, and DOCX. If you have transcripts in other formats, please contact our support team to discuss options.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We employ industry-standard encryption and security practices. Your data is stored securely and never shared with third parties. We are fully compliant with GDPR and other privacy regulations.",
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes, our Enterprise plan includes customization options for larger organizations. This includes custom AI coaching models tailored to your specific sales methodology, custom integrations with your existing tools, and dedicated account management.",
  },
];

const Pricing = () => {
  const [pricingPeriod, setPricingPeriod] = useState<"monthly" | "annual">("monthly");
  
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
  
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-indigo-50 via-blue-50 to-slate-100">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Choose the perfect plan for your sales coaching needs.
              All plans include a 14-day free trial.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Tabs 
                defaultValue="monthly" 
                value={pricingPeriod}
                onValueChange={(value) => setPricingPeriod(value as "monthly" | "annual")}
                className="inline-flex"
              >
                <TabsList className="grid w-64 grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">
                    Annual <span className="ml-1.5 text-xs font-normal text-emerald-600">Save 20%</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {pricingPlans[pricingPeriod].map((plan) => (
              <motion.div key={plan.id} variants={itemVariants}>
                <PricingCard 
                  title={plan.name}
                  price={plan.price.replace('$', '')}
                  description={plan.description}
                  features={plan.features}
                  cta={plan.buttonText}
                  highlighted={plan.isPopular || false}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-20 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold text-gray-900 mb-6 text-center"
            >
              Frequently Asked Questions
            </motion.h2>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need a custom solution?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our enterprise plan is tailored to your specific needs. Contact our sales team
              to discuss how we can help optimize your sales coaching process.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Pricing; 