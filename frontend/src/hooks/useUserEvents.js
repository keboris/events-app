import { useState, useEffect } from "react";
import { EVENTS_ENDPOINT } from "../config/api";

export function useUserEvents(user) {
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("authToken");

    const fetchUserEvents = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(EVENTS_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user events");

        const data = await res.json();

        const filtered = data.results.filter((e) => e.organizerId === user.id);

        setUserEvents(filtered);
        setAllEvents(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEvents();
  }, [user]);

  return {
    userEvents,
    allEvents,
    isLoading,
    error,
    setUserEvents,
    setAllEvents,
  };
}
