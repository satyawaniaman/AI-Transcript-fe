"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link  from 'next/link';
import { toast } from 'react-hot-toast';
const LeadMagnetForm = () => {
  const [objectionText, setObjectionText] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
      
        // Show the analysis result
        setResult(
          "This is a pricing objection. The customer feels your solution is too expensive compared to alternatives. Try emphasizing the unique value your product offers and the ROI they'll see. Consider offering a small discount or payment plan if appropriate."
        );
      
        // Show toast notifications
        toast.success("Analysis complete!");
      
        toast.success("Your dashboard report has been downloaded.");
      }, 2000);
  };

  return (

    <div className="bg-navy-700 rounded-xl p-6 shadow-lg">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="objection" className="block text-sm font-medium mb-1">
              Paste your sales call objection
            </label>
            <Textarea
              id="objection"
              placeholder="Example: I think your product is too expensive compared to other options we're looking at."
              className="bg-navy-600 border-navy-500 text-white placeholder:text-gray-400"
              rows={4}
              value={objectionText}
              onChange={(e) => setObjectionText(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-navy-600 border-navy-500 text-white placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              We&apos;ll email you the analysis and tips for handling similar objections.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#0284c7] hover:bg-[#0284c7]/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Objection
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Objection Analysis</h3>
          <div className="bg-navy-600 rounded-lg p-4 text-white">
            {result}
          </div>
          <div className="text-sm">
            <p>Want more insights like this? Sign up for a free trial!</p>
          </div>
          <Button asChild className="w-full bg-[#0284c7] hover:bg-[#0284c7]/90">
            <Link href="/signup">
              Sign Up for Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeadMagnetForm;
