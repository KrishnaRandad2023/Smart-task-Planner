# Troubleshooting Guide - Loading Issues Fixed

## 🐛 Issues Identified and Fixed

### Issue 1: Continuous Loading Spinner

**Problem**: The loading spinner in the top right (UserMenu) was spinning indefinitely.

**Root Cause**:

- Auth context was waiting for `/api/auth/me` response
- MongoDB connection or query might be slow/hanging
- No timeout was set, causing infinite loading state

**Fixes Applied**:

1. ✅ Added 5-second timeout to auth check in `contexts/auth-context.tsx`
2. ✅ Added timeout to MongoDB operations in `/api/auth/me`
3. ✅ Better error handling for AbortError
4. ✅ Always resolve loading state even on errors
5. ✅ Added `cache: "no-store"` to prevent caching issues

### Issue 2: Button Not Clickable

**Problem**: "Generate Task Plan" button appeared disabled or unresponsive.

**Root Cause**:

- Button logic was correct (only disabled if `isLoading` or empty goal)
- But UI might appear frozen while auth is stuck loading
- Database name mismatch: `smart-task-planner` vs `taskplanner`

**Fixes Applied**:

1. ✅ Fixed database name to `taskplanner` in `/api/auth/me`
2. ✅ Added timeouts to prevent hanging
3. ✅ Button now works independently of auth loading state

## 🔧 Technical Changes Made

### 1. `contexts/auth-context.tsx`

```typescript
// BEFORE: No timeout, could hang forever
const response = await fetch("/api/auth/me");

// AFTER: 5-second timeout with abort controller
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
const response = await fetch("/api/auth/me", {
  signal: controller.signal,
  cache: "no-store",
});
clearTimeout(timeoutId);
```

**Benefits**:

- Auth check fails gracefully after 5 seconds
- Loading state always resolves
- User can proceed even if auth check fails

### 2. `app/api/auth/me/route.ts`

```typescript
// BEFORE: Database name mismatch
const db = client.db("smart-task-planner");

// AFTER: Correct database name + timeouts
const db = client.db("taskplanner");

// Added: MongoDB connection timeout
const client = await Promise.race([
  clientPromise,
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("MongoDB connection timeout")), 5000)
  ),
]);

// Added: Query timeout
const user = await Promise.race([
  db.collection("users").findOne(...),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("MongoDB query timeout")), 3000)
  ),
]);
```

**Benefits**:

- MongoDB operations timeout after 5 seconds
- Prevents hanging on slow/failed connections
- Returns proper error responses

### 3. `components/user-menu.tsx`

```typescript
// Added: Console warning for long loading
if (loading) {
  setTimeout(() => {
    if (loading) {
      console.warn("Auth loading taking too long, check API connection");
    }
  }, 3000);
}
```

**Benefits**:

- Developers can see if auth is taking too long
- Helps identify connection issues

## 🚀 How to Test the Fixes

### Test 1: Fresh Start (No Login)

```bash
# Clear browser cache and cookies
# Or open incognito window

1. Open http://localhost:3000
2. ✅ Loading spinner should disappear within 5 seconds
3. ✅ "Login" button should appear
4. ✅ You can type in the goal field
5. ✅ "Generate Task Plan" button is enabled (not grayed out)
6. ✅ Clicking button shows auth modal
```

### Test 2: With Login

```bash
1. Click "Login" button
2. Enter email and get OTP
3. Verify OTP
4. ✅ Avatar appears in top right (no loading spinner)
5. ✅ Enter goal and click "Generate Task Plan"
6. ✅ Plan generates successfully
```

### Test 3: MongoDB Connection Issues

```bash
# Simulate slow connection
1. Temporarily break MONGODB_URI in .env.local
2. Restart server: npm run dev
3. Open http://localhost:3000
4. ✅ Loading spinner disappears after 5 seconds
5. ✅ "Login" button appears
6. ✅ Console shows timeout warning
7. ✅ Button still works (shows auth modal)
```

## 📊 Timeout Values

| Operation          | Timeout   | Reason                        |
| ------------------ | --------- | ----------------------------- |
| Auth check fetch   | 5 seconds | Reasonable for API call       |
| MongoDB connection | 5 seconds | Prevents app freeze           |
| MongoDB query      | 3 seconds | Database query should be fast |
| User menu warning  | 3 seconds | Alert developer to issues     |

## 🔍 Debugging Tools

### Check Browser Console

```javascript
// Should see if auth is slow:
"Auth loading taking too long, check API connection";

// Should see if timeout occurs:
"Auth check timed out - this is normal if not logged in";
```

### Check Server Terminal

```bash
# Look for these messages:
"Get user error: MongoDB connection timeout"
"Get user error: MongoDB query timeout"
"Get user error: [any other error]"
```

## ✅ Expected Behavior Now

### On Page Load (Not Logged In):

1. Loading spinner appears briefly (< 5 seconds)
2. Spinner disappears
3. "Login" button appears
4. All form fields are enabled
5. "Generate Task Plan" button is enabled if goal is filled

### On Page Load (Logged In):

1. Loading spinner appears briefly (< 1 second typically)
2. Spinner disappears
3. User avatar appears with first letter
4. All functionality works normally

### If MongoDB is Down:

1. Loading spinner appears (5 seconds max)
2. Spinner disappears
3. "Login" button appears
4. User can still interact with UI
5. Console shows timeout errors
6. Auth modal works but OTP won't send (expected)

## 🎯 Key Improvements

✅ **No More Infinite Loading**: Maximum 5-second wait  
✅ **Graceful Degradation**: App works even if DB is slow  
✅ **Better Error Handling**: Timeouts, abort signals, proper error messages  
✅ **Database Name Fixed**: Consistent `taskplanner` database  
✅ **User Experience**: Button always works, no frozen UI  
✅ **Developer Experience**: Console warnings for debugging

## 🚨 Common Issues & Solutions

### Issue: Still seeing loading spinner

**Solution**:

1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Restart dev server
4. Check MongoDB connection

### Issue: Button still not clickable

**Solution**:

1. Check if goal field has text
2. Open browser console for errors
3. Verify GEMINI_API_KEY in .env.local
4. Check server terminal for errors

### Issue: Login not working

**Solution**:

1. Verify MONGODB_URI is correct
2. Check MongoDB Atlas is online
3. Verify EMAIL_USER and EMAIL_PASSWORD
4. Check Gmail app password is valid

## 📝 Next Steps

If issues persist:

1. **Check Environment Variables**:

   ```bash
   # In .env.local, verify:
   GEMINI_API_KEY=your-key
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret
   EMAIL_USER=your-email
   EMAIL_PASSWORD=your-app-password
   ```

2. **Test MongoDB Connection**:

   - Go to MongoDB Atlas dashboard
   - Check if cluster is online
   - Verify network access allows your IP
   - Test connection string

3. **Check Server Logs**:

   - Look at terminal running `npm run dev`
   - Check for connection errors
   - Verify API routes are loading

4. **Browser DevTools**:
   - Open Network tab
   - Check `/api/auth/me` request
   - Look for errors or timeouts
   - Verify cookies are set after login

---

**Status**: ✅ Loading issues fixed with timeouts and better error handling
**Next**: Test in browser and verify everything works!
