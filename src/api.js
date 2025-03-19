const API_URL = import.meta.env.VITE_APP_API_URL || "https://fakebreaker-flask-server.onrender.com";

export const uploadAudio = async (formData) => {
    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};
