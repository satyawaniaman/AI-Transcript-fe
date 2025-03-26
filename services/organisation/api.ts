import api from "@/utils/axios";
import { Role } from "@/services/user/api";

export interface Organisation {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const createOrganisation = async (
  name: string
): Promise<Organisation> => {
  const response = await api.post("/api/organisation", { name });
  return response.data;
};

export const inviteToOrganisation = async (
  email: string,
  role: Role,
  organisationId: string,
  teamIds: string[]
): Promise<any> => {
  const response = await api.post("/api/organisation/invite", {
    email,
    role,
    organisationId,
    teamIds,
  });
  return response.data;
};
