# Quick Start Guide 🚀

## Setup Steps

1. **Add Your API Keys**

   - Open `.env.local` file

   **Gemini API Key:**

   - Get from: https://aistudio.google.com/app/apikey
   - Add: `GEMINI_API_KEY=your-key-here`

   **MongoDB Atlas:**

   - Get from: https://cloud.mongodb.com/
   - Create a free cluster
   - Click "Connect" → "Drivers"
   - Copy connection string
   - Add: `MONGODB_URI=mongodb+srv://...`

   - Save the file

2. **Start the Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Go to: http://localhost:3000

## First Time Using the App

1. Enter a goal (e.g., "Build a mobile app in 3 months")
2. Optionally add:
   - Timeframe (e.g., "3 months")
   - Additional context (e.g., "Small team, limited budget")
3. Click "Generate Task Plan"
4. View your AI-generated task breakdown!
5. Click on tasks to:
   - View details
   - See dependencies
   - Update status (pending → in-progress → completed)

## Example Goals to Try

- "Launch a product in 2 weeks"
- "Learn React and build a portfolio in 3 months"
- "Plan a wedding in 6 months"
- "Write and publish a book in 1 year"
- "Start a podcast with weekly episodes"
- "Organize a company team-building event"
- "Create a YouTube channel and reach 1000 subscribers"

## Troubleshooting

### "Gemini API key is not configured"

- Make sure you've added your Gemini API key to `.env.local`
- Restart the dev server after adding the key

### "Database is not configured" (Optional)

- MongoDB is optional but recommended
- Add your MongoDB Atlas connection string to use database features
- The app will work without MongoDB, but plans won't be saved

### Dependencies issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

```bash
npm run dev -- -p 3001
```

## Need Help?

Check the full README.md for detailed documentation and API reference.
