import { api } from "@/utils/axios";

// get all the team for the organisation

// get one team by id

// create a team
function createTeam(name: string, description: string, organizationId: string) {
  return api.post('/api/team', {
    name,
    description,
    organizationId,
  });
}

interface Team {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  organizationId: string;
}

function getTeams(organizationId: string): Promise<{ data: Team[] }> {
  return api.get('/api/team?organizationId=' + organizationId);
}

function getTeamById(teamId: string): Promise<{ data: Team }> {
  return api.get('/api/team/' + teamId);
}

export { createTeam, getTeams, getTeamById };

