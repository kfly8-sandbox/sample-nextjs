import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Next.js RSC Payload Example</h1>
      <div className="space-y-4">
        <Link 
          href="/slides"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Slides →
        </Link>
      </div>
    </div>
  )
}