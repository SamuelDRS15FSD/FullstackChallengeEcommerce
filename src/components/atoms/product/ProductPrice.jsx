import { formatPriceCOP } from "../../../utils/formatters";

function ProductPrice({ price }) {
    return (    
        <div className="text-xl font-extrabold text-gray-900 tracking-tight">
            {formatPriceCOP(price)}
        </div>
    );
}
export default ProductPrice;