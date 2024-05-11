import CardInfo from "./card-info";
import OrderList from "./order";
import ProductList from "./product";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col gap-6 pt-[141px] mx-24 pb-12">
        <CardInfo/>
        <ProductList />
        <OrderList />
      </div>
    </div>
  );
}
