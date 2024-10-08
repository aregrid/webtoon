import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Webtoon Examples',
    description: 'Explore examples of webtoons built with LlamaGen.Ai OPENAI',
};
import DigitalCampaign from "@/components/examples/DigitalCampaign"

const formatSlug = (slug: string) => {
    return slug.replace(/-/g, ' ').toUpperCase();
}
export default function ExamplesPage({
    params
}: {
    params: { slug: string }
}) {
    const { slug } = params;
    return (
        <div className="container mx-auto px-4 py-8 space-y-4">
            <nav className="text-sm mb-4">
                <Link href="/examples" className="text-blue-600 hover:underline">Examples</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-600">{formatSlug(slug)}</span>
            </nav>
            
            <h1 className='text-2xl font-bold'>{formatSlug(slug)}</h1>
           {slug === 'digital-campaign' && <DigitalCampaign />}
        </div>
    );
}