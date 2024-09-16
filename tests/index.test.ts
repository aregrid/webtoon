import 'dotenv/config'; // Load environment variables from .env file
import WebtoonSDK from '../src/index';
import { describe, test } from '@jest/globals'; // Import describe and test from jest/globals

describe('WebtoonSDK', () => {
    const apiKey: string | undefined = process.env.WEBTOON_API_KEY; // Ensure the API key is loaded from environment variables
    const sdk = new WebtoonSDK(apiKey as string); // Cast to string to avoid TypeScript error

    test('createComicArtwork should return artwork ID', async () => {
        const params = {
            prompt: 'running',
            imageUrl: 'https://example.com/image.png',
            gender: 'male',
            age: 30,
        };
        const result = await sdk.createComicArtwork(params);
        expect(result.artwork.id).toBeDefined();
    });

    test('getComicArtwork should return comic data', async () => {
        const artworkId = 'artwork_id';
        const result = await sdk.getComicArtwork(artworkId);
        expect(result.status).toBeDefined();
        expect(result.comicData).toBeDefined();
    });
});