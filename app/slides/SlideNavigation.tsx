import Link from 'next/link'

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
}

export default function SlideNavigation({ currentSlide, totalSlides }: SlideNavigationProps) {
  const prevSlide = currentSlide - 1
  const nextSlide = currentSlide + 1

  return (
    <div className="flex justify-between items-center mt-6">
      {currentSlide > 1 ? (
        <Link
          href={`/slides?slide=${prevSlide}`}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-600"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
          ← Previous
        </span>
      )}

      {currentSlide < totalSlides ? (
        <Link
          href={`/slides?slide=${nextSlide}`}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-600"
        >
          Next →
        </Link>
      ) : (
        <span className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
          Next →
        </span>
      )}

    </div>
  )
}
