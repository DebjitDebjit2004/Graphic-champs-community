# Google OAuth Integration Setup Guide

## Overview
This project now uses Google OAuth for simplified authentication. Traditional email/password registration and OTP verification can still be used as an alternative.

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable **Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click Enable

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add Authorized JavaScript origins: `http://localhost:3000` (for development)
   - Add Authorized redirect URIs: `http://localhost:3000` (for development)
   - Click Create and copy the **Client ID**

### 2. Frontend Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Google Client ID to `.env.local`:
```
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_from_google_cloud
REACT_APP_API_URL=http://localhost:5000/api
```

3. Install dependencies (already done):
```bash
npm install @react-oauth/google
```

### 3. Backend Configuration

The backend is already configured to handle Google OAuth. The Google token is verified and a JWT token is generated for the application.

**Key changes:**
- User model now supports `googleId` and `authProvider` fields
- New endpoint: `POST /api/auth/google` handles Google authentication
- Password is now optional for Google OAuth users

### 4. Frontend Features

**Login Page:**
- Google OAuth button is functional
- Traditional email/password login still available
- Both methods return JWT token stored in localStorage

**Register Page:**
- Google OAuth signup available
- Traditional multi-step registration still available
- Google users are automatically verified

### 5. Authentication Flow

#### Google OAuth Flow:
1. User clicks "Sign in with Google"
2. Google login popup appears
3. User authenticates with Google
4. Frontend sends access token to backend
5. Backend verifies token and creates/finds user
6. Backend returns JWT token
7. User is logged in

#### Email/Password Flow:
1. User enters credentials
2. Backend verifies credentials
3. If new user, OTP is sent for verification
4. After verification, JWT token is returned
5. User is logged in

### 6. Security Notes

- Tokens are stored in localStorage (consider using httpOnly cookies in production)
- All API calls use JWT authentication
- Backend validates Google tokens
- Passwords are hashed using bcryptjs
- Protected routes require authentication

### 7. Environment Variables

**Frontend (.env.local):**
```
REACT_APP_GOOGLE_CLIENT_ID=xxx
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Backend (.env):**
```
PORT=5000
MONGODB_URI=xxx
JWT_SECRET=xxx
```

### 8. Removing Unnecessary Authentication

- ✅ Google OAuth is fully integrated
- ✅ Email/password login is kept as alternative
- ✅ Unnecessary social providers (GitHub, LinkedIn) removed from UI
- ✅ OTP verification kept but optional (only for email registration)
- ✅ All password validation retained for email users

### 9. Production Deployment

Before deploying to production:

1. Update Google Cloud credentials with production domain
2. Set `REACT_APP_API_URL` to production backend URL
3. Use environment-specific `.env` files
4. Enable HTTPS (required for Google OAuth)
5. Use httpOnly cookies instead of localStorage for tokens
6. Set strong `JWT_SECRET` in backend

### 10. Testing

**Test Google Login:**
1. Start backend: `npm start` (from backend folder)
2. Start frontend: `npm start` (from Frontend folder)
3. Go to http://localhost:3000
4. Click "Sign in with Google"
5. Use your Google account to login

**Test Email Login:**
1. Go to Register page
2. Enter credentials (multi-step form)
3. Verify email with OTP
4. Login with credentials

## Support

For issues with Google OAuth setup, refer to:
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Docs](https://www.npmjs.com/package/@react-oauth/google)
