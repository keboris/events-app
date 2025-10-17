import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { AUTH_ENDPOINT, EVENTS_ENDPOINT } from "../config/api";

const MainLayout = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${EVENTS_ENDPOINT}`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();

        console.log(data);
        setEvents(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllEvents();

    // Listen for event changes (create, update, delete)
    window.addEventListener("eventsChange", fetchAllEvents);

    return () => {
      window.removeEventListener("eventsChange", fetchAllEvents);
    };
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen">
        <Outlet context={{ events, isLoading }} />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
