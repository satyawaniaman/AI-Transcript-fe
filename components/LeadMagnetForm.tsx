"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LeadMagnetForm = () => {
  const router = useRouter();
  const [objectionText, setObjectionText] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Store the data in localStorage
    localStorage.setItem("objectionText", objectionText);
    localStorage.setItem("userEmail", email);

    // Redirect to the microApp results page
    router.push("/microAppResults");

    // Show toast notification
    toast.success("Analysis complete!");
  };

  return (
    <div className="bg-gradient-to-br from-navy-800 to-navy-700 rounded-xl p-8 shadow-xl border border-navy-600">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">
          Sales Objection Analyzer
        </h2>
        <p className="text-gray-300 text-sm">
          Get instant insights on how to handle customer objections effectively
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="objection"
              className="flex items-center text-sm font-medium mb-2 text-gray-200"
            >
              <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
              Paste your sales call objection
            </label>
            <Textarea
              id="objection"
              placeholder="Example: I think your product is too expensive compared to other options we're looking at."
              className="bg-navy-600 border-navy-500 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={4}
              value={objectionText}
              onChange={(e) => setObjectionText(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium mb-2 text-gray-200"
            >
              <Mail className="h-4 w-4 mr-2 text-blue-400" />
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-navy-600 border-navy-500 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400 mt-2 ml-6">
              We&apos;ll email you the analysis and tips for handling similar
              objections.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0284c7] hover:bg-[#0369a1] transition-colors duration-300 py-5 font-medium text-white shadow-lg shadow-blue-900/30 mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Objection
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-5">
          <h3 className="font-semibold text-lg text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
            Objection Analysis
          </h3>
          <div className="bg-navy-600/70 rounded-lg p-5 text-white border border-navy-500">
            {result}
          </div>
          <div className="text-sm text-gray-300 mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
            <p className="font-medium mb-1">Want more insights like this?</p>
            <p className="text-gray-400">
              Sign up for a free trial to access our premium analysis tools!
            </p>
          </div>
          <Button
            asChild
            className="w-full bg-[#0284c7] hover:bg-[#0369a1] transition-colors duration-300 py-5 font-medium text-white shadow-lg shadow-blue-900/30"
          >
            <Link href="/signup">
              Sign Up for Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeadMagnetForm;
