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
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-shadow";

  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600 mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Crear cuenta</h1>
          <p className="text-sm text-slate-500 mt-1">Únete a Sparta Store hoy mismo</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                <p className="mt-1 text-xs text-slate-400">Mínimo 8 caracteres</p>
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
              className="w-full mt-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-md shadow-violet-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-violet-600 font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;