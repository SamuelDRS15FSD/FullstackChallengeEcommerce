import ProductCard from "../../molecules/ProductCard";
import useProducts, { SORT_OPTIONS, CATEGORIES } from "../../../hooks/useProducts";
import { formatPriceCOP } from "../../../utils/formatters";

export default function Gallery() {
  const {
    loading,
    searchTerm,
    selectedCategory,
    sortBy,
    maxPrice,
    filteredProducts,
    visibleProducts,
    currentPage,
    totalPages,
    hasActiveFilters,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleMaxPriceChange,
    goToPage,
    resetFilters,
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
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Productos</h2>
        <p className="text-sm text-slate-500 mt-1">
          {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-3 text-violet-600 font-semibold hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 space-y-4">
        {/* Row 1: search + sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-shadow"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="sm:w-56 px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Row 2: categories chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                selectedCategory === cat.value
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: price range */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
            Precio máx.
          </span>
          <input
            type="range"
            min={10}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="flex-1 accent-violet-600"
          />
          <span className="text-xs font-semibold text-violet-700 whitespace-nowrap w-28 text-right">
            {formatPriceCOP(maxPrice)}
          </span>
        </div>
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
          <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Sin resultados</h3>
          <p className="text-slate-500 mb-4">Ningún producto coincide con los filtros actuales.</p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
                    page === currentPage
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
