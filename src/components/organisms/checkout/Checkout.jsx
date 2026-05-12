import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { formatPriceCOP } from "../../../utils/formatters";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const total = getTotalPrice();

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">¡Compra confirmada!</h2>
          <p className="text-slate-500 mb-8">
            Gracias por tu pedido. Este es un checkout de demostración.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            No hay productos para pagar
          </h2>
          <p className="text-slate-500 mb-8">Agrega productos al carrito antes de ir al pago.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
          >
            Ir a productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Finalizar compra</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5"
        >
          <h3 className="text-lg font-bold text-slate-900">Datos del comprador</h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan García"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dirección de envío</label>
            <input
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Calle 123 # 45-67, Bogotá"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-shadow"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-colors active:scale-95"
          >
            Confirmar pedido
          </button>
        </form>

        <aside className="bg-white border border-slate-200 rounded-2xl p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Resumen del pedido</h3>
          <div className="space-y-3 mb-4 pb-4 border-b border-slate-100">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-slate-600 line-clamp-1 flex-1 mr-2">
                  {product.title} × {quantity}
                </span>
                <span className="font-medium text-slate-900 flex-shrink-0">
                  {formatPriceCOP(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>{formatPriceCOP(total)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
