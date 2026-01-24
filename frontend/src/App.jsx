import { useEffect, useMemo, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const city = "Vilnius";
  const lat = 54.6872;
  const lon = 25.2797;

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${lat}&longitude=${lon}` +
      "&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,cloud_cover" +
      "&timezone=auto";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error: " + res.status);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, [lat, lon]);

  const current = useMemo(() => {
    const { hourly } = data ?? {};
    const {
      time,
      temperature_2m,
      wind_speed_10m,
      relative_humidity_2m,
      cloud_cover,
    } = hourly ?? {};
    if (!time?.length) return null;

    return {
      time: time[0],
      temperature: temperature_2m?.[0],
      wind: wind_speed_10m?.[0],
      humidity: relative_humidity_2m?.[0],
      clouds: cloud_cover?.[0],
    };
  }, [data]);

  return (
    <>
      {error && <p>Error: {error}</p>}
      {!error && !data && <p>Loading...</p>}

      {data && current && (
        <div>
          <div>
            <div>
              <p>{city}</p>
              <p>
                {new Date(current.time).toLocaleString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  timeZone: data?.timezone,
                })}
              </p>
            </div>
            <p>Temperature: {current.temperature} °C</p>
          </div>
          <div>
            <p>Cloud cover: {current.clouds} %</p>
            <p>Wind: {current.wind} m/s</p>
            <p>Humidity: {current.humidity} %</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
