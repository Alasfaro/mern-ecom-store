import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-5 border rounded w-[80%] max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Product</h2>
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
            <div className="col-span-2 flex justify-center space-x-4 mt-4">
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-10 py-2 rounded">Update</button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-10 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/admin/allproducts"
        className="mt-4 bg-black text-white px-10 py-2 rounded text-center">
        Return
      </Link>
    </div>
  );  
};

export default AdminProductUpdate;