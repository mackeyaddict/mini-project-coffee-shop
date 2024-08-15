import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  setOpen,
  setSelectedService,
} from "../../store/slices/cart.slice";
import { formatPrice } from "../../utils/format-price";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { allOrder } from "../../store/slices/order.slice";
import OrderDetails from "./order-details";
import dayjs from "dayjs";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
  const selectedService = useSelector((state) => state.cart.selectedService);
  
  const dispatch = useDispatch();

  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "order"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(allOrder(ordersData));
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(setSelectedService(null))
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCloseCart = () => {
    dispatch(setOpen(false));
  };

  const handleMakeOrder = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        productName: item.product.productName,
        productPrice: item.product.productPrice,
        quantity: item.quantity,
      }));
  
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');  
      const currentTime = dayjs().format('h:mm:ss A');
      const orderRef = await addDoc(collection(db, "order"), {
        userId: currentUser.uid,
        userName: currentUser.fullName,
        items: orderItems,
        totalPrice: totalPrice,
        service: selectedService,
        status: "pending",
        date: currentDate, 
        time: currentTime,
      });
      toast.success(`Order Placed with ID: ${orderRef.id}`);
      dispatch(clearCart());
      dispatch(selectedService(null));
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.productPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed top-0 right-0 bg-white w-[300px] h-screen overflow-y-auto p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={handleCloseCart}
        >
          Close
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2"
            >
              <div>
                <p className="font-semibold line-clamp-1">
                  {item.product.productName}
                </p>
                <p className="text-gray-500">Quantity: {item.quantity} items</p>
                <p className="text-gray-500">
                  Price:{formatPrice(item.product.productPrice * item.quantity)}
                </p>
              </div>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleRemoveFromCart(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <p className="font-semibold col-span-2">
              Total Price: {formatPrice(totalPrice)}
            </p>
            {selectedService && (
              <p className="font-semibold col-span-2">
                Selected Service: {selectedService}
              </p>
            )}
            <button
              className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              onClick={handleMakeOrder}
            >
              Make Order
            </button>
            <button
              className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
      {cartItems && <OrderDetails />}
    </div>
  );
}
