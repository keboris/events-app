import { useOutletContext } from "react-router";
import EventCard from "../components/EventCard";

const Events = () => {
  const { events, isLoading } = useOutletContext();

  return (
    <>
      <title>Upcoming Events | Event App</title>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🎉 Upcoming Events
        </h2>
        <EventCard events={events} isLoading={isLoading} />
      </section>
    </>
  );
};

export default Events;
