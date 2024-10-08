import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Code, MessageSquare, PenTool, Activity, Users, FileText, Bell, Briefcase, Type, Layout } from "lucide-react"

interface Example {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  tags?: string[];
  tag?: string;
}

const examples: Example[] = [
  {
    id: 'digital-campaign',
    title: 'Digital Campaign',
    description: 'An advanced issue tracking system',
    tag: 'Advanced',
  },
];

const categories = [
  { name: "All technologies", icon: Code },
  { name: "All examples", icon: Layout, active: true },
  { name: "AI", icon: Activity },
  { name: "Avatar stack", icon: Users },
  { name: "Code editor", icon: Code },
  { name: "Comments", icon: MessageSquare },
  { name: "Creative tool", icon: PenTool },
  { name: "Cursors", icon: PenTool },
  { name: "Forms", icon: FileText },
  { name: "Notifications", icon: Bell },
  { name: "Productivity", icon: Briefcase },
  { name: "Text editor", icon: Type },
  { name: "Whiteboard", icon: Layout },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example) => (
            <Link href={`/examples/${example.id}`} className="block">
              <Card key={example.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle>{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gray-800 rounded-md"></div>
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
                    <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">{example.tag}</span>
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