import { useEffect, useState } from "react";
import style from "./SearchInput.module.scss";
import { saveCityToLocalStorage } from "../../utils/saveCityToLocalStorage.js";
import { getTopCities } from "../../utils/getTopCities.js";
import { fetchData } from "../../utils/useFetchData.js";

export const SearchInput = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [topCities, setTopCities] = useState([]);

  useEffect(() => {
    setTopCities(getTopCities(3));
  }, []);

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
    saveCityToLocalStorage(place);
    setTopCities(getTopCities(3));

    setQuery("");
    setSuggestions([]);

    onSelect?.({
      name: place.name,
      admin1: place.admin1 ?? null,
      admin2: place.admin2 ?? null,
      lat: place.latitude ?? place.lat,
      lon: place.longitude ?? place.lon,
    });

    const res = await fetchData("http://localhost:3000/log", "POST", {
      city: place.name,
    });

    if (!res.ok) {
      return;
    }
  };

  const handleQuickPick = async (cityName) => {
    try {
      const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(cityName) +
        "&count=1&language=lt&countryCode=LT";
      const res = await fetch(url);
      const json = await res.json();
      const first = json?.results?.[0];

      if (first) {
        await pickCity(first);
      } else {
        setQuery(cityName);
        await handleInput(cityName);
      }
    } catch (err) {
      console.error("Quick pick geocoding error:", err);
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
            <li key={`${s.name}-${s.latitude}-${s.longitude}`}>
              <button onClick={() => pickCity(s)}>
                {s.name}
                {s.admin1 ? `, ${s.admin1}` : ""}
              </button>
            </li>
          ))}
        </ul>
      )}

      {topCities.length > 0 && (
        <div className={style.flexContainer}>
          {topCities.map((c) => (
            <button
              key={`top-${c.name}`}
              onClick={() => handleQuickPick(c.name)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
