import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Messaging App</h1>
      <nav>
        <Link to="/logout">
          <button
            className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition"
            aria-label="Logout"
          >
            Logout
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
