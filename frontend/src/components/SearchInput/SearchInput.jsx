import style from "./SearchInput.module.scss";
import { useState } from "react";
import { fetchData } from "../../utils/useFetchData";

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

  const pickCity = async (place) => {
    setQuery("");
    setSuggestions([]);

    onSelect?.({
      name: place.name,
      admin1: place.admin1 ?? null,
      admin2: place.admin2 ?? null,
    });

    const res = await fetchData("http://localhost:3000/log", "POST", {
      city: place.name,
    });

    if (!res.ok) {
      return;
    }
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
              <button type="button" onClick={() => pickCity(s)}>
                {s.name}
                {s.admin1 ? `, ${s.admin1}` : ""}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
