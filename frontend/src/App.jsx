import { useState } from "react";
import { useMeteoData } from "./utils/useMeteoData.js";
import SearchInput from "./components/SearchInput/SearchInput.jsx";
import { CurrentDayCard } from "./components/CurrentDayCard/CurrentDayCard.jsx";

function App() {
  const [cityData, setCityData] = useState({
    name: "Vilnius",
    lat: 54.6872,
    lon: 25.2797,
  });

  const { data, current, loading, error } = useMeteoData({
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

      <main>
        <SearchInput onSelect={(place) => setCityData(place)} />

        {error && <p>Error: {error}</p>}
        {loading && !data && <p>Loading...</p>}

        {data && current && (
          <CurrentDayCard
            time={time}
            data={data}
            cityData={cityData}
            temperature={temperature}
            clouds={clouds}
            wind={wind}
            humidity={humidity}
          />
        )}
      </main>
    </>
  );
}

export default App;
