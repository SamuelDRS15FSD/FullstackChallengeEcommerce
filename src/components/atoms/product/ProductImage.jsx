function ProductImage({ src, alt }) {
  return (
    <div className="w-full h-56 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply" 
      />
    </div>
  );
}
export default ProductImage;