import { useNavigate } from "react-router";
import EventModal from "./EventModal";
import { useEffect, useRef, useState } from "react";

const EventCard = ({ events, isLoading }) => {
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const dialogRef = useRef(null);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    if (selectedEvent && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [selectedEvent]);

  const openModal = (e) => {
    setSelectedEvent(e);
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {sortedEvents &&
          sortedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => openModal(event)}
              className="bg-base-100 cursor-pointer rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-48 w-full object-cover cursor-pointer"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-base-content/70 mb-2">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-base-content/60">{event.location}</p>
                <button
                  className="mt-4 btn btn-outline btn-primary w-full"
                  onClick={() => openModal(event)}
                >
                  See more...
                </button>
              </div>
            </div>
          ))}
      </div>

      <EventModal
        events={events}
        dialogRef={dialogRef}
        selectedEvent={selectedEvent}
        closeModal={closeModal}
      />
    </>
  );
};

export default EventCard;
