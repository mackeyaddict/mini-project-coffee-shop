import { collection, getDocs } from "firebase/firestore";
import Button from "../../components/button";
import ProductCard from "../../components/cards/product-card";
import { db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../../store/slices/product.slice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { PAGE_URL } from "../../utils/constant";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function HomeProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const allProducts = useSelector((state) => state?.product.allProducts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // initial call to set the correct number of cards
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProducts = () => {
    setCurrentIndex((currentIndex + cardsToShow) % allProducts.length);
  };

  const prevProducts = () => {
    setCurrentIndex((currentIndex - cardsToShow + allProducts.length) % allProducts.length);
  };

  async function getProducts() {
    try {
      const ref = collection(db, "product");
      const docs = await getDocs(ref);

      let product = [];
      for (let x of docs.docs) {
        if (!x.exists()) return;
        product.push({id: x.id, ...x.data()});
      }
      console.log(`Product with ID: ${product}`)
      dispatch(setAllProducts(product));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  console.log(allProducts);

  const isLeftArrowActive = currentIndex !== 0;
  const isRightArrowActive = currentIndex + cardsToShow < allProducts.length;

  return (
    <section className="pb-12 px-4">
      <div className="container mx-auto flex flex-col gap-5">
        <h3 className="text-4xl font-semibold pb-5">Our Products</h3>
        <div className="flex items-center mx-auto gap-16">
          <FaArrowLeft
            size={24}
            onClick={prevProducts}
            className={`cursor-pointer hover:scale-110 ${isLeftArrowActive ? '' : 'opacity-50 pointer-events-none'}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center">
            {allProducts
              .slice(currentIndex, currentIndex + cardsToShow)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <FaArrowRight
            size={24}
            onClick={nextProducts}
            className={`cursor-pointer hover:scale-110 ${isRightArrowActive ? '' : 'opacity-50 pointer-events-none'}`}
          />
        </div>
        <div className="max-w-[104px] self-center">
          <Link to={isAuthenticated ? PAGE_URL.PRODUCT : PAGE_URL.LOGIN}>
            <Button variant="secondary" size="lg">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
