import ProductCard from "../../molecules/ProductCard";
import useProducts from "../../../hooks/useProducts";

export default function Gallery() {
  const {
    loading,
    searchTerm,
    filteredProducts,
    visibleProducts,
    currentPage,
    totalPages,
    handleSearchChange,
    goToPage,
  } = useProducts();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nuestros Productos</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Mostrando {filteredProducts.length} resultado(s)
          </p>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o descripción..."
          className="w-full sm:w-80 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron productos</h3>
          <p className="text-gray-500">Intenta buscar con otros términos.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium border ${page === currentPage
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
}
