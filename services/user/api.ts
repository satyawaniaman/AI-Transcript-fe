import { api } from "@/utils/axios";

enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SALES_REP = 'SALES_REP',
  COACH = 'COACH',
}

interface Team {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  organizationId: string;
}

interface User {
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string | null;
  role: Role;
  id: string;
  isEmailVerified: boolean;
  organizations: Array<{
    userId: string;
    organizationId: string | null;
    organization: {
      name: string | null;
      phone: string | null;
      address: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      country: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      id: string | null;
      teams: Team[]; // Updated to use the Team type
    };
  }>;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string | null;
}

const getUser = async (): Promise<User> => {
  const response = await api.get('/api/user');
  return response.data;
};

const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
  const response = await api.put('/api/user', payload);
  return response.data;
};

export { getUser, Role, updateUser };
