import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import { updateProduct } from "../../../store/slices/product.slice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function UpdateProduct({ productId, selectedProduct, onClose }) {
  const [data, setData] = useState({
    productName: "",
    productCategory: "",
    productPrice: 0,
    productDesc: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProduct) {
      setData(selectedProduct);
      setImagePreview(selectedProduct.productImgUrl); 
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setData({ ...data, productImg: file });
    }
  };

  const handleUpdateProduct = async () => {
    if (selectedProduct.id) {      
      try {
        setLoading(true);
        const productRef = doc(db, "product", productId);
        await updateDoc(productRef, {
          productName: data.productName,
          productCategory: data.productCategory,
          productPrice: data.productPrice,
          productDesc: data.productDesc,
          productImgUrl: data.productImgUrl,
        });
        toast.success("Product updated successfully!");
        onClose()
        dispatch(
          updateProduct({
            id: productId,
            newData: {
              productName: data.productName,
              productCategory: data.productCategory,
              productPrice: data.productPrice,
              productDesc: data.productDesc,
              productImgUrl: data.productImgUrl,
            },
          })
        );
      } catch (error) {
        console.error("Error updating product: ", error);
        toast.error("Error updating product!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[600px] flex flex-col gap-6">
      <h2 className="text-5xl font-semibold mb-4 text-center">
        Update Product
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProduct();
        }}
        className="flex flex-col"
      >
        <div className="grid grid-cols-2 place-items-center gap-4">
          <div>
            <div className="flex justify-between items-center w-full"></div>
            <input
              onChange={handleImageChange}
              id="productImg"
              className="hidden"
              type="file"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="rounded-md w-full mx-auto cursor-pointer"
              />
            ) : (
              <label
                htmlFor="productImg"
                className="flex flex-col items-center gap-2 cursor-pointer mb-4"
              >
                <FaCamera size={50} />
                <span>Product Image</span>
              </label>
            )}
          </div>
          <div>
            <div className="mb-4">
              <input
                className="input p-3"
                placeholder="Product Name"
                id="productName"
                name="productName"
                type="text"
                value={data.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <select
                className="input p-2"
                id="productCategory"
                name="productCategory"
                value={data.productCategory}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Product Category
                </option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Fruit">Fruit</option>
                <option value="Noodles">Noodles</option>
                <option value="Snacks">Snacks</option>
                <option value="Fried">Fried</option>
              </select>
            </div>
            <input
              className="input p-3"
              placeholder="Product Price"
              id="productPrice"
              name="productPrice"
              type="number"
              value={data.productPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 col-span-2 w-full">
            <textarea
              className="input p-3"
              placeholder="Product Description"
              id="productDesc"
              name="productDesc"
              value={data.productDesc}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <button
          className={`bg-black text-white hover:scale-95 w-full rounded-3xl font-bold py-2 px-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating Product..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
