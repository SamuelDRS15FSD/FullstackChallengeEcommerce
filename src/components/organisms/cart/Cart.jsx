import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { formatPriceCOP } from "../../../utils/formatters";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center">
          <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-slate-500 mb-8 max-w-xs">
            Aún no has agregado ningún producto. ¡Explora nuestra colección y encuentra algo que te guste!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
          >
            Ir a productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Carrito de compras</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Items list */}
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {items.map(({ product, quantity }) => (
            <article key={product.id} className="p-4 flex gap-4 items-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-contain rounded-xl border border-slate-100 p-2 bg-white flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">{product.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{formatPriceCOP(product.price)} c/u</p>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  Subtotal: {formatPriceCOP(product.price * quantity)}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => decrementItem(product.id)}
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-lg font-bold flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => incrementItem(product.id)}
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-lg font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="text-xs text-red-500 hover:text-red-700 font-medium flex-shrink-0 ml-1"
              >
                Quitar
              </button>
            </article>
          ))}
        </div>

        {/* Order summary */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Resumen del pedido</h3>
          <div className="space-y-2 mb-4 pb-4 border-b border-slate-100">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Artículos ({items.length})</span>
              <span>{formatPriceCOP(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Envío</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-900 mb-6">
            <span>Total</span>
            <span>{formatPriceCOP(total)}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full inline-flex justify-center items-center px-4 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
          >
            Proceder al pago
          </Link>
          <Link
            to="/products"
            className="w-full inline-flex justify-center items-center mt-3 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Continuar comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
