import { Link } from "react-router-dom";
import ProductCard from "../../molecules/ProductCard";
import useProducts from "../../../hooks/useProducts";

export default function Home() {
  const { visibleProducts, loading } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center lg:pt-32 lg:pb-36">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Bienvenido a</span>
            <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              SpartaStore
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-10">
            Descubre nuestra colección premium. Productos seleccionados con la mejor calidad, diseño moderno y precios increíbles. Encuentra exactamente lo que buscas.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 md:py-4 md:text-lg md:px-10 shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              Explorar Colección
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories (Static representation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Categorías Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/products" className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 aspect-video md:aspect-[2/1] flex items-center justify-center hover:border-purple-300 transition-colors shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Moda y Ropa</h3>
              <p className="text-gray-500 mt-2 font-medium">Ver catálogo &rarr;</p>
            </div>
          </Link>
          <Link to="/products" className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 aspect-video md:aspect-[2/1] flex items-center justify-center hover:border-purple-300 transition-colors shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Electrónica y Joyería</h3>
              <p className="text-gray-500 mt-2 font-medium">Ver catálogo &rarr;</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-10">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Productos Destacados</h2>
          <Link to="/products" className="text-purple-600 font-medium hover:text-purple-700 hidden sm:block">
            Ver todos &rarr;
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="text-purple-600 font-medium hover:text-purple-700 block p-2">
            Ver todos los productos &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
