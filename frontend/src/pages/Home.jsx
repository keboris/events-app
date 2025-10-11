import { useOutletContext } from "react-router";
import EventCard from "../components/EventCard";
import Hero from "../components/Hero";

const Home = () => {
  const { events } = useOutletContext();
  return (
    <>
      <title>Events API</title>
      <Hero />

      <EventCard events={events} />
    </>
  );
};

export default Home;
