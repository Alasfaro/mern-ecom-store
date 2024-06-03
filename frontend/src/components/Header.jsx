import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import SmallProduct from "../pages/Products/SmallProducts";
import ProductCarousel from "../pages/Products/ProductCarousel";
import banner from './360_F_218185587_P4zituDtWJOfClUKL6merI0BgLMIxoeC.jpg'

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <ProductCarousel></ProductCarousel>
          <h1 className="flex flex-col items-center justify-center mt-[10rem] text-[3rem]">Best Sellers</h1>
          <div className="mt-[5rem] grid grid-cols-2">
            {data?.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;