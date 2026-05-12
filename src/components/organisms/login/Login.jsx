import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAction } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await loginAction(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate('/products');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 selection:bg-violet-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Brand/Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/20 mb-4 group transition-transform duration-500 hover:rotate-3">
            <span className="text-2xl font-bold text-white tracking-tighter">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Bienvenido</h1>
          <p className="text-slate-500 text-xs font-medium">Accede a tu cuenta en Sparta Store</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 shadow-2xl shadow-black/50">
          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] font-semibold text-red-400 animate-in shake duration-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 hover:border-white/[0.2]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Contraseña
                </label>
                <a href="#" className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors font-bold">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 hover:border-white/[0.2]"
              />
            </div>

            <div className="flex items-center gap-2.5 ml-1 select-none cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer h-3.5 w-3.5 appearance-none rounded border border-white/[0.2] bg-white/[0.03] checked:bg-violet-600 checked:border-violet-600 transition-all"
                />
                <svg
                  className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <label htmlFor="remember" className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors cursor-pointer font-semibold">
                Recordarme por 30 días
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-violet-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden mt-2"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Iniciar sesión</span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 font-medium">
          ¿Nuevo en Sparta Store?{' '}
          <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors font-bold underline-offset-4 hover:underline">
            Crea una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;