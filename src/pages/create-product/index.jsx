import { useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/slices/product.slice";

export default function CreateProduct() {
  const [data, setData] = useState({
    productName: "",
    productCategory: "",
    productImg: undefined,
    productPrice: 0,
    productDesc: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, productImg: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const sendDataToDB = async (imgUrl) => {
    try {
      setLoading(true);
      const productRef = collection(db, "product");
      await addDoc(productRef, {
        productName: data.productName,
        productCategory: data.productCategory,
        productImgUrl: imgUrl || "",
        productPrice: data.productPrice,
        productDesc: data.productDesc,
      });
      toast.success("Product added successfully!");
      dispatch(addProduct())
      setData({
        productName: "",
        productCategory: "",
        productImg: undefined,
        productPrice: 0,
        productDesc: "",
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding product!");
    } finally {
      setLoading(false);
    }
  };

  const handleSendProduct = async (e) => {
    e.preventDefault();
    try {
      if (data.productImg) {
        const storageRef = ref(storage, `/productImg/${data.productImg.name}`);
        await uploadBytes(storageRef, data.productImg);
        const url = await getDownloadURL(storageRef);
        sendDataToDB(url);
      } else {
        sendDataToDB();
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast.error("Error uploading image!");
    }
  };

  return (
    <div className="container mx-auto px-4 flex justify-center items-center h-screen">
      <div className="w-[600px] flex flex-col gap-6">
        <h2 className="text-5xl font-semibold mb-4 text-center">
          Create Product
        </h2>
        <form onSubmit={handleSendProduct} className="flex flex-col">
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
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
