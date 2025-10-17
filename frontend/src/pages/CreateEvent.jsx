import { useEffect, useState } from "react";
import { EVENTS_ENDPOINT } from "../config/api";
import AddressInput from "../components/AdressInput";
import { useNavigate, useParams } from "react-router";
import { useUserEventDetails } from "../hooks/useUserEventDetails";

const CreateEvent = () => {
  const { idToEdit } = useParams();

  console.log("id to edit : ", idToEdit);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: formattedDate,
    location: "",
    latitude: "",
    longitude: "",
    imageUrl: "",
    eventaddress: "",
  });

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (idToEdit) setIsEdit(true);
  }, [idToEdit]);

  const eventDetails = idToEdit ? useUserEventDetails(idToEdit) : null;

  useEffect(() => {
    if (eventDetails) {
      setFormData({
        title: eventDetails.title || "",
        description: eventDetails.description || "",
        date: eventDetails.date
          ? new Date(eventDetails.date).toISOString().split("T")[0]
          : formattedDate,
        location: eventDetails.location || "",
        latitude: eventDetails.latitude || "",
        longitude: eventDetails.longitude || "",
        imageUrl: eventDetails.imageUrl || "",
        eventaddress: eventDetails.eventaddress || "",
      });
    }
  }, [eventDetails]);

  useEffect(() => {
    console.log("FormData: ", formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("You must be logged in to create an event.");
      }

      const url = isEdit
        ? `${EVENTS_ENDPOINT}/${idToEdit}`
        : `${EVENTS_ENDPOINT}`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          location: formData.location,
          latitude: formData.latitude,
          longitude: formData.longitude,
          imageUrl: formData.imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating event");
      }

      // Notify other components about the new event
      window.dispatchEvent(new Event("eventsChange"));

      const successMessage = isEdit
        ? "✅ Event successfully updated!"
        : "✅ Event successfully created!";

      setMessage(successMessage);
      alert(successMessage);

      setFormData({
        title: "",
        description: "",
        date: formattedDate,
        location: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
        eventaddress: "",
      });

      navigate("/dashboard");
    } catch (error) {
      setMessage(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEdit ? "Edit Event" : "Create Event"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="input input-bordered w-full"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <AddressInput
          locationValue={formData.location}
          onSelect={(data) => setFormData({ ...formData, ...data })}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        {idToEdit ? (
          <button
            type="submit"
            className={`btn btn-success w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Edit in progress..." : "Edit Event"}
          </button>
        ) : (
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Creation in progress..." : "Create Event"}
          </button>
        )}
      </form>

      {message && <div className="mt-4 text-center font-medium">{message}</div>}
    </div>
  );
};

export default CreateEvent;
