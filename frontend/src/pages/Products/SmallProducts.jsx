import { Link } from "react-router-dom";
import Heart from "./Heart";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] flex flex-col items-center justify-center p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
          onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
        />
        <Heart product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium ml-[3rem] px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"> ${product.price} </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;