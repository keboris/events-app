import { useEffect, useState } from "react";
import EventMap from "./EventMap";

const EventModal = ({ events, dialogRef, selectedEvent, closeModal }) => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventsList, setEventsList] = useState(events);

  useEffect(() => {
    if (selectedEvent) {
      setCurrentEvent(selectedEvent);

      if (!mapCenter) {
        setMapCenter({
          lat: selectedEvent.latitude,
          lng: selectedEvent.longitude,
        });
      }
    }
  }, [selectedEvent]);

  useEffect(() => {
    setSearchQuery("");
    setEventsList(events);
  }, [closeModal, events]);

  const handleSearch = (e) => {
    e.preventDefault();

    let query = e.type === "submit" ? searchQuery : e.target.value;
    if (e.type === "change") setSearchQuery(query);

    if (!query.trim()) {
      setEventsList(events);
      return;
    }

    setEventsList(
      events.filter(
        (evt) =>
          evt.title.toLowerCase().includes(query.toLowerCase()) ||
          evt.location.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const showEvent = (event) => {
    setCurrentEvent(event);

    setMapCenter({
      lat: event.latitude,
      lng: event.longitude,
    });
  };
  return (
    <dialog ref={dialogRef} className="modal">
      {currentEvent && (
        <>
          <div className="modal-box w-11/12 max-w-5xl">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
            >
              ✕
            </button>

            <div className="card bg-base-100 w-full shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 md:basis-[30%]">
                  <h2 className="flex items-center justify-start gap-2 text-xl font-bold mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    Events
                  </h2>

                  <div className="flex items-center gap-2 mb-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="form-control">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search events..."
                          className="input input-bordered input-sm w-48"
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery("");

                              setEventsList(events);
                            }}
                            className="btn btn-square btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                              />
                            </svg>
                          </button>
                        )}

                        <button type="submit" className="btn btn-square btn-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="hidden md:flex flex-col gap-2 carousel carousel-vertical h-108">
                    {eventsList &&
                      eventsList.map((ev) => (
                        <div
                          key={ev.id}
                          onClick={() => showEvent(ev)}
                          className={`card carousel-item w-full shadow-sm cursor-pointer overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform ${
                            ev.id === currentEvent.id
                              ? "bg-primary text-primary-content"
                              : "bg-base-100"
                          }`}
                        >
                          <div className="px-4 py-4">
                            <h2 className="card-title">{ev.title}</h2>
                            <p>📍 {ev.location}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="relative md:hidden">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2">
                      <span className="text-2xl opacity-50">❮</span>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2">
                      <span className="text-2xl opacity-50">❯</span>
                    </div>
                    <div className="carousel rounded-box w-full">
                      {eventsList &&
                        eventsList.map((ev) => (
                          <div
                            key={ev.id}
                            onClick={() => showEvent(ev)}
                            className={`carousel-item w-1/2 card shadow-sm cursor-pointer overflow-hidden transition-transform ${
                              ev.id === currentEvent.id
                                ? "bg-primary text-primary-content"
                                : "bg-base-100"
                            }`}
                          >
                            <div className="px-4 py-4 text-sm">
                              <h2 className="card-title text-md">{ev.title}</h2>
                              <p>📍 {ev.location}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:basis-[70%]">
                  <h2 className="text-2xl font-bold mb-4">
                    {currentEvent.title}
                  </h2>
                  <p className="text-base-content/70 mb-2">
                    📅 {new Date(currentEvent.date).toLocaleDateString()}
                  </p>
                  <p className="text-base-content/70 mb-2">
                    📍 {currentEvent.location}
                  </p>
                  <p className="text-base-content/70 mb-4">
                    📖 {currentEvent.description}
                  </p>

                  {/* Map centered on the event position */}
                  {mapCenter && (
                    <EventMap
                      events={events}
                      mapCenter={mapCenter}
                      event={currentEvent}
                      title={currentEvent.title}
                      onMarkerClick={(ev) => setCurrentEvent(ev)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>Close</button>
          </form>
        </>
      )}
    </dialog>
  );
};

export default EventModal;

/*
[...events]
.sort((a, b) =>
    a.id === currentEvent?.id
    ? -1
    : b.id === currentEvent?.id
    ? 1
    : 0
)*/
