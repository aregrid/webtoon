"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
// import Highlight from 'react-highlight'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    language: string;
    code: string;
    title?: string;
}

export function CodeBlock({ language, code, title }: CodeBlockProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success("Copied to clipboard");
    }

    return (
        <Card className="bg-white border border-gray-200">
            <CardHeader className="flex items-center px-4 py-0 h-12 rounded-t-md  border-gray-400 bg-gray-100">
                <div className="w-full flex flex-row items-center justify-between">
                    <span className="text-gray-600">{title || language}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy code</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <SyntaxHighlighter
                    language={language}
                    style={vs}
                    showLineNumbers={true}
                    customStyle={{
                        backgroundColor: 'white',
                        margin: 0,
                        fontSize: '12px'
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </CardContent>
        </Card>
    )
}