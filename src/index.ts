class WebtoonSDK {
    apiKey: string;
    baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = "https://llamagen.ai/api/openapi";
    }

    /**
     * Generates a new comic artwork based on the provided parameters.
     * @param {Object} params - The parameters for generating comic artwork.
     * @returns {Promise<Object>} - The response from the API.
     */
    async createComicArtwork(params: {
        prompt: string; // Accepted values: running, flexibility, flying, laser_speed, laser_flexibility, laser_flying, castle_speed, castle_flexibility, castle_flying
        imageUrl: string;
        gender: string; // Accepted values: male, female, other
        age: number; // Must be between 0 and 150
    }): Promise<Object> {
        const { prompt, imageUrl, gender, age } = params;
        const formdata = new FormData();
        formdata.append("prompt", prompt);
        formdata.append("imageUrl", imageUrl);
        formdata.append("gender", gender);
        formdata.append("age", age.toString());

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.apiKey}`);

        const response = await fetch(`${this.baseUrl}/artworks`, {
            method: "POST",
            body: formdata,
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Retrieves the generated comic panels for a specific artwork ID.
     * @param {string} artworkId - The ID of the comic artwork to retrieve.
     * @returns {Promise<Object>} - The response from the API.
     */
    async getComicArtwork(artworkId: string): Promise<Object> {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.apiKey}`);

        const response = await fetch(`${this.baseUrl}/artworks/${artworkId}`, {
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    }
}

export default WebtoonSDK;