"use client"
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, Settings, FileText, Share2, Plus, Trash } from 'lucide-react'
import { OpenaiArtworkExampleResponse } from "../../docs/OpenaiArtworkExampleResponse"

const Storyboard = () => {
    const [scenes, setScenes] = useState([{ description: '', imageUrl: '' }]);
    const [storyboardStyle, setStoryboardStyle] = useState('CINEMATIC')
    const [gridLayout, setGridLayout] = useState('GRID 1')
    const [showCaptions, setShowCaptions] = useState(true)
    const [showBubbles, setShowBubbles] = useState(true)
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<{ comicData?: any } | null>(OpenaiArtworkExampleResponse);
    const [loading, setLoading] = useState(false);
    const [artworkId, setArtworkId] = useState("cm23ks87r0001l803oiv3x1h8");

    useEffect(() => {
        if (artworkId) {
            getArtwork(artworkId);
        }
    }, [artworkId]);

    const addScene = () => {
        setScenes([...scenes, { description: '', imageUrl: '' }]);
    };

    const removeScene = (index: number) => {
        const newScenes = scenes.filter((_, i) => i !== index);
        setScenes(newScenes);
    };

    const updateScene = (index: number, field: 'description' | 'imageUrl', value: string) => {
        const newScenes = [...scenes];
        newScenes[index][field] = value;
        setScenes(newScenes);
    };

    const createArtwork = async () => {
        setLoading(true);
        const createArtworkParams = { prompt, imageUrl: '', gender: "female", age: 25 };
        try {
            const res = await fetch('/api/comics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(createArtworkParams),
            });
            const data = await res.json();
            setResponse(data);
            setArtworkId(data.id);
        } catch (error) {
            console.error("Error creating artwork:", error);
        }
    };

    const getArtwork = async (artworkId: string) => {
        if (!artworkId) return;
        try {
            const res = await fetch(`/api/comics?artworkId=${artworkId}`);
            const data = await res.json();
            setResponse(data);
            if (data.status === "PROCESSED") {
                setLoading(false);
                updateScenesWithComicData(data.comics[0].panels);
            } else {
                setTimeout(() => getArtwork(artworkId), 5000);
            }
        } catch (error) {
            console.error("Error retrieving artwork:", error);
        }
    };

    const updateScenesWithComicData = (panels: any[]) => {
        const newScenes = panels.map((panel, index) => ({
            description: `Panel ${index + 1}`,
            imageUrl: panel.assetUrl || '',
        }));
        setScenes(newScenes);
    };

    useEffect(()=>{
        getArtwork(artworkId);
    },[])

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Select
                            value={storyboardStyle}
                            onValueChange={setStoryboardStyle}
                            options={[
                                { label: 'CINEMATIC', value: 'CINEMATIC' },
                                { label: 'ANIMATED', value: 'ANIMATED' },
                                { label: 'COMIC', value: 'COMIC' },
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
                        <Button onClick={createArtwork} disabled={loading}>
                            {loading ? 'Generating...' : 'Generate Comic'}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scenes.map((scene, index) => (
                        <Card key={index} className="p-4">
                            <div className="aspect-video mb-4 bg-gray-200 flex items-center justify-center">
                                {scene.imageUrl ? (
                                    <img src={scene.imageUrl} alt={`Scene ${index + 1}`} className="w-full h-full object-cover" />
                                ) : (
                                    <p className="text-gray-500">No image generated</p>
                                )}
                            </div>
                            <Textarea
                                value={scene.description}
                                onChange={(e) => updateScene(index, 'description', e.target.value)}
                                placeholder={`Describe scene ${index + 1}...`}
                                className="mb-2"
                            />
                            <Button variant="destructive" onClick={() => removeScene(index)}>
                                <Trash className="w-4 h-4 mr-2" />
                                Remove Scene
                            </Button>
                        </Card>
                    ))}
                </div>
            </main>

            <footer className="bg-white shadow-sm mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline">ABOUT</Button>
                        <Button variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            DISCORD
                        </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            SETTINGS
                        </Button>
                        <Button variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            EXPORT
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

export default Storyboard;