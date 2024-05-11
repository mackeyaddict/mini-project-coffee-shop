import { FaShoppingCart, FaMoneyBill, FaBoxOpen } from "react-icons/fa";

export default function DashboardCard({ icon, title, value, desc }) {
  const icons = {
    shoppingCart: FaShoppingCart,
    box: FaBoxOpen,
    moneyBill: FaMoneyBill,
  };

  const IconComponent = icons[icon];

  return (
    <div className="flex items-center bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg">
      <div className="bg-white rounded-full p-3 mr-4">
        <IconComponent size={100} color="#000" />
      </div>
      <div className="text-gray-800">
        <p className="text-4xl font-semibold mb-1">{title}</p>
        <p className="text-2xl font-bold">{value} {desc}</p>
      </div>
    </div>
  );
}
