"use client";

import React from "react";
import { CheckCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Team {
  id: string;
  name: string;
  memberCount?: number;
}

interface TeamSelectorProps {
  teams: Team[];
  selectedTeamId: string;
  onSelectTeam: (teamId: string) => void;
  className?: string;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  selectedTeamId,
  onSelectTeam,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 mb-1">
        <Users className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Select Team</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onSelectTeam(team.id)}
            className={cn(
              "text-sm px-3 py-1.5 rounded-md transition-all",
              "border focus:outline-none",
              selectedTeamId === team.id
                ? "bg-navy-700 text-white border-navy-800"
                : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
            )}
          >
            {team.name}
            {selectedTeamId === team.id && (
              <CheckCircle className="inline-block ml-1.5 h-3 w-3" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamSelector;
