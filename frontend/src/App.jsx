import { useFetchData } from "./utils/useFetchData.js";

function App() {
  const city = "Vilnius";
  const lat = 54.6872;
  const lon = 25.2797;

  const { data, current, loading, error } = useFetchData({
    latitude: lat,
    longitude: lon,
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
      {error && <p>Error: {error}</p>}
      {loading && !data && <p>Loading...</p>}

      {data && current && (
        <div>
          <div>
            <div>
              <p>{city}</p>
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
