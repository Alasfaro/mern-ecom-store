import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favouriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg text-center font-bold mt-[3rem]">
        WISH LIST
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;