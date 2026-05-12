function ProductPrice({ price }) {
    return (    
        <div className="text-xl font-extrabold text-gray-900 tracking-tight">
            ${Number(price).toFixed(2)}
        </div>
    );
}
export default ProductPrice;