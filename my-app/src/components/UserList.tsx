import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api";

export const UserList = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers()
      .then((text) => setUsers(text.split("\n").filter(Boolean)))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
};
