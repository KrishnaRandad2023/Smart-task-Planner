# Smart Task Planner 🎯

An AI-powered task planning application that breaks down your goals into actionable tasks with timelines, dependencies, and priorities. Built with Next.js 14, TypeScript, shadcn/ui, Google Gemini AI, and MongoDB Atlas.

## Features

- 🤖 **AI-Powered Planning**: Uses Google Gemini to intelligently break down goals into actionable tasks
- 💾 **MongoDB Integration**: Automatically saves all task plans to MongoDB Atlas
- 📊 **Task Management**: View tasks with priorities, dependencies, and estimated timelines
- ✅ **Progress Tracking**: Track task completion with visual progress indicators
- 🎨 **Modern UI**: Beautiful, responsive interface built with shadcn/ui components
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support**: Automatic dark mode support with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **AI**: Google Gemini 1.5 Flash
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))
- A MongoDB Atlas account ([Sign up here](https://www.mongodb.com/cloud/atlas/register))

## Getting Started

### 1. Clone or Navigate to the Project

```bash
cd smart-task-manager-final
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskplanner?retryWrites=true&w=majority
```

**Getting Your Gemini API Key:**

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and paste it in `.env.local`

**Getting Your MongoDB URI:**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster (if you haven't already)
3. Click "Connect" → "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Paste it in `.env.local`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Your Goal**: Describe what you want to achieve (e.g., "Launch a product in 2 weeks")
2. **Add Optional Details**:
   - Timeframe (e.g., "2 weeks", "3 months")
   - Additional context (constraints, resources, preferences)
3. **Generate Plan**: Click "Generate Task Plan" to let AI create your breakdown
4. **Manage Tasks**:
   - Click on tasks to view details
   - Track dependencies between tasks
   - Mark tasks as in-progress or completed
   - Monitor overall progress

## Project Structure

```
smart-task-manager-final/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   └── generate-plan/   # Task generation endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── task-planner.tsx     # Main planner component
│   └── task-list.tsx        # Task list display
├── lib/                     # Utility functions
│   └── utils.ts            # Helper utilities
├── types/                   # TypeScript types
│   └── index.ts            # Type definitions
└── public/                  # Static assets
```

## API Endpoint

### POST `/api/generate-plan`

Generates a task breakdown from a goal.

**Request Body:**

```json
{
  "goal": "Launch a product in 2 weeks",
  "timeframe": "2 weeks",
  "additionalContext": "Limited budget, small team"
}
```

**Response:**

```json
{
  "success": true,
  "plan": {
    "goal": "Launch a product in 2 weeks",
    "totalEstimatedDuration": "2 weeks",
    "tasks": [
      {
        "id": "task-1",
        "title": "Market Research",
        "description": "Conduct market analysis...",
        "estimatedDuration": "2 days",
        "priority": "high",
        "dependencies": [],
        "deadline": "Day 2",
        "status": "pending"
      }
    ],
    "createdAt": "2024-10-14T..."
  }
}
```

## Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

## Customization

### Modify AI Prompt

Edit the prompt in `app/api/generate-plan/route.ts` to customize how tasks are generated.

### Change AI Model

Update the model parameter in `app/api/generate-plan/route.ts`:

```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-pro", // Change to "gemini-1.5-pro-latest" for better results
  // ...
});
```

Available Gemini models:

- `gemini-pro` - Standard model (recommended)
- `gemini-1.5-pro-latest` - Latest Pro model with better capabilities
- `gemini-1.5-flash-latest` - Fast responses (if available in your region)

### Database Features

Task plans are automatically saved to MongoDB Atlas! You can:

- View all saved plans via `/api/plans`
- Get a specific plan via `/api/plans/[id]`
- Delete plans via DELETE `/api/plans/[id]`

## Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

```bash
npm install -g vercel
vercel
```

Remember to set your `GEMINI_API_KEY` and `MONGODB_URI` in Vercel's environment variables.

### Other Platforms

- **Netlify**: Works with Next.js
- **Railway**: Supports Next.js apps
- **AWS/Azure/GCP**: Use container deployment

## Environment Variables

| Variable         | Description                          | Required |
| ---------------- | ------------------------------------ | -------- |
| `GEMINI_API_KEY` | Your Google Gemini API key           | Yes      |
| `MONGODB_URI`    | Your MongoDB Atlas connection string | Yes      |

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, Google Gemini, and MongoDB
