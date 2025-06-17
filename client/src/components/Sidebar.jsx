function Sidebar({ users, onSelectUser, selectedUserId }) {
  const currentUserId = localStorage.getItem("userId");
  return (
    <aside className="w-full sm:w-64 bg-gray-100 p-4 overflow-y-auto border-r">
      <h2 className="font-semibold mb-4 text-lg">Users</h2>
      <ul>
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => (
            <li
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className={`cursor-pointer p-2 rounded transition-colors ${
                selectedUserId === user.id
                  ? "bg-blue-200 text-blue-900"
                  : "hover:bg-gray-200"
              }`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelectUser(user.id);
              }}
              role="button"
              aria-pressed={selectedUserId === user.id}
            >
              {user.username}
            </li>
          ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
