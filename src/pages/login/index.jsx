import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { PAGE_URL } from "../../utils/constant";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth.slice";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const { uid } = userCredential.user;
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          dispatch(login(userData));
        });
        toast.success("Login success");
        navigate(PAGE_URL.HOME);
      } else {
        console.error("User document not found in Firestore");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  console.log(`isAuth: ${isAuthenticated}`);

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          {" "}
          {/* Added onSubmit handler */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <Button
            size="md"
            variant="secondary"
            type="submit"
            disabled={loading}
          >
            {" "}
            {/* Added type="submit" and disabled attribute */}
            {loading ? "Logging in..." : "Login"}
            {/* Display "Logging in..." text while loading */}
          </Button>
        </form>
        <div className="mt-4">
          <p>
            Don&rsquo;t have an account? 
            <span className="hover:underline">
              <Link to={PAGE_URL.REGISTER}> Sign Up Here</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
