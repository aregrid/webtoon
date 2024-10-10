


"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
    const [response, setResponse] = useState<{ comicData?: any } | null>(OpenaiArtworkExampleResponse);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [comicStyle, setComicStyle] = useState('AMERICAN (1950)')
    const [gridLayout, setGridLayout] = useState('GRID 1')
    const [showCaptions, setShowCaptions] = useState(true)
    const [showBubbles, setShowBubbles] = useState(true)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [color, setColor] = useState("#000000")
    const [isDrawing, setIsDrawing] = useState(false)
    const [text, setText] = useState("")
    const [selectedPanel, setSelectedPanel] = useState<number | null>(null)

    useEffect(() => {
        if (artworkId) {
            getArtwork(artworkId);
        }
    }, [artworkId]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startNewTimerForNewComic = (artworkId: string) => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        const id = setInterval(()=>{
            getArtwork(artworkId);
        }, 5000);
        setIntervalId(id);
    }

    const createArtwork = async () => {
        const createArtworkParams = { prompt, imageUrl, gender: "female", age: 25 };
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
            startNewTimerForNewComic(data.id);
            setLoading(true);
        } catch (error) {
            console.error("Error creating artwork:", error);
        }
    };

    const startFetching = (artworkId: string) => {
        getArtwork(artworkId);
    }

    const getArtwork = async (artworkId: string) => {
        if (!artworkId) return;
        try {
            const res = await fetch(`/api/comics?artworkId=${artworkId}`);
            const data = await res.json();
            setResponse(data);
            if (data.status === "LOADING") {
                setTimeout(()=>{
                    getArtwork(artworkId);
                }, 5000);
            } else {
                setFetching(false);
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

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.lineJoin = "round"
                ctx.lineCap = "round"
                ctx.lineWidth = 5
            }
        }
    }, [selectedPanel])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
        draw(e)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (ctx && canvas) {
            ctx.strokeStyle = color
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
    }

    const addTextBubble = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (ctx && canvas) {
            ctx.font = "20px Comic Sans MS"
            ctx.fillStyle = "white"
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            const textWidth = ctx.measureText(text).width
            const x = canvas.width / 2 - textWidth / 2
            const y = canvas.height / 2
            ctx.fillRect(x - 10, y - 30, textWidth + 20, 40)
            ctx.strokeRect(x - 10, y - 30, textWidth + 20, 40)
            ctx.fillStyle = "black"
            ctx.fillText(text, x, y)
        }
        setText("")
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    const saveComic = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const dataUrl = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.download = "my-comic.png"
            link.href = dataUrl
            link.click()
        }
    }

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
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {response?.comics && response.comics[0].panels.map((panel: any, index: number) => (
                            <Card 
                                key={index} 
                                className="overflow-hidden border-4 border-black dark:border-white cursor-pointer"
                                onClick={() => setSelectedPanel(index)}
                            >
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
                )}

                {selectedPanel !== null && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-purple-600">Edit Panel {selectedPanel + 1}</h2>
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={400}
                            onMouseDown={startDrawing}
                            onMouseUp={stopDrawing}
                            onMouseOut={stopDrawing}
                            onMouseMove={draw}
                            className="border-2 border-gray-300 rounded-lg mb-4"
                        />
                        <div className="flex space-x-4 mb-4">
                            <div>
                                <Label htmlFor="color-picker">Color:</Label>
                                <Input
                                    id="color-picker"
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-16 h-8"
                                />
                            </div>
                            <div className="flex-grow">
                                <Label htmlFor="text-input">Text Bubble:</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="text-input"
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Enter text for bubble"
                                        className="flex-grow"
                                    />
                                    <Button onClick={addTextBubble} className="bg-green-500 hover:bg-green-600">
                                        Add Bubble
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={clearCanvas} variant="outline" className="border-red-500 text-red-500">
                                Clear Canvas
                            </Button>
                            <Button onClick={saveComic} className="bg-blue-500 hover:bg-blue-600">
                                Save Panel
                            </Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};


export default AIComicFactory;