export const saveCityToLocalStorage = (place) => {
  const key = place.name;
  const stored = JSON.parse(localStorage.getItem("city_counts") || "{}");

  stored[key] = (stored[key] || 0) + 1;

  localStorage.setItem("city_counts", JSON.stringify(stored));
};
