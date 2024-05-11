import { motion } from "framer-motion";
import heroBackground from "../../assets/images/hero-bg.jpg";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PAGE_URL } from "../../utils/constant";

export default function HomeBanner() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <section className="pb-12">
      <div
        className="h-[692px] flex justify-center items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="bg-black absolute inset-0 w-full h-full opacity-45"></div>
        <motion.div
          className="container mx-auto px-4 text-white flex flex-col gap-4 z-10"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-6xl font-semibold">LIFE IS NOT BETTER</h1>
          <h3 className="text-4xl font-medium">WITHOUT COFFEE</h3>
          <div className=" w-60">
            <Link to={isAuthenticated ? PAGE_URL.PRODUCT : PAGE_URL.LOGIN}>
              <Button variant="primary" size="xl">
                Order Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
