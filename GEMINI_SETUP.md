# Google Gemini API Setup Guide

This guide will help you get a free Gemini API key and configure it for the Smart Task Planner.

## What is Gemini?

Google Gemini is a powerful AI model by Google that can understand and generate human-like text. We use it to intelligently break down your goals into actionable tasks.

## Why Gemini?

- ✅ **Free to use** with generous limits
- ✅ **Fast responses** with Gemini 1.5 Flash
- ✅ **JSON mode** for structured outputs
- ✅ **No credit card required** for free tier
- ✅ **Great performance** for task planning

## Step 1: Get Your Gemini API Key

1. **Go to Google AI Studio**

   - Visit: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**

   - Click **"Create API Key"**
   - Choose **"Create API key in new project"** (or select an existing project)
   - Your API key will be generated instantly

3. **Copy Your Key**
   - Click the **copy icon** to copy your API key
   - It will look like: `AIzaSyAbc123...`
   - **Keep it secret!** Don't share it publicly

## Step 2: Add to Your Project

1. Open `.env.local` in your project root
2. Add your API key:
   ```bash
   GEMINI_API_KEY=AIzaSyAbc123YourActualKeyHere
   ```
3. Save the file

### Complete `.env.local` Example

```bash
# Google Gemini API Key
GEMINI_API_KEY=AIzaSyAbc123YourActualKeyHere

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskplanner?retryWrites=true&w=majority
```

## Step 3: Test Your API Key

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open the app:**

   - Go to http://localhost:3000

3. **Generate a task plan:**
   - Enter a goal (e.g., "Learn TypeScript in 2 weeks")
   - Click "Generate Task Plan"
   - If it works, you're all set! 🎉

## API Usage Limits

### Free Tier

Gemini offers a generous free tier:

**Gemini Pro (Default):**

- ✅ 60 requests per minute (RPM)
- ✅ Generous token limits
- ✅ Perfect for development

**Gemini 1.5 Pro Latest:**

- ✅ 2 requests per minute
- ✅ 32,000 tokens per minute
- ✅ 50 requests per day

### What This Means

With the free tier, you can generate:

- **60 task plans per minute** (Pro model)
- **Thousands of requests per day**
- **Plenty for development and small-scale production!**

## Available Models

Our app uses **Gemini Pro** by default. You can change this in `app/api/generate-plan/route.ts`:

### 1. Gemini Pro (Default)

```typescript
model: "gemini-pro";
```

- ⚡ Good balance of speed and quality
- 💰 Free tier friendly
- ✅ Perfect for task planning
- **Recommended for most users**

### 2. Gemini 1.5 Pro Latest (Better Quality)

```typescript
model: "gemini-1.5-pro-latest";
```

- 🧠 More intelligent
- 📝 Better for complex goals
- ⏱️ Slightly slower
- 💰 Free tier available

### 3. Gemini 1.5 Flash Latest (Fastest)

```typescript
model: "gemini-1.5-flash-latest";
```

- 🆕 Latest fast model
- ⚡ Very fast responses
- ✅ Good quality
- 💰 Free tier available

## Monitoring Your Usage

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click on your project
3. View usage statistics and quotas

## Error Messages

### "Gemini API key is not configured"

**Solution:**

- Check that `.env.local` has your API key
- Restart the dev server after adding the key
- Make sure there are no spaces around the `=`

### "API key not valid"

**Solution:**

- Make sure you copied the entire key
- Try generating a new API key
- Check for any extra characters or spaces

### "Resource has been exhausted" (HTTP 429)

**Solution:**

- You've hit the rate limit
- Wait a minute and try again
- Consider upgrading to Gemini 1.5 Pro or paid tier

### "Invalid request"

**Solution:**

- The prompt might be too long
- Try a shorter goal description
- Check the API status at [Google Cloud Status](https://status.cloud.google.com/)

## Best Practices

### 1. Keep Your Key Secret

```bash
# ❌ DON'T commit .env.local to git
# ✅ It's already in .gitignore

# ❌ DON'T share your key publicly
# ✅ Use environment variables only
```

### 2. Use Environment Variables

```typescript
// ✅ Good - reads from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// ❌ Bad - hardcoded key
const genAI = new GoogleGenerativeAI("AIzaSy...");
```

### 3. Handle Errors Gracefully

Our app already handles errors, but you can enhance them:

- Add retry logic for rate limits
- Cache responses for common goals
- Implement fallback responses

### 4. Optimize Token Usage

- Keep goal descriptions concise
- Remove unnecessary context
- Use shorter timeframes when possible

## Upgrading to Paid Tier

If you need more requests:

1. **Go to Google Cloud Console**

   - Visit: [https://console.cloud.google.com/](https://console.cloud.google.com/)

2. **Enable Billing**

   - Add a payment method
   - You'll still get the free tier included!

3. **Increased Limits**
   - 1,000+ requests per minute
   - Pay only for what you use beyond free tier
   - Approximately $0.00015 per 1K characters

### Pricing (Beyond Free Tier)

**Gemini Pro:**

- Free tier is very generous
- Paid tier (if needed): Very affordable
- Input: ~$0.50 / 1M tokens
- Output: ~$1.50 / 1M tokens

**Gemini 1.5 Pro:**

- Input: $1.25 / 1M tokens
- Output: $5.00 / 1M tokens

## Comparing with Other AI APIs

| Feature         | Gemini Flash | OpenAI GPT-4 | Claude       |
| --------------- | ------------ | ------------ | ------------ |
| **Free Tier**   | ✅ Yes       | ❌ No        | ❌ Limited   |
| **Speed**       | ⚡ Very Fast | 🐢 Slow      | ⚡ Fast      |
| **Quality**     | ✅ Excellent | ✅ Excellent | ✅ Excellent |
| **JSON Mode**   | ✅ Native    | ✅ Yes       | ⚠️ Partial   |
| **Rate Limits** | ✅ Generous  | ⚠️ Strict    | ⚠️ Moderate  |
| **Cost**        | 💰 Low       | 💰💰 High    | 💰💰 High    |

## Troubleshooting Tips

### Rate Limit Issues

```typescript
// Add exponential backoff retry logic
async function generateWithRetry(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      if (error.status === 429 && i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}
```

### Response Quality Issues

- Try Gemini 1.5 Pro for better results
- Add more context to your prompt
- Be more specific in your goal description
- Check the system prompt in the API route

## Security Checklist

- [ ] API key is in `.env.local` (not committed)
- [ ] `.env.local` is in `.gitignore`
- [ ] Environment variables are used (not hardcoded)
- [ ] API key is secret (not shared)
- [ ] Production deployment uses env vars
- [ ] Rate limiting is considered

## Next Steps

✅ **You're Ready!**

Your Smart Task Planner is now powered by Google Gemini:

- Fast AI-generated task breakdowns
- Smart dependency detection
- Realistic timeline estimation
- Priority assignment

🎉 Start planning your goals now!

## Additional Resources

- 📚 [Gemini API Documentation](https://ai.google.dev/docs)
- 💡 [Google AI Studio](https://aistudio.google.com/)
- 🔧 [SDK Reference](https://ai.google.dev/api/node)
- 📊 [Pricing Calculator](https://ai.google.dev/pricing)
