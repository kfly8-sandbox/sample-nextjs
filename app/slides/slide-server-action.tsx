'use server'

import React from 'react'
import SlideServerComponent from './SlideServerComponent'

export interface Slide {
  id: number
  title: string
  content: string
}

export interface SlideData {
  slide: Slide
  totalSlides: number
  currentSlide: number
}

// Mock slides with Markdown content
const mockSlides: Slide[] = [
  {
    id: 1,
    title: 'RSC Payload Introduction',
    content: `
# React Server Components (RSC) Payload

RSC Payload is a **serialized format** that React uses to transfer server-rendered components to the client.

## Key Features
- Streaming capabilities
- Efficient data transfer
- Preserves component structure

\`\`\`javascript
// Example of RSC usage
const Component = await getServerComponent()
\`\`\`
    `
  },
  {
    id: 2,
    title: 'Benefits of RSC',
    content: `
# Benefits of React Server Components

## Performance Improvements
1. **Smaller Bundle Size** - Components stay on server
2. **Faster Initial Load** - HTML streamed to client
3. **Better SEO** - Server-side rendering by default

## Developer Experience
- Direct database access
- Secure API keys on server
- Simplified data fetching

> "RSC represents a paradigm shift in how we think about React applications"
    `
  },
  {
    id: 3,
    title: 'RSC Payload Format',
    content: `
# Understanding RSC Payload Format

The RSC Payload uses a **special serialization format**:

## Structure
\`\`\`json
{
  "type": "component",
  "props": {...},
  "children": [...]
}
\`\`\`

## Features
- **Streaming Support** - Data arrives progressively
- **Deduplication** - Shared references preserved
- **Type Safety** - Component types maintained

### Example Flow
1. Server renders component
2. Serializes to RSC format
3. Streams to client
4. Client reconstructs component tree
    `
  },
  {
    id: 4,
    title: 'Next.js Integration',
    content: `
# Next.js App Router & RSC

Next.js 13+ provides **first-class support** for RSC:

## Default Server Components
\`\`\`tsx
// app/page.tsx - Server Component by default
export default function Page() {
  return <div>Server Component</div>
}
\`\`\`

## Client Components
\`\`\`tsx
'use client'
// Opt-in to client-side rendering
export default function Interactive() {
  const [count, setCount] = useState(0)
  return <button>Count: {count}</button>
}
\`\`\`

## Benefits in Next.js
- Automatic code splitting
- Built-in streaming
- Seamless hydration
    `
  },
  {
    id: 5,
    title: 'Data Fetching Patterns',
    content: `
# Data Fetching with RSC

## Server-Side Data Access

### Direct Database Queries
\`\`\`typescript
async function getData() {
  const data = await db.query('SELECT * FROM posts')
  return data
}

export default async function Posts() {
  const posts = await getData()
  return <PostList posts={posts} />
}
\`\`\`

## Advantages
- **No API Routes Needed** - Direct data access
- **Type Safety** - End-to-end TypeScript
- **Security** - Sensitive data stays on server
- **Performance** - No client-server roundtrips

### Parallel Data Fetching
\`\`\`typescript
const [user, posts] = await Promise.all([
  getUser(id),
  getUserPosts(id)
])
\`\`\`
    `
  },
  {
    id: 6,
    title: 'Streaming & Suspense',
    content: `
# Streaming with RSC & Suspense

## Progressive Enhancement

### Basic Suspense
\`\`\`tsx
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
\`\`\`

## Streaming Benefits
1. **Faster Time to First Byte (TTFB)**
2. **Progressive page loading**
3. **Better perceived performance**

## Implementation
\`\`\`tsx
export default async function Page() {
  return (
    <>
      <Header /> {/* Renders immediately */}
      <Suspense fallback={<Skeleton />}>
        <SlowData /> {/* Streams when ready */}
      </Suspense>
    </>
  )
}
\`\`\`

### Result
- Immediate page response
- Content streams as it becomes available
- Improved Core Web Vitals
    `
  },
  {
    id: 7,
    title: 'RSC vs Traditional SSR',
    content: `
# RSC vs Traditional SSR

## Traditional SSR
- Renders **entire page** on server
- Sends **complete HTML**
- Hydrates everything on client
- All components ship to client

## React Server Components
- Renders **components** on server
- Sends **RSC Payload**
- Selective hydration
- Server components stay on server

## Comparison Table

| Feature | SSR | RSC |
|---------|-----|-----|
| Bundle Size | Large | Smaller |
| Interactivity | Full hydration | Selective |
| Data Fetching | API calls | Direct access |
| Streaming | Limited | Native |

## When to Use
- **SSR**: SEO-critical pages, static content
- **RSC**: Dynamic apps, data-heavy pages
    `
  },
  {
    id: 8,
    title: 'Caching Strategies',
    content: `
# Caching with RSC

## Next.js Caching Layers

### 1. Request Memoization
\`\`\`typescript
// Same request deduped automatically
const data1 = await fetch('/api/data')
const data2 = await fetch('/api/data') // Cached!
\`\`\`

### 2. Data Cache
\`\`\`typescript
// Persistent across requests
const data = await fetch('/api/data', {
  next: { revalidate: 3600 } // 1 hour
})
\`\`\`

### 3. Full Route Cache
- Static routes cached at build time
- Dynamic routes cached on-demand

## Cache Control
\`\`\`typescript
export const revalidate = 60 // seconds
export const dynamic = 'force-dynamic'
\`\`\`

## Benefits
- **Reduced server load**
- **Faster response times**
- **Cost optimization**
    `
  },
  {
    id: 9,
    title: 'Error Handling',
    content: `
# Error Handling in RSC

## Error Boundaries

### Client-Side Errors
\`\`\`tsx
'use client'
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
\`\`\`

### Server-Side Errors
\`\`\`tsx
// app/error.tsx
export default function Error({
  error,
}: {
  error: Error
}) {
  return <div>Server Error: {error.message}</div>
}
\`\`\`

## Best Practices
1. Use error boundaries at multiple levels
2. Log errors to monitoring service
3. Provide user-friendly messages
4. Implement retry mechanisms
    `
  },
  {
    id: 10,
    title: 'Performance Optimization',
    content: `
# RSC Performance Optimization

## Optimization Techniques

### 1. Component Granularity
\`\`\`tsx
// ❌ Large server component
<ServerComponent>
  <ClientInteraction />
  <MoreServerContent />
</ServerComponent>

// ✅ Better separation
<ServerWrapper>
  <ClientIsland />
</ServerWrapper>
\`\`\`

### 2. Parallel Data Loading
\`\`\`tsx
// Load data in parallel
const [posts, comments, users] = await Promise.all([
  getPosts(),
  getComments(),
  getUsers()
])
\`\`\`

### 3. Streaming Strategy
- Stream critical content first
- Defer non-essential data
- Use multiple Suspense boundaries

## Metrics to Monitor
- **Time to First Byte (TTFB)**
- **First Contentful Paint (FCP)**
- **Total Blocking Time (TBT)**
- **Cumulative Layout Shift (CLS)**
    `
  },
  {
    id: 11,
    title: 'Authentication Patterns',
    content: `
# Authentication with RSC

## Server-Side Auth Check

### Middleware Protection
\`\`\`typescript
// middleware.ts
export async function middleware(request: Request) {
  const session = await getSession(request)

  if (!session) {
    return redirect('/login')
  }
}
\`\`\`

### Component-Level Auth
\`\`\`tsx
export default async function ProtectedPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return <SecureContent user={session.user} />
}
\`\`\`

## Benefits
- **Security** - Auth logic on server only
- **Performance** - No client-side checks
- **Simplicity** - Direct session access

## Session Management
- JWT tokens in httpOnly cookies
- Server-side session validation
- Automatic refresh handling
    `
  },
  {
    id: 12,
    title: 'Testing RSC',
    content: `
# Testing React Server Components

## Testing Strategies

### Unit Testing
\`\`\`typescript
// __tests__/ServerComponent.test.tsx
import { render } from '@testing-library/react'
import ServerComponent from './ServerComponent'

test('renders server content', async () => {
  const component = await ServerComponent({ id: '1' })
  expect(component).toMatchSnapshot()
})
\`\`\`

### Integration Testing
\`\`\`typescript
// Using Playwright
test('page loads with RSC', async ({ page }) => {
  await page.goto('/slides')
  await expect(page.locator('h1')).toBeVisible()
})
\`\`\`

## Mocking Strategies
1. Mock data fetching functions
2. Use test databases
3. Intercept network requests

## Tools
- **Jest** - Unit tests
- **Playwright** - E2E tests
- **MSW** - API mocking
    `
  },
  {
    id: 13,
    title: 'Migration Guide',
    content: `
# Migrating to RSC

## Step-by-Step Migration

### 1. Identify Server Components
- Data fetching components
- Non-interactive UI
- Layout components

### 2. Extract Client Logic
\`\`\`tsx
// Before
export default function Card({ data }) {
  const [expanded, setExpanded] = useState(false)
  return <div>...</div>
}

// After
// CardServer.tsx (Server Component)
export default function CardServer({ data }) {
  return <CardClient data={data} />
}

// CardClient.tsx
'use client'
export default function CardClient({ data }) {
  const [expanded, setExpanded] = useState(false)
  return <div>...</div>
}
\`\`\`

### 3. Update Data Fetching
- Move API calls to server components
- Remove client-side fetching libraries
- Implement streaming where beneficial

## Common Pitfalls
- Overusing client components
- Not leveraging streaming
- Ignoring caching opportunities
    `
  },
  {
    id: 14,
    title: 'Production Deployment',
    content: `
# RSC in Production

## Deployment Considerations

### Infrastructure Requirements
- **Node.js 18+** required
- **Edge Runtime** support beneficial
- **CDN** for static assets

### Optimization Checklist
- [ ] Enable production mode
- [ ] Configure caching headers
- [ ] Set up error monitoring
- [ ] Implement rate limiting
- [ ] Configure CDN

### Environment Variables
\`\`\`bash
# .env.production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
\`\`\`

### Build Optimization
\`\`\`json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
\`\`\`

## Monitoring
- Server response times
- Streaming performance
- Cache hit rates
- Error rates

## Scaling Strategies
1. Horizontal scaling with load balancers
2. Edge deployment for global distribution
3. Database connection pooling
    `
  },
  {
    id: 15,
    title: 'Advanced Patterns',
    content: `
# Advanced RSC Patterns

## Nested Server Components

### Composition Pattern
\`\`\`tsx
// Parent Server Component
export default async function Dashboard() {
  const user = await getUser()

  return (
    <Layout>
      <UserProfile user={user} />
      <Suspense fallback={<Loading />}>
        <UserActivity userId={user.id} />
      </Suspense>
    </Layout>
  )
}

// Child Server Component
async function UserActivity({ userId }) {
  const activity = await getActivity(userId)
  return <ActivityList items={activity} />
}
\`\`\`

## Conditional Rendering
\`\`\`tsx
export default async function ConditionalRSC({ condition }) {
  if (condition) {
    const data = await fetchExpensiveData()
    return <ExpensiveComponent data={data} />
  }

  return <SimpleComponent />
}
\`\`\`

## Server Actions
\`\`\`tsx
async function updateUser(formData: FormData) {
  'use server'
  const name = formData.get('name')
  await db.update({ name })
  revalidatePath('/profile')
}
\`\`\`
    `
  },
  {
    id: 16,
    title: 'RSC Best Practices',
    content: `
# RSC Best Practices

## Do's ✅

### 1. Maximize Server Components
- Keep components on server when possible
- Only use client for interactivity

### 2. Optimize Data Fetching
\`\`\`tsx
// Fetch in parallel
const [a, b, c] = await Promise.all([
  fetchA(), fetchB(), fetchC()
])
\`\`\`

### 3. Use Streaming
- Multiple Suspense boundaries
- Progressive enhancement

### 4. Implement Caching
- Static where possible
- Revalidate strategically

## Don'ts ❌

### 1. Avoid Over-Clientization
\`\`\`tsx
// ❌ Unnecessary client component
'use client'
export default function Static() {
  return <div>Static content</div>
}
\`\`\`

### 2. Don't Block Rendering
- Avoid sequential awaits
- Use streaming for slow data

### 3. Prevent Waterfalls
- Identify and eliminate
- Use parallel fetching

## Code Organization
\`\`\`
app/
  components/
    server/     # Server components
    client/     # Client components
    shared/     # Both
\`\`\`
    `
  },
  {
    id: 17,
    title: 'Debugging RSC',
    content: `
# Debugging React Server Components

## Debug Tools

### 1. React DevTools
- Component tree inspection
- Props examination
- Performance profiling

### 2. Network Tab
- RSC Payload inspection
- Streaming visualization
- Cache behavior

### 3. Console Logging
\`\`\`tsx
export default async function Debug() {
  console.log('Server:', {
    timestamp: Date.now(),
    env: process.env.NODE_ENV
  })

  const data = await fetchData()
  console.log('Data fetched:', data.length)

  return <div>{data}</div>
}
\`\`\`

## Common Issues

### Issue: Hydration Mismatch
**Solution**: Ensure server/client consistency

### Issue: Infinite Loops
**Solution**: Check effect dependencies

### Issue: Slow Streaming
**Solution**: Optimize data fetching

## Debug Environment
\`\`\`bash
# Enable debug mode
DEBUG=* npm run dev
\`\`\`
    `
  },
  {
    id: 18,
    title: 'RSC Security',
    content: `
# Security in React Server Components

## Security Benefits

### 1. Server-Side Secrets
\`\`\`tsx
// API keys stay on server
export default async function SecureComponent() {
  const data = await fetch(url, {
    headers: {
      'API-Key': process.env.SECRET_API_KEY
    }
  })
  return <DisplayData data={data} />
}
\`\`\`

### 2. Input Validation
\`\`\`tsx
'use server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
})

export async function validateInput(data: unknown) {
  const validated = schema.parse(data)
  // Process validated data
}
\`\`\`

### 3. SQL Injection Prevention
\`\`\`tsx
// Use parameterized queries
const user = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
)
\`\`\`

## Security Checklist
- [ ] Validate all inputs
- [ ] Sanitize outputs
- [ ] Use HTTPS only
- [ ] Implement CSRF protection
- [ ] Add rate limiting
- [ ] Log security events
    `
  },
  {
    id: 19,
    title: 'Future of RSC',
    content: `
# The Future of React Server Components

## Upcoming Features

### 1. Improved DX
- Better error messages
- Enhanced debugging tools
- Simplified mental model

### 2. Performance Enhancements
- Faster streaming
- Smaller payload sizes
- Optimized hydration

### 3. Ecosystem Growth
- More compatible libraries
- Better testing tools
- Framework adoption

## Experimental Features

### Server Actions Evolution
\`\`\`tsx
// Future syntax possibilities
export default function Form() {
  async function submit(data) {
    'use server'
    await saveData(data)
  }

  return <form action={submit}>...</form>
}
\`\`\`

### Partial Prerendering
- Static shell + dynamic content
- Best of SSG and SSR
- Optimal performance

## Industry Impact
- **Reduced complexity** in data fetching
- **Better performance** by default
- **Improved security** posture
- **Lower infrastructure costs**

## Learning Resources
- React documentation
- Next.js guides
- Community tutorials
- Conference talks
    `
  },
  {
    id: 20,
    title: 'Thank You!',
    content: `
# Thank You! 🎉

## Key Takeaways

### RSC Benefits
- 🚀 **Better Performance**
- 🔒 **Enhanced Security**
- 🛠 **Improved DX**
- 💰 **Cost Efficient**

### Remember
> Server Components are not replacing Client Components.
> They work together to create better applications.

## Next Steps
1. **Experiment** with RSC in your projects
2. **Migrate** incrementally
3. **Share** your learnings
4. **Contribute** to the ecosystem

## Resources
- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org)
- [RSC RFC](https://github.com/reactjs/rfcs)

## Questions?
Feel free to explore and experiment!

---

*Built with Next.js App Router and React Server Components*
    `
  }
]

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
