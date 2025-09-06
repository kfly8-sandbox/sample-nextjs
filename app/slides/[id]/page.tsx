import { Suspense } from 'react'
import SlideServerComponent from '../SlideServerComponent'
import SlideNavigation from '../SlideNavigation'
import { getSlide } from '../slide-server-action'

export default async function SlidePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const slideNumber = Number(id) || 1

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