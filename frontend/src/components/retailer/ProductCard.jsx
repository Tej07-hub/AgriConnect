import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {/* Product Image */}
      <img
        src={getImageUrl(product.imageUrl)}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      {/* Product Information */}
      <div className="p-5">

        <h2 className="text-xl font-semibold">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {product.category}
        </p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mt-4">

          <span className="text-green-700 text-xl font-bold">
            ₹{product.price}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.stock > 10
                ? "bg-green-100 text-green-700"
                : product.stock > 0
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0
              ? `Stock: ${product.stock}`
              : "Out of Stock"}
          </span>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">

          <Link
            to={`/retailer/dashboard/edit-product/${product.productId}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(product.productId)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Delete
          </button>

        </div>

        

      </div>
    </div>
  );
};

export default ProductCard;


