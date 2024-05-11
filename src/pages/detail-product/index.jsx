import {
  FaAngleRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DetailImgProdut from "./detail-img-product";
import DetailOfProduct from "./detail-of-product";
import { PAGE_URL } from "../../utils/constant";

export default function ProductDetail() {
  const { productId } = useParams();
  const allProducts = useSelector((state) => state.product.allProducts);
  const product = allProducts.find((prod) => prod.id === productId);


  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <section className="px-4">
      <div className="container mx-auto pt-[141px] pb-12">
        <div className="pb-[84px] flex gap-[10px] items-center">
          <Link to={PAGE_URL.PRODUCT}>          
            <h2 className="text-5xl font-medium text-[#8A8B8D] hidden md:block cursor-pointer hover:text-black">Product</h2>
          </Link>
          <FaAngleRight size={48} className="hidden md:block" />
          <h2 className="text-5xl font-medium">{product.productName}</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between items-center">
          <DetailImgProdut product={product}/>
          <DetailOfProduct product={product}/>
        </div>
      </div>
    </section>
  );
}
