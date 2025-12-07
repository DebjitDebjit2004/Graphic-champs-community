import express from 'express';
import { 
  registerUser, 
  verifyOtp, 
  resendOtp, 
  loginUser, 
  getMe, 
  logoutUser,
  googleAuth
} from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', loginUser);
router.post('/google', googleAuth);

// Protected routes
router.get('/me', isAuthenticated, getMe);
router.get('/logout', isAuthenticated, logoutUser);

export default router;