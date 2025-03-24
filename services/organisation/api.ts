import api from "@/utils/axios";

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
