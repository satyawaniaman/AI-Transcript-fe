import React from 'react';
import Link  from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  cta, 
  highlighted = false 
}) => {
  return (
    <div className={`${
      highlighted 
        ? 'border-[#0284c7] shadow-lg scale-105 z-10' 
        : 'border-gray-200 shadow-2xs'
      } 
      bg-white rounded-xl border p-8 flex flex-col`}
    >
      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-[#0284c7]' : 'text-navy-800'}`}>
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold text-navy-800">${price}</span>
          <span className="text-gray-600 ml-1">/month</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8 grow">
        {features.map((feature, index) => (
          <li key={index} className="flex">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        asChild 
        className={highlighted ? 'bg-[#0284c7] hover:bg-[#0284c7]/90' : 'bg-navy-700 hover:bg-navy-800'}
      >
        <Link href="/signup">{cta}</Link>
      </Button>
    </div>
  );
};

export default PricingCard;
