import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import authService from '../../../services/auth.service';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-verify for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && location.state?.email) {
      const testOtp = '123456';
      setOtp(testOtp.split(''));
      // Auto-submit after a small delay
      const timer = setTimeout(() => {
        handleSubmit(testOtp);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.email]);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      toast.error('No email provided. Please register again.');
      navigate('/register');
    }
  }, [location, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value && isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);
    setError('');
    
    // Auto-focus next input if current input has a value
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit if all fields are filled
    if (newOtp.every(num => num !== '') && newOtp.length === 6) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move left with arrow key
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Move right with arrow key
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (otpCode) => {
    if (isLoading) return;
    
    const otpString = typeof otpCode === 'string' ? otpCode : otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authService.verifyOtp(email, otpString);
      
      if (response.success) {
        toast.success('Email verified successfully!');
        
        // If coming from registration, redirect to login with success message
        if (location.state?.from === 'register') {
          navigate('/login', { 
            state: { 
              email,
              from: 'verification',
              message: 'Registration successful! Please login with your credentials.'
            } 
          });
        } else {
          // If already logged in (e.g., email change), go to profile
          navigate('/profile', { state: { message: 'Email verified successfully!' } });
        }
      } else {
        throw new Error(response.message || 'Verification failed');
      }
      
    } catch (error) {
      console.error('OTP Verification Error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Invalid OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
      // Clear OTP on error for better UX
      setOtp(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || countdown > 0) return;
    
    setIsResending(true);
    try {
      await authService.requestOtp(email);
      setCountdown(30);
      setError('');
      toast.success('New OTP has been sent to your email');
      
      // Focus first input field after resend
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
      
    } catch (error) {
      console.error('Resend OTP Error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      
    } finally {
      setIsResending(false);
    }
  };

  // Loading state
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verification...</p>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Verified!</h2>
          <p className="text-gray-600 mb-8">Your email has been successfully verified. Redirecting to login...</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to{' '}
            <span className="font-medium text-blue-600">{email}</span>
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <form 
          className="mt-8 space-y-6" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(otp.join(''));
          }}
        >
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedData = e.clipboardData.getData('text/plain').trim();
                  if (/^\d{6}$/.test(pastedData)) {
                    const newOtp = pastedData.split('').slice(0, 6);
                    setOtp(newOtp);
                    handleSubmit(pastedData.slice(0, 6));
                  }
                }}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                } transition-colors`}
                disabled={isLoading}
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || otp.some(digit => !digit)}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading || otp.some(digit => !digit) ? 'opacity-70 cursor-not-allowed' : ''
              } transition-all duration-200 shadow-md`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending || countdown > 0}
                className={`font-medium ${
                  isResending || countdown > 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                {isResending ? (
                  'Sending...'
                ) : countdown > 0 ? (
                  `Resend in ${countdown}s`
                ) : (
                  'Resend OTP'
                )}
              </button>
            </p>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Having trouble? Contact support at{' '}
            <a href="mailto:support@graphicchamps.com" className="text-blue-600 hover:underline">
              support@graphicchamps.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
