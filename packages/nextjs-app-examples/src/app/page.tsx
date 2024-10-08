import Link from 'next/link';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Webtoon Examples',
  description: 'Explore examples of webtoons built with LlamaGen.Ai OPENAI',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">OPEN-SOURCE EXAMPLES</h1>
        <p className="text-xl mb-6">Built with LlamaGen.Ai OPENAI</p>
        <Link href="/examples" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          View Examples
        </Link>
      </main>
    </div>
  );
}