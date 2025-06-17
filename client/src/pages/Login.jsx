import { useState } from "react";
import API from "../api/api.js";
import { useNavigate } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center  items-center h-screen bg-gray-900">
      <div className="sm:px-6 sm:py-6 m-2 px-8 py-8 rounded-md text-gray-800 w-full max-w-md bg-white">
        <div className="text-center">
          <h1 className="mb-2 font-bold text-2xl">Welcome back!</h1>
          <h2 className="mb-2 text-gray-600">
            We're so excited to see you again!
          </h2>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-md mb-4 px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-300"
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-300"
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#" className="mb-6 text-blue-600 hover:underline text-sm">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2.5 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300 mb-3 active:scale-95 hover:scale-101"
          >
            Log In
          </button>
          <h3>
            Need an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
