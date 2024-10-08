import Link from 'next/link';

interface Example {
  id: string;
  title: string;
  description: string;
}

const examples: Example[] = [
  {
    id: 'digital-campaign',
    title: 'Digital Campaign',
    description: 'A simple DigitalCampaign.',
  },
  // Add more examples as needed
];

export default function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Examples</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <Link
            key={example.id}
            href={`/examples/${example.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{example.title}</h2>
            <p className="text-gray-600">{example.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}