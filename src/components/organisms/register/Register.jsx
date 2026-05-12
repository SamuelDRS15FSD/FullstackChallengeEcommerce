import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerFullUser } from "../../../services/authService";

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
    "w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-300 hover:border-white/[0.2]";

  const labelClass = "block text-[13px] font-semibold text-slate-300 ml-1 mb-1.5";

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 py-12 selection:bg-violet-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-600/5 blur-[100px] rounded-full" />

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Brand/Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-500/20 mb-6 group transition-transform duration-500 hover:rotate-3">
            <span className="text-3xl font-bold text-white tracking-tighter">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Crear cuenta</h1>
          <p className="text-slate-400 text-sm font-medium">Únete a la experiencia Sparta Store</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/50">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 animate-in shake duration-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
              <div className="relative group">
                <label className={labelClass}>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className={inputClass}
                />
                <p className="mt-1.5 text-[10px] text-slate-500 ml-1 font-medium">Mínimo 8 caracteres</p>
              </div>

              {/* Confirm password */}
              <div>
                <label className={labelClass}>Confirmar contraseña</label>
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
              className="relative w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-violet-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden mt-4"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Registrarse</span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
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