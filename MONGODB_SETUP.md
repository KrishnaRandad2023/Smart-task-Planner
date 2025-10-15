# MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for the Smart Task Planner.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Keep the default cluster name or change it
6. Click **"Create"**
7. Wait 3-5 minutes for cluster creation

## Step 3: Create a Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `taskplanner`)
5. Click **"Autogenerate Secure Password"** (save this password!)
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Configure Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` to allow connections from any IP
   - For production, restrict this to specific IPs
4. Click **"Confirm"**

## Step 5: Get Your Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Your Application

1. Open `.env.local` in your project
2. Replace `<username>` with your database username
3. Replace `<password>` with your database password
4. Add the database name: `/taskplanner` before the `?`
5. Your final connection string should look like:
   ```
   MONGODB_URI=mongodb+srv://taskplanner:YourPassword123@cluster0.abc123.mongodb.net/taskplanner?retryWrites=true&w=majority
   ```

### Example `.env.local` File

```bash
# Google Gemini API Key
GEMINI_API_KEY=AIzaSyAbc123...

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://taskplanner:MySecurePass123@cluster0.abc123.mongodb.net/taskplanner?retryWrites=true&w=majority
```

## Step 7: Test the Connection

1. Save your `.env.local` file
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Create a task plan in the app
4. Check MongoDB Atlas:
   - Go to **"Database"** → **"Browse Collections"**
   - You should see a `taskplanner` database
   - Inside, a `plans` collection with your saved plans

## Database Structure

### Database: `taskplanner`

### Collection: `plans`

Each document contains:

```json
{
  "_id": ObjectId,
  "goal": "Launch a product in 2 weeks",
  "totalEstimatedDuration": "2 weeks",
  "tasks": [
    {
      "id": "task-1",
      "title": "Market Research",
      "description": "...",
      "estimatedDuration": "2 days",
      "priority": "high",
      "dependencies": [],
      "deadline": "Day 2",
      "status": "pending"
    }
  ],
  "createdAt": ISODate
}
```

## Viewing Your Data

### Using MongoDB Atlas UI

1. Go to your cluster
2. Click **"Browse Collections"**
3. Navigate to `taskplanner` → `plans`
4. View, edit, or delete documents

### Using the API

**Get all plans:**

```bash
GET http://localhost:3000/api/plans
```

**Get a specific plan:**

```bash
GET http://localhost:3000/api/plans/[plan-id]
```

**Delete a plan:**

```bash
DELETE http://localhost:3000/api/plans/[plan-id]
```

## Troubleshooting

### Connection Error: "Authentication failed"

- Double-check your username and password
- Make sure there are no special characters that need URL encoding
- Try resetting the database user password

### Connection Error: "IP not whitelisted"

- Go to Network Access in MongoDB Atlas
- Make sure `0.0.0.0/0` is added (or your specific IP)
- Wait 2-3 minutes for changes to take effect

### Connection Error: "Cannot connect to server"

- Check that your internet connection is working
- Verify the cluster is running (not paused)
- Check for typos in the connection string

### Database Not Created

- The database is created automatically on first write
- Make sure you've generated at least one task plan
- Refresh the Collections view in MongoDB Atlas

## Security Best Practices

### For Production:

1. **Restrict IP Access**

   - Don't use `0.0.0.0/0` in production
   - Add only your server's IP addresses

2. **Use Strong Passwords**

   - Use MongoDB's password generator
   - Store passwords in environment variables only

3. **Limit User Permissions**

   - Create users with minimal required permissions
   - Use different users for different environments

4. **Enable Auditing**

   - Enable database access auditing in MongoDB Atlas
   - Monitor for suspicious activity

5. **Regular Backups**
   - MongoDB Atlas provides automatic backups
   - Test your restore process periodically

## Upgrading Your Cluster

The free M0 tier includes:

- 512 MB storage
- Shared RAM
- No backup/restore

To upgrade:

1. Go to your cluster
2. Click **"..."** → **"Edit Configuration"**
3. Choose a paid tier (M10+) for:
   - More storage
   - Better performance
   - Automated backups
   - Advanced security features

## Cost Information

- **M0 (Free Tier)**: $0/month - Perfect for development
- **M10 (Paid Tier)**: ~$10/month - Good for small production apps
- **Higher Tiers**: Scale as needed

## Next Steps

✅ Once connected, your app will:

- Automatically save all generated task plans
- Store them in MongoDB Atlas
- Make them retrievable via the API

🎉 You're all set! Your Smart Task Planner now has persistent storage.
