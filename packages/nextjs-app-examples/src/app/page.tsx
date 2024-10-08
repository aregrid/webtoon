import Link from "next/link";
export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">OPEN-SOURCE EXAMPLES</h1>
        <p className="text-xl mb-6 text-gray-300">Built with LlamaGen.Ai OPENAI</p>
        <Link 
          href="/examples" 
          className={`
            font-semibold py-2 px-4 rounded-lg transition duration-300 
            bg-blue-600 hover:bg-blue-700 text-white
            }
          `}
        >
          View Examples
        </Link>
      </main>
    </div>
  );
}