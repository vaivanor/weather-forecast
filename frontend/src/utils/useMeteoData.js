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
 * @param {string[]} [options.daily]
 * @param {number} [options.forecast_days=6]
 */
export function useMeteoData({
  latitude,
  longitude,
  timezone = "auto",
  hourly = [
    "temperature_2m",
    "relative_humidity_2m",
    "wind_speed_10m",
    "cloud_cover",
  ],
  daily = [
    "temperature_2m_max",
    "temperature_2m_min",
    "cloud_cover_mean",
    "wind_speed_10m_max",
    "relative_humidity_2m_mean",
  ],
  forecast_days = 6,
} = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const hourlyParam = useMemo(() => hourly.join(","), [hourly]);
  const dailyParam = useMemo(
    () => (daily?.length ? daily.join(",") : ""),
    [daily],
  );

  const url = useMemo(() => {
    if (latitude == null || longitude == null) return null;

    let u =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${latitude}&longitude=${longitude}` +
      `&hourly=${encodeURIComponent(hourlyParam)}` +
      `&timezone=${encodeURIComponent(timezone)}`;

    if (dailyParam) {
      u += `&daily=${encodeURIComponent(dailyParam)}`;
      if (forecast_days != null) {
        u += `&forecast_days=${encodeURIComponent(forecast_days)}`;
      }
    }

    return u;
  }, [latitude, longitude, hourlyParam, dailyParam, forecast_days, timezone]);

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

  const next5Days = useMemo(() => {
    const d = data?.daily;
    if (!d?.time?.length) return [];

    const {
      time,
      temperature_2m_min,
      temperature_2m_max,
      cloud_cover_mean,
      wind_speed_10m_max,
      relative_humidity_2m_mean,
    } = d;

    const out = [];
    for (let i = 1; i <= 5 && i < time.length; i++) {
      out.push({
        date: time[i],
        min: temperature_2m_min?.[i] ?? null,
        max: temperature_2m_max?.[i] ?? null,
        cloudsMean: cloud_cover_mean?.[i] ?? null,
        windMax: wind_speed_10m_max?.[i] ?? null,
        humidityMean: relative_humidity_2m_mean?.[i] ?? null,
      });
    }
    return out;
  }, [data]);

  return {
    data,
    current,
    daily: data?.daily ?? null,
    next5Days,
    loading,
    error,
    url,
  };
}
