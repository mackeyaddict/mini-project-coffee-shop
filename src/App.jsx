import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { PAGE_URL } from "./utils/constant";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Products from "./pages/products";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer";
import About from "./pages/about";
import Store from "./pages/store";
import ContactUs from "./pages/contact-us";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/dasboard";
import ProductDetail from "./pages/detail-product";
import ChatBot from "./pages/chatbot";

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user.role);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={PAGE_URL.HOME} element={<Home />} />
        <Route path={PAGE_URL.LOGIN} element={<Login />} />
        <Route path={PAGE_URL.REGISTER} element={<Register />} />
        <Route path={PAGE_URL.ABOUT} element={<About />} />
        <Route path={PAGE_URL.STORE} element={<Store />} />
        <Route path={PAGE_URL.CONTACT} element={<ContactUs />} />
        {isAuthenticated ? (
          <>
            {userRole === "admin" && (
              <>
                <Route path={PAGE_URL.PRODUCT} element={<Products />} />
                <Route path={`${PAGE_URL.PRODUCT}/:productId`} element={<ProductDetail />} />
                <Route path={PAGE_URL.DASHBOARD} element={<Dashboard />} />
                <Route path={PAGE_URL.CHATBOT} element={<ChatBot />} />
              </>
            )}
            {userRole === "user" && (
              <>
                <Route path={PAGE_URL.PRODUCT} element={<Products />} />
                <Route path={`${PAGE_URL.PRODUCT}/:productId`} element={<ProductDetail />} />
                <Route path={PAGE_URL.CHATBOT} element={<ChatBot />} />
              </>
            )}
          </>
        ) : (
          <Route path={PAGE_URL.LOGIN} element={<Login />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}
