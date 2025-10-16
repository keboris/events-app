import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { AUTH_ENDPOINT, EVENTS_ENDPOINT } from "../config/api";

const MainLayout = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const fetchAllEvents = async () => {
    try {
      const res = await fetch(`${EVENTS_ENDPOINT}`);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      console.log(data);
      setEvents(data.results);
    } catch (error) {
      console.error(error);
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

  const fetchMyEvents = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(`${AUTH_ENDPOINT}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Something went wrong");
      const dataUser = await response.json();

      const res = await fetch(`${EVENTS_ENDPOINT}`);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();

      setMyEvents(
        data.results.filter((event) => event.organizerId === dataUser.id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyEvents();

    // Listen for event changes and auth changes
    window.addEventListener("eventsChange", fetchMyEvents);
    window.addEventListener("authChange", fetchMyEvents);

    return () => {
      window.removeEventListener("eventsChange", fetchMyEvents);
      window.removeEventListener("authChange", fetchMyEvents);
    };
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen">
        <Outlet context={{ events, myEvents }} />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
