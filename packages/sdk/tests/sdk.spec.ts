// import { createComic, getComic, config } from '../dist/Webtoon'; // Change to built version
require('isomorphic-fetch');

import Webtoon, { createComic, getComic, config } from '../src/Webtoon';

describe('Webtoon', () => {
    const WEBTOON_API_KEY = process.env.WEBTOON_API_KEY; // Use API key from environment variables
    console.log(WEBTOON_API_KEY);
    config({ apiKey: WEBTOON_API_KEY });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create comic artwork', async () => {
        const params = {
            prompt: 'A superhero',
            size: '1024x1024',
            model: 'cyani-model'
        };

        // Remove mock and use actual request
        const result = await createComic(params);
        expect(result).toHaveProperty('id'); // Adjust based on actual response structure
        expect(result).toHaveProperty('status'); // Adjust based on actual response structure
    });

    test('should retrieve comic artwork by ID', async () => {
        const artworkId = 'cm157cn28001tl5034krsd2dc';
        
        // Remove mock and use actual request
        const result = await getComic(artworkId);
        expect(result).toHaveProperty('comics');
        expect(result).toHaveProperty('status');

    });


});