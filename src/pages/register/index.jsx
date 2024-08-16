import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { auth, db } from "../../../firebase";
import Button from "../../components/button";
import { PAGE_URL } from "../../utils/constant";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing/hiding confirm password

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      await addUserDataToFirestore(userCredential.user);

      toast.success(`Welcome ${userCredential.user.displayName}`);

    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user");
    }

    setLoading(false);
  };

  const addUserDataToFirestore = async (user) => {
    try {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        role: "user",
      });
    } catch (error) {
      console.error("Error adding user data to Firestore:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  return (
    <section className="flex justify-center items-center h-screen bg-white">
      <div className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
            />
            <span
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24}/>}
            </span>
          </div>
          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle between text and password type
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
            />
            <span
              onClick={toggleShowConfirmPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </span>
          </div>
          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <span className="hover:underline">
              <Link to={PAGE_URL.LOGIN}>Sign In Here</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
