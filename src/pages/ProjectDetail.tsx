import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Project } from '../types/auth';

export const ProjectDetail = () => {
  const { id } = useParams();
  const { localProjects } = useAuth();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const match = localProjects.find(p => p.id === id);
    if (match) {
      setProject(match);
    }
  }, [id, localProjects]);

  if (!project) return <div className="min-h-screen bg-zinc-950 text-emerald-400 flex items-center justify-center font-mono animate-pulse">⚡ LOADING SECTOR MANIFEST...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl bg-zinc-900 border-2 border-emerald-500/20 p-8 rounded-2xl shadow-2xl space-y-6">
        
        <div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
            LOG_STATUS: {project.status}
          </span>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight mt-3">{project.title}</h1>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">
            Origin Creator Node: <span className="text-zinc-300 font-bold">{project.ownerName}</span>
          </p>
        </div>

        <div className="border-2 border-emerald-500/10 py-6 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap bg-zinc-950/40 p-4 rounded-xl">
          {project.description || '// NO SCOPE DESCRIPTION ATTACHED TO THIS DELIVERABLE INDEX.'}
        </div>

        <div className="pt-2 flex justify-between items-center text-xs">
          <span className="text-zinc-600 uppercase font-bold">Compiled: {new Date(project.createdAt).toLocaleDateString()}</span>
          <Link to="/dashboard" className="text-emerald-400 hover:text-emerald-300 font-bold uppercase transition-colors">
            ← Return to Registry
          </Link>
        </div>

      </div>
    </div>
  );
};
