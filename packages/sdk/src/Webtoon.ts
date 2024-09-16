import { ComicArtworkResponse } from './models/ComicArtworkResponse';
import fetch from 'node-fetch';

// Define interfaces for parameters
interface CreateComicArtworkParams {
    prompt: string;
    imageUrl: string;
    gender: string;
    age: number;
}

class Webtoon {
    private static instance: Webtoon; // Singleton instance
    private apiKey: string;
    private baseUrl: string;

    private constructor(apiKey: string) { // Make constructor private
        this.apiKey = apiKey;
        this.baseUrl = "https://llamagen.ai/api/openapi";
    }

    static getInstance(apiKey?: string): Webtoon {
        if (!Webtoon.instance) {
            if(!apiKey) {
                throw new Error("API key is required");
            }
            Webtoon.instance = new Webtoon(apiKey);
        }
        return Webtoon.instance;
    }

    /**
     * Creates a comic artwork based on the provided parameters.
     * @param params - The parameters for creating comic artwork.
     * @returns A promise that resolves to the generated artwork data.
     */
    async createComicArtwork(params: CreateComicArtworkParams): Promise<Object> {
        const { prompt, imageUrl, gender, age } = params;
        const formdata = new FormData(); // Use native FormData
        formdata.append("prompt", prompt);
        formdata.append("imageUrl", imageUrl);
        formdata.append("gender", gender);
        formdata.append("age", age.toString());

        const response = await fetch(`${this.baseUrl}/artworks`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "multipart/form-data", // Set content type explicitly
            },
            body: formdata,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //@ts-ignore
        return response.json();
    }

    /**
     * Retrieves a comic artwork by its ID.
     * @param artworkId - The ID of the artwork to retrieve.
     * @returns A promise that resolves to the comic artwork response.
     */
    async getComicArtwork(artworkId: string): Promise<ComicArtworkResponse> {
        const response = await fetch(`${this.baseUrl}/artworks/${artworkId}`, {
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //@ts-ignore
        return response.json() as ComicArtworkResponse;
    }
}

/**
 * Configures the Webtoon instance with an API key.
 * @param config - Configuration object containing the API key.
 */
function config(config: { apiKey: string|undefined }) {
    return Webtoon.getInstance(config.apiKey);
}

// Add static methods for easier access
async function createComicArtwork(params: CreateComicArtworkParams): Promise<Object> {
    const instance = Webtoon.getInstance(); // Replace with actual API key management
    return instance.createComicArtwork(params);
}

async function getComicArtwork(artworkId: string): Promise<ComicArtworkResponse> {
    const instance = Webtoon.getInstance(); // Replace with actual API key management
    return instance.getComicArtwork(artworkId);
}

export { createComicArtwork, getComicArtwork, config };
export default Webtoon;