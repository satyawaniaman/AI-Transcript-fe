import { api } from "@/utils/axios";

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

async function getTeams(organizationId: string): Promise<Team[]> {
  const response = await api.get('/api/team?organizationId=' + organizationId);
  return response.data
}

function getTeamById(teamId: string): Promise<{ data: Team }> {
  return api.get('/api/team/' + teamId);
}

export { createTeam, getTeams, getTeamById };

