"use client"
import React, { useState } from 'react';
import { createComicArtwork, getComicArtwork, config } from 'webtoon';

config({
    apiKey: "YOUR_API_KEY"
});

const MangaEditor = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [artworkId, setArtworkId] = useState("");
    const [response, setResponse] = useState(null);

    const handleCreateArtwork = () => {
        const createArtworkParams = {
            prompt,
            imageUrl,
            gender: "male", // You can modify this as needed
            age: 30, // You can modify this as needed
        };

        createComicArtwork(createArtworkParams)
            .then(res => {
                console.log("Artwork created:", res);
                setResponse(res);
            })
            .catch(error => {
                console.error("Error creating artwork:", error);
            });
    };

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
        <div>
            <h1>Manga Editor</h1>
            <input type="text" placeholder="Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <button onClick={handleCreateArtwork}>Create Artwork</button>
            <input type="text" placeholder="Artwork ID" value={artworkId} onChange={e => setArtworkId(e.target.value)} />
            <button onClick={handleGetArtwork}>Get Artwork</button>
            {response && <div>{JSON.stringify(response)}</div>}
        </div>
    );
};

export default MangaEditor;
