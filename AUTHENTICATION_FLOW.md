# Authentication Flow Documentation

## Current Status
✅ Google OAuth is fully integrated
✅ Traditional Email/Password login still available
✅ Environment variables configured with Google Client ID

---

## 🔐 Google OAuth Login & Register Flow

### Step 1: Frontend - Google Button Click
**File:** `LoginForm.jsx` / `RegisterForm.jsx`

```
User clicks "Sign in with Google" button
↓
onClick handler triggers handleGoogleLogin()
↓
useGoogleLogin hook (from @react-oauth/google) opens Google popup
↓
User authenticates with Google account
↓
Google returns access_token to frontend
```

### Step 2: Send Token to Backend
**File:** `AuthContext.jsx` → `auth.service.js`

```
googleLogin(access_token) is called from context
↓
authService.googleAuth(token) posts token to /api/auth/google
↓
Headers include: { 'Content-Type': 'application/json' }
Request body: { token: access_token }
```

### Step 3: Backend - Token Verification & User Creation
**File:** `backend/controllers/auth.controller.js` → `googleAuth` function

```
Backend receives token
↓
Decodes JWT token to extract: email, name, picture, googleId (sub)
↓
Checks if user exists in database
    ├─ IF NEW USER: Creates user with authProvider='google', isVerified=true
    └─ IF EXISTING USER: Links googleId to email user, sets authProvider='google'
↓
Generates JWT token (30 days expiration)
↓
Returns: { success: true, token: JWT, user: userData, message: "..." }
```

### Step 4: Frontend - Store & Redirect
**File:** `AuthContext.jsx` → `LoginForm.jsx` / `RegisterForm.jsx`

```
Receives response with JWT token
↓
Stores token in localStorage: localStorage.setItem('token', response.token)
↓
Updates AuthContext state: setCurrentUser(response.user)
↓
Shows success toast message
↓
Redirects to home page: navigate('/')
```

---

## 📧 Email/Password Login Flow

### Step 1: Enter Credentials
**File:** `LoginForm.jsx`

```
User enters email and password
↓
Validates form (email format, password length)
↓
Clicks "Sign In" button
↓
handleSubmit is triggered
```

### Step 2: Send to Backend
**File:** `auth.service.js`

```
login(credentials) posts to /api/auth/login
Request body: { email: string, password: string }
```

### Step 3: Backend - Authentication
**File:** `backend/controllers/auth.controller.js` → `loginUser` function

```
Backend finds user by email
↓
Compares password hash using bcrypt
    ├─ IF PASSWORD MATCHES: Generate JWT token
    └─ IF PASSWORD MISMATCH: Return 400 error
↓
Returns: { success: true, token: JWT, user: userData }
```

### Step 4: Frontend - Store & Redirect
```
Same as Google OAuth Step 4
Stores token → Updates context → Shows toast → Redirects
```

---

## 📝 Email/Password Registration Flow

### Step 1: Multi-Step Form
**File:** `RegisterForm.jsx`

```
STEP 1: Enter basic info
├─ Full Name (required)
├─ Email (required, validated)
├─ Phone (required, validated)
└─ Next button

↓

STEP 2: Personal info
├─ Gender (required)
├─ Date of Birth (required, age ≥ 13)
└─ Next button

↓

STEP 3: Security
├─ Password (8+ chars, uppercase, lowercase, number)
├─ Confirm Password (must match)
├─ Accept Terms & Conditions
└─ Register button
```

### Step 2: Send Registration Data
**File:** `auth.service.js`

```
register(userData) posts to /api/auth/register
Request body: {
  name: string,
  email: string,
  password: string (hashed on backend),
  phone: string,
  gender: string,
  dob: date
}
```

### Step 3: Backend - User Creation
**File:** `backend/controllers/auth.controller.js` → `registerUser` function

```
Validates all required fields
↓
Checks if email already exists
    └─ IF EXISTS: Return 400 error
↓
Hashes password using bcrypt
↓
Generates OTP (6 digits)
↓
Creates user with: isVerified=false, authProvider='email'
↓
Sends OTP email to user
↓
Returns: { userId: ..., message: "OTP sent to email" }
```

### Step 4: OTP Verification
**File:** `OtpPage.jsx` → `OtpVerification.jsx`

```
User receives OTP email
↓
User enters OTP in form
↓
Frontend posts to /api/auth/verify-otp
Request: { email: string, otp: string }
↓
Backend validates OTP (correct & not expired)
↓
If valid: Sets isVerified=true, generates JWT token
↓
Returns: { token: JWT, user: userData }
↓
Frontend stores token → Updates context → Redirects to home
```

---

## 🔑 Token Storage & Usage

### Where Tokens Are Stored
```
localStorage.setItem('token', jwtToken)
```

### Token Format
```
JWT (JSON Web Token)
3 parts separated by dots: header.payload.signature

Example structure:
{
  id: userId,
  iat: issuedAt,
  exp: expiresIn (30 days)
}
```

### How Token Is Used
```
Every API request includes token in header:
Authorization: Bearer <token>

This is handled automatically by axios interceptor in config/api.js
```

### Token Validation on App Load
**File:** `AuthContext.jsx` → useEffect

```
On app load:
├─ Checks if token exists in localStorage
├─ If exists: Decodes JWT payload
├─ Extracts user ID from token
├─ Updates currentUser state
└─ setLoading(false) → Shows app

On logout:
├─ Removes token from localStorage
├─ Clears currentUser state
└─ Redirects to login
```

---

## 🚀 Quick Summary

| Method | Steps | OTP Required | Password Required |
|--------|-------|--------------|-------------------|
| **Google OAuth** | 2 steps (button → verify) | ❌ No | ❌ No |
| **Email Login** | 1 step (credentials) | ❌ No | ✅ Yes |
| **Email Register** | 3 steps + OTP (form → OTP verify) | ✅ Yes | ✅ Yes |

---

## 🔧 Troubleshooting

### "Google login not working"
- ✅ Check: Google Client ID in `.env` file matches Google Cloud Console
- ✅ Check: `VITE_GOOGLE_CLIENT_ID` prefix (not `REACT_APP_`)
- ✅ Check: Browser console for errors (F12 → Console)
- ✅ Check: Backend server is running on `http://localhost:5000`

### "Backend connection error"
- ✅ Ensure `VITE_API_URL=http://localhost:5000/api` in `.env`
- ✅ Check backend is running: `npm start` in backend folder
- ✅ Check MongoDB connection in backend `.env`
- ✅ Check network tab in browser DevTools (F12 → Network)

### "Token not persisting"
- ✅ Check if localStorage is enabled in browser
- ✅ Check if token is returned from backend correctly
- ✅ Clear localStorage and try again: `localStorage.clear()`

### "Protected routes not working"
- ✅ Verify token is stored in localStorage
- ✅ Check if isAuthenticated state is updating in AuthContext
- ✅ Verify ProtectedRoute component logic (currently bypassed in dev mode)

---

## 📱 Environment Variables

### Frontend (.env file)
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_ENV=development
```

### Backend (.env file)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

---

## 🎯 Next Steps

1. **Test Google Login**
   - Click "Sign in with Google" button
   - Authenticate with your Google account
   - Verify redirection to home page

2. **Test Email Login**
   - Use credentials from email registration
   - Verify token is stored

3. **Monitor Backend Logs**
   - Check terminal where backend is running
   - Look for successful API calls: `POST /api/auth/google`

4. **Check Browser DevTools**
   - F12 → Console: Look for errors
   - F12 → Network: Check API requests and responses
   - F12 → Application → Storage → LocalStorage: Verify token storage
