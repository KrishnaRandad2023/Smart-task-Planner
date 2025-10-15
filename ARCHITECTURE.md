# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  TaskPlanner Component (Main Form)                        │ │
│  │  • Goal input                                             │ │
│  │  • Timeframe input                                        │ │
│  │  • Additional context input                               │ │
│  │  • Generate button                                        │ │
│  └───────────────────────────────────────────────────────────┘ │
│                            │                                    │
│                            │ (User submits goal)                │
│                            ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  TaskList Component (Results Display)                    │ │
│  │  • Progress bar                                           │ │
│  │  • Task accordion                                         │ │
│  │  • Task details & dependencies                            │ │
│  │  • Status tracking                                        │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP POST Request
                            │ /api/generate-plan
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTE                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  /api/generate-plan/route.ts                              │ │
│  │                                                           │ │
│  │  1. Validate input                                        │ │
│  │  2. Build AI prompt                                       │ │
│  │  3. Call OpenAI API                                       │ │
│  │  4. Parse & structure response                            │ │
│  │  5. Return task plan                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ API Request
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       OPENAI API                                │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  GPT-4o-mini Model                                        │ │
│  │                                                           │ │
│  │  • Receives structured prompt                             │ │
│  │  • Analyzes goal & context                                │ │
│  │  • Generates task breakdown                               │ │
│  │  • Returns JSON response                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
1. USER INPUT
   ├── Goal: "Launch a product in 2 weeks"
   ├── Timeframe: "2 weeks"
   └── Context: "Small team, limited budget"
                │
                ▼
2. FRONTEND PROCESSING
   ├── Validation
   ├── Loading state
   └── POST to /api/generate-plan
                │
                ▼
3. API ROUTE
   ├── Validate request
   ├── Build prompt
   ├── Call OpenAI
   └── Structure response
                │
                ▼
4. AI PROCESSING (OpenAI)
   ├── Analyze goal
   ├── Consider constraints
   ├── Generate tasks
   ├── Assign priorities
   ├── Calculate timelines
   └── Identify dependencies
                │
                ▼
5. RESPONSE
   {
     "success": true,
     "plan": {
       "goal": "...",
       "totalEstimatedDuration": "2 weeks",
       "tasks": [...]
     }
   }
                │
                ▼
6. UI UPDATE
   ├── Display tasks
   ├── Show progress
   ├── Enable interactions
   └── Track status
```

## Component Hierarchy

```
App Layout (layout.tsx)
│
├── Toaster (Global notifications)
│
└── Home Page (page.tsx)
    │
    └── TaskPlanner Component
        │
        ├── Input Form
        │   ├── Goal Textarea
        │   ├── Timeframe Textarea
        │   ├── Context Textarea
        │   └── Generate Button
        │
        └── TaskList Component (conditional)
            │
            ├── Overview Card
            │   ├── Goal display
            │   ├── Statistics
            │   └── Progress bar
            │
            └── Tasks Card
                │
                └── Accordion
                    │
                    └── Task Items (expandable)
                        ├── Status icon
                        ├── Title & priority badge
                        ├── Description
                        ├── Duration & deadline
                        ├── Dependencies
                        └── Status button
```

## Technology Layers

```
┌─────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (Client Components)                 │
│  • React 18 with hooks                                  │
│  • TypeScript for type safety                           │
│  • shadcn/ui components                                 │
├─────────────────────────────────────────────────────────┤
│  STYLING LAYER                                          │
│  • Tailwind CSS utility classes                         │
│  • CSS Variables for theming                            │
│  • Responsive design system                             │
├─────────────────────────────────────────────────────────┤
│  BUSINESS LOGIC LAYER (Next.js App Router)              │
│  • Server-side API routes                               │
│  • Request validation                                   │
│  • Error handling                                       │
├─────────────────────────────────────────────────────────┤
│  INTEGRATION LAYER                                      │
│  • OpenAI API client                                    │
│  • Environment configuration                            │
│  • Response parsing                                     │
├─────────────────────────────────────────────────────────┤
│  EXTERNAL SERVICES                                      │
│  • OpenAI GPT-4o-mini                                   │
│  • (Future: Database, Auth, etc.)                       │
└─────────────────────────────────────────────────────────┘
```

## State Management

```
TaskPlanner Component State:
├── goal: string
├── timeframe: string
├── additionalContext: string
├── isLoading: boolean
└── taskPlan: TaskPlan | null

TaskList Component State:
└── tasks: Task[]
    └── Each task:
        ├── id: string
        ├── title: string
        ├── description: string
        ├── estimatedDuration: string
        ├── priority: "high" | "medium" | "low"
        ├── dependencies: string[]
        ├── deadline?: string
        └── status: "pending" | "in-progress" | "completed"
```

## API Contract

### Request Schema

```typescript
interface GeneratePlanRequest {
  goal: string; // Required
  timeframe?: string; // Optional
  additionalContext?: string; // Optional
}
```

### Response Schema

```typescript
interface GeneratePlanResponse {
  success: boolean;
  plan?: TaskPlan;
  error?: string;
}

interface TaskPlan {
  goal: string;
  totalEstimatedDuration: string;
  tasks: Task[];
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedDuration: string;
  priority: "high" | "medium" | "low";
  dependencies: string[];
  deadline?: string;
  status: "pending" | "in-progress" | "completed";
}
```

## Security & Environment

```
Environment Variables (.env.local):
└── OPENAI_API_KEY
    ├── Stored securely
    ├── Never committed to git
    ├── Accessed server-side only
    └── Required for API route
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│  CDN (Vercel Edge Network)                              │
│  • Static assets                                        │
│  • Images, CSS, JS                                      │
├─────────────────────────────────────────────────────────┤
│  Next.js Server (Vercel Serverless)                     │
│  • API Routes                                           │
│  • Server-side rendering                                │
│  • Environment variables                                │
├─────────────────────────────────────────────────────────┤
│  External APIs                                          │
│  • OpenAI API (gpt-4o-mini)                             │
│  • (Future: Database, Auth services)                    │
└─────────────────────────────────────────────────────────┘
```

## Performance Optimizations

```
1. Client-Side
   ├── React 18 automatic batching
   ├── Component memoization potential
   └── Optimistic UI updates

2. Server-Side
   ├── Edge-optimized API routes
   ├── Serverless functions
   └── Automatic caching (Next.js)

3. AI Integration
   ├── Streaming responses (future)
   ├── Response caching (future)
   └── Rate limiting (recommended)
```

## Error Handling Flow

```
Error Occurs
    │
    ├─→ Frontend Errors
    │   ├── Input validation
    │   ├── Network failures
    │   └── Display toast notification
    │
    └─→ Backend Errors
        ├── Missing API key
        ├── OpenAI API errors
        ├── JSON parsing errors
        └── Return structured error response
            │
            └─→ Frontend displays error toast
```
