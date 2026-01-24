import style from "./SearchInput.module.scss";
import { useState } from "react";

export default function SearchInput({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (value) => {
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const url =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(value) +
      "&count=5&language=lt&countryCode=LT";

    try {
      const res = await fetch(url);
      const json = await res.json();
      setSuggestions(json.results || []);
    } catch (err) {
      console.error("Geo search error:", err);
    }
  };

  const pickCity = (place) => {
    setQuery(place.name);
    setSuggestions([]);
    onSelect?.({
      name: place.name,
      lat: place.latitude,
      lon: place.longitude,
    });
  };

  return (
    <div className={style.container}>
      <label htmlFor="city-input">City name</label>
      <input
        id="city-input"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Enter city (e.g., Vilnius)"
      />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((s) => (
            <li key={`${s.name}-${s.latitude}`}>
              <button onClick={() => pickCity(s)}>{s.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
