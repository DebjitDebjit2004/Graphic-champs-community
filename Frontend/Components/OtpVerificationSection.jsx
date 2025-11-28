import React, { useState, useEffect, useRef } from 'react';
import { 
  FaEnvelope, 
  FaCheck,
  FaRedo,
  FaClock,
  FaArrowLeft,
  FaShieldAlt
} from 'react-icons/fa';
import { authService } from '../src/services/auth.service';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from location state or use a default
  const email = location.state?.email || 'user@example.com';

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);

    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      await authService.requestOtp(email);
      setTimeLeft(60); // Reset the timer
      // Show success message or toast
      alert('New OTP has been sent to your email');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    // Check if all OTP digits are filled
    if (otp.some(digit => digit === '')) {
      setError('Please enter the complete OTP code');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    try {
      const otpCode = otp.join('');
      const response = await authService.verifyOtp(email, otpCode);
      
      // If verification is successful, you might want to redirect
      // or update the application state
      console.log('OTP verified successfully', response);
      
      // Redirect to dashboard or home page after successful verification
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError(error.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full">

        {/* Back Button */}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6">
          <FaArrowLeft />
          <span>Back to Login</span>
        </button>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
            <p className="text-gray-600">We've sent a 6-digit code to your email</p>
            <div className="flex items-center justify-center space-x-2 text-purple-600 mt-2">
              <FaEnvelope />
              <span className="font-medium">{email}</span>
            </div>
            {error && (
              <div className="mt-2 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* OTP Inputs */}
          <form onSubmit={handleVerify} className="space-y-6">
            <label className="text-sm font-medium text-gray-700">Enter Verification Code</label>

            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <div key={index} className="relative">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-2xl font-bold text-center bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <FaClock className="text-orange-500" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
                <span>remaining</span>
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isVerifying || otp.some(digit => digit === '')}
              className={`w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg transition-all ${
                isVerifying || otp.some(digit => digit === '') 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105'
              }`}
            >
              {isVerifying ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <button
                onClick={handleResendOtp}
                disabled={timeLeft > 0 || isResending}
                className={`font-semibold ${
                  timeLeft > 0 || isResending
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-purple-600 hover:text-purple-800'
                }`}
              >
                {isResending ? 'Sending...' : `Resend OTP${timeLeft > 0 ? ` (${formatTime(timeLeft)})` : ''}`}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements — FIXED WITH pointer-events-none */}
      <div className="absolute top-10 left-10 w-6 h-6 bg-purple-300 rounded-full opacity-20 animate-float pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-20 animate-float delay-1000 pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-blue-300 rounded-full opacity-20 animate-float delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-5 h-5 bg-cyan-300 rounded-full opacity-20 animate-float delay-3000 pointer-events-none"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default OTPVerificationPage;
