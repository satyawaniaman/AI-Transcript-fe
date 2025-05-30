import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  period,
  features,
  buttonText,
  isPopular = false,
  badge = null,
  onClick,
}) => {
  return (
    <div className="relative">
      {badge && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          {badge}
        </div>
      )}
      <div
        className={`bg-white rounded-2xl shadow-xl border ${
          isPopular
            ? "border-[#E1766E]/20 ring-2 ring-[#E1766E]/20"
            : "border-gray-200"
        } overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
      >
        <div className="p-8">
          <h3 className="text-xl font-bold text-[#1B2D41] font-playfair">
            {name}
          </h3>
          <p className="text-gray-500 mt-2 min-h-12">{description}</p>

          <div className="mt-6">
            <span className="text-4xl font-bold text-[#1B2D41]">{price}</span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
        </div>

        <div className="px-8 pb-8 flex-grow">
          <div className="border-t border-gray-100 pt-6 mb-6">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-[#E1766E] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={onClick}
            className={`w-full py-6 ${
              isPopular
                ? "bg-[#E1766E] hover:bg-[#E1766E]/90 text-white"
                : "border-2 border-[#1B2D41]/20 bg-white text-[#1B2D41] hover:bg-[#1B2D41]/5"
            }`}
          >
            {buttonText}
            {isPopular && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
