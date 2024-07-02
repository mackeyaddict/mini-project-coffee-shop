import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { allOrder, updateOrderStatus, cancelOrder } from "../../../store/slices/order.slice";
import { db } from "../../../../firebase";
import { formatPrice } from "../../../utils/format-price";
import ReactMarkdown from "react-markdown";
import Modal from "../../../components/modal";
import { analyzeOrders } from "../../../utils/ai";
import Button from "../../../components/button";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function OrderList() {
  const orders = useSelector((state) => state.order.orders);
  const currentTime = dayjs().format('MMMM D, YYYY');
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

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

  const handleCancelOrder = async () => {
    try {
      if (orderToCancel) {
        const orderDocRef = doc(db, "order", orderToCancel.id);
        await deleteDoc(orderDocRef);
        dispatch(cancelOrder(orderToCancel.id));
        setConfirmModalOpen(false);
        setOrderToCancel(null);
        toast.success("Order Canceled")
      }
    } catch (error) {
      console.error("Error canceling order: ", error);
    }
  };

  const handleAnalyzeOrders = async () => {
    setLoading(true);
    setModalOpen(true);
    const result = await analyzeOrders(orders);
    setAiResult(result);
    setLoading(false);
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
        <div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAnalyzeOrders}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Orders"}
          </Button>
        </div>
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
                <td className="border p-4">
                  {order.time} <br /> {order.date}
                </td>
                <td className="border p-4">{order.status}</td>
                <td className="border p-4 flex px-4 py-9">
                  <select
                    className="focus:outline-none"
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="order received">Order Received</option>
                    <option value="paid">Paid</option>
                  </select>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setOrderToCancel(order);
                      setConfirmModalOpen(true);
                    }}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="max-w-4xl max-h-96 overflow-auto p-4">
          <h2 className="text-xl font-bold mb-4">AI Analysis Result for {currentTime}</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader border-t-4 border-b-4 border-black rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            <ReactMarkdown>{aiResult}</ReactMarkdown>
          )}
        </div>
      </Modal>
      <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <div className="max-w-md p-4">
          <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
          <p>Are you sure you want to cancel this order?</p>
          <div className="flex justify-end mt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancelOrder}
            >
              Yes
            </Button>
            <Button
              variant="secondaryOutline"
              size="sm"
              onClick={() => setConfirmModalOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
