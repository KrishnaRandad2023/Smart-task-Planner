# 📹 Demo Recording Checklist

## ✅ Pre-Recording Setup

### 1. Clean Environment

- [ ] Clear browser cache and cookies
- [ ] Close unnecessary tabs and applications
- [ ] Use incognito/private window for fresh start
- [ ] Clear localStorage: `localStorage.clear()` in console
- [ ] Delete any test data from MongoDB (optional)

### 2. Test Data Preparation

- [ ] Have test email ready (can receive OTPs quickly)
- [ ] Check Gmail is not in spam-blocking mode
- [ ] Prepare 2-3 example goals to demonstrate:
  - **Simple:** "Plan a birthday party in 2 weeks"
  - **Medium:** "Launch a mobile app in 3 months"
  - **Complex:** "Build an e-commerce platform with team of 5 in 6 months"

### 3. Application Setup

- [ ] App running on `http://localhost:3000`
- [ ] MongoDB connection working
- [ ] Gemini API responding
- [ ] Email OTP sending successfully
- [ ] All features tested and working

### 4. Recording Software Setup

- [ ] **Windows:** OBS Studio, Bandicam, or Windows Game Bar (Win+G)
- [ ] **Mac:** QuickTime Player or ScreenFlow
- [ ] **Settings:**
  - Resolution: 1920x1080 (Full HD)
  - Frame rate: 30 FPS minimum
  - Audio: Include system audio + microphone
  - Format: MP4 (most compatible)

### 5. Screen Setup

- [ ] Browser window maximized (or at 1920x1080)
- [ ] Zoom level: 100% (default)
- [ ] Hide browser bookmarks bar (Ctrl+Shift+B)
- [ ] Close developer tools
- [ ] Use dark mode (looks better on video)

## 🎬 Recording Tips

### Before You Start

1. **Script Practice:** Read through DEMO_VIDEO_SCRIPT.md 2-3 times
2. **Timing Check:** Do a dry run to confirm 2-minute timing
3. **Voice Check:** Speak clearly, not too fast
4. **Mic Position:** Keep microphone close but not too loud

### During Recording

- **Smooth Movements:** Move mouse slowly and deliberately
- **Pause Points:** Brief pauses after each section
- **Confidence:** Speak with enthusiasm and confidence
- **Backup:** Record 2-3 takes for safety

### Camera Position (if showing face)

- Position camera at eye level
- Good lighting from front (window or lamp)
- Clean background (or use virtual background)

## 🎯 What to Show (2-Minute Breakdown)

### 0:00-0:15 | Introduction (15s)

- [ ] Show landing page
- [ ] Mention project name and purpose
- [ ] Quick tech stack mention

### 0:15-0:35 | Authentication (20s)

- [ ] Click "Login" button
- [ ] Enter email address
- [ ] Show OTP email received
- [ ] Enter OTP code
- [ ] Show successful login with avatar

### 0:35-1:15 | AI Task Generation (40s)

- [ ] Enter a goal (use prepared example)
- [ ] Optionally add timeframe
- [ ] Click "Generate Task Plan"
- [ ] **Point out:**
  - Progress percentage
  - Generation stages
  - Productivity tips
- [ ] Show generated tasks list

### 1:15-1:40 | Gantt Chart (25s)

- [ ] Scroll down to timeline
- [ ] **Point out:**
  - Color-coded tasks
  - Week headers
  - Task duration bars
  - Priority badges
- [ ] Expand 1-2 tasks to show details

### 1:40-1:55 | Task History (15s)

- [ ] Click "Task History" in sidebar
- [ ] Show previous plans
- [ ] Expand one plan briefly
- [ ] Mention data persistence

### 1:55-2:00 | Closing (5s)

- [ ] Quick recap of features
- [ ] Thank viewers
- [ ] Show GitHub repo (optional)

## 🎤 Tech Stack to Mention

### Must Mention (Core)

- Next.js 14 (App Router)
- React 18
- TypeScript
- MongoDB Atlas
- Google Gemini AI
- JWT Authentication
- Tailwind CSS

### Optional (If Time)

- shadcn/ui components
- nodemailer for OTP
- date-fns for Gantt charts
- bcrypt for security

## ⚡ Speed Script (If Running Short on Time)

If you're running over 2 minutes, use this condensed version:

**0:00-0:10 | Intro**
"This is Smart Task Manager, an AI-powered task planner built with Next.js, React, TypeScript, and MongoDB."

**0:10-0:25 | Auth**
"It has secure authentication with email OTP - no passwords needed. [Demo login] And we're in!"

**0:25-1:05 | Generation**
"Let me generate a task plan. [Enter goal] It uses Google Gemini AI to break down goals. [Show loading] And here are our tasks with priorities and durations."

**1:05-1:25 | Gantt**
"This is the Gantt chart visualization - color-coded tasks with weekly timeline."

**1:25-1:50 | History + Features**
"Task history is saved per user. Dark mode works. Fully responsive. JWT auth with httpOnly cookies."

**1:50-2:00 | Closing**
"All tech: Next.js 14, React, TypeScript, MongoDB, Gemini AI, Tailwind CSS. Thanks for watching!"

## 🔧 Troubleshooting During Recording

### If OTP Doesn't Arrive

- **Plan A:** Wait 30 seconds, check spam
- **Plan B:** Use a pre-recorded clip
- **Plan C:** Say "OTP arrives via email" and show it arriving

### If AI Generation is Slow

- **Plan A:** Speed up video in post-production
- **Plan B:** Cut to result with "After a few seconds..."
- **Plan C:** Use a pre-generated plan

### If You Make a Mistake

- Don't panic! Just:
  1. Pause recording
  2. Reset to previous state
  3. Start that section again
  4. Edit in post-production

## 📤 Post-Recording

### Video Editing

- [ ] Trim start/end (remove setup time)
- [ ] Add title card (optional): "Smart Task Manager - AI Task Planning"
- [ ] Add background music (low volume, non-intrusive)
- [ ] Add text overlays for tech stack
- [ ] Highlight cursor (if too small)
- [ ] Speed up slow parts (1.2-1.5x)

### Video Export Settings

- **Format:** MP4 (H.264)
- **Resolution:** 1920x1080 (Full HD)
- **Frame Rate:** 30 FPS
- **Bitrate:** 5-10 Mbps
- **Audio:** AAC, 128-192 kbps

### Before Submission

- [ ] Watch full video (check for errors)
- [ ] Verify length is under 2:00
- [ ] Check audio quality
- [ ] Test video plays on different devices
- [ ] File size reasonable (<200MB)

## 🎓 Submission Requirements

Check your project submission guidelines for:

- [ ] Video format (MP4, MOV, etc.)
- [ ] Maximum file size
- [ ] Required content coverage
- [ ] Any specific platform to upload to
- [ ] Submission deadline

## 💡 Pro Tips

1. **Practice Makes Perfect:** Do 2-3 dry runs before final recording
2. **Energy:** Speak with enthusiasm - boring demos lose attention
3. **Clarity:** Explain complex features simply
4. **Pace:** Not too fast (rushed) or too slow (boring)
5. **Backup Plan:** Have screenshots ready if live demo fails
6. **Confidence:** You built this - be proud!

## 🎉 Final Check

Before hitting record:

- [ ] All features working
- [ ] Script memorized (or nearby)
- [ ] Recording software ready
- [ ] Microphone tested
- [ ] Browser cleaned up
- [ ] Examples prepared
- [ ] Confident and ready!

---

## 📝 Quick Command Reference

### Start App

```bash
npm run dev
```

### Clear Browser Data (in DevTools Console)

```javascript
localStorage.clear();
sessionStorage.clear();
// Then reload page
```

### Check MongoDB Connection

```javascript
// In app/api/auth/me/route.ts - should see successful connections
```

### Test Email OTP

```javascript
// Send test email to verify it's working
```

---

**You've got this! 🚀 Record an amazing demo!**
