import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button";
import { FaPlus } from "react-icons/fa";
import Modal from "../../../components/modal";
import AddProduct from "./add-product";
import UpdateProduct from "./update-product";
import DeleteProduct from "./delete-product";
import { formatPrice } from "../../../utils/format-price";

export default function ProductList() {
  const allProducts = useSelector((state) => state?.product.allProducts);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdateProductClick = (product) => {
    setSelectedProduct(product);
    setOpenUpdateProductModal(true);
  };

  const handleDeleteProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDeleteProductModal(true);
  };

  return (
    <section>
      <div className="flex justify-between w-full pb-4 items-center">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <div>
          <Button
            variant="secondary"
            size="sm"
            isIcon="true"
            onClick={() => setOpenAddProductModal(true)}
          >
            <FaPlus /> Add Product
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-black text-white">
              <th className="border p-4">Name</th>
              <th className="border p-4">Category</th>
              <th className="border p-4">Price</th>
              <th className="border p-4 max-w-xs">Desc</th>
              <th className="border p-4">Image</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <tr key={index}>
                <td className="border p-4">{product.productName}</td>
                <td className="border p-4">{product.productCategory}</td>
                <td className="border p-4">
                  {formatPrice(product.productPrice)}
                </td>
                <td className="border p-4 max-w-xs">{product.productDesc}</td>
                <td className="border p-4 self-center">
                  <img
                    src={product.productImgUrl}
                    alt={product.productName}
                    className="w-32 h-32"
                  />
                </td>
                <td className="border p-4">
                  <button
                    className=" bg-orange-400 text-white py-2 px-3 rounded mr-2 hover:scale-110"
                    onClick={() => handleUpdateProductClick(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:scale-110 text-white py-2 px-3 rounded"
                    onClick={() => handleDeleteProductClick(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={openAddProductModal}
        onClose={() => setOpenAddProductModal(false)}
      >
        <AddProduct onClose={() => setOpenDeleteProductModal(false)} />
      </Modal>
      {selectedProduct && (
        <Modal
          open={openUpdateProductModal}
          onClose={() => setOpenUpdateProductModal(false)}
        >
          <UpdateProduct
            selectedProduct={selectedProduct}
            onClose={() => setOpenDeleteProductModal(false)}
          />
        </Modal>
      )}
      {selectedProduct && (
        <Modal
          open={openDeleteProductModal}
          onClose={() => setOpenDeleteProductModal(false)}
        >
          <DeleteProduct
            selectedProduct={selectedProduct}
            onClose={() => setOpenDeleteProductModal(false)}
          />
        </Modal>
      )}
    </section>
  );
}
