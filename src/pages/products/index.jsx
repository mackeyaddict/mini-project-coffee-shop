import ProductFilter from "./product-filter";
import ProductList from "./product-list";

export default function Products() {
  return (
    <section className="pt-[141px]">
      <div className="container mx-auto p-4 flex flex-col gap-12">
        <h1 className=" text-5xl font-medium">
          Products
        </h1>
        <div className="flex flex-col gap-12 lg:flex-row py-12 lg:justify-between">
          <div className="h-auto">
            <ProductFilter/>  
          </div>
          <ProductList/>
        </div>
      </div>
    </section>
  );
}
