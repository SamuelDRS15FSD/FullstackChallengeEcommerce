import { Link } from "react-router-dom";
import ProductCard from "../../molecules/ProductCard";
import useProducts from "../../../hooks/useProducts";

export default function Home() {
  const { visibleProducts, loading } = useProducts();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center lg:pt-32 lg:pb-36">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-4">
            Colección 2025 - 2026
          </p>
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Bienvenido a</span>
            <span className="block bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              Sparta Store
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl mb-10">
            Descubre nuestra colección premium. Productos seleccionados con la mejor calidad y diseño moderno.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/products"
              className="px-8 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-violet-600 hover:bg-violet-700 md:py-4 md:text-lg md:px-10 shadow-md shadow-violet-200 transition-all active:scale-95"
            >
              Explorar colección
            </Link>
            <Link
              to="/products"
              className="px-8 py-3 border border-slate-200 text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 transition-all active:scale-95"
            >
              Ver ofertas
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-slate-500">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Productos verificados</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span>Envío rápido</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Categorías populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/products"
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 aspect-video md:aspect-[2/1] flex items-center justify-center hover:border-violet-300 transition-all shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center px-4">
              <div className="text-3xl mb-2">👗</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">Moda y Ropa</h3>
              <p className="text-slate-500 mt-1 text-sm font-medium">Ver catálogo →</p>
            </div>
          </Link>
          <Link
            to="/products"
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 aspect-video md:aspect-[2/1] flex items-center justify-center hover:border-violet-300 transition-all shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center px-4">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">Electrónica y Joyería</h3>
              <p className="text-slate-500 mt-1 text-sm font-medium">Ver catálogo →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Productos destacados</h2>
            <p className="text-sm text-slate-500 mt-1">Selección de esta semana</p>
          </div>
          <Link to="/products" className="text-violet-600 text-sm font-semibold hover:text-violet-700 hidden sm:block">
            Ver todos →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="text-violet-600 font-semibold hover:text-violet-700 block p-2">
            Ver todos los productos →
          </Link>
        </div>
      </section>
    </div>
  );
}
