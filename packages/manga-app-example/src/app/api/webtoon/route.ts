import { createComicArtwork, getComicArtwork ,config} from 'webtoon';
import { NextResponse } from "next/server"; // {{ edit_1 }}

config({ apiKey: process.env.WEBTOON_API_KEY });
export async function POST(req: Request) { // {{ edit_2 }}
    try {
        const artwork = await createComicArtwork(await req.json()); // Updated to use req.json()
        return NextResponse.json(artwork); // Updated to use NextResponse
    } catch (error) {
        return NextResponse.json({ error: 'Error creating artwork' }, { status: 500 }); // Updated to use NextResponse
    }
}

export async function GET(req: Request) { // {{ edit_3 }}
    let query = new URL(req.url).searchParams || {};

    const artwork = await getComicArtwork(query.get('artworkId') || ''); // Updated to use req.url
    return NextResponse.json(artwork); // Updated to use NextResponse

}

// ... existing code ...