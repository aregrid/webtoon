declare module 'Webtoon' {
    export default class Webtoon {
        static getInstance(): Webtoon;
    }
    
    export function createComic(params: any): Promise<any>;
    export function getComic(artworkId: string): Promise<any>;
    export function config(options: { apiKey: string }): void;
}