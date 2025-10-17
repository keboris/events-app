import EventCard from "../components/EventCard";
import Hero from "../components/Hero";
import { EVENTS_ENDPOINT } from "../config/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [events, setEvents] = useState([]);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!events.length)
    return <p className="text-center py-10">No upcoming events.</p>;

  return (
    <>
      <title>Events API</title>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🎉 Upcoming Events
        </h2>
        <EventCard events={events} />
      </section>
    </>
  );
};

export default Home;
