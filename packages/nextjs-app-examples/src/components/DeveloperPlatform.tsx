"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function Component() {
  const handleCopy  = ()=>{
    navigator.clipboard.writeText(curlCommand);
    toast.success("Copied to clipboard");
  }
  const curlCommand = `curl -X POST 'https://api.llamagen.ai/v1/comics/generations' \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer $LLAMAGENAI_API_KEY' \\
-d '{
  "model": "cyani-model",
  "prompt": " A kid standing with hands , he is standing in Paris near the Eiffel tower. He is ready for his mission ",
  "size": "1024x1024"
}'`

  return (
  
      <div className="bg-gray-100 rounded-lg p-6 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Developer quickstart</h2>
          <div className="text-gray-600 flex items-center">
            <a href="https://llamagen.ai/openapi?_callback=startFreeTrial" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Generate $LLAMAGENAI_API_KEY
            </a>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          Set up your environment and make your first API request in minutes
        </p>
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
      </div>
  )
}