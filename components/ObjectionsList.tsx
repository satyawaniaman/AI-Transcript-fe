import React from "react";
import {
  ChevronRight,
  DollarSign,
  Clock,
  ShieldCheck,
  Briefcase,
 Users
} from 'lucide-react';
import { Objection } from '@/services/objections/api';
import Link from "next/link";

interface AnalysisObjection {
  id: string;
  text: string;
  time?: string;
  response: string;
  effectiveness: number;
}

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
    type: "Price",
    count: 15,
    example: "Your product is too expensive compared to competitors.",
    icon: DollarSign,
    color: "bg-red-100 text-red-600",
    link: "/objections/price",
  },
  {
    id: 2,
    type: "Timing",
    count: 12,
    example: "We're not ready to make a decision right now.",
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
    link: "/objections/timing",
  },
  {
    id: 3,
    type: "Trust/Risk",
    count: 9,
    example: "We're concerned about the implementation process.",
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-600",
    link: "/objections/trust",
  },
  {
    id: 4,
    type: "Competition",
    count: 8,
    example: "We're already using another solution.",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
    link: "/objections/competition",
  },
  {
    id: 5,
    type: "Stakeholders",
    count: 6,
    example: "I need to get approval from my team first.",
    icon: Users,
    color: "bg-green-100 text-green-600",
    link: "/objections/stakeholders",
  },
];

const ObjectionsList: React.FC<ObjectionsListProps> = ({
  objections = defaultObjections,
}) => {
  // Check if we're using the custom objections format or the default format
  const isCustomFormat =
    objections.length > 0 &&
    Object.prototype.hasOwnProperty.call(objections[0], "text");

  if (isCustomFormat) {
    return (
      <div className="space-y-4">
        {objections.map((objection, index) => (
          <div key={objection.id || index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-start">
                <div className="rounded-full bg-blue-100 text-blue-700 h-8 w-8 flex items-center justify-center mr-3 shrink-0">
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium text-navy-800">
                    {(objection as AnalysisObjection).text}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{(objection as AnalysisObjection).time}</span>
                  </div>
                </div>
              </div>
              <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {Math.round(
                  (objection as AnalysisObjection).effectiveness * 100
                )}
                % Effective
              </span>
            </div>
            <div className="mt-3 pl-11">
              <p className="text-sm text-gray-600">
                {(objection as AnalysisObjection).response}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {objections.map((objection) => {
        const typedObjection = objection as CategoryObjection;
        return (
          <Link
            key={typedObjection.id}
            href={typedObjection.link}
            className="block"
          >
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div
                className={`${typedObjection.color} h-10 w-10 rounded-full flex items-center justify-center mr-4 shrink-0`}
              >
                <typedObjection.icon className="h-5 w-5" />
              </div>
              <div className="grow min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-navy-800">
                    {typedObjection.type}
                  </p>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {typedObjection.count}×
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {typedObjection.example}
                </p>
              </div>
            <ChevronRight className="h-5 w-5 text-gray-400 ml-2 shrink-0" />
          </div>
        </Link>
        );
      })}
    </div>
  );
};

export default ObjectionsList;