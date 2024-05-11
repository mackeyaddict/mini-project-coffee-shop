import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/format-price";

export default function OrderDetails() {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Your Order Details</h2>
      {orders.map((order) => (
        <div key={order.id} className="border border-gray-300 rounded-md p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
          <p className="mb-2">
            <span className="font-semibold">User:</span> {order.userName}
          </p>
          <div className="mb-4">
            <span className="font-semibold">Items:</span>
            <div className="mt-2">
              {order.items.map((item) => (
                <div key={item.productName} className="border border-gray-300 rounded-md p-4 mb-2">
                  <p className="font-semibold">{item.productName}</p>
                  <p>Price: {formatPrice(item.productPrice)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mb-2">
            <span className="font-semibold">Total Price:</span>{" "}
            {formatPrice(order.totalPrice)}
          </p>
          <p className="mb-2 capitalize">
            <span className="font-semibold">Status: </span>
            {order.status}
          </p>
          <p className="mb-2"><span className="font-semibold">Service: </span> {order.service}</p>
          <p className="text-end">{order.time}</p>
          <p className="text-end">{order.date}</p>
        </div>
      ))}
    </div>
  );
}
