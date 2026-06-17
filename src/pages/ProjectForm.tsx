import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProjectStatus = 'draft' | 'in_progress' | 'completed';

export const ProjectForm = () => {
  const { id } = useParams(); 
  const { user, localProjects, saveProject } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('draft');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if (id) {
      const existingProject = localProjects.find(p => p.id === id);
      if (existingProject) {
        setTitle(existingProject.title);
        setDescription(existingProject.description || '');
        setStatus(existingProject.status as ProjectStatus);
        
        if (user?.role === 'user' && existingProject.ownerId !== 'usr_user' && existingProject.ownerId !== user.id) {
          setIsReadOnly(true);
          setError('ACCESS RESTRICTED: YOU DO NOT HAVE PERMISSION TO MODIFY THIS RECORD');
        }
      } else {
        setError('DATA ERROR: TARGET FILE RESOURCE NOT FOUND IN MEMORY');
      }
    }
  }, [id, localProjects, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setError('');
    setIsLoading(true);

    const projectPayload: any = {
      title,
      description,
      status
    };

    if (id) {
      projectPayload.id = id;
    }

    saveProject(projectPayload);
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-xl bg-zinc-900 border-2 border-emerald-500/20 p-8 rounded-2xl shadow-2xl space-y-6">
        
        <div>
          <h2 className="text-2xl font-black uppercase text-white tracking-tight">
            {id ? '// UPDATE_LOG_ENTRY' : '// INITIALIZE_NEW_PROJECT'}
          </h2>
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 mt-1">
            System Identity Node: <span className="text-emerald-400 font-bold">{user?.username || 'GUEST_NODE'}</span>
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs font-bold text-red-400 tracking-wide uppercase">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Project Name *</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              disabled={isLoading || isReadOnly}
              placeholder="ENTER METADATA TITLE" 
              className="w-full bg-zinc-950 border border-emerald-500/20 text-zinc-300 p-3 rounded-xl focus:outline-none focus:border-emerald-400 disabled:opacity-40 text-sm" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Description / Payload Scope</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              disabled={isLoading || isReadOnly}
              placeholder="OPTIONAL DATA LOG ATTRIBUTES..."
              className="w-full bg-zinc-950 border border-emerald-500/20 text-zinc-300 p-3 rounded-xl focus:outline-none focus:border-emerald-400 disabled:opacity-40 text-sm" 
              rows={4} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Registry Lifecycle Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value as ProjectStatus)} 
              disabled={isLoading || isReadOnly}
              className="w-full border border-emerald-500/20 text-emerald-400 p-3 rounded-xl focus:outline-none focus:border-emerald-400 disabled:opacity-40 text-sm bg-zinc-950"
            >
              <option value="draft">DRAFT</option>
              <option value="in_progress">IN PROGRESS</option>
              <option value="completed">COMPLETED</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Link to="/dashboard" className="border-2 border-zinc-800 px-5 py-2.5 rounded-xl text-xs font-bold uppercase text-zinc-400 hover:bg-zinc-800 transition-colors">
              [ Abort ]
            </Link>
            {!isReadOnly && (
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-emerald-500 text-black px-6 py-2.5 rounded-xl text-xs font-black uppercase hover:bg-emerald-400 shadow-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'PROCESSING...' : '[ COMMIT LOG ]'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
