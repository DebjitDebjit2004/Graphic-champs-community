import express from 'express';
import User from '../models/User.model.js';
import sendEmail from '../utils/emailService.js';
import generateOTP from '../utils/otpGenerator.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';

const router = express.Router();

// @desc    Send OTP to user's email
// @route   POST /api/auth/send-otp
// @access  Public
router.post('/send-otp', catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    // Validate email
    if (!email) {
        return next(new ErrorHandler('Please provide an email address', 400));
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Generate OTP and set expiry (10 minutes from now)
    const otp = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save OTP to user
    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    // Create email message
    const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Email Verification</h2>
            <p>Your OTP for email verification is:</p>
            <div style="background: #f4f4f4; padding: 10px; margin: 20px 0; font-size: 24px; letter-spacing: 5px; text-align: center;">
                ${otp}
            </div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p>Best regards,<br>Graphic Champs Team</p>
        </div>
    `;

    try {
        // Send email
        await sendEmail({
            email: user.email,
            subject: 'Your OTP for Email Verification',
            html: message
        });

        res.status(200).json({
            success: true,
            message: `OTP sent to ${user.email}`
        });
    } catch (error) {
        // If email sending fails, clear the OTP
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        
        return next(new ErrorHandler('Failed to send OTP. Please try again.', 500));
    }
}));

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
router.post('/verify-otp', catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
        return next(new ErrorHandler('Please provide email and OTP', 400));
    }

    // Find user with matching OTP that hasn't expired
    const user = await User.findOne({
        email,
        otp,
        otpExpire: { $gt: Date.now() } // Check if OTP is not expired
    });

    if (!user) {
        return next(new ErrorHandler('Invalid or expired OTP', 400));
    }

    // Mark user as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    // Generate JWT token
    const token = user.getJWTToken();

    // Set token in cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(200)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });
}));

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
router.post('/resend-otp', catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler('Please provide an email address', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save new OTP
    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    // Send email
    const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New OTP for Verification</h2>
            <p>Your new OTP is:</p>
            <div style="background: #f4f4f4; padding: 10px; margin: 20px 0; font-size: 24px; letter-spacing: 5px; text-align: center;">
                ${otp}
            </div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p>Best regards,<br>Graphic Champs Team</p>
        </div>
    `;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your New OTP for Verification',
            html: message
        });

        res.status(200).json({
            success: true,
            message: `New OTP sent to ${user.email}`
        });
    } catch (error) {
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return next(new ErrorHandler('Failed to resend OTP. Please try again.', 500));
    }
}));

export default router;
