function ProductTitle({ title }) {
  return (
    <h3 
      className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors duration-200"
      title={title}
    >
      {title}
    </h3>
  );
}
export default ProductTitle;