import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrder, updateOrderStatus } from "../../../store/slices/order.slice";
import { db } from "../../../../firebase";
import { formatPrice } from "../../../utils/format-price";

export default function OrderList() {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, "order");
      const unsubscribe = onSnapshot(ordersRef, (ordersSnapshot) => {
        const ordersData = ordersSnapshot.docs.map((doc) => ({
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
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      dispatch(updateOrderStatus({ orderId, status: newStatus }));
      const orderDocRef = doc(db, "order", orderId);
      await updateDoc(orderDocRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const sortedOrders = orders.slice().sort((a, b) => {
    const statusOrder = {
      "order received": 1,
      pending: 2,
      paid: 3,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <section>
      <div className="flex justify-between w-full pb-4 items-center">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      </div>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-black text-white">
              <th className="border p-4">Order ID</th>
              <th className="border p-4">User Name</th>
              <th className="border p-4">Items</th>
              <th className="border p-4">Service</th>
              <th className="border p-4">Total Price</th>
              <th className="border p-4">Date & Time</th>
              <th className="border p-4">Status</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <td className="border p-4">{order.id}</td>
                <td className="border p-4">{order.userName}</td>
                <td className="border p-4">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.productName} (Quantity: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border p-4">{order.service}</td>
                <td className="border p-4">{formatPrice(order.totalPrice)}</td>
                <td className="border p-4">{order.time} <br /> {order.date}</td>
                <td className="border p-4">{order.status}</td>
                <td className="border p-4">
                  <select className="focus:outline-none"
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="order received">Order Received</option>
                    <option value="paid">Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
