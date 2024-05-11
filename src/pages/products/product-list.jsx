import { useSelector } from "react-redux";
import ProductCard from "../../components/cards/product-card";

export default function ProductList() {
  const allProducts = useSelector((state) => state.product.allProducts);
  const selectedCategory = useSelector((state) => state.filter.selectedCategory);

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.productCategory === selectedCategory)
    : allProducts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
      {filteredProducts.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}
