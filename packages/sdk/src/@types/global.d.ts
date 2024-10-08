declare module 'Webtoon' {
    export default class Webtoon {
        constructor(apiKey: string);
        createComic(params: any): Promise<{ artwork: { id: string } }>;
        getComic(artworkId: string): Promise<{ status: any; comicData: any }>;
    }
}

declare module 'ComicArtworkResponse' {
    export interface Artwork {
        id: string;
        // Add other properties as needed
    }
}