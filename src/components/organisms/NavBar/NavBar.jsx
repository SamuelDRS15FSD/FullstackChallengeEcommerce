import { Link, useLocation } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';
import useAuthStore from '../../../store/useAuthStore';

export default function NavBar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
      isActive(path)
        ? 'text-violet-600 border-violet-600'
        : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              Sparta
            </span>
            <span className="text-slate-800">Store</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link to="/" className={linkClass('/')}>Inicio</Link>
            </li>
            <li>
              <Link to="/products" className={linkClass('/products')}>Productos</Link>
            </li>
            <li>
              <Link to="/cart" className={linkClass('/cart')}>
                Carrito
                {totalItems > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <li>
                <Link to="/profile" className={linkClass('/profile')}>Mi Perfil</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className={linkClass('/login')}>Ingresar</Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile: cart icon */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-violet-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
