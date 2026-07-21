import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, search, role],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/users?page=${page}&search=${search}&role=${role}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      return res.json();
    },
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      {/* Search */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Filter */}
      <select
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <br />
      <br />

      {/* Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {data.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Pagination */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page}
      </span>

      <button
        disabled={!data.hasNextPage}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}