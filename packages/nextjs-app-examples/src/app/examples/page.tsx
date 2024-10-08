import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Code, MessageSquare, PenTool, Activity, Users, FileText, Bell, Briefcase, Type, Layout, Music, Video, Film, Mic, Zap, Scissors, Home, Gamepad, Book, Box, Shirt } from "lucide-react"
import Image from "next/image"
interface Example {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  tags?: string[];
  tag?: string;
  image?: string;
}

const examples: Example[] = [
  {
    id: 'digital-campaign',
    title: 'Digital Campaign',
    description: 'An advanced issue tracking system',
    tag: 'Advanced',
    image:"https://s.llamagen.ai/cm1599ue4000bkz031sim37t0-0.webp"
  },
];

const categories = [
  { name: "All AI Comic Use Cases", icon: Layout, active: true },
  { name: "Digital Campaign", icon: Activity },
  { name: "Storytelling", icon: FileText },
  { name: "Character Creation", icon: Users },
  { name: "Scene Generation", icon: PenTool },
  { name: "Storyboarding", icon: Layout },
  { name: "Comic Strip Generator", icon: Type },
  { name: "Dialogue Writing", icon: MessageSquare },
  { name: "Art Style Transfer", icon: PenTool },
  { name: "Comic Book Editor", icon: Code },
  { name: "Manga Creator", icon: PenTool },
  { name: "Webcomic Platform", icon: Layout },
  { name: "Educational Comics", icon: Briefcase },
  { name: "Marketing Comics", icon: Bell },
  { name: "Personalized Comics", icon: Users },
  { name: "Music Composition", icon: Music },
  { name: "Video Editing", icon: Video },
  { name: "Short Drama Scripting", icon: FileText },
  { name: "Movie Concept Generation", icon: Film },
  { name: "Visual Effects Ideas", icon: Zap },
  { name: "Costume Design", icon: Scissors },
  { name: "Set Design Concepts", icon: Home },
  { name: "Trailer Creation", icon: Film },
  { name: "Game Development", icon: Gamepad },
  { name: "Book Cover Design", icon: Book },
  { name: "Poster Design", icon: Image },
  { name: "Advertisement Design", icon: Film },
  { name: "Branding", icon: PenTool },
  { name: "Product Packaging", icon: Box },
  { name: "Fashion Design", icon: Shirt },
  
];

export default function ExamplesPage() {
  return (
    <div className="flex h-screen  text-white">
      <aside className="w-64 p-4 border-r border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">All technologies</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.active ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Built with LlamaGen.Ai OPENAPI</h1>
        <p className="text-xl text-center mb-12 text-gray-400">OPEN-SOURCE EXAMPLES</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Link href={`/examples/${example.id}`} className="block">
              <Card key={example.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle>{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72 bg-gray-800 rounded-md">
                  {example.image && <Image src={example.image} width={512} height={512} alt={example.title} className="w-full h-full object-cover" />}
                  </div>
                  <p className="text-gray-400 mt-2">{example.description}</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-2">
                    {example.icon && <example.icon className="w-4 h-4" />}
                    {example.tags && example.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-800 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  {example.tag && (
                    <span className="text-xsn bg-purple-900 text-purple-300 px-2 py-1 rounded">{example.tag}</span>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}