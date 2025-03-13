
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, rating }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <blockquote className="text-gray-700 mb-6">&quot;{quote}&quot;</blockquote>
      <div>
        <p className="font-semibold text-navy-800">{name}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
