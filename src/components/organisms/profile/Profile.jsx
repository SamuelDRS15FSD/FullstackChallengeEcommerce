import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore';

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logoutAction = useAuthStore((state) => state.logoutAction);

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result.success) {
      navigate('/login');
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-slate-600">Debes iniciar sesión para ver tu perfil</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ir al inicio de sesión
        </button>
      </div>
    );
  }

  const initial = user.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-slate-200">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-violet-500 to-purple-600"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start px-6 -mt-12 pb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md ring-2 ring-white">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center text-3xl font-bold text-violet-600">
              {initial}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4 sm:mt-14 sm:ml-6 text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-slate-900">
              {user.displayName || 'Usuario'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{user.email}</p>
          </div>

          {/* Sign out */}
          <div className="mt-6 sm:mt-14">
            <button
              onClick={handleLogout}
              className="px-5 py-2 border-2 border-red-400 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="border-t border-slate-100 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Información de la cuenta</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">ID de usuario</dt>
              <dd className="mt-1 text-sm text-slate-700 break-all">{user.uid}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">Estado de la cuenta</dt>
              <dd className="mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Activa
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">Correo verificado</dt>
              <dd className="mt-1 text-sm text-slate-700">{user.emailVerified ? 'Sí' : 'No'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
