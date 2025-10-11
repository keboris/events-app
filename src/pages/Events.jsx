import { useOutletContext } from "react-router";
import EventCard from "../components/EventCard";

const Events = () => {
  const { events } = useOutletContext();

  return (
    <>
      <title>Upcoming Events | Event App</title>

      <EventCard events={events} />
    </>
  );
};

export default Events;
