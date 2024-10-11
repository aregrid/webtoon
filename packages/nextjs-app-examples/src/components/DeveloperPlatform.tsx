"use client"
import { CodeBlock } from "@/components/CodeBlock";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Component() {


  const curlCommand = `curl -X POST 'https://api.llamagen.ai/v1/comics/generations' \\
-H 'Content-Type: application/json' \\
-H 'Authorization: Bearer $LLAMAGENAI_API_KEY' \\
-d '{
  "model": "cyani-model",
  "prompt": " A kid standing with hands , he is standing in Paris near the Eiffel tower. He is ready for his mission ",
  "size": "1024x1024"
}'`


  return (
    <Card className="border-none">
      <CardHeader className="flex  flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Developer quickstart</CardTitle>
        <div className="text-gray-600 flex items-center">
          <a href="https://llamagen.ai/openapi?_callback=startFreeTrial" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Generate $LLAMAGENAI_API_KEY
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 mb-4">
          Set up your environment and make your first API request in minutes
        </CardDescription>
        <CodeBlock language="bash" code={curlCommand} title="curl" />
      </CardContent>
    </Card>
  )
}