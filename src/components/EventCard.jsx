import { useNavigate } from "react-router";

const EventCard = ({ events }) => {
  const navigate = useNavigate();

  /*const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });*/

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {events &&
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">{event.location}</p>
                <button
                  className="mt-4 btn btn-outline btn-primary w-full"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  See more...
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default EventCard;
