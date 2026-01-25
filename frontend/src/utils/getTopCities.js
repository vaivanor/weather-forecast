export const getTopCities = (limit = 3) => {
  const stored = JSON.parse(localStorage.getItem("city_counts") || "{}");
  return Object.entries(stored)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
};
