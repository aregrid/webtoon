declare module 'Webtoon' {
    export default class Webtoon {
        static getInstance(): Webtoon;
    }
    
    export function createComicArtwork(params: any): Promise<any>;
    export function getComicArtwork(artworkId: string): Promise<any>;
    export function config(options: { apiKey: string }): void;
}