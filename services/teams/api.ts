import { api } from "@/utils/axios";

// get all the team for the organisation

// get one team by id

// create a team
function createTeam(name: string, description: string, organizationId: string) {
  return api.post('/api/teams', {
    name,
    description,
    organizationId,
  });
}

export { createTeam };

