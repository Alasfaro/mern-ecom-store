import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-[10rem] text-[3rem]">
          Browse
        </h1>
      </div>

      <div>
        <div className="flex justify-center flex-wrap mt-[2rem]">
          {data?.products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
  </>
  );
};

export default Home;