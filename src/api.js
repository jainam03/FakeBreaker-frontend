const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

export const uploadAudio = async (formData) => {
    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    return response.json();
};
