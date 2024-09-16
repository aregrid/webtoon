import axios from 'axios';
import FormData from 'form-data';
import { ComicArtworkResponse } from '../models/ComicArtworkResponse';

class Webtoon {
    apiKey: string;
    baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = "https://llamagen.ai/api/openapi";
    }

    async createComicArtwork(params: {
        prompt: string;
        imageUrl: string;
        gender: string;
        age: number;
    }): Promise<Object> {
        const { prompt, imageUrl, gender, age } = params;
        const formdata = new FormData();
        formdata.append("prompt", prompt);
        formdata.append("imageUrl", imageUrl);
        formdata.append("gender", gender);
        formdata.append("age", age.toString());

        const response = await axios.post(`${this.baseUrl}/artworks`, formdata, {
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                ...formdata.getHeaders(), // Include FormData headers
            },
        });

        return response.data;
    }

    async getComicArtwork(artworkId: string): Promise<ComicArtworkResponse> {
        const response = await axios.get(`${this.baseUrl}/artworks/${artworkId}`, {
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
            },
        });

        return response.data;
    }
}

export default Webtoon;