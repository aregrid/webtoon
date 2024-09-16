import 'dotenv/config'; // Load environment variables from .env file
import WebtoonSDK from '../src/index';
import { Artwork } from '../src/types/artwork'; // Import Artwork type

describe('WebtoonSDK', () => {
    const apiKey: string = process.env.WEBTOON_API_KEY as string; // Cast to string, ensure it's defined

    if (!apiKey) {
        throw new Error('WEBTOON_API_KEY is not defined in the environment variables');
    }

    const sdk = new WebtoonSDK(apiKey); // Use the apiKey directly

    test('createComicArtwork should return artwork ID', async () => {
        const params = {
            prompt: 'running',
            imageUrl: 'https://cdn.llamagen.ai/imagex/e77fff7f-70fc-4396-9bae-e3390ac67200/w=1200,q=75',
            gender: 'male',
            age: 30,
        };
        const result: { artwork: Artwork } = await sdk.createComicArtwork(params) as { artwork: Artwork }; // Cast result to the expected type
        expect(result.artwork.id).toBeDefined();
    });

    test('getComicArtwork should return comic data', async () => {
        const artworkId = 'artwork_id';
        const result = await sdk.getComicArtwork(artworkId);
        expect(result.status).toBeDefined(); // Ensure status is defined
        expect(result.comicData).toBeDefined(); // Ensure comicData is defined
        expect(result).toHaveProperty('status'); // Check for status property
        expect(result).toHaveProperty('comicData'); // Check for comicData property
    });
});