import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { useState, useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  useEffect(() => {
    if (products) {
      products.forEach(product => {
        console.log(`Image URL for ${product.name}: ${product.image}`);
      });
    }
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">All Products ({products.length})</h1>
          <Link
            to="/admin/productlist"
            className="mb-4 mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Create
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="p-3 flex flex-wrap justify-around items-center">
            {products.map((product) => (
              <div
                key={product._id}
                to={`/admin/productupdate/${product._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover"
                    onError={(e) => {console.error(`Failed to load image: ${product.image}`);
                    e.target.src = 'https://via.placeholder.com/150'}}
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <h5 className="text-xl font-semibold mb-2">
                        {product?.name}
                      </h5>

                      <p className="text-gray-400 text-xs">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                      {product?.description?.substring(0, 160)}...
                    </p>

                    <div className="flex justify-between">
                      <Link
                        to={`/admin/productupdate/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update Product
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p>$ {product?.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;