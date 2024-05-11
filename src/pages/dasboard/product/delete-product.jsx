import { deleteDoc, doc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../store/slices/product.slice";

export default function DeleteProduct({ selectedProduct, onClose }) {
  const dispatch = useDispatch();
  console.log(selectedProduct)

  const handleDelete = async () => {
    console.log("Delete button clicked");
    if (selectedProduct.id) {
      try {
        const productRef = doc(db, "product", selectedProduct.id);
        await deleteDoc(productRef);
        toast.success("Product Deleted");
        dispatch(deleteProduct(selectedProduct.id)); 
        onClose();
      } catch (error) {
        console.error("Error removing document: ", error);
        toast.error("Error removing document: ", error);
      }
    }
  };
  

  return (
    <div className="text-center w-56">
      <FaTrash size={56} className="mx-auto text-red-500" />
      <div className="mx-auto my-4 w-48">
        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this item?
        </p>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-danger w-full" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-light w-full" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
