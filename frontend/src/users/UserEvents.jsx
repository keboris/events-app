import { useOutletContext } from "react-router";
import EventCard from "../components/EventCard";

const UserEvents = () => {
  const { myEvents } = useOutletContext();

  return (
    <>
      <title>My Events | Event App</title>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🎉 My Events</h2>
        <EventCard events={myEvents} />
      </section>
    </>
  );
};

export default UserEvents;
