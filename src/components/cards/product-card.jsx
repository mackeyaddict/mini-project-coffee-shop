import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PAGE_URL } from "../../utils/constant";
import { formatPrice } from "../../utils/format-price";

export default function ProductCard({ product }) {
  return (
    <Link to={`${PAGE_URL.PRODUCT}/${product.id}`}>
      <div className="w-[254px] relative cursor-pointer" >
        <figure className="relative w-full bg-[#F4F4F4] rounded-[20px] overflow-hidden flex justify-center items-center px-[45px] py-5">
          <img
            src={product.productImgUrl}
            alt={product.productName}
            className="object-cover object-center w-[163px] h-[173px] transition-transform transform hover:scale-110"
          />
        </figure>
        <div className="py-2 flex justify-between">
          <div className="flex flex-col pl-2">
            <div className="flex flex-col">
              <p className="line-clamp-1 font-semibold">{product.productName}</p>
              <p className=" text-base">{product.productCategory}</p>
            </div>
            <div className="flex gap-1 items-center">
              <FaStar color="#FFC727" />
              <p className="text-[#6A6A6A]">4.5</p>
              <hr className="border-0 bg-[#6A6A6A] h-3 w-0.5 my-1"/>
              <p className="text[#6A6A6A] font-light">3000 Sold</p>
            </div>
          </div>
          <div className="flex flex-col justify-between pr-2">
            <p className=" text-sm font-medium text-nowrap">{formatPrice(product.productPrice)}</p>
            <p className="self-end text-sm font-semiboldr">. . .</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
