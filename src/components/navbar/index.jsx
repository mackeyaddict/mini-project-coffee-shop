import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaShoppingBag,
  FaSignOutAlt,
  FaCoffee,
  FaInfoCircle,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PAGE_URL } from "../../utils/constant";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth.slice";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import Cart from "../cart";
import { clearCart, setOpen } from "../../store/slices/cart.slice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch(setOpen(true));
  };

  const navLists = [
    { navList: "Home", path: PAGE_URL.HOME },
    { navList: "About Us", path: PAGE_URL.ABOUT },
    { navList: "Store", path: PAGE_URL.STORE },
    {
      navList: "Product",
      path: isAuthenticated ? PAGE_URL.PRODUCT : PAGE_URL.LOGIN,
    },
    { navList: "Contact Us", path: PAGE_URL.CONTACT },
  ];

  if (isAuthenticated && user.role === "admin") {
    navLists.push({ navList: "Dashboard", path: PAGE_URL.DASHBOARD });
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate(PAGE_URL.HOME);
        toast.success("Sign out successfully");
        dispatch(logout());
        dispatch(clearCart());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="fixed top-0 left-0 w-full z-30 bg-white rounded-b-3xl hidden lg:block"
      >
        <div className="container mx-auto my-6 flex items-center justify-center relative">
          <ul
            className={`flex ${
              isOpen ? "flex-col" : "hidden"
            } lg:flex lg:justify-center items-center bg-transparent lg:bg-white md:rounded-full py-4 px-8 gap-10`}
          >
            {navLists.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="relative"
                  onClick={() => setIsOpen(false)}
                >
                  <button className="hover:text-gray-900 focus:outline-none font-semibold">
                    {item.navList}
                    <span className="underline"></span>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <div
              className={`lg:block ${
                isOpen ? "flex top-0 left-0 " : "hidden right-0"
              } absolute lg:bg-white bg-transparent lg:rounded-full py-4 px-8 mr-6 lg:flex gap-2 lg:top-1 xl:top-0 items-center`}
            >
              <p className="hidden xl:block">{`Welcome, ${
                user.fullName || "User"
              }`}</p>
              <FaSignOutAlt
                onClick={handleLogout}
                className="hover:text-gray-900 focsus:outline-none font-semibold relative cursor-pointer"
              />
              <FaShoppingBag className="cursor-pointer" onClick={toggleCart} />
              <span className="text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center absolute top-2 right-3 text-white">
                {totalItemsInCart}
              </span>
            </div>
          ) : (
            <div
              className={`lg:block ${
                isOpen ? "block top-0 left-0" : "hidden right-0 top-0"
              } absolute lg:bg-white bg-transparent lg:rounded-full py-4 px-8 mr-6`}
            >
              <Link to={PAGE_URL.LOGIN} onClick={() => setIsOpen(false)}>
                <button className="hover:text-gray-900 focus:outline-none font-semibold relative">
                  Login
                  <span className="underline"></span>
                </button>
              </Link>
            </div>
          )}
          {isCartOpen && <Cart />}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="relative">
        <div className="fixed top-0 left-0 w-full z-30 px-8 py-4 bg-white shadow-md md:hidden flex justify-between items-center rounded-b-2xl">
          <div>
            {isAuthenticated && (
              <p className="text-sm font-medium">{`Welcome, ${
                user.fullName || "User"
              }`}</p>
            )}
          </div>
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <FaShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
              {totalItemsInCart}
            </span>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full z-30 px-8 bg-white md:hidden rounded-t-2xl">
          <div className="container mx-auto py-2 flex justify-between items-center">
            <Link to={PAGE_URL.HOME} className="flex flex-col items-center">
              <FaHome size={24} />
              <span className="text-xs">Home</span>
            </Link>
            <Link to={PAGE_URL.CONTACT} className="flex flex-col items-center">
              <MdEmail size={24} />
              <span className="text-xs">Contact</span>
            </Link>
            <Link to={PAGE_URL.PRODUCT} className="flex flex-col items-center">
              <FaCoffee size={24} />
              <span className="text-xs">Product</span>
            </Link>
            <Link to={PAGE_URL.ABOUT} className="flex flex-col items-center">
              <FaInfoCircle size={24} />
              <span className="text-xs">About</span>
            </Link>
            {isAuthenticated ? (
              <Link
                to={PAGE_URL.HOME}
                className="flex flex-col items-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={24} />
                <span className="text-xs">Logout</span>
              </Link>
            ) : (
              <Link to={PAGE_URL.LOGIN} className="flex flex-col items-center">
                <FaUser size={24} />
                <span className="text-xs">Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {isCartOpen && <Cart />}
    </>
  );
}
