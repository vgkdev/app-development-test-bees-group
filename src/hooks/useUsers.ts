// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { TUser } from "../types/User";

// Định nghĩa kiểu cho dữ liệu nhận từ API
type ApiUser = Omit<TUser, "registerAt"> & {
  registerAt: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiUser[]>(
          "https://my.api.mockaroo.com/test.json?key=e1780e30"
        );

        // Chuyển đổi dữ liệu từ API sang kiểu TUser
        const convertedUsers: TUser[] = response.data.map((user) => ({
          ...user,
          registerAt: new Date(user.registerAt), // Chuyển string thành Date
        }));

        console.log("Converted users:", typeof convertedUsers[0].registerAt); // Log dữ liệu đã chuyển đổi

        setUsers(convertedUsers);
      } catch (e) {
        setError(
          "Failed to fetch users: " +
            (e instanceof Error ? e.message : "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
