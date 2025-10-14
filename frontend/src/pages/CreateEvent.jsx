import { useEffect, useState } from "react";
import { EVENTS_ENDPOINT } from "../config/api";
import AddressInput from "../components/AdressInput";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    latitude: "",
    longitude: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

      const response = await fetch(`${EVENTS_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setMessage("✅ Event successfully created!");
      setFormData({
        title: "",
        description: "",
        date: new Date(),
        location: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
      });
    } catch (error) {
      setMessage(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
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

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Creation in progress..." : "Create Event"}
        </button>
      </form>

      {message && <div className="mt-4 text-center font-medium">{message}</div>}
    </div>
  );
};

export default CreateEvent;
