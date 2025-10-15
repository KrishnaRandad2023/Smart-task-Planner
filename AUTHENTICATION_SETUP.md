# Authentication Setup Instructions

## Overview

Your Smart Task Planner now has email-based authentication using OTP (One-Time Password). Users must login to create and access their task history.

## Email Configuration Required

To enable authentication, you need to configure Gmail SMTP credentials in your `.env.local` file.

### Steps to Setup Gmail App Password:

1. **Open Gmail Account Settings**

   - Go to https://myaccount.google.com/
   - Sign in with your Gmail account

2. **Enable 2-Factor Authentication** (if not already enabled)

   - Go to Security → 2-Step Verification
   - Follow the setup wizard
   - This is required to generate app passwords

3. **Generate App Password**

   - Go to Security → 2-Step Verification → App passwords
   - Or visit: https://myaccount.google.com/apppasswords
   - Select "Mail" for app type
   - Select "Other" for device type
   - Enter a custom name like "Smart Task Planner"
   - Click "Generate"
   - **Copy the 16-character password** (shown without spaces)

4. **Update `.env.local` File**

   - Open `d:\super_projects\smart-task-manager-final\.env.local`
   - Replace the placeholder values:

   ```env
   # Your Gmail address
   EMAIL_USER=your-email@gmail.com

   # The 16-character app password (without spaces)
   EMAIL_PASSWORD=your-16-char-app-password
   ```

   Example:

   ```env
   EMAIL_USER=taskplanner@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```

5. **Restart Development Server**
   ```bash
   # Stop the current server (Ctrl+C)
   # Start again
   npm run dev
   ```

## How Authentication Works

### User Flow:

1. User clicks "Login" button in header
2. User enters their email address
3. System generates a 6-digit OTP
4. OTP is sent to user's email (valid for 10 minutes)
5. User enters the OTP code
6. System verifies OTP and creates a session
7. User is logged in with JWT token (valid for 7 days)

### Technical Details:

- **OTP Generation**: 6-digit random code
- **OTP Expiry**: 10 minutes
- **JWT Token**: Stored in httpOnly cookie (secure)
- **Token Expiry**: 7 days
- **Database**: MongoDB Atlas stores user data
- **Email Template**: Beautiful HTML email with branding

### API Endpoints:

- `POST /api/auth/send-otp` - Generate and send OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user
- `POST /api/generate-plan` - Generate task plan (requires auth)
- `GET /api/tasks/history` - Get user's task history (requires auth)

## User-Specific Features

### Individual Task History:

- Each user's tasks are stored separately in MongoDB
- Tasks are linked to user via `userId` field
- Users can only see their own task history
- Task history includes:
  - Goal and description
  - All tasks with status
  - Creation timestamp
  - Estimated duration

### Protected Routes:

- Task generation requires authentication
- Unauthenticated users see login prompt
- After login, task generation continues automatically

## Testing Authentication

1. Start the development server: `npm run dev`
2. Open http://localhost:3000
3. Try to generate a task plan
4. Login modal should appear
5. Enter your email address
6. Check your email for the OTP code
7. Enter the OTP to login
8. Task generation should continue
9. Your task history is now saved to your account

## Troubleshooting

### Email Not Sending:

- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env.local`
- Verify 2FA is enabled on Gmail account
- Ensure app password is correct (16 characters)
- Check spam/junk folder for emails
- Restart development server after changing `.env.local`

### OTP Expired:

- OTP is valid for 10 minutes only
- Click "Resend" to get a new OTP
- Check your email's timestamp

### Session Expired:

- JWT tokens expire after 7 days
- Login again to create new session
- Check browser cookies for `auth-token`

### Database Issues:

- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB Atlas connection
- Ensure network access is configured in MongoDB Atlas

## Security Features

✅ **Password-less Authentication** - No passwords to remember or store
✅ **Time-limited OTPs** - Codes expire after 10 minutes
✅ **HttpOnly Cookies** - JWT tokens not accessible to JavaScript
✅ **Secure Sessions** - 7-day token expiry with auto-renewal
✅ **Email Verification** - Only verified email owners can access
✅ **User Isolation** - Each user sees only their own data

## Next Steps

After setting up email credentials:

1. ✅ Configure `EMAIL_USER` and `EMAIL_PASSWORD`
2. ✅ Restart development server
3. ✅ Test login flow with your email
4. ✅ Generate a task plan
5. ✅ Check task is saved to your account
6. ✅ Logout and login again to verify persistence

## Support

If you encounter any issues:

1. Check all environment variables in `.env.local`
2. Verify MongoDB connection
3. Check browser console for errors
4. Review server terminal logs
5. Ensure Gmail app password is correct

---

**Important**: Never commit your `.env.local` file to version control. Keep your email credentials secure.
