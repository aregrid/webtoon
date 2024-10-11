import DeveloperPlatform from "@/components/DeveloperPlatform"
import HomeComicPanels from "@/components/HomeComicPanels"
export default function Page() {
    return <div className="bg-white text-gray-800 p-8">
        <h1 className="text-3xl font-bold mb-8">LlamaGen.AI developer platform</h1>

        <div className="space-y-8">
            <DeveloperPlatform />

            <HomeComicPanels />
        </div>
    </div>
}