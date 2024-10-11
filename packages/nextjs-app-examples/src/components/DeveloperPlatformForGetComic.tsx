"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { generation } from "@/components/HomeComicPanels"
export default function Component() {
  const handleCopyGeneration = () => {
    navigator.clipboard.writeText(JSON.stringify(generation, null, 2));
    toast.success("Copied to clipboard");
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    toast.success("Copied to clipboard");
  }
  const curlCommand = `curl -X GET 'https://api.llamagen.ai/v1/comics/generations/cm23iyz3r0001le03m39ykh8v' \\
-H 'Authorization: Bearer $LLAMAGENAI_API_KEY'`

  return (

    <div className="bg-gray-100 rounded-lg p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Developer quickstart</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Set up your environment and make your first API request in minutes
      </p>
      <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4 relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">curl</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <pre className="text-sm overflow-x-auto">
          <code>{curlCommand}</code>
        </pre>

      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">curl</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyGeneration}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <pre className="text-sm overflow-x-auto">
          <code>{JSON.stringify(generation, null, 2)}</code>
        </pre>
      </div>
      </div>


    </div>
  )
}