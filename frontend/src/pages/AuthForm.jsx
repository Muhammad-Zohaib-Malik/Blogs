import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleAuthForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/users/${type}`, formData);

      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.user.token));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      console.error(error);
      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col justify-center h-screen max-w-md gap-3 p-4 mx-auto">
      <h1 className="mb-4 text-4xl font-bold text-center capitalize">
        {type === "signin" ? "Sign In" : "Sign Up"}
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleAuthForm}>
        {type === "signup" && (
          <label className="flex items-center gap-2 input input-bordered">
            <svg aria-label="Username Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              autoComplete="off"
              name="username"
              type="text"
              className="grow"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              aria-label="Username"
            />
          </label>
        )}

        <label className="flex items-center gap-2 input input-bordered">
          <svg aria-label="Email Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            autoComplete="off"
            name="email"
            type="text"
            className="grow"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            aria-label="Email"
          />
        </label>

        <label className="flex items-center gap-2 input input-bordered">
          <svg aria-label="Password Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            name="password"
            type="password"
            className="grow"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
          />
        </label>

        <button
          type="submit"
          className="px-3 py-2 mt-3 text-white bg-gray-600 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
        >
          {type === "signup" ? "Register" : "Login"}
        </button>
      </form>

      {/* Link for switching between Sign In and Sign Up */}
      <div className="mt-4 text-center">
        {type === "signup" ? (
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        ) : (
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
