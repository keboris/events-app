import EventCard from "../components/EventCard";

import { useEvents } from "../hooks/useEvents";

const Events = () => {
  const { events, isLoading } = useEvents();

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
      <title>Upcoming Events | Event App</title>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-base-content/70">
          🎉 Upcoming Events
        </h2>
        <EventCard events={events} />
      </section>
    </>
  );
};

export default Events;
