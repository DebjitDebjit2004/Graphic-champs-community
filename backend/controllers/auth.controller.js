import User from '../models/User.model.js';
import sendEmail from '../utils/emailService.js';
import generateOTP from '../utils/otpGenerator.js';
import ErrorHandler from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, gender, dob } = req.body;

        // Validate input
        if (!name || !email || !password || !phone) {
            return next(new ErrorHandler('Please provide all required fields', 400));
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler('User already exists', 400));
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = generateOTP();
        const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            dob,
            otp,
            otpExpire,
            isVerified: false
        });

        // Send verification email
        const message = `Your OTP for registration is: ${otp}. It will expire in 10 minutes.`;
        
        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification OTP',
                message
            });

            res.status(201).json({
                success: true,
                message: `OTP sent to ${user.email}`,
                userId: user._id
            });
        } catch (error) {
            // If email fails to send, delete the user
            await User.findByIdAndDelete(user._id);
            return next(new ErrorHandler('Email could not be sent', 500));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // Validate input
        if (!email || !otp) {
            return next(new ErrorHandler('Please provide email and OTP', 400));
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        // Check if OTP matches and is not expired
        if (user.otp !== otp) {
            return next(new ErrorHandler('Invalid OTP', 400));
        }

        if (user.otpExpire < Date.now()) {
            return next(new ErrorHandler('OTP has expired', 400));
        }

        // Update user
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Remove password from output
        user.password = undefined;

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler('Email is required', 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Update user with new OTP
        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();

        // Send verification email
        const message = `Your new OTP for registration is: ${otp}. It will expire in 10 minutes.`;
        
        try {
            await sendEmail({
                email: user.email,
                subject: 'New Verification OTP',
                message
            });

            res.status(200).json({
                success: true,
                message: `New OTP sent to ${user.email}`
            });
        } catch (error) {
            return next(new ErrorHandler('Email could not be sent', 500));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return next(new ErrorHandler('Please provide email and password', 400));
        }

        // Check if user exists and is verified
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorHandler('Invalid credentials', 401));
        }

        if (!user.isVerified) {
            return next(new ErrorHandler('Please verify your email first', 401));
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler('Invalid credentials', 401));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Remove password from output
        user.password = undefined;

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logoutUser = async (req, res, next) => {
    try {
        // In a stateless JWT system, the client should remove the token
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};
