# Smart Task Planner - Setup Checklist ✅

## Before You Start

- [ ] Node.js 18+ is installed
- [ ] You have a Google account (for Gemini)
- [ ] You have a MongoDB Atlas account (free tier)

## Setup Steps

### 1. Gemini API Key Setup

- [ ] Go to https://aistudio.google.com/app/apikey
- [ ] Click "Create API Key"
- [ ] Copy the key (starts with `AIza...`)
- [ ] Open `.env.local` file
- [ ] Paste your key: `GEMINI_API_KEY=AIza...`

### 2. MongoDB Atlas Setup

- [ ] Go to https://cloud.mongodb.com/
- [ ] Create a free cluster (M0)
- [ ] Create a database user
- [ ] Add IP address (0.0.0.0/0 for development)
- [ ] Get connection string
- [ ] Replace `<password>` with your database password
- [ ] Add to `.env.local`: `MONGODB_URI=mongodb+srv://...`
- [ ] Save the file

**📖 Detailed guides available:**

- `GEMINI_SETUP.md` - Step-by-step Gemini guide
- `MONGODB_SETUP.md` - Step-by-step MongoDB guide

### 3. Install Dependencies

- [x] Dependencies already installed (Gemini & MongoDB)
- [ ] If you need to reinstall: `npm install`

### 4. Start Development Server

- [ ] Run: `npm run dev`
- [ ] Wait for "Ready in X ms"
- [ ] Server should be running on http://localhost:3000

### 5. Test the Application

- [ ] Open http://localhost:3000 in your browser
- [ ] You should see "Smart Task Planner" heading
- [ ] Enter a test goal (e.g., "Learn TypeScript in 2 weeks")
- [ ] Click "Generate Task Plan"
- [ ] You should see a task breakdown appear

## Verification Checklist

### File Structure ✅

- [x] `package.json` exists
- [x] `app/` directory with pages and API
- [x] `components/` directory with UI components
- [x] `types/` directory with TypeScript types
- [x] `.env.local` file (add your API key here)
- [x] `README.md` with documentation

### Key Files ✅

- [x] `app/page.tsx` - Home page
- [x] `app/layout.tsx` - Root layout
- [x] `app/api/generate-plan/route.ts` - API endpoint
- [x] `components/task-planner.tsx` - Main component
- [x] `components/task-list.tsx` - Task display
- [x] `components/ui/*` - shadcn/ui components
- [x] `types/index.ts` - Type definitions

### Configuration ✅

- [x] `tsconfig.json` - TypeScript config
- [x] `tailwind.config.ts` - Tailwind config
- [x] `next.config.js` - Next.js config
- [x] `components.json` - shadcn/ui config

## Common Issues & Solutions

### Issue: "Cannot find module '@google/generative-ai'"

**Solution**: Run `npm install` again

### Issue: "Gemini API key is not configured"

**Solution**:

1. Make sure `.env.local` exists
2. Check that `GEMINI_API_KEY=` has your actual key
3. Restart the dev server (`Ctrl+C`, then `npm run dev`)

### Issue: "Database is not configured" (Warning, not error)

**Solution**:

- This is optional - add MongoDB URI to enable persistence
- The app works without MongoDB, plans just won't be saved
- See `MONGODB_SETUP.md` for detailed setup

### Issue: Port 3000 already in use

**Solution**:

- Kill the process using port 3000, or
- Run on different port: `npm run dev -- -p 3001`

### Issue: TypeScript errors in editor

**Solution**:

- Editor hasn't loaded node_modules yet
- Wait a moment or restart VS Code
- Errors should disappear once dependencies are recognized

### Issue: Build errors

**Solution**:

```bash
rm -rf .next
npm run dev
```

## Ready to Deploy?

### Pre-deployment Checklist

- [ ] Application works locally
- [ ] All features tested
- [ ] Gemini API key works
- [ ] MongoDB connection works
- [ ] No console errors

### Deployment Steps (Vercel)

1. [ ] Create Vercel account
2. [ ] Connect GitHub repository
3. [ ] Add environment variables in Vercel:
   - `GEMINI_API_KEY`
   - `MONGODB_URI`
4. [ ] Deploy!

## What's Next?

Once everything is working:

1. **Customize the UI**

   - Edit colors in `tailwind.config.ts`
   - Modify components in `components/`

2. **Enhance the AI Prompt**

   - Edit `app/api/generate-plan/route.ts`
   - Modify the `buildPrompt()` function

3. **Add Features**

   - Database integration for saving plans
   - User authentication
   - Export to PDF or calendar
   - Team collaboration

4. **Optimize Performance**
   - Add caching
   - Implement rate limiting
   - Add loading skeletons

## Need Help?

- 📖 Read `README.md` for full documentation
- 🚀 Check `QUICKSTART.md` for quick tips
- 🏗️ Review `ARCHITECTURE.md` for technical details
- 📋 See `PROJECT_SUMMARY.md` for overview

## Final Check

- [ ] `.env.local` has your Gemini API key
- [ ] `.env.local` has your MongoDB URI
- [ ] `npm run dev` starts successfully
- [ ] http://localhost:3000 loads
- [ ] Can generate a task plan
- [ ] Plans are saved to MongoDB
- [ ] Can interact with tasks
- [ ] No console errors

---

If all items are checked, you're ready to go! 🎉
