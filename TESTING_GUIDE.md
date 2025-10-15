# Quick Start Testing Guide

## 🚀 Start the Application

```bash
npm run dev
```

Open: http://localhost:3000

## ⚠️ IMPORTANT: Configure Email First

Before testing authentication, you MUST configure email credentials:

### 1. Open `.env.local` file

### 2. Add your Gmail credentials:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

### 3. Get Gmail App Password:

- Visit: https://myaccount.google.com/apppasswords
- Enable 2-Factor Authentication if not already enabled
- Generate App Password for "Mail" → "Other"
- Copy the 16-character password (no spaces)

### 4. Restart Server:

```bash
# Stop with Ctrl+C
npm run dev
```

## ✅ Test Authentication Flow

### Test 1: Login

1. Open http://localhost:3000
2. Click "Login" button (top right)
3. Enter your email address
4. Click "Send OTP"
5. Check your email inbox
6. Enter the 6-digit OTP code
7. Click "Verify & Login"
8. ✅ You should see your email in the header

### Test 2: Generate Task Plan (Authenticated)

1. Make sure you're logged in
2. Enter a goal: "Launch a product in 2 weeks"
3. Click "Generate Task Plan"
4. ✅ Task plan should be generated
5. ✅ Tasks saved to your account in MongoDB

### Test 3: Generate Task Plan (Not Authenticated)

1. Click your avatar → "Logout"
2. Enter a goal in the form
3. Click "Generate Task Plan"
4. ✅ Auth modal should appear
5. Login and generation continues automatically

### Test 4: Session Persistence

1. Login to the app
2. Generate a task plan
3. Close browser completely
4. Reopen http://localhost:3000
5. ✅ You should still be logged in (7-day cookie)

### Test 5: Logout

1. Click your avatar (top right)
2. Click "Logout"
3. ✅ You should see "Login" button again
4. Try to generate task → Auth modal appears

## 🐛 Troubleshooting

### Email Not Received:

- ✅ Check spam/junk folder
- ✅ Verify EMAIL_USER and EMAIL_PASSWORD in .env.local
- ✅ Ensure Gmail app password is correct (16 chars)
- ✅ Check server terminal for email errors
- ✅ Restart server after changing .env.local

### OTP Invalid:

- ✅ OTP expires after 10 minutes
- ✅ Click "Resend" to get new OTP
- ✅ Make sure you're entering the latest OTP

### "Authentication Required" Error:

- ✅ Check if auth-token cookie exists in browser
- ✅ Try logout and login again
- ✅ Clear browser cookies for localhost
- ✅ Check MongoDB connection (MONGODB_URI)

### Tasks Not Saving:

- ✅ Check MONGODB_URI in .env.local
- ✅ Verify MongoDB Atlas is online
- ✅ Check network access rules in MongoDB Atlas
- ✅ Look for errors in server terminal

## 📊 Verify in MongoDB Atlas

1. Login to MongoDB Atlas
2. Go to your cluster → Browse Collections
3. Database: `taskplanner`
4. Collections to check:
   - `users` → Should see your email
   - `plans` → Should see your tasks with `userId`

## 🎯 Expected Results

### After Login:

- ✅ Avatar with your email's first letter appears
- ✅ Clicking avatar shows dropdown menu
- ✅ Email displayed in menu
- ✅ Logout option available

### After Generating Tasks:

- ✅ Task plan appears with timeline graph
- ✅ Gantt chart shows tasks in different colors
- ✅ Tasks saved to MongoDB with your userId
- ✅ Only you can see your tasks

### Email Template:

- ✅ Professional gradient header
- ✅ "Smart Task Planner" branding
- ✅ Large, centered 6-digit OTP code
- ✅ 10-minute expiry notice
- ✅ Dark mode friendly design

## 🔥 Demo Scenario

Full end-to-end test:

```
1. Open app → Click Login
2. Enter email → Send OTP → Check inbox
3. Enter OTP → Verify → See avatar in header
4. Enter goal: "Build a mobile app in 3 months"
5. Add timeframe: "3 months"
6. Add context: "Using React Native, need iOS and Android"
7. Click Generate → Wait for AI
8. ✅ See task plan with timeline
9. ✅ See colorful Gantt chart
10. Click avatar → Logout
11. Try to generate task → Login required
12. Login again → Continue to dashboard
```

## ✨ Features to Show Off

1. **Beautiful Auth Modal** - Two-step email → OTP flow
2. **Professional Emails** - Gradient header, clean design
3. **User Menu** - Avatar with dropdown
4. **Protected Routes** - Can't create tasks without login
5. **Persistent Sessions** - 7-day login
6. **Dark Mode** - Works in auth modal too
7. **Colorful Timeline** - 14 unique task colors
8. **Gantt Chart** - Professional project visualization
9. **Responsive Design** - Mobile friendly
10. **Error Handling** - Graceful failures

## 📋 Checklist Before Demo

- [ ] .env.local configured with real email credentials
- [ ] Server running (`npm run dev`)
- [ ] MongoDB Atlas connection working
- [ ] Gmail app password valid
- [ ] Browser opened to http://localhost:3000
- [ ] Email inbox ready to check
- [ ] Dark mode toggle tested

---

**Status**: Ready for testing after email configuration

**See**: `AUTHENTICATION_SETUP.md` for detailed email setup
**See**: `IMPLEMENTATION_SUMMARY.md` for full technical details
