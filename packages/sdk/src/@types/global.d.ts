declare module 'Webtoon' {
    export default class Webtoon {
        constructor(apiKey: string);
        createComicArtwork(params: any): Promise<{ artwork: { id: string } }>;
        getComicArtwork(artworkId: string): Promise<{ status: any; comicData: any }>;
    }
}

declare module 'ComicArtworkResponse' {
    export interface Artwork {
        id: string;
        // Add other properties as needed
    }
}