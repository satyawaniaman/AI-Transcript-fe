import React from 'react';
import { 
  ChevronRight,
  DollarSign,
  Clock,
  ShieldCheck,
  Briefcase,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { Objection } from '@/services/objections/api';

// Define a type for Lucide React icons
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface CategoryObjection {
  id: number | string;
  type: string;
  count: number;
  example: string;
  icon: LucideIcon;
  color: string;
  link: string;
}

interface ObjectionsListProps {
  objections: Objection[];
}

const defaultObjections: CategoryObjection[] = [
  {
    id: 1,
    type: 'Price',
    count: 15,
    example: "Your product is too expensive compared to competitors.",
    icon: DollarSign,
    color: 'bg-red-100 text-red-600',
    link: '/objections/price'
  },
  {
    id: 2,
    type: 'Timing',
    count: 12,
    example: "We're not ready to make a decision right now.",
    icon: Clock,
    color: 'bg-orange-100 text-orange-600',
    link: '/objections/timing'
  },
  {
    id: 3,
    type: 'Trust/Risk',
    count: 9,
    example: "We're concerned about the implementation process.",
    icon: ShieldCheck,
    color: 'bg-blue-100 text-blue-600',
    link: '/objections/trust'
  },
  {
    id: 4,
    type: 'Competition',
    count: 8,
    example: "We're already using another solution.",
    icon: Briefcase,
    color: 'bg-purple-100 text-purple-600',
    link: '/objections/competition'
  },
  {
    id: 5,
    type: 'Stakeholders',
    count: 6,
    example: "I need to get approval from my team first.",
    icon: Users,
    color: 'bg-green-100 text-green-600',
    link: '/objections/stakeholders'
  },
];

const ObjectionsList: React.FC<ObjectionsListProps> = ({ objections }) => {
  // If objections array is empty, return null or a placeholder
  if (!objections || objections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {objections.map((objection) => (
        <Link 
          key={objection.id} 
          href={`/objections/${objection.id}`}
          className="block"
        >
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-blue-100 text-blue-700 h-10 w-10 rounded-full flex items-center justify-center mr-4 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="grow min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-navy-800">{objection.type}</p>
                <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                  1×
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{objection.text}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 ml-2 shrink-0" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ObjectionsList;