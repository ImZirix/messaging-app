function Sidebar({ users, onSelectUser, selectedUserId }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`cursor-pointer p-2 rounded ${
              selectedUserId === user.id ? "bg-blue-200" : "hover:bg-gray-200"
            }`}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default Sidebar;
