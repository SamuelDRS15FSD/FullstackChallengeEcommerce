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
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 selection:bg-violet-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-600/5 blur-[100px] rounded-full" />

      <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Brand/Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-500/20 mb-6 group transition-transform duration-500 hover:rotate-3">
            <span className="text-3xl font-bold text-white tracking-tighter">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Bienvenido</h1>
          <p className="text-slate-400 text-sm font-medium">Accede a tu cuenta en Sparta Store</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/50">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 animate-in shake duration-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[13px] font-semibold text-slate-300 ml-1">
                Correo electrónico
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 group-hover:border-white/[0.2]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-[13px] font-semibold text-slate-300">
                  Contraseña
                </label>
                <a href="#" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors font-semibold">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 group-hover:border-white/[0.2]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1 select-none cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer h-4 w-4 appearance-none rounded border border-white/[0.2] bg-white/[0.03] checked:bg-violet-600 checked:border-violet-600 transition-all"
                />
                <svg
                  className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <label htmlFor="remember" className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors cursor-pointer font-medium">
                Recordarme por 30 días
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-violet-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
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

        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
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