import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EVENTS_ENDPOINT } from "../config/api";

export function useUserEventDetails(id) {
  const [eventDetails, setEventDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchEventUser = async () => {
      try {
        const res = await fetch(`${EVENTS_ENDPOINT}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok || data.message) {
          throw new Error("Unauthorized");
        }
        setEventDetails(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      }
    };

    fetchEventUser();
  }, []);

  return eventDetails;
}
