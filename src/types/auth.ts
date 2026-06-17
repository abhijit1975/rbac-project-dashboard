export type Role = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'in_progress' | 'completed';
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
