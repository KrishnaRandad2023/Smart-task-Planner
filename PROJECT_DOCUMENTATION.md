# 📋 Smart Task Manager - Project Documentation

## 🎯 Project Overview

**Smart Task Manager** is an AI-powered task planning application that transforms complex goals into actionable, organized task plans with professional Gantt chart visualizations. Built with modern web technologies and integrated with Google's Gemini AI, it helps users break down ambitious projects into manageable steps.

---

## ✨ Key Features

### 1. **AI-Powered Task Generation**

- Utilizes Google Gemini AI Pro model for intelligent task breakdown
- Analyzes user goals, timeframes, and context
- Generates comprehensive task plans with:
  - Task titles and descriptions
  - Estimated durations
  - Priority levels (High/Medium/Low)
  - Task dependencies
  - Resource requirements
  - Subtasks and acceptance criteria

### 2. **Secure Authentication**

- JWT (JSON Web Token) based authentication
- Email OTP (One-Time Password) verification
- Secure session management with httpOnly cookies
- Individual user accounts with isolated data
- Password-less authentication for enhanced security

### 3. **Visual Gantt Chart**

- Professional timeline visualization
- Color-coded tasks (14 unique colors)
- Week-by-week breakdown
- Daily granularity
- Expandable task details
- Priority badges and status indicators
- Responsive design for all screen sizes

### 4. **Task History Management**

- User-specific task history storage
- Access to all previously generated plans
- Expandable task cards
- Date tracking and organization
- MongoDB-backed persistence

### 5. **Smart Loading Animation**

- Real-time progress tracking (0-95%)
- 5-stage generation process visualization
- Rotating productivity tips and facts
- Adaptive duration estimation
- Learning algorithm that improves over time
- Smooth animations and transitions

### 6. **Modern UI/UX**

- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Collapsible sidebar navigation
- Gradient accents and modern aesthetics
- Accessible components (WCAG compliant)
- Smooth page transitions

---

## 🛠️ Technology Stack

### **Frontend**

- **Framework:** Next.js 14.2.0 (App Router)
- **UI Library:** React 18.3.1
- **Language:** TypeScript 5.4.5
- **Styling:** Tailwind CSS 3.4.3
- **Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Date Handling:** date-fns 3.3.1
- **Theme:** next-themes 0.3.0

### **Backend**

- **Runtime:** Node.js
- **API Routes:** Next.js API Routes
- **Authentication:** JWT (jose 5.2.0)
- **Password Hashing:** bcryptjs 2.4.3
- **Email Service:** nodemailer 6.9.8

### **Database**

- **Database:** MongoDB Atlas
- **Driver:** mongodb 6.3.0
- **ORM Pattern:** Native MongoDB driver

### **AI Integration**

- **AI Model:** Google Gemini AI (Pro)
- **SDK:** @google/generative-ai 0.2.1

### **Development Tools**

- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Code Formatting:** Prettier (implied)

---

## 📁 Project Structure

```
smart-task-manager-final/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── me/route.ts          # Get current user
│   │   │   ├── send-otp/route.ts    # Send OTP email
│   │   │   ├── verify-otp/route.ts  # Verify OTP & create session
│   │   │   └── logout/route.ts      # Logout user
│   │   ├── generate-plan/route.ts   # AI task generation
│   │   ├── tasks/
│   │   │   └── history/route.ts     # Get user task history
│   │   └── plans/
│   │       └── [id]/route.ts        # Get/Update/Delete specific plan
│   ├── history/page.tsx             # Task history page
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── app-layout.tsx               # Main layout with sidebar
│   ├── auth-context.tsx             # Authentication context
│   ├── auth-modal.tsx               # Login/OTP modal
│   ├── generating-animation.tsx     # Smart loading animation
│   ├── sidebar.tsx                  # Navigation sidebar
│   ├── task-history.tsx             # Task history list
│   ├── task-list.tsx                # Task list component
│   ├── task-planner.tsx             # Main task input form
│   ├── theme-toggle.tsx             # Dark mode toggle
│   ├── timeline-graph.tsx           # Gantt chart component
│   └── user-menu.tsx                # User avatar menu
├── contexts/
│   └── auth-context.tsx             # Auth state management
├── lib/
│   ├── auth.ts                      # JWT utilities
│   ├── email.ts                     # Email sending
│   ├── mongodb.ts                   # MongoDB connection
│   └── utils.ts                     # Utility functions
├── types/
│   └── index.ts                     # TypeScript types
├── public/                          # Static assets
├── .env.local                       # Environment variables
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind config
├── next.config.js                   # Next.js config
└── README.md                        # Project README
```

---

## 🔐 Environment Variables

Required environment variables in `.env.local`:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# JWT Secret
JWT_SECRET=your_very_long_and_secure_random_string_here
```

---

## 🚀 Installation & Setup

### **Prerequisites:**

- Node.js 18+ installed
- MongoDB Atlas account
- Google Gemini AI API key
- Gmail account with App Password

### **Steps:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KrishnaRandad2023/Smart-task-Planner.git
   cd Smart-task-Planner
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create `.env.local` file
   - Add all required variables (see above)

4. **Run development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

### **Production Build:**

```bash
npm run build
npm start
```

---

## 📊 Database Schema

### **Users Collection:**

```typescript
{
  _id: ObjectId,
  email: string,
  otp: string,
  otpExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### **Plans Collection:**

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  goal: string,
  totalEstimatedDuration: string,
  tasks: [
    {
      id: string,
      title: string,
      description: string,
      estimatedDuration: string,
      priority: "high" | "medium" | "low",
      dependencies: string[],
      resources: string[],
      subtasks: string[],
      acceptanceCriteria: string[],
      status: "pending" | "in-progress" | "completed"
    }
  ],
  createdAt: Date
}
```

---

## 🔄 API Endpoints

### **Authentication:**

- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and create session
- `GET /api/auth/me` - Get current authenticated user
- `POST /api/auth/logout` - Logout user

### **Task Management:**

- `POST /api/generate-plan` - Generate AI task plan
- `GET /api/tasks/history` - Get user's task history
- `GET /api/plans/[id]` - Get specific plan
- `PUT /api/plans/[id]` - Update plan
- `DELETE /api/plans/[id]` - Delete plan

---

## 🎨 UI Components

### **Core Components:**

1. **TaskPlanner** - Main form for goal input
2. **GeneratingAnimation** - Smart loading with progress
3. **TaskList** - Display generated tasks
4. **TimelineGraph** - Gantt chart visualization
5. **TaskHistory** - Previous plans display
6. **AuthModal** - Login/OTP interface
7. **Sidebar** - Navigation menu
8. **UserMenu** - Profile dropdown

### **UI Library Components (shadcn/ui):**

- Button, Card, Dialog, Dropdown Menu
- Input, Textarea, Label
- Accordion, Badge, Toast
- Tabs, Progress, Skeleton

---

## 🔒 Security Features

1. **Authentication:**

   - JWT tokens with 7-day expiry
   - HttpOnly cookies (XSS protection)
   - OTP verification (10-minute expiry)
   - Secure password storage (bcrypt)

2. **Data Protection:**

   - User-specific data isolation
   - MongoDB ObjectId validation
   - Server-side token verification
   - Protected API routes

3. **Best Practices:**
   - Environment variable usage
   - CORS configuration
   - Input validation
   - Error handling

---

## 🎯 Key Algorithms

### 1. **Smart Progress Calculation:**

```typescript
// Time-based progress with zones
const rawProgress = (elapsed / estimatedDuration) * 100;

if (rawProgress < 50) {
  newProgress = rawProgress * 1.1; // Fast start
} else if (rawProgress < 80) {
  newProgress = 55 + (rawProgress - 50) * 0.9; // Steady
} else {
  newProgress = 82 + (rawProgress - 80) * 0.65; // Slow finish
}
```

### 2. **Duration Learning Algorithm:**

```typescript
// Weighted average: 70% old + 30% new
const newAvg = oldAvg * 0.7 + actualDuration * 0.3;
localStorage.setItem("avgGenerationTime", newAvg);
```

### 3. **Gantt Timeline Calculation:**

```typescript
// Calculate task positions based on dependencies
const taskStartDay =
  task.dependencies.length > 0
    ? Math.max(
        ...task.dependencies.map(
          (depId) => tasks.findIndex((t) => t.id === depId) + 1
        )
      )
    : taskIndex;

const startDate = addDays(planStartDate, taskStartDay);
const endDate = addDays(startDate, durationDays - 1);
```

---

## 📈 Performance Optimizations

1. **Frontend:**

   - React Server Components for faster initial load
   - Code splitting with Next.js
   - Optimized images and assets
   - Lazy loading for heavy components
   - Memoization for expensive calculations

2. **Backend:**

   - MongoDB connection pooling
   - Efficient database queries
   - API route optimization
   - Streaming responses for AI generation

3. **UI:**
   - CSS animations (GPU-accelerated)
   - Smooth transitions (60fps)
   - Responsive images
   - Minimal re-renders

---

## 🧪 Testing Scenarios

### **User Flow Testing:**

1. ✅ User registration with OTP
2. ✅ Login with existing account
3. ✅ Generate task plan
4. ✅ View Gantt chart
5. ✅ Access task history
6. ✅ Dark mode toggle
7. ✅ Responsive design
8. ✅ Logout

### **Edge Cases:**

- Invalid email format
- Expired OTP
- Network errors
- Empty goal input
- Long generation times
- Large task lists

---

## 🐛 Known Issues & Future Enhancements

### **Current Limitations:**

- OTP emails may go to spam folder
- Gemini AI rate limits apply
- Maximum task count depends on goal complexity

### **Future Enhancements:**

1. **Features:**

   - Task editing and updates
   - Export to PDF/Excel
   - Task completion tracking
   - Team collaboration
   - Notifications and reminders
   - Calendar integration

2. **Technical:**
   - Redis caching for faster responses
   - WebSocket for real-time updates
   - Progressive Web App (PWA)
   - Mobile apps (React Native)
   - Analytics dashboard

---

## 📦 Deployment

### **Recommended Platforms:**

1. **Vercel** (Recommended):

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Netlify:**

   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

3. **Self-hosted:**
   ```bash
   npm run build
   npm start
   ```

### **Environment Setup:**

- Set all environment variables in platform dashboard
- Configure MongoDB IP whitelist (0.0.0.0/0 for cloud deployment)
- Enable HTTPS
- Configure custom domain (optional)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Developer Information

**Developer:** Krishna Randad  
**Email:** krishnavijay.randad2022@vitstudent.ac.in  
**GitHub:** https://github.com/KrishnaRandad2023  
**Repository:** https://github.com/KrishnaRandad2023/Smart-task-Planner

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Vercel** for Next.js framework and hosting
- **MongoDB** for database services
- **shadcn/ui** for beautiful UI components
- **Radix UI** for accessible primitives

---

## 📞 Support

For issues, questions, or contributions:

- Open an issue on GitHub
- Contact via email
- Submit pull requests

---

**Built with ❤️ using Next.js, React, and AI**
