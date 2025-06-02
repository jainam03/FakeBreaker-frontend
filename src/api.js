const API_URL = import.meta.env.VITE_APP_API_URL || "https://fakebreaker-flask-server.onrender.com";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    ...options.headers,
                },
            });
            
            if (!response.ok) {
                if (response.status === 503) {
                    // If service is unavailable, wait and retry
                    await delay(2000 * (i + 1)); // Exponential backoff
                    continue;
                }
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await delay(2000 * (i + 1));
        }
    }
};

export const uploadAudio = async (formData) => {
    try {
        const response = await fetchWithRetry(`${API_URL}/upload`, {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error(error.message || 'Failed to upload audio file. Please try again later.');
    }
};
