"use client"
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"; // Import Card component
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OpenaiArtworkExampleResponse } from "../../docs/OpenaiArtworkExampleResponse"
const DigitalCampaign = () => {
    const [prompt, setPrompt] = useState("A singer named Tailer travel in France");
    const [imageUrl, setImageUrl] = useState("https://s.llamagen.ai/a76b63ea-9e3d-41c4-b1a2-727509ed38e1.webp");
    const [artworkId, setArtworkId] = useState("cm1599ue4000bkz031sim37t0");
    const [response, setResponse] = useState<{ comicData?: any } | null>(OpenaiArtworkExampleResponse); // Define response type
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (artworkId) {
            if (response?.comicData) {
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
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {response.comicData[0].panels.map((panel: any, index: any) => (
                    <Card key={index} className="overflow-hidden border-4 border-black dark:border-white">
                        <div className="aspect-square relative">
                            <img
                                src={panel?.assetUrl || '/placeholder.svg?height=300&width=300&text=Panel ' + (index + 1)}
                                alt={`Comic panel ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 p-2">
                                <p className="text-sm font-comic text-center dark:text-white">Caption for panel {index + 1}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enter a comic story in the prompt and the main character's avatar image URL.</p>
                    <Input
                        type="text"
                        placeholder="Prompt (Comic Story)"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enter the main character's avatar image URL.</p>
                    <Input
                        type="text"
                        placeholder="Image URL (Main Character Avatar)"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                    {imageUrl && (
                        <div className="mb-2">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="border border-gray-300 dark:border-gray-700 rounded-lg w-full h-auto max-w-40"
                            />
                        </div>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Create a comic book, wait for a few minutes, and you will receive a comic book based on the image URL and prompt.</p>
                    <Button
                        onClick={createArtwork}
                        className="bg-blue-600 text-white rounded-lg p-2 mb-2 hover:bg-blue-700 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        Create Comic Book
                    </Button>
                    <Input
                        type="text"
                        placeholder="Artwork ID"
                        value={artworkId}
                        onChange={e => setArtworkId(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                    <Button
                        onClick={getArtwork}
                        className="bg-green-600 text-white rounded-lg p-2 mb-2 hover:bg-green-700 transition duration-200 dark:bg-green-700 dark:hover:bg-green-800"
                    >
                        Get Comic Book
                    </Button>
                    {loading && <div className="loading-indicator text-center text-blue-600 dark:text-blue-400">Loading...</div>}
                </div>
                <div>
                    {renderComicPanels()}
                </div>

            </div>

        </>

    );
};

export default DigitalCampaign;