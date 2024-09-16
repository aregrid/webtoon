import Webtoon, { createComicArtwork, getComicArtwork, config } from '../src/Webtoon';
import dotenv from 'dotenv';
dotenv.config();

describe('Webtoon', () => {
    const apiKey = process.env.API_KEY; // Use API key from environment variables
    const webtoonInstance = Webtoon.getInstance(apiKey);
    config({ apiKey: apiKey });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create comic artwork', async () => {
        const params = {
            prompt: 'A superhero',
            imageUrl: 'https://cdn.llamagen.ai/imagex/e77fff7f-70fc-4396-9bae-e3390ac67200/w=1200,q=75',
            gender: 'male',
            age: 30,
        };

        // Remove mock and use actual request
        const result = await createComicArtwork(params);
        expect(result).toHaveProperty('artworkId'); // Adjust based on actual response structure
    });

    test('should retrieve comic artwork by ID', async () => {
        const artworkId = '12345';
        
        // Remove mock and use actual request
        const result = await getComicArtwork(artworkId);
        expect(result).toEqual(expect.objectContaining({ id: artworkId })); // Adjust based on actual response structure
    });

    test('should throw error if API key is not provided', () => {
        expect(() => Webtoon.getInstance()).toThrow('API key is required');
    });
});