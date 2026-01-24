import { useState } from "react";
import { useFetchData } from "./utils/useFetchData.js";
import SearchInput from "./components/SearchInput/SearchInput.jsx";

function App() {
  const [cityData, setCityData] = useState({
    name: "Vilnius",
    lat: 54.6872,
    lon: 25.2797,
  });

  const { data, current, loading, error } = useFetchData({
    latitude: cityData.lat,
    longitude: cityData.lon,
    timezone: "auto",
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "cloud_cover",
    ],
  });

  const time = current?.time;
  const temperature = current?.values?.temperature_2m;
  const wind = current?.values?.wind_speed_10m;
  const humidity = current?.values?.relative_humidity_2m;
  const clouds = current?.values?.cloud_cover;

  return (
    <>
      <h1>OpenMeteo</h1>

      <SearchInput onSelect={(place) => setCityData(place)} />

      {error && <p>Error: {error}</p>}
      {loading && !data && <p>Loading...</p>}

      {data && current && (
        <div>
          <div>
            <div>
              <p>{cityData.name}</p>
              <p>
                {new Date(time).toLocaleString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  timeZone: data?.timezone,
                })}
              </p>
            </div>

            <p>Temperature: {temperature} °C</p>
          </div>

          <div>
            <p>Cloud cover: {clouds} %</p>
            <p>Wind: {wind} m/s</p>
            <p>Humidity: {humidity} %</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
