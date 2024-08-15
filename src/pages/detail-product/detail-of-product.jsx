import { useState } from "react";
import { FaMinus, FaPlus, FaRegStar, FaStar } from "react-icons/fa";
import { addToCart, setSelectedService } from "../../store/slices/cart.slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/format-price";

export default function DetailOfProduct({ product }) {
  const selectedService = useSelector((state) => state.cart.selectedService);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedService) {
      toast.error("Please select a service before adding items to the cart.");
      return;
    }
    dispatch(addToCart({ product, quantity: count }));
    toast.success("Product Added to Cart");
    setCount(1);
  };

  const handleServiceSelection = (event) => {
    dispatch(setSelectedService(event.target.value));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="text-4xl font-semibold pb-2">
          {formatPrice(product.productPrice)}
        </p>
        <div className="flex gap-2 items-center">
          <div className="grid grid-cols-5 text-xl md:text-2xl">
            <FaStar color="#FFC727" />
            <FaStar color="#FFC727" />
            <FaStar color="#FFC727" />
            <FaStar color="#FFC727" />
            <FaRegStar color="#FFC727" />
          </div>
          <p className="text-xl md:text-2xl font-semibold">4.5</p>
          <hr className="border-0 bg-[#6A6A6A] h-5 w-0.5 my-1" />
          <p className="text-sm md:text-2xl ">2000 Reviews</p>
          <hr className="border-0 bg-[#6A6A6A] h-5 w-0.5 my-1" />
          <p className="text-sm md:text-2xl ">3000 Sold</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <p className="font-medium text-2xl">Service</p>
        <div className="flex gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="service"
              value="Drive Thru"
              checked={selectedService === "Drive Thru"}
              onChange={handleServiceSelection}
              className="hidden peer"
            />
            <span className="px-4 py-1 bg-[#D9D9D9] text-black font-medium text-xl rounded-lg cursor-pointer peer-checked:bg-black peer-checked:text-white hover:scale-95">
              Drive Thru
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="service"
              value="In Place"
              checked={selectedService === "In Place"}
              onChange={handleServiceSelection}
              className="hidden peer"
            />
            <span className="px-4 py-1 bg-[#D9D9D9] text-black font-medium text-xl rounded-lg cursor-pointer peer-checked:bg-black peer-checked:text-white hover:scale-95">
              In Place
            </span>
          </label>
        </div>
      </div>
      <div className="pt-2 flex gap-4">
        <button className="px-4 py-1 bg-[#D9D9D9] text-black font-medium text-2xl rounded-[20px] flex gap-2 items-center focus:outline-none">
          <FaMinus size={20} onClick={decrement} className="hover:scale-90" />
          <span>{count}</span>
          <FaPlus size={20} onClick={increment} className="hover:scale-90" />
        </button>
        <button
          className="px-4 py-1 bg-black text-white font-medium text-xl rounded-lg hover:scale-95 flex gap-2 items-center"
          onClick={handleAddToCart}
        >
          <FaPlus size={20} />
          <span>Add to Cart</span>
        </button>
      </div>
      <div className="pt-2 flex flex-col gap-2 w-[294px]">
        <p className="text-[20px] font-medium">Descriptions</p>
        <p className="opacity-50">{product.productDesc}</p>
      </div>
    </div>
  );
}
