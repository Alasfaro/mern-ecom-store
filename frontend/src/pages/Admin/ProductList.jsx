import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-5 border rounded w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Create Product</h2>

        <div>
          <label className="block w-full text-center p-3 mb-3 cursor-pointer bg-gray-200 text-black rounded">
            <input type="file" name="image" onChange={uploadFileHandler} />
            <div className="text-center">
              <img src={image} className="block mx-auto max-h-[200px]" />
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input border rounded-lg py-2 mt-1 text-sm w-full" />
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input border rounded-lg py-2 mt-1 text-sm w-full" />
            </div>
            <div className="mb-3">
              <label>Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input border rounded-lg py-2 mt-1 text-sm w-full" />
            </div>
            <div className="mb-3">
              <label>Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="input border rounded-lg py-2 mt-1 text-sm w-full" />
            </div>
            <div className="col-span-2">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea border rounded-lg py-2 mt-1 text-sm w-full"></textarea>
            </div>
            <div className="mb-3">
              <label>Count In Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="input border rounded-lg py-2 ml-4 text-sm" />
            </div>
          </div>
          <button onClick={handleSubmit} className="block mx-auto bg-blue-600 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;