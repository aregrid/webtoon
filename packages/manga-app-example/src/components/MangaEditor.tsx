"use client"
import React, { useState, useEffect } from 'react';


const MangaEditor = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("https://s.llamagen.ai/a76b63ea-9e3d-41c4-b1a2-727509ed38e1.webp");
    const [artworkId, setArtworkId] = useState("cm1599ue4000bkz031sim37t0");
    const [response, setResponse] = useState<{ comicData?: any } | null>(null); // Define response type
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (artworkId) {
            if(response?.comicData){
                setFetching(false);
                setLoading(false);
                return;
            }
            const intervalId = setInterval(getArtwork, 5000); // Fetch artwork every 5 seconds
            return () => clearInterval(intervalId); // Cleanup on unmount or artworkId change
        }
    }, [artworkId]); // Dependency on artworkId

    const createArtwork = async () => {
        const createArtworkParams = { prompt, imageUrl, gender: "female", age: 25 };
        setLoading(true);
        try {
            const res = await fetch('/api/webtoon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(createArtworkParams),
            });
            const data = await res.json();
            setResponse(data);
            setArtworkId(data.artwork.id);
            setFetching(true);
        } catch (error) {
            console.error("Error creating artwork:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const getArtwork = async () => {
        if (!artworkId) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/webtoon?artworkId=${artworkId}`);
            const data = await res.json();
            setResponse(data);
            if (data.status === "LOADING") {
                setTimeout(getArtwork, 5000); // Retry fetching artwork after 5 seconds
            } else {
                setFetching(false); // Stop fetching if artwork is ready
            }
        } catch (error) {
            console.error("Error retrieving artwork:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderComicPanels = () => {
        if (!response?.comicData) return null;
        return response?.comicData.map((comic: any, index: any) => (
            <div key={index} className="comic-layout w-[720px] mx-auto grid grid-cols-3 gap-4 border border-black p-4 mb-4 rounded-lg shadow-lg bg-white">
                {comic.panels.slice(0, 6).map((panel: { assetUrl: string }, panelIndex: number) => ( // Specify panel type
                    <div key={panelIndex} className="panel border border-black mb-4 rounded-lg overflow-hidden">
                        <img src={panel.assetUrl} alt={`Panel ${panelIndex}`} className="panel-image w-full h-auto" />
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="manga-editor p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Manga Editor</h1>
            <input type="text" placeholder="Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <img src={imageUrl} alt="Preview" className="mt-2 w-40 border rounded-lg shadow-sm" style={{ maxWidth: '100%' }} />
            <button onClick={createArtwork} className="bg-blue-600 text-white rounded-lg p-2 mb-2 hover:bg-blue-700 transition duration-200">Create Artwork</button>
            <input type="text" placeholder="Artwork ID" value={artworkId} onChange={e => setArtworkId(e.target.value)} className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={getArtwork} className="bg-green-600 text-white rounded-lg p-2 mb-2 hover:bg-green-700 transition duration-200">Get Artwork</button>
            {loading && <div className="loading-indicator text-center text-blue-600">Loading...</div>}
            {renderComicPanels()}
        </div>
    );
};

export default MangaEditor;