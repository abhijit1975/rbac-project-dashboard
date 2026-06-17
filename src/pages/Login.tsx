import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const lowerUsername = username.toLowerCase().trim();
    if (lowerUsername === 'admin' || lowerUsername === 'manager' || lowerUsername === 'user') {
      setTimeout(() => {
        const mockRole = lowerUsername as 'admin' | 'manager' | 'user';
        login("mock_jwt_token_string", {
          id: `usr_${mockRole}`,
          username: username.toUpperCase(),
          role: mockRole
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 500);
      return;
    }
    setError('SYSTEM ERROR: REJECTED CONNECTION NODE');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-4 font-mono select-none antialiased">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-linear-to-tr from-cyan-500 via-teal-400 to-indigo-500 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-cyan-500/20">P</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase pt-2">ProjectHub</h2>
          <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">[ Security Clearance Terminal ]</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl shadow-cyan-500/5">
          {error && <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs font-bold text-red-400 text-center uppercase tracking-wide">✖ {error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 pl-1">// Account ID</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} Required disabled={isLoading} placeholder="Enter admin, manager, or user" className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 rounded-2xl focus:outline-none focus:border-cyan-500 text-xs tracking-wider transition-all placeholder:text-slate-600 font-medium" />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 pl-1">// Access Key</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} Required disabled={isLoading} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 rounded-2xl focus:outline-none focus:border-cyan-500 text-xs tracking-wider transition-all placeholder:text-slate-600" />
            </div>
            <div className="pt-2">
              <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-teal-400 px-4 py-3.5 text-xs font-bold text-black uppercase tracking-widest hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer">
                {isLoading ? 'Verifying Link...' : 'Request Connection'}
              </button>
            </div>
          </form>
          <div className="border-t border-slate-800 pt-5 space-y-2">
            <p className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-widest">// Simulated Access Clearance</p>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-bold">
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-center"><span className="text-rose-400 block mb-0.5">ADMIN</span> ROOT</div>
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-center"><span className="text-indigo-400 block mb-0.5">MANAGER</span> WRITE</div>
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-center"><span className="text-cyan-400 block mb-0.5">USER</span> LOCAL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
