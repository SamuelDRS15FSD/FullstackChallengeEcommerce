import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <Link 
            to={`/product/${product.id}`} 
            className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300"
        >
            <ProductImage src={product.image} alt={product.title}  />
            <div className="flex-1 flex flex-col p-5">
                <div className="flex-1 mb-4">
                    <ProductTitle title={product.title} />
                </div>
                <div className="mt-auto flex items-end justify-between">
                    <ProductPrice price={product.price} />
                    <ProductRate rate={product.rate} />
                </div>
            </div>
        </Link>
    );
}
export default ProductCard;

