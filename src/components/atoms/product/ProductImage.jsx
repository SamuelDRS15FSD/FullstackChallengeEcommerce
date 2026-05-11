function ProductImage({ src, alt }) {
  return (
    <div className="w-full h-[150px] bg-white flex items-center justify-center p-2 rounded-t-lg">
      <img src={src} alt={alt} className="max-w-full max-h-full object-contain" />
    </div>
  );
}
export default ProductImage;