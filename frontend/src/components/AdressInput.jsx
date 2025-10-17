import { useEffect, useRef, useState } from "react";

const AddressInput = ({ locationValue = "", onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);

  useEffect(() => {
    setQuery(locationValue);
  }, [locationValue]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (value.length < 3) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          value
        )}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    }, 1000);
  };

  const handleSelect = (place) => {
    const namePlace =
      (place.address.road || "") +
      (place.address.house_number ? " " + place.address.house_number : "") +
      ", " +
      (place.address.postcode ? place.address.postcode + " " : "") +
      (place.address.city || "");

    setQuery(namePlace);
    setSuggestions([]);
    onSelect({
      location: namePlace,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
    });
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="eventaddress"
        value={query}
        onChange={handleChange}
        placeholder="Event address"
        className="input input-bordered w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-base-100 border border-base-300 w-full max-h-48 overflow-auto rounded-lg shadow-lg">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              className="p-2 hover:bg-base-200 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;
