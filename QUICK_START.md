# ⚡ Quick Start Guide

Get Smart Task Manager running in 5 minutes! 🚀

## 📦 What You Need

Before starting, make sure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] A Gmail account
- [ ] A MongoDB Atlas account (free tier works!)
- [ ] A Google Gemini API key (free tier works!)

---

## 🎯 5-Minute Setup

### Step 1: Clone & Install (1 minute)

```bash
# Clone the repository
git clone https://github.com/KrishnaRandad2023/Smart-task-Planner.git

# Navigate to project
cd Smart-task-Planner

# Install dependencies (takes ~30 seconds)
npm install
```

### Step 2: Get Your API Keys (2 minutes)

#### A. MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account (M0 cluster)
3. Create a cluster (default settings are fine)
4. Click "Connect" → "Drivers"
5. Copy the connection string
6. Replace `<password>` with your database password

**Result:** `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

#### B. Google Gemini AI (Free)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

**Result:** `AIzaSy...` (long string)

#### C. Gmail App Password (Free)

1. Enable [2-Factor Authentication](https://myaccount.google.com/security) on Gmail
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and your device
4. Copy the 16-character password

**Result:** `abcd efgh ijkl mnop` (4 groups of 4)

### Step 3: Configure Environment (1 minute)

```bash
# Copy example file
cp .env.example .env.local

# Open .env.local in any text editor
# For Windows: notepad .env.local
# For Mac: open -e .env.local
```

Fill in your values:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
GEMINI_API_KEY=AIzaSy...your_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
JWT_SECRET=any_long_random_string_32_characters_or_more
```

**JWT_SECRET:** Just type random characters (at least 32 characters). Example:

```
JWT_SECRET=my_super_secret_key_12345_abcdefghijklmnop
```

### Step 4: Start the App (30 seconds)

```bash
npm run dev
```

✅ Open [http://localhost:3000](http://localhost:3000) in your browser!

### Step 5: Test It Out (30 seconds)

1. Click "Login" button
2. Enter your email (the one from `EMAIL_USER`)
3. Check your email for OTP (6-digit code)
4. Enter OTP and log in
5. Try generating a task plan!

---

## 🎉 Success!

You should now see:

- ✅ Landing page with dark theme
- ✅ Login working with OTP
- ✅ Task generation with Gemini AI
- ✅ Gantt chart visualization
- ✅ Task history accessible

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

- Check your `MONGODB_URI` has the correct password
- Verify MongoDB cluster is running (green status in Atlas)
- Add `0.0.0.0/0` to IP Whitelist in MongoDB Atlas → Security

### "OTP email not received"

- Check spam/junk folder
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Make sure you used App Password (not regular Gmail password)
- Confirm 2FA is enabled on Gmail

### "Gemini API error"

- Check your `GEMINI_API_KEY` is correct
- Verify API key is enabled in Google AI Studio
- Check you haven't exceeded free tier limits (60 requests/minute)

### "Invalid JWT Secret"

- Make sure `JWT_SECRET` is at least 32 characters long
- No special characters needed, just make it long

### Port 3000 already in use

```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

---

## 📝 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Next Steps

Once you're up and running:

1. **Customize the AI Prompt**

   - Edit `app/api/generate-plan/route.ts`
   - Modify the prompt to suit your needs

2. **Add More Features**

   - Task editing
   - Status updates
   - Export to PDF
   - Calendar integration

3. **Deploy to Production**

   - Use [Vercel](https://vercel.com/) for easy deployment
   - Set environment variables in Vercel dashboard
   - Connect your GitHub repo

4. **Share Your Project**
   - Push to GitHub
   - Add a demo video
   - Share with friends!

---

## 📚 Documentation

For more details, check out:

- **README.md** - Full project documentation
- **PROJECT_DOCUMENTATION.md** - Technical deep dive
- **DEMO_VIDEO_SCRIPT.md** - Recording guide
- **SUBMISSION_SUMMARY.md** - Project overview

---

## 🆘 Need Help?

- **Issues:** [GitHub Issues](https://github.com/KrishnaRandad2023/Smart-task-Planner/issues)
- **Email:** krishnavijay.randad2022@vitstudent.ac.in
- **Docs:** Check the README.md for detailed information

---

## ✅ Environment Variables Checklist

Before running, make sure `.env.local` has:

- [ ] `MONGODB_URI` (starts with `mongodb+srv://`)
- [ ] `GEMINI_API_KEY` (starts with `AIzaSy`)
- [ ] `EMAIL_USER` (your Gmail address)
- [ ] `EMAIL_PASSWORD` (16-character app password)
- [ ] `JWT_SECRET` (32+ random characters)

---

**That's it! You're ready to go! 🚀**

Built with ❤️ by Krishna Randad
