import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import EventModal from "../components/EventModal";
import { AUTH_ENDPOINT, EVENTS_ENDPOINT } from "../config/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${AUTH_ENDPOINT}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dataUser = await response.json();

        if (!response.ok) {
          throw new Error(dataUser.message || "Error fetching user infos");
        }

        if (dataUser) {
          setUser(dataUser);
        }
      } catch (error) {
        console.error("Error retrieving profile:", error.message);

        localStorage.removeItem("authToken");
        navigate("/signin");
      }
    };

    fetchUserData();
    // Fetch user's events
    fetchUserEvents(token, user);
  }, [navigate]);

  useEffect(() => {
    if (selectedEvent && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [selectedEvent]);

  const fetchUserEvents = async (token, userLog) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${EVENTS_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      // Filter events by current user
      console.log("User : ", userLog);

      const userEvents = data.results.filter(
        (event) => event.organizerId === userLog.id
      );

      setEvents(userEvents);
      setAllEvents(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${EVENTS_ENDPOINT}/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Remove event from state
      setEvents(events.filter((event) => event.id !== eventId));
      setAllEvents(allEvents.filter((event) => event.id !== eventId));

      // Notify other components about the change
      window.dispatchEvent(new Event("eventsChange"));

      alert("Event deleted successfully!");
    } catch (err) {
      alert("Failed to delete event: " + err.message);
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        {user && (
          <p className="text-base-content/60">
            Welcome, {user.name || user.email.split("@")[0]}
          </p>
        )}
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Your Events</h2>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-base-content/20 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No Events</h3>
          <p className="text-base-content/60">
            You haven't created any events yet. Use the "Create Event" button in
            the navigation bar to add your first event.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{event.title}</h3>
                <p className="text-sm text-base-content/60">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-base-content/60">
                  📍 {event.location}
                </p>
                <p className="text-sm line-clamp-2">{event.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => openModal(event)}
                    className="btn btn-sm btn-ghost"
                  >
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="btn btn-sm btn-error"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <EventModal
        events={allEvents}
        dialogRef={dialogRef}
        selectedEvent={selectedEvent}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Dashboard;
