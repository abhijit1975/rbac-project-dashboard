import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Project } from '../types/auth'; 

export const Dashboard = () => {
  const { user, logout, localProjects, deleteProject } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (user?.role === 'user') {
      setProjects(localProjects.filter(p => p.ownerId === 'usr_user' || p.ownerId === user.id));
    } else {
      setProjects(localProjects);
    }
  }, [localProjects, user]);

  const handleDelete = (id: string) => {
    if (!window.confirm('🚨 SECURITY CONFIRMATION: Permanently erase this project entry?')) return;
    deleteProject(id);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-slate-800 text-slate-400 border-slate-700/50',
      in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      completed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    };
    return styles[status] || styles.draft;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono antialiased relative overflow-x-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-125 h-125 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-black font-black text-base shadow-md shadow-cyan-500/25">P</div>
              <span className="text-sm font-bold uppercase tracking-wider text-white">ProjectHub <span className="text-slate-600">//</span> Console</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border-r border-slate-800 pr-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-200 tracking-wide">{user?.username}</p>
                  <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase bg-slate-950 text-cyan-400 border border-cyan-500/20 mt-0.5">
                    Clearance: {user?.role}
                  </span>
                </div>
                <div className="h-9 w-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-indigo-400">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <button onClick={logout} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-rose-400 transition-colors cursor-pointer bg-transparent border-none">
                [ Exit ]
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Primary Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-xl font-black uppercase tracking-wider text-white sm:text-2xl">Project Registries</h1>
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              {user?.role === 'user' ? 'Local node segmentation engaged. Displaying filtered user entries.' : 'Administrative system clearance verified. Access logs fully visible.'}
            </p>
          </div>
          <Link to="/projects/new" className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-teal-400 px-4 py-2.5 text-xs font-bold uppercase text-black hover:brightness-110 shadow-md active:scale-[0.98] transition-all">
            + New Record
          </Link>
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-2xl shadow-indigo-500/5">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-left">
                <thead className="bg-slate-950/60 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">// Data Key / File Name</th>
                    <th scope="col" className="px-6 py-4">// Status</th>
                    <th scope="col" className="px-6 py-4">// Origin Node</th>
                    <th scope="col" className="px-6 py-4">// Created</th>
                    <th scope="col" className="px-6 py-4 text-right">// Configuration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-transparent text-xs tracking-wide">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-600 uppercase font-bold tracking-widest">
                        ⚠️ No localized data entries registered to this path terminal.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-900/30 transition-colors group">
                        <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-bold border capitalize ${getStatusBadge(project.status)}`}>
                            {project.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-400 font-medium">
                          {project.ownerName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-500 font-medium">
                          {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-bold">
                          <div className="flex justify-end gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Link to={`/projects/${project.id}`} className="text-slate-400 hover:text-cyan-400 transition-colors uppercase text-[10px]">
                              [ View ]
                            </Link>
                            
                            {(user?.role === 'admin' || user?.role === 'manager' || user?.id === project.ownerId || project.ownerId === 'usr_user') && (
                              <Link to={`/projects/edit/${project.id}`} className="text-slate-400 hover:text-indigo-400 transition-colors uppercase text-[10px]">
                                [ Edit ]
                              </Link>
                            )}
                            
                            {user?.role === 'admin' && (
                              <button onClick={() => handleDelete(project.id)} className="text-slate-600 hover:text-rose-500 transition-colors uppercase text-[10px] bg-transparent border-none cursor-pointer p-0 font-bold">
                                [ Purge ]
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
