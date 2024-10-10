"use client"
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, Settings, FileText, Share2 } from 'lucide-react'
import { OpenaiArtworkExampleResponse } from "../../docs/OpenaiArtworkExampleResponse"

const AIComicFactory = () => {
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
    const [comicStyle, setComicStyle] = useState('AMERICAN (1950)')
    const [gridLayout, setGridLayout] = useState('GRID 1')
    const [showCaptions, setShowCaptions] = useState(true)
    const [showBubbles, setShowBubbles] = useState(true)

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {response.comics && response.comics[0].panels.map((panel: any, index: any) => (
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Select
                            value={comicStyle}
                            onValueChange={setComicStyle}
                            options={[
                                { label: 'AMERICAN (1950)', value: 'AMERICAN (1950)' },
                                { label: 'MANGA', value: 'MANGA' },
                                { label: 'EUROPEAN', value: 'EUROPEAN' },
                            ]}
                        />
                        <Select
                            value={gridLayout}
                            onValueChange={setGridLayout}
                            options={[
                                { label: 'GRID 1', value: 'GRID 1' },
                                { label: 'GRID 2', value: 'GRID 2' },
                                { label: 'GRID 3', value: 'GRID 3' },
                            ]}
                        />
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={showCaptions}
                                onCheckedChange={setShowCaptions}
                                id="captions-toggle"
                            />
                            <label htmlFor="captions-toggle">CAPTIONS</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={showBubbles}
                                onCheckedChange={setShowBubbles}
                                id="bubbles-toggle"
                            />
                            <label htmlFor="bubbles-toggle">BUBBLES</label>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter comic description..."
                            className="w-96"
                        />
                        <Button onClick={createArtwork}>GO</Button>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-lg font-bold font-comic text-blue-600 dark:text-blue-400">
                            Creating Comic...
                        </p>
                        <p className="text-sm font-comic text-gray-600 dark:text-gray-400 mt-2">
                            This might take a few moments
                        </p>
                    </div>
                ) : (
                    renderComicPanels()
                )}
            </main>

            <footer className="bg-white shadow-sm mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline">ABOUT</Button>
                        <Button variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            DISCORD
                        </Button>
                        <Button>MAKE AI STORIES</Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            SETTINGS
                        </Button>
                        <Button variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            GET PDF
                        </Button>
                        <Button variant="outline">
                            <Share2 className="w-4 h-4 mr-2" />
                            SHARE
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AIComicFactory;