function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Messaging App</h1>
      <button className="bg-blue-800 px-3 py-1 rounded">Logout</button>
    </header>
  );
}
export default Header;
