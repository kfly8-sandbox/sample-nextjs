import { Suspense } from 'react'
import SlideViewer from './SlideViewer'
import { getSlide } from './slide-server-action'
import SlideServerComponent from './SlideServerComponent'

export default async function SlidesPage({
  searchParams,
}: {
  searchParams: Promise<{ slide?: string }>
}) {
  const params = await searchParams
  const slideNumber = Number(params.slide) || 1

  // Get initial data for SSR
  const initialData = await getSlide(slideNumber)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        RSC Payload Direct Loading Example
      </h1>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-96">
            <div className="text-lg text-gray-500">Loading slide...</div>
          </div>
        }
      >
        {/* Initial Server-Side Render */}
        <div className="hidden">
          <SlideServerComponent data={initialData} />
        </div>

        {/* Client Component with RSC Payload Loading */}
        <SlideViewer initialSlide={slideNumber} />
      </Suspense>
    </div>
  )
}
