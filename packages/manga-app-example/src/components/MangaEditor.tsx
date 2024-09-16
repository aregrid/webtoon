"use client"
import React, { useState, useEffect } from 'react';

const MangaEditor = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("https://s.llamagen.ai/a76b63ea-9e3d-41c4-b1a2-727509ed38e1.webp");
    const [artworkId, setArtworkId] = useState("");
    const [response, setResponse] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false); // New state for loading

    const handleCreateArtwork = () => {
        const createArtworkParams = {
            prompt,
            imageUrl,
            gender: "female",
            age: 25,
        };

        setLoading(true); // Start loading state
        fetch('/api/webtoon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createArtworkParams),
        })
        .then(res => res.json())
        .then(res => {
            console.log("Artwork created:", res);
            setResponse(res);
            setArtworkId(res.id);
            setFetching(true);
        })
        .catch(error => {
            console.error("Error creating artwork:", error);
            setLoading(false); // Stop loading on error
        });
    };

    useEffect(() => {
        let interval;
        if (fetching) {
            interval = setInterval(() => {
                handleGetArtwork();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [fetching]);

    const handleGetArtwork = () => {
        setLoading(true); // Start loading state for fetching artwork
        fetch(`/api/webtoon?artworkId=${artworkId}`)
            .then(res => res.json())
            .then(res => {
                console.log("Artwork retrieved:", res);
                setResponse(res);
                setLoading(false); // Stop loading when artwork is retrieved
            })
            .catch(error => {
                console.error("Error retrieving artwork:", error);
                setLoading(false); // Stop loading on error
            });
    };

    const renderComicPanels = () => {
        if (response && response.comicData) {
            return response.comicData.map((comic, index) => (
                <div key={index} className="comic-layout w-[720px] mx-auto grid grid-cols-3 gap-4 border border-black p-4 mb-4 rounded-lg shadow-lg bg-white"> {/* Updated layout for comic book style */}
                    {comic.panels.slice(0, 6).map((panel, panelIndex) => ( // Limit to 6 panels
                        <div key={panelIndex} className="panel border border-black mb-4 rounded-lg overflow-hidden"> {/* Updated panel styling */}
                            <img src={panel.assetUrl} alt={`Panel ${panelIndex}`} className="panel-image w-full h-auto" /> {/* Full width image */}
                            {/* <p className="panel-caption text-center p-2">{panel.caption}</p>  */}
                        </div>
                    ))}
                </div>
            ));
        }
        return null;
    };

    return (
        <div className="manga-editor p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Manga Editor</h1>
            <input 
                type="text" 
                placeholder="Prompt" 
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img src={imageUrl} alt="Preview" className="mt-2 w-40 border rounded-lg shadow-sm" style={{ maxWidth: '100%' }} />

            <button 
                onClick={handleCreateArtwork} 
                className="bg-blue-600 text-white rounded-lg p-2 mb-2 hover:bg-blue-700 transition duration-200"
            >
                Create Artwork
            </button>
            <input 
                type="text" 
                placeholder="Artwork ID" 
                value={artworkId} 
                onChange={e => setArtworkId(e.target.value)} 
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                onClick={handleGetArtwork} 
                className="bg-green-600 text-white rounded-lg p-2 mb-2 hover:bg-green-700 transition duration-200"
            >
                Get Artwork
            </button>

            {loading && <div className="loading-indicator text-center text-blue-600">Loading...</div>} {/* Loading UI */}

            {/* {response && <div className="response border rounded-lg p-2 bg-white shadow-md">{JSON.stringify(response)}</div>} */}
            {renderComicPanels()} {/* Render comic panels here */}
        </div>
    );
};

export default MangaEditor;