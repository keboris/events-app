import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AUTH_ENDPOINT } from "../config/api";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${AUTH_ENDPOINT}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok || data.message) {
          throw new Error("Unauthorized");
        }
        setUser(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
    };

    fetchUser();
  }, []);

  return user;
}
