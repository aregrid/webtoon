"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { generation } from "@/components/HomeComicPanels"
import { CodeBlock } from "@/components/CodeBlock"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Component() {

  const curlCommand = `curl -X GET 'https://api.llamagen.ai/v1/comics/generations/cm23iyz3r0001le03m39ykh8v' \\
-H 'Authorization: Bearer $LLAMAGENAI_API_KEY'`

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Developer quickstart</CardTitle>
        <CardDescription className="text-gray-600">
          Retrieve a previously generated comic
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CodeBlock language="bash" code={curlCommand} title="curl" />
             
          <CodeBlock language="json" code={JSON.stringify(generation, null, 2)} title="json" />
      </CardContent>
    </Card>
  )
}