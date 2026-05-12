import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerFullUser } from "../../../services/authService";
import InteractiveHeroBackground from '../../atoms/home/InteractiveHeroBackground';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    const respuesta = await registerFullUser(formData);
    setLoading(false);

    if (respuesta.success) {
      navigate('/login');
    } else {
      setError(respuesta.error);
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 hover:border-white/[0.2]";

  const labelClass = "block text-[11px] font-bold text-slate-400 ml-1 mb-1 uppercase tracking-wider";

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 selection:bg-violet-500/30">
      {/* Interactive Background */}
      <InteractiveHeroBackground color="255, 255, 255" opacity={0.15} particleCountFactor={10000} />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Brand/Logo - Ultra Compact */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/20 mb-3 group transition-transform duration-500 hover:rotate-3">
            <span className="text-2xl font-bold text-white tracking-tighter">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Crear cuenta</h1>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Sparta Store Experience</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 shadow-2xl shadow-black/50">
          {error && (
            <div className="mb-4 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 animate-in shake duration-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5">
              {/* Name */}
              <div>
                <label className={labelClass}>Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Juan García"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="correo@ejemplo.com"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Celular</label>
                <input
                  type="tel"
                  name="cellphone"
                  placeholder="+57 300 000 0000"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Address */}
              <div>
                <label className={labelClass}>Dirección</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Calle 123 # 45-67"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label className={labelClass}>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Confirm password */}
              <div>
                <label className={labelClass}>Confirmar</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
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
                  <span>Registrarse ahora</span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-5 font-semibold">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors font-bold underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;