import { Suspense } from 'react'
import SlideServerComponent from './SlideServerComponent'
import SlideNavigation from './SlideNavigation'
import { getSlide } from './slide-server-action'

export default async function SlidesPage({
  searchParams,
}: {
  searchParams: Promise<{ slide?: string }>
}) {
  const params = await searchParams
  const slideNumber = Number(params.slide) || 1

  // Get slide data
  const data = await getSlide(slideNumber)

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
        {/* Server Component renders the slide */}
        <SlideServerComponent data={data} />

        {/* Simple navigation with Link */}
        <SlideNavigation
          currentSlide={data.currentSlide}
          totalSlides={data.totalSlides}
        />
      </Suspense>
    </div>
  )
}
