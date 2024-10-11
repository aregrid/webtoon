import ComicPanels from "./ComicPanels";

export default function HomeComicPanels() {
    const generation = {
        "id": "cm23iyz3r0001le03m39ykh8v",
        "status": "PROCESSED",
        "prompt": "An american female girl,she is a singer named Tailer travel in France\n        Panel 1:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing in Paris near the Eiffel tower. He is ready for his mission \n\nPanel 2:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing in a large empty room like a disco. The room has a stage with colorful lights around. There is a speaker in one corner from where musical notes are flying out. The girl is looking up at the flying musical notes. \nPanel 3:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is seen closing his eyes and activating his superpower of superspeed while a bright aura appears around his body, making the rest of the room less visible. \n\nPanel 4:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img has a super power of superspeed and is moving towards the stage. His movements are becoming faster. The background shows the colorful lights getting brighter, and more musical notes start appearing around him. \n\nPanel 5:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is running in the same setting. We see white streak lines trailing behind him like he is running at a superfast speed. Now we can see a lot of musical notes around him. Some of the notes are colored yellow while others are grey. We see the girl running and touching one of the flying musical notes. \n\nPanel 6:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing near the Eiffel tower in Paris. There are white streak lines trailing behind him as if he moved at super speed till the Eiffel tower. The girl is holding a brown cookie. The cookie is round, plain and brown and does not have any choc chip on it.\n        \n        \n        ",
        "comics": [
            {
                "page": 0,
                "prompt": "An american female girl,she is a singer named Tailer travel in France\n        Panel 1:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing in Paris near the Eiffel tower. He is ready for his mission \n\nPanel 2:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing in a large empty room like a disco. The room has a stage with colorful lights around. There is a speaker in one corner from where musical notes are flying out. The girl is looking up at the flying musical notes. \nPanel 3:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is seen closing his eyes and activating his superpower of superspeed while a bright aura appears around his body, making the rest of the room less visible. \n\nPanel 4:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img has a super power of superspeed and is moving towards the stage. His movements are becoming faster. The background shows the colorful lights getting brighter, and more musical notes start appearing around him. \n\nPanel 5:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is running in the same setting. We see white streak lines trailing behind him like he is running at a superfast speed. Now we can see a lot of musical notes around him. Some of the notes are colored yellow while others are grey. We see the girl running and touching one of the flying musical notes. \n\nPanel 6:Tailer(((dressed in white casual t-shirt and jeans)), bodyType slim, Determined, Standing with hands on hips) img is standing near the Eiffel tower in Paris. There are white streak lines trailing behind him as if he moved at super speed till the Eiffel tower. The girl is holding a brown cookie. The cookie is round, plain and brown and does not have any choc chip on it.\n        \n        \n        ",
                "layout": "Layout0",
                "panels": [
                    {
                        "assetUrl": "https://s.llamagen.ai/08386e26-2753-443b-b96b-ee62e3075161.webp",
                        "panel": 0,
                        "caption": "Tailer stood before the Eiffel Tower, a girl with a mission."
                    },
                    {
                        "assetUrl": "https://s.llamagen.ai/d85d5c20-462c-46a9-9030-648313de1384.webp",
                        "panel": 1,
                        "caption": "Inside an empty disco, music notes beckoned."
                    },
                    {
                        "assetUrl": "https://s.llamagen.ai/c72fff1d-04c8-40fd-8921-82ce73c26163.webp",
                        "panel": 2,
                        "caption": "With a deep breath, her superpower surged forth."
                    },
                    {
                        "assetUrl": "https://s.llamagen.ai/69ff3fff-9992-4daf-b85b-f23b0303c6b2.webp",
                        "panel": 3,
                        "caption": "Swift as the wind, she headed for the stage."
                    },
                    {
                        "assetUrl": "https://s.llamagen.ai/7be4e9f4-592f-40ff-9ea3-63169ccec765.webp",
                        "panel": 4,
                        "caption": "Notes flared around her as she ran."
                    },
                    {
                        "assetUrl": "https://s.llamagen.ai/cefd4786-c404-47b7-8aeb-f6b0af485c7b.webp",
                        "panel": 5,
                        "caption": "Back to the Eiffel Tower, a mystery in hand."
                    }
                ]
            }
        ]
    }
    return (

        <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Create your own comics</h2>

            </div>
            <p className="text-gray-600 mb-4">
                Generate your own comics with our easy to use API
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-4 relative">
                <ComicPanels generation={generation} />
            </div>
        </div>

    )


}