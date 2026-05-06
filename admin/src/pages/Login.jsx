import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Hardcoded demo login
    if (email === 'muhammadsadihq@gmail.com' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid email or password. Hint: Use admin123 as password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1014] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#16171d] border border-[#2e303a] rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <img src="/99Globalcpy.png" alt="Ninty Nine Global" className="h-20 w-auto object-contain mb-4" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">Admin Portal</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                required
                className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="muhammadsadihq@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                required
                className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#d4af37] text-black font-medium tracking-wider uppercase py-3 rounded-lg hover:bg-white transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
