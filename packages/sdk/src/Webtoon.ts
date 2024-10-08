import { ComicArtworkResponse } from './models/ComicArtworkResponse';

// Define interfaces for parameters
interface GenerationParams {
    prompt: string;
    size?: string;
    model?: string;
}

class Webtoon {
    private static instance: Webtoon; // Singleton instance
    private apiKey: string;
    private baseUrl: string;

    private constructor(apiKey: string) { // Make constructor private
        this.apiKey = apiKey;
        this.baseUrl = "https://api.llamagen.ai/v1/comics/generations";
    }

    static getInstance(apiKey?: string): Webtoon {
        if (!Webtoon.instance) {
            if (!apiKey) {
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
    async createComic(params: GenerationParams): Promise<Object> {
        const { prompt, size = "1024x1024", model = "cyani-model" } = params;
        const body = JSON.stringify({
            model: model,
            prompt,
            size
        });

        const response = await fetch(`${this.baseUrl}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    /**
     * Retrieves a comic artwork by its ID.
     * @param artworkId - The ID of the artwork to retrieve.
     * @returns A promise that resolves to the comic artwork response.
     */
    async getComic(artworkId: string): Promise<ComicArtworkResponse> {
        const response = await fetch(`${this.baseUrl}/${artworkId}`, {
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
            },
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() ;
    }
}

/**
 * Configures the Webtoon instance with an API key.
 * @param config - Configuration object containing the API key.
 */
function config(config: { apiKey: string | undefined }) {
    return Webtoon.getInstance(config.apiKey);
}

// Add static methods for easier access
async function createComic(params: GenerationParams): Promise<Object> {
    const instance = Webtoon.getInstance(); // Replace with actual API key management
    return instance.createComic(params);
}

async function getComic(artworkId: string): Promise<ComicArtworkResponse> {
    const instance = Webtoon.getInstance(); // Replace with actual API key management
    return instance.getComic(artworkId);
}

export { createComic, getComic, config };
export default Webtoon;