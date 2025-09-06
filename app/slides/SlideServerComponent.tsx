import { SlideData } from './slide-server-action'

interface SlideServerComponentProps {
  data: SlideData
}

export default function SlideServerComponent({ data }: SlideServerComponentProps) {
  const { slide, currentSlide, totalSlides } = data
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Slide Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
          <p className="text-lg text-gray-700">{slide.content}</p>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Slide {currentSlide} of {totalSlides}</span>
              <span className="text-xs">
                Server Rendered: {new Date().toISOString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* RSC Payload Indicator */}
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
        ✓ This content was streamed as RSC Payload from the server
      </div>
    </div>
  )
}