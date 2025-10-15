# 🎯 Smart Task Manager

> Transform your goals into actionable plans with AI-powered task generation and professional Gantt chart visualization.

An intelligent task planning application that uses Google Gemini AI to break down complex goals into structured, actionable task plans with professional Gantt chart visualizations. Built with Next.js 14, TypeScript, and MongoDB Atlas.

![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

## ✨ Features

### 🤖 AI-Powered Task Generation

Uses Google Gemini AI Pro to intelligently break down goals into structured tasks with:

- Task titles, descriptions, and priorities
- Estimated durations and deadlines
- Task dependencies and subtasks
- Resource requirements
- Acceptance criteria

### � Secure Authentication

- JWT-based authentication with httpOnly cookies
- Email OTP (One-Time Password) verification
- No passwords needed - passwordless authentication
- Secure session management (7-day expiry)
- Individual user accounts with data isolation

### 📊 Professional Gantt Charts

- Visual timeline with color-coded tasks (14 unique colors)
- Week-by-week breakdown with daily granularity
- Expandable task details
- Priority badges and status indicators
- Responsive design for all screen sizes

### � Task History Management

- Access all previously generated plans
- User-specific history with MongoDB persistence
- Expandable task cards with full details
- Date tracking and organization

### ⚡ Smart Loading Animation

- Real-time progress tracking (0-95%)
- 5-stage generation process visualization
- Rotating productivity tips and facts
- Adaptive duration estimation with learning algorithm
- Smooth animations and transitions

### 🎨 Modern UI/UX

- 🌙 Dark mode support with smooth transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Gradient accents and modern aesthetics
- ♿ Accessible components (WCAG compliant)
- 🚀 Smooth page transitions and animations

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14.2.0 (App Router)
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5.4.5
- **Styling**: Tailwind CSS 3.4.3
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Date Handling**: date-fns 3.3.1
- **Theme**: next-themes 0.3.0

### Backend

- **Runtime**: Node.js
- **API Routes**: Next.js API Routes
- **Authentication**: JWT (jose 5.2.0)
- **Password Hashing**: bcryptjs 2.4.3
- **Email Service**: nodemailer 6.9.8

### Database

- **Database**: MongoDB Atlas
- **Driver**: mongodb 6.3.0
- **Collection**: taskplanner

### AI Integration

- **AI Model**: Google Gemini AI (Pro)
- **SDK**: @google/generative-ai 0.2.1

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Google Gemini AI API key
- Gmail account (for sending OTP emails)

## 🚀 Getting Started

### 1. Clone or Navigate to the Project

```bash
git clone https://github.com/KrishnaRandad2023/Smart-task-Planner.git
cd Smart-task-Planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# JWT Secret (generate a long random string)
JWT_SECRET=your_very_long_and_secure_random_string_here
```

### 4. Getting Your API Keys

**MongoDB Atlas URI:**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster (if you haven't already)
3. Click "Connect" → "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database password

**Google Gemini API Key:**

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy and paste in `.env.local`

**Gmail App Password:**

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create a new app password for "Mail"
4. Copy the 16-character password (no spaces)

**JWT Secret:**

- Generate a long random string (recommended 32+ characters)
- You can use: `openssl rand -base64 32` (on Mac/Linux)
- Or use an online generator

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 💡 How to Use

### 1. Sign Up / Login

- Click "Login" in the header
- Enter your email address
- Receive a 6-digit OTP via email (check spam if needed)
- Enter the OTP to log in (expires in 10 minutes)

### 2. Generate Task Plan

- Enter your goal (e.g., "Launch a mobile app in 3 months")
- Optionally add:
  - Timeframe (e.g., "2 weeks", "3 months")
  - Additional context (constraints, resources, team size)
- Click "Generate Task Plan"
- Watch the smart loading animation with progress tracking

### 3. View Your Plan

- **Task List**: See all generated tasks with details
- **Gantt Chart**: Visual timeline below the task list
- **Task Details**: Click tasks to expand and see:
  - Full description
  - Estimated duration
  - Priority level (High/Medium/Low)
  - Dependencies
  - Subtasks
  - Acceptance criteria

### 4. Access Task History

- Click "Task History" in the sidebar
- View all your previous plans
- Expand any plan to see details and Gantt chart
- Click "Refresh" to load latest plans

### 5. Additional Features

- **Dark Mode**: Toggle in the header
- **Responsive**: Works on all devices
- **Persistent Auth**: Stay logged in for 7 days
- **Smart Progress**: Loading time improves with usage

## 📁 Project Structure

```
smart-task-manager-final/
├── app/                           # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   │   ├── send-otp/       # Send OTP email
│   │   │   ├── verify-otp/     # Verify OTP & login
│   │   │   ├── me/             # Get current user
│   │   │   └── logout/         # Logout
│   │   ├── generate-plan/      # AI task generation
│   │   ├── tasks/
│   │   │   └── history/        # Get task history
│   │   └── plans/
│   │       └── [id]/           # Get/Update/Delete plan
│   ├── history/                # Task history page
│   │   └── page.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   ├── app-layout.tsx          # Main layout with sidebar
│   ├── auth-context.tsx        # Auth state management
│   ├── auth-modal.tsx          # Login/OTP modal
│   ├── generating-animation.tsx # Smart loading animation
│   ├── sidebar.tsx             # Navigation sidebar
│   ├── task-history.tsx        # Task history list
│   ├── task-list.tsx           # Task display component
│   ├── task-planner.tsx        # Main task input form
│   ├── theme-toggle.tsx        # Dark mode toggle
│   ├── timeline-graph.tsx      # Gantt chart
│   └── user-menu.tsx           # User avatar menu
├── contexts/
│   └── auth-context.tsx        # Authentication context
├── lib/                        # Utilities
│   ├── auth.ts                # JWT utilities
│   ├── email.ts               # Email sending
│   ├── mongodb.ts             # MongoDB connection
│   └── utils.ts               # Helper functions
├── types/
│   └── index.ts               # TypeScript types
└── public/                     # Static assets
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| POST   | `/api/auth/send-otp`   | Send OTP to email              |
| POST   | `/api/auth/verify-otp` | Verify OTP and create session  |
| GET    | `/api/auth/me`         | Get current authenticated user |
| POST   | `/api/auth/logout`     | Logout user                    |

### Task Management

| Method | Endpoint             | Description                           |
| ------ | -------------------- | ------------------------------------- |
| POST   | `/api/generate-plan` | Generate AI task plan (requires auth) |
| GET    | `/api/tasks/history` | Get user's task history               |
| GET    | `/api/plans/[id]`    | Get specific plan by ID               |
| PUT    | `/api/plans/[id]`    | Update plan                           |
| DELETE | `/api/plans/[id]`    | Delete plan                           |

### Example: Generate Task Plan

**POST** `/api/generate-plan`

```json
// Request
{
  "goal": "Launch a mobile app in 3 months",
  "timeframe": "3 months",
  "additionalContext": "Small team of 3 developers"
}

// Response
{
  "success": true,
  "plan": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "goal": "Launch a mobile app in 3 months",
    "totalEstimatedDuration": "12 weeks",
    "tasks": [
      {
        "id": "task-1",
        "title": "Requirements Gathering",
        "description": "Define app features and user stories",
        "estimatedDuration": "1 week",
        "priority": "high",
        "dependencies": [],
        "resources": ["Product Manager", "Stakeholders"],
        "subtasks": ["Create user personas", "Define MVP scope"],
        "acceptanceCriteria": ["All features documented"],
        "status": "pending"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🔧 Development

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

## 🎨 Key Components

### **TaskPlanner** (`components/task-planner.tsx`)

- Main goal input form
- Auth-protected generation
- Smart duration learning algorithm
- Loading state management

### **GeneratingAnimation** (`components/generating-animation.tsx`)

- Real-time progress tracking (0-95%)
- 5 generation stages with descriptions
- Rotating productivity tips
- Time-based calculation with learning
- Zone-based speed (fast → normal → slow)

### **TimelineGraph** (`components/timeline-graph.tsx`)

- Professional Gantt chart
- 14 unique color variations
- Week headers and day columns
- Expandable task details
- Priority badges and status icons

### **TaskHistory** (`components/task-history.tsx`)

- User-specific plan history
- Expandable task cards
- Integrated Gantt chart display
- Refresh functionality

### **AuthModal** (`components/auth-modal.tsx`)

- Email input and OTP verification
- Loading states and error handling
- Auto-refresh on success

## 🎯 Key Algorithms

### Smart Progress Calculation

```typescript
// Zone-based progress (0-50% fast, 50-80% normal, 80-100% slow)
const rawProgress = (elapsed / estimatedDuration) * 100;

if (rawProgress < 50) {
  newProgress = rawProgress * 1.1; // Fast start
} else if (rawProgress < 80) {
  newProgress = 55 + (rawProgress - 50) * 0.9; // Steady
} else {
  newProgress = 82 + (rawProgress - 80) * 0.65; // Slow finish
}
```

### Duration Learning

```typescript
// Weighted average: 70% old + 30% new
const newAvg = oldAvg * 0.7 + actualDuration * 0.3;
localStorage.setItem("avgGenerationTime", newAvg);
```

## ⚙️ Customization

### Modify AI Prompt

Edit the prompt in `app/api/generate-plan/route.ts` to customize task generation.

### Change AI Model

Update the model in `app/api/generate-plan/route.ts`:

```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-pro", // or "gemini-1.5-pro-latest"
});
```

### Adjust Loading Animation

Modify timing zones in `components/generating-animation.tsx`:

- Fast zone multiplier (currently 1.1)
- Normal zone multiplier (currently 0.9)
- Slow zone multiplier (currently 0.65)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KrishnaRandad2023/Smart-task-Planner)

**Or use Vercel CLI:**

```bash
npm install -g vercel
vercel
```

⚠️ **Important:** Set all environment variables in Vercel's dashboard:

- Go to Project Settings → Environment Variables
- Add all 5 variables from `.env.local`

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Supports Next.js apps
- **AWS/Azure/GCP**: Use container deployment

### Production Checklist

- [ ] All environment variables set
- [ ] MongoDB IP whitelist updated (0.0.0.0/0 for cloud)
- [ ] HTTPS enabled
- [ ] Domain configured (optional)
- [ ] Email settings tested
- [ ] OTP delivery working

## 📊 Environment Variables

| Variable         | Description                     | Required | Example               |
| ---------------- | ------------------------------- | -------- | --------------------- |
| `MONGODB_URI`    | MongoDB Atlas connection string | Yes      | `mongodb+srv://...`   |
| `GEMINI_API_KEY` | Google Gemini API key           | Yes      | `AIzaSy...`           |
| `EMAIL_USER`     | Gmail address for sending OTPs  | Yes      | `your@gmail.com`      |
| `EMAIL_PASSWORD` | Gmail app password              | Yes      | `abcd efgh ijkl mnop` |
| `JWT_SECRET`     | Secret for JWT signing          | Yes      | `long_random_string`  |

## 🔒 Security Features

- JWT tokens with httpOnly cookies (XSS protection)
- OTP expiry (10 minutes)
- Bcrypt password hashing
- User data isolation by userId
- Protected API routes with middleware
- Server-side token verification
- Input validation and sanitization
- Secure session management (7-day expiry)

## 📈 Performance

- ⚡ Server-side rendering with Next.js App Router
- 🎨 GPU-accelerated CSS animations
- 📦 Code splitting and lazy loading
- 🗃️ MongoDB connection pooling
- 🧠 Smart caching with learning algorithm
- 🚀 Optimized bundle size
- 📊 Efficient database queries

## 🐛 Known Issues & Troubleshooting

### OTP Email Not Received

- Check spam/junk folder
- Verify Gmail app password is correct
- Ensure 2FA is enabled on Gmail account
- Check EMAIL_USER and EMAIL_PASSWORD in `.env.local`

### Login Issues

- Clear browser cookies and cache
- Check MongoDB connection string
- Verify JWT_SECRET is set
- Check browser console for errors

### Gemini API Rate Limits

- Free tier: 60 requests/minute
- Consider upgrading for production use
- Implement request queuing if needed

## 🛣️ Roadmap

- [ ] Task editing and status updates
- [ ] Real-time collaboration
- [ ] Export to PDF/Excel
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Email notifications for deadlines
- [ ] Mobile app (React Native)
- [ ] Team workspaces
- [ ] Analytics dashboard
- [ ] Custom task templates
- [ ] Integrations (Slack, Trello, Jira)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Developer

**Krishna Randad**

- Email: krishnavijay.randad2022@vitstudent.ac.in
- GitHub: [@KrishnaRandad2023](https://github.com/KrishnaRandad2023)
- Repository: [Smart-task-Planner](https://github.com/KrishnaRandad2023/Smart-task-Planner)

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [Vercel](https://vercel.com/) for Next.js framework and hosting
- [MongoDB](https://www.mongodb.com/) for database services
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives

## 📞 Support

If you have any questions or run into issues:

- Open an issue on [GitHub](https://github.com/KrishnaRandad2023/Smart-task-Planner/issues)
- Email: krishnavijay.randad2022@vitstudent.ac.in

---

**Built with ❤️ using Next.js, React, TypeScript, and AI**

⭐ Star this repo if you find it helpful!
