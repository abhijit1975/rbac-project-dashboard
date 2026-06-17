import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Role, Project } from '../types/auth'; 

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: Role[]) => boolean;
  localProjects: Project[];
  saveProject: (project: Omit<Project, 'ownerId' | 'ownerName' | 'createdAt'> & { id?: string }) => void;
  deleteProject: (id: string) => void;
}

const INITIAL_OFFLINE_DATABASE: Project[] = [
  {
    id: 'proj-01',
    title: 'Alpha Cyber Security Audit',
    description: 'CRITICAL SECURITY TASK:\nEnforcing hardware biometric firewalls across regional core data hubs. Tracking code injection attempts and deploying active counter-measure protocols to isolate unauthorized firmware pings.',
    status: 'in_progress',
    ownerId: 'usr_user', 
    ownerName: 'USER_LOG_DELTA',
    createdAt: '2026-05-12T08:30:00.000Z'
  },
  {
    id: 'proj-02',
    title: 'Project Quantum Data Sync',
    description: 'OPTIMIZATION ROUTINE:\nUpgrading pipeline stream decoders to successfully negotiate high-frequency distributed ledger packets. Restructuring local node databases to maximize processing efficiency by 40%.',
    status: 'completed',
    ownerId: 'usr_manager',
    ownerName: 'MANAGER_NODE_B',
    createdAt: '2026-06-01T14:15:00.000Z'
  },
  {
    id: 'proj-03',
    title: 'System Zero Overhaul',
    description: 'MAINTENANCE DECOMMISSION:\nShutting down legacy assembly mainframes and parsing container clusters into dynamic cloud metadata nodes. Retaining archived file history on cold storage volumes.',
    status: 'draft',
    ownerId: 'usr_admin',
    ownerName: 'SYS_ADMIN_ROOT',
    createdAt: '2026-06-15T11:00:00.000Z'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    const savedProjects = localStorage.getItem('rbac_projects');
    if (savedProjects) {
      setLocalProjects(JSON.parse(savedProjects));
    } else {
      setLocalProjects(INITIAL_OFFLINE_DATABASE);
      localStorage.setItem('rbac_projects', JSON.stringify(INITIAL_OFFLINE_DATABASE));
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const hasRole = (roles: Role[]) => {
    return user ? roles.includes(user.role) : false;
  };

  const saveProject = (projectData: any) => {
    let updatedList: Project[] = [];
    
    if (projectData.id) {
      updatedList = localProjects.map(p => p.id === projectData.id ? { 
        ...p, 
        title: projectData.title, 
        description: projectData.description, 
        status: projectData.status 
      } : p);
    } else {
      const newRecord: Project = {
        id: `proj-${Date.now()}`,
        title: projectData.title,
        description: projectData.description,
        status: projectData.status || 'draft',
        ownerId: user?.id || 'usr_guest',
        ownerName: user?.username || 'GUEST_NODE',
        createdAt: new Date().toISOString()
      };
      updatedList = [newRecord, ...localProjects];
    }
    
    setLocalProjects(updatedList);
    localStorage.setItem('rbac_projects', JSON.stringify(updatedList));
  };

  const deleteProject = (id: string) => {
    const filtered = localProjects.filter(p => p.id !== id);
    setLocalProjects(filtered);
    localStorage.setItem('rbac_projects', JSON.stringify(filtered));
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-950 text-cyan-400 font-mono">INITIALIZING INTERACTION MATRIX...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, hasRole, localProjects, saveProject, deleteProject }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
