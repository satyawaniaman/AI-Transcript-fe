import { api } from "@/utils/axios";

enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SALES_REP = 'SALES_REP',
  COACH = 'COACH',
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
      teams: Array<any>; // Assuming teams can be of any type
    };
  }>;
}

const getUser = async (): Promise<User> => {
  const response = await api.get('/api/user');
  return response.data;
};

export { getUser, };
