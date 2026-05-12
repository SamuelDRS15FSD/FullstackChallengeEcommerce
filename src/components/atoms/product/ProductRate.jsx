function ProductRate({ rate }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 rounded-md"> 
        <span className="text-yellow-500 text-sm">★</span>
        <span className="text-sm font-semibold text-yellow-700">{rate}</span>
    </div>
  );
}
export default ProductRate;