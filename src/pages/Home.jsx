import { useOutletContext } from "react-router";
import EventCard from "../components/EventCard";
import Hero from "../components/Hero";

const Home = () => {
  const { events } = useOutletContext();
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
