'use server'

import React from 'react'
import SlideServerComponent from './SlideServerComponent'

export interface Slide {
  id: number
  title: string
  content: string
  imageUrl: string
}

export interface SlideData {
  slide: Slide
  totalSlides: number
  currentSlide: number
}

// Mock database with placehold.co images
const mockSlides: Slide[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Slide ${i + 1}`,
  content: `This is the content for slide ${i + 1}. It demonstrates RSC Payload streaming and direct loading without API endpoints.`,
  imageUrl: `https://placehold.co/800x400/4A90E2/FFFFFF?text=Slide+${i + 1}`,
}))

export async function getSlide(slideNumber: number = 1): Promise<SlideData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const slide = mockSlides[slideNumber - 1] || mockSlides[0]
  
  return {
    slide,
    totalSlides: mockSlides.length,
    currentSlide: slideNumber,
  }
}

export async function getSlideRSC(slideNumber: number) {
  const data = await getSlide(slideNumber)
  
  // Return Server Component as RSC Payload
  return {
    component: <SlideServerComponent data={data} />,
    totalSlides: data.totalSlides,
    currentSlide: data.currentSlide,
  }
}