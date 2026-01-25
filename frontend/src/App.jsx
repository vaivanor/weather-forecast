import { useState, useEffect } from "react";
import { useMeteoData } from "./utils/useMeteoData.js";
import SearchInput from "./components/SearchInput/SearchInput.jsx";
import { CurrentDayCard } from "./components/CurrentDayCard/CurrentDayCard.jsx";
import { Header } from "./components/Header/Header.jsx";
import { NextDayCard } from "./components/NextDayCard/NextDayCard.jsx";
import { GridWrapper } from "./components/GridWrapper/GridWrapper.jsx";

function App() {
  const [cityData, setCityData] = useState({
    name: "Vilnius",
    lat: 54.6872,
    lon: 25.2797,
  });
  const [columns, setColumns] = useState(1);
  const [columnsDays, setColumnsDays] = useState(1);

  const { data, current, next5Days, loading, error } = useMeteoData({
    latitude: cityData.lat,
    longitude: cityData.lon,
    timezone: "auto",
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "cloud_cover",
    ],
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "cloud_cover_mean",
      "wind_speed_10m_max",
      "relative_humidity_2m_mean",
    ],
    forecast_days: 6,
  });

  const time = current?.time;
  const temperature = current?.values?.temperature_2m;
  const wind = current?.values?.wind_speed_10m;
  const humidity = current?.values?.relative_humidity_2m;
  const clouds = current?.values?.cloud_cover;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setColumns(width >= 768 ? 2 : 1);
      setColumnsDays(width >= 1200 ? 3 : width >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <main>
        <GridWrapper columns={columns}>
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
        </GridWrapper>
        {data && Array.isArray(next5Days) && next5Days.length > 0 && (
          <section style={{ marginTop: 24 }}>
            <h4>Next 5 days:</h4>
            <GridWrapper columns={columnsDays}>
              {next5Days.map((d) => (
                <NextDayCard
                  key={d.date}
                  date={d.date}
                  data={data}
                  tempMin={d.min}
                  tempMax={d.max}
                  cloudsMean={d.cloudsMean}
                  windMax={d.windMax}
                  humidityMean={d.humidityMean}
                />
              ))}
            </GridWrapper>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
