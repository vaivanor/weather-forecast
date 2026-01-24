import { useEffect, useMemo, useState } from "react";

const findNearestIndex = (times) => {
  const now = Date.now();
  return times.reduce((bestIdx, t, i) => {
    const best = new Date(times[bestIdx]).getTime();
    const cur = new Date(t).getTime();
    return Math.abs(cur - now) < Math.abs(best - now) ? i : bestIdx;
  }, 0);
};

/**
 * Open‑Meteo hook
 * @param {Object} options
 * @param {number} options.latitude
 * @param {number} options.longitude
 * @param {string} [options.timezone='auto']
 * @param {string[]} [options.hourly=['temperature_2m','relative_humidity_2m','wind_speed_10m','cloud_cover']]
 */
export function useFetchData({
  latitude,
  longitude,
  timezone = "auto",
  hourly = [
    "temperature_2m",
    "relative_humidity_2m",
    "wind_speed_10m",
    "cloud_cover",
  ],
} = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const hourlyParam = useMemo(() => hourly.join(","), [hourly]);

  const url = useMemo(() => {
    if (latitude == null || longitude == null) return null;
    return (
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${latitude}&longitude=${longitude}` +
      `&hourly=${encodeURIComponent(hourlyParam)}` +
      `&timezone=${encodeURIComponent(timezone)}`
    );
  }, [latitude, longitude, hourlyParam, timezone]);

  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error: " + res.status);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err?.name !== "AbortError") setError(err.message || String(err));
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [url]);

  const current = useMemo(() => {
    const h = data?.hourly;
    const times = h?.time;
    if (!times?.length) return null;

    const idx = findNearestIndex(times);

    const values = {};
    for (const key of Object.keys(h)) {
      if (key === "time") continue;
      const arr = h[key];
      values[key] = Array.isArray(arr) ? arr[idx] : undefined;
    }

    return { time: times[idx], values };
  }, [data]);

  return { data, current, loading, error, url };
}
