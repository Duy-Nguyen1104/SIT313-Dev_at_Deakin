import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); //Manage the state for the login form

  const navigate = useNavigate();
  const { email, password } = formData; //destructure the email and password from the formData

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(); //Step 1: Get the Auth object
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); //Step 2: Sign in the user with email and password
      if (userCredential.user) {
        navigate("/home"); //Step 3: Redirect the user to the home page
      }
    } catch (error) {
      toast.error("Error: Invalid Credentials", {
        autoClose: 3000,
      }); //Step 4: Show an error message if the user is not found
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center ">Log In</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
          <div className="flex justify-center items-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>
            <Link
              to="/sign-up"
              className="ml-2 text-sm text-blue-600 hover:text-blue-400"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
