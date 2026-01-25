export const fetchData = async (url, method = "GET", body = null) => {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP error: ${response.status}`,
        data: null,
      };
    }

    const json = await response.json();
    return {
      ok: true,
      error: null,
      data: json,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message || "Server error.",
      data: null,
    };
  }
};
