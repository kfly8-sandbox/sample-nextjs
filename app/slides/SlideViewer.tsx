'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { getSlideRSC } from './slide-server-action'

interface SlideViewerProps {
  initialSlide: number
}

export default function SlideViewer({ initialSlide }: SlideViewerProps) {
  const [slideContent, setSlideContent] = useState<React.ReactNode | null>(null)
  const [currentSlide, setCurrentSlide] = useState(initialSlide)
  const [totalSlides, setTotalSlides] = useState(20)
  const [isPending, startTransition] = useTransition()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Load slide using RSC Payload
  const loadSlide = async (slideNumber: number) => {
    startTransition(async () => {
      try {
        // Direct server action call - returns RSC Payload
        const result = await getSlideRSC(slideNumber)
        
        setSlideContent(result.component)
        setTotalSlides(result.totalSlides)
        setCurrentSlide(result.currentSlide)
        setIsInitialLoad(false)
        
        // Update URL without page reload
        const url = new URL(window.location.href)
        url.searchParams.set('slide', slideNumber.toString())
        window.history.pushState({}, '', url)
      } catch (error) {
        console.error('Error loading RSC Payload:', error)
      }
    })
  }

  // Initial load - use useEffect to avoid server-side execution
  useEffect(() => {
    if (isInitialLoad) {
      loadSlide(currentSlide)
    }
  }, [])

  const handleSlideChange = (slideNumber: number) => {
    if (slideNumber < 1 || slideNumber > totalSlides) return
    loadSlide(slideNumber)
  }

  return (
    <div className="space-y-6">
      {/* Loading indicator */}
      {isPending && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-10">
          Loading...
        </div>
      )}

      {/* Slide Content (RSC Payload) */}
      <div className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {slideContent || (
          <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Loading slide...</p>
          </div>
        )}
      </div>

      {/* Simple Navigation Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleSlideChange(currentSlide - 1)}
          disabled={currentSlide === 1 || isPending}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-600"
        >
          ← Previous
        </button>

        <span className="text-lg font-medium">
          {currentSlide} / {totalSlides}
        </span>

        <button
          onClick={() => handleSlideChange(currentSlide + 1)}
          disabled={currentSlide === totalSlides || isPending}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-600"
        >
          Next →
        </button>
      </div>
    </div>
  )
}