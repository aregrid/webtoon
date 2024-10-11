"use client"
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"; // Import Card component
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { OpenaiArtworkExampleResponse } from "../../docs/OpenaiArtworkExampleResponse"
import ComicPanels from '../ComicPanels';
const DigitalCampaign = () => {
    const [prompt, setPrompt] = useState(`An american female girl,she is a singer named Tailer travel in France
        Panel 1:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing in Paris near the Eiffel tower. He is ready for his mission 

Panel 2:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing in a large empty room like a disco. The room has a stage with colorful lights around. There is a speaker in one corner from where musical notes are flying out. The girl is looking up at the flying musical notes. 
Panel 3:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is seen closing his eyes and activating his superpower of superspeed while a bright aura appears around his body, making the rest of the room less visible. 

Panel 4:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img has a super power of superspeed and is moving towards the stage. His movements are becoming faster. The background shows the colorful lights getting brighter, and more musical notes start appearing around him. 

Panel 5:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is running in the same setting. We see white streak lines trailing behind him like he is running at a superfast speed. Now we can see a lot of musical notes around him. Some of the notes are colored yellow while others are grey. We see the girl running and touching one of the flying musical notes. 

Panel 6:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing near the Eiffel tower in Paris. There are white streak lines trailing behind him as if he moved at super speed till the Eiffel tower. The girl is holding a brown cookie. The cookie is round, plain and brown and does not have any choc chip on it.
        
        
        `);
    const [imageUrl, setImageUrl] = useState("https://s.llamagen.ai/a76b63ea-9e3d-41c4-b1a2-727509ed38e1.webp");
    const [artworkId, setArtworkId] = useState("cm23iyz3r0001le03m39ykh8v");
    const [response, setResponse] = useState<{ comicData?: any } | null>(OpenaiArtworkExampleResponse); // Define response type
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (artworkId) {
            // if (response?.status === "PROCESSED") {
            //     setFetching(false);
            //     setLoading(false);
            //     return;
            // }
            getArtwork();
        }
    }, [artworkId]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // Dependency on artworkId

    const startNewTimerForNewComic = () => {
        const id = setInterval(getArtwork, 5000); // Fetch artwork every 5 seconds
        setIntervalId(id);
    }
    
    const createArtwork = async () => {
        const createArtworkParams = { prompt, imageUrl, gender: "female", age: 25 };
        setLoading(true);
        try {
            const res = await fetch('/api/comics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(createArtworkParams),
            });
            const data = await res.json();
            setResponse(data);
            setArtworkId(data.id);
            setFetching(true);
            startNewTimerForNewComic();
        } catch (error) {
            console.error("Error creating artwork:", error);
        } finally {
            setLoading(false);
        }
    };

    const startFetching = () => {
        getArtwork();
    }

    const getArtwork = async () => {
        if (!artworkId) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/comics?artworkId=${artworkId}`);
            const data = await res.json();
            setResponse(data);
            if (data.status === "LOADING") {
                setTimeout(getArtwork, 5000); // Retry fetching artwork after 5 seconds
            } else {
                setFetching(false); // Stop fetching if artwork is ready
                setLoading(false);
                if (intervalId) {
                    clearInterval(intervalId);
                    setIntervalId(null);
                }
            }
        } catch (error) {
            console.error("Error retrieving artwork:", error);
        } 
    };

    const renderComicPanels = () => {
        if (!response||response?.status === 'LOADING') return null;
        return (
               <ComicPanels generation={response}/>
        );
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-600 mb-2">Enter a comic story in the prompt and the main character's avatar image URL.</p>
                    <Textarea
                        placeholder="Prompt (Comic Story)"
                        rows={25}
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    <p className="text-sm text-gray-600 mb-2">Create a comic book, wait for a few minutes, and you will receive a comic book based on the image URL and prompt.</p>
                    <Button
                        onClick={createArtwork}
                        className="bg-blue-600 text-white rounded-lg p-2 mb-2 hover:bg-blue-700 transition duration-200"
                    >
                        Create Comic Book
                    </Button>
                    <Input
                        type="text"
                        placeholder="Artwork ID"
                        value={artworkId}
                        onChange={e => setArtworkId(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        onClick={startFetching}
                        className="bg-green-600 text-white rounded-lg p-2 mb-2 hover:bg-green-700 transition duration-200"
                    >
                        Get Comic Book
                    </Button>
                </div>
                <div>
                    {loading && <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-lg font-bold font-comic text-blue-600">
                            Creating Comic...
                        </p>
                        <p className="text-sm font-comic text-gray-600 mt-2">
                            This might take a few moments
                        </p>
                    </div>}
                    {!loading && renderComicPanels()}
                </div>

            </div>

        </>

    );
};

export default DigitalCampaign;