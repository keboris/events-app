import { useEffect, useState } from "react";
import { EVENTS_ENDPOINT } from "../config/api";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(EVENTS_ENDPOINT);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setEvents(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();

    // Listen for event changes (create, update, delete)
    window.addEventListener("eventsChange", fetchAllEvents);
    return () => {
      window.removeEventListener("eventsChange", fetchAllEvents);
    };
  }, []);

  return { events, isLoading, error };
};
