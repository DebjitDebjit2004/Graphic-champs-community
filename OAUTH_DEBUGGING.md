# Google OAuth Debugging Guide

## How to Test Google OAuth Login

### Prerequisites
1. ✅ `.env` file configured with `VITE_GOOGLE_CLIENT_ID`
2. ✅ Backend running on `http://localhost:5000`
3. ✅ Frontend running on `http://localhost:3000`
4. ✅ Open DevTools: Press `F12` in browser

---

## Step-by-Step Testing

### Step 1: Open DevTools Console
```
Press F12 → Click "Console" tab
Look for any red error messages
```

### Step 2: Click Google Button
```
On Login page: Click red "Google" button
On Register page: Click red "Google" button
```

### Step 3: Check Console for Errors
Look for one of these messages:

**Expected (Good) Sequence:**
```
1. Console: "Loading..."
2. Google popup appears
3. You authenticate with Google
4. Pop-up closes
5. Redirect to home page
6. Console shows success message
```

**Possible Errors & Fixes:**

#### Error 1: "ReferenceError: process is not defined"
- **Status:** ✅ FIXED (we updated this)
- **Solution:** Refresh page (Ctrl+Shift+R for hard refresh)

#### Error 2: "Cannot read property 'googleLogin' of undefined"
- **Cause:** AuthContext not working
- **Solution:** Check App.jsx has `<GoogleOAuthProvider>` wrapper

#### Error 3: "Google authentication failed"
- **Check 1:** Go to Network tab (F12 → Network)
  - Click Google button
  - Look for request to `http://localhost:5000/api/auth/google`
  - Check response status (should be 200, not 400/500)
  
- **Check 2:** If response is 500 (server error)
  - Go to backend terminal
  - Look for error messages
  - Likely: Invalid token format or database issue

- **Check 3:** If response is 400 (bad request)
  - Token format might be wrong
  - Check backend is decoding token correctly

#### Error 4: Google popup doesn't appear
- **Cause:** Client ID might be wrong
- **Solution:** 
  ```
  1. Go to Google Cloud Console
  2. Copy Client ID
  3. Open .env file
  4. Paste: VITE_GOOGLE_CLIENT_ID=your_id
  5. Refresh browser (Ctrl+Shift+R)
  6. Try again
  ```

#### Error 5: "CORS Error" or "Access denied"
- **Check:** Backend CORS configuration
- **File:** `backend/server.js`
- **Should include:**
  ```javascript
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  ```

---

## Debugging Steps Using Browser DevTools

### Method 1: Check Network Requests

1. Open DevTools: `F12`
2. Click "Network" tab
3. Clear network log: Click circle icon
4. Click Google button on page
5. Look for requests:
   - ✅ Should see POST to `/auth/google`
   - Check response (green 200 = good)
   - Click request → "Response" tab → View data returned

### Method 2: Check LocalStorage

1. Open DevTools: `F12`
2. Click "Application" tab
3. Left sidebar → "Storage" → "Local Storage"
4. Click `http://localhost:3000`
5. Look for:
   - ✅ Key: `token`
   - Value: Should be JWT (long string with dots)

### Method 3: Check Console Logs

1. Add debug code to LoginForm.jsx before the handleGoogleLogin code:

```javascript
const handleGoogleLogin = useGoogleLogin({
  onSuccess: async (codeResponse) => {
    console.log('✅ Google auth success, received:', codeResponse);
    setIsGoogleLoading(true);
    try {
      console.log('📤 Sending token to backend...');
      const result = await googleLogin(codeResponse.access_token);
      console.log('📥 Backend response:', result);
      // ... rest of code
```

2. Open Console tab in DevTools
3. Click Google button
4. Watch console messages appear in sequence

---

## Backend Verification

### Check if Backend Route Exists

Open terminal where backend is running and look for startup logs:

```
Express app listening on port 5000
MongoDB connected successfully
```

### Test Backend Endpoint Directly

Using PowerShell:

```powershell
# First, get a valid Google token (from successful frontend Google auth)
# Then test with PowerShell:

$token = "your_google_access_token_here"
$body = @{
    token = $token
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/google" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

Expected response: `{ "success": true, "token": "...", "user": {...} }`

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Google button does nothing | Client ID wrong | Check `.env` file, refresh page |
| Popup closes but no login | Token not sent | Check Network tab for errors |
| 400 error from backend | Invalid token format | Check token is actually a JWT |
| 500 error from backend | Database/environment error | Check backend terminal logs |
| Token not saving | localStorage issue | Clear browser cache, try incognito mode |
| Redirect doesn't happen | navigate() not working | Check React Router setup in App.jsx |
| "Login successful" but no redirect | State not updating | Check AuthContext is properly wrapping app |

---

## Quick Verification Checklist

Before reporting an issue, verify:

- [ ] `.env` file has `VITE_GOOGLE_CLIENT_ID` (not `REACT_APP_`)
- [ ] Backend is running: `npm start` in backend folder
- [ ] Frontend is running: `npm start` in Frontend folder
- [ ] No red errors in browser console (F12)
- [ ] Google Client ID is correct (copy-paste from Google Cloud)
- [ ] MongoDB is connected (check backend logs)
- [ ] CORS is enabled in backend for `http://localhost:3000`

---

## Sample Test Credentials

If you want to test email/password login first:

**Note:** You need to register first via email to get credentials

```
Email: test@example.com
Password: Test@1234 (or whatever you registered)
```

To register:
1. Go to `/register`
2. Fill all 3 steps
3. Enter OTP from email
4. Then use those credentials to login

---

## Getting Help

If it's still not working:

1. **Screenshot error messages** from browser console
2. **Screenshot Network tab** showing failed request
3. **Check backend terminal** for error logs
4. **Verify `.env` file** has correct values
5. **Try incognito mode** (clears cache)
6. **Restart both servers** (stop and start again)
