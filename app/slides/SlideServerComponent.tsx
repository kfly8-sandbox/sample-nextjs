import { SlideData } from './slide-server-action'
import { renderMarkdown } from './markdown-renderer'

interface SlideServerComponentProps {
  data: SlideData
}

export default function SlideServerComponent({ data }: SlideServerComponentProps) {
  const { slide, currentSlide, totalSlides } = data
  
  // Render Markdown to HTML on the server
  const htmlContent = renderMarkdown(slide.content)
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Slide Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{slide.title}</h1>
          
          {/* Rendered Markdown Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 
              prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4
              prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-6
              prose-h3:text-lg prose-h3:font-medium prose-h3:mb-2 prose-h3:mt-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:mb-4 prose-li:mb-1
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-table:min-w-full prose-table:border-collapse
              prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Slide {currentSlide} of {totalSlides}</span>
              <span className="text-xs">
                Server Rendered: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}