import { marked } from 'marked'

// Configure marked with some basic options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks
})

export function renderMarkdown(content: string): string {
  return marked.parse(content) as string
}