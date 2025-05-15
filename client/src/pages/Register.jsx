import API from "../api/api.js";
import { useState } from "react";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center  items-center h-screen bg-gray-900">
      <div className="sm:px-6 sm:py-6 m-2 px-8 py-8 rounded-md text-gray-800 w-full max-w-md bg-white">
        <h1 className="text-center text-2xl font-bold mb-4">
          Create an account
        </h1>
        <form className="flex flex-col gap-y-4" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md mb-4 px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="border border-gray-300 rounded-md mb-4 px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Passsword</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="border border-gray-300 rounded-md mb-4 px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2.5 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300 mb-3 active:scale-95 hover:scale-101"
          >
            Register
          </button>
          <h2>
            <a href="/login" className="text-blue-600 hover:underline">
              Already have an account?
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
}
export default Register;
