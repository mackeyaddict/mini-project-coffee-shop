import { useSelector } from 'react-redux';
import DashboardCard from "../../../components/cards/dashboard-card";
import { formatPrice } from '../../../utils/format-price';

export default function CardInfo() {
  const allProducts = useSelector((state) => state?.product.allProducts);
  const orders = useSelector((state) => state.order.orders);

  const productCount = allProducts.length;

  const totalEarnings = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const totalOrders = orders.length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <DashboardCard
        icon="box"
        title="Products"
        value={productCount}
        desc="Items"
      />
      <DashboardCard
        icon="moneyBill"
        title="Earnings"
        value={formatPrice(totalEarnings)}
      />
      <DashboardCard
        icon="shoppingCart"
        title="Orders"
        value={totalOrders}
        desc="Orders"
      />
    </div>
  );
}
