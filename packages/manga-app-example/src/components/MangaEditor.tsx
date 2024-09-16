"use client"
import React, { useState, useEffect } from 'react';
import { createComicArtwork, getComicArtwork, config } from 'webtoon';

config({
    apiKey: process.env.WEBTOON_API_KEY
});

const MangaEditor = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("https://s.llamagen.ai/a76b63ea-9e3d-41c4-b1a2-727509ed38e1.webp");
    const [artworkId, setArtworkId] = useState("");
    const [response, setResponse] = useState(null);
    const [fetching, setFetching] = useState(false); // New state for fetching

    const handleCreateArtwork = () => {
        const createArtworkParams = {
            prompt,
            imageUrl,
            gender: "female", // You can modify this as needed
            age: 25, // You can modify this as needed
        };

        createComicArtwork(createArtworkParams)
            .then(res => {
                console.log("Artwork created:", res);
                setResponse(res);
                setArtworkId(res.id); // Set artworkId from response
                setFetching(true); // Start fetching artwork
            })
            .catch(error => {
                console.error("Error creating artwork:", error);
            });
    };

    useEffect(() => {
        let interval;
        if (fetching) {
            interval = setInterval(() => {
                handleGetArtwork(); // Fetch artwork every interval
            }, 5000); // Fetch every 5 seconds
        }
        return () => clearInterval(interval); // Cleanup on unmount
    }, [fetching]);

    const handleGetArtwork = () => {
        getComicArtwork(artworkId)
            .then(res => {
                console.log("Artwork retrieved:", res);
                setResponse(res);
            })
            .catch(error => {
                console.error("Error retrieving artwork:", error);
            });
    };

    return (
        <div className="manga-editor">
            <h1 className="text-2xl font-bold mb-4">Manga Editor</h1>
            <input 
                type="text" 
                placeholder="Prompt" 
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                className="border rounded p-2 mb-4 w-full"
            />
            <input 
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
                className="border rounded p-2 mb-4 w-full"
            />
           <img src={imageUrl} alt="Preview" className="mt-4 border rounded" style={{ maxWidth: '100%' }} />

            <button 
                onClick={handleCreateArtwork} 
                className="bg-blue-500 text-white rounded p-2 mb-4 hover:bg-blue-600"
            >
                Create Artwork
            </button>
            <input 
                type="text" 
                placeholder="Artwork ID" 
                value={artworkId} 
                onChange={e => setArtworkId(e.target.value)} 
                className="border rounded p-2 mb-4 w-full"
            />
            <button 
                onClick={handleGetArtwork} 
                className="bg-green-500 text-white rounded p-2 mb-4 hover:bg-green-600"
            >
                Get Artwork
            </button>
            {response && <div className="response border rounded p-4 bg-gray-100">{JSON.stringify(response)}</div>}
        </div>
    );
};

export default MangaEditor;
