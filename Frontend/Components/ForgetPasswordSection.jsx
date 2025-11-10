import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaArrowLeft,
  FaRocket,
  FaPalette,
  FaKey,
  FaShieldAlt, // Replaced FaShieldHeart with FaShieldAlt
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [step, setStep] = useState(1); // 1: Email input, 2: Success message

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setStep(2);
    }, 2000);
  };

  const handleReset = () => {
    setEmail('');
    setIsSent(false);
    setStep(1);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Success Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
            {/* Animated Success Icon */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
              
              {/* Confetti Animation */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-ping delay-1000"></div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-full animate-ping delay-2000"></div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email!</h2>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                We've sent a password reset link to:
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 font-medium">
                <FaEnvelope />
                <span>{email}</span>
              </div>
              <p className="text-sm text-gray-500">
                The link will expire in 30 minutes for security reasons.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-800 transform hover:scale-105 transition-all duration-300"
              >
                Resend Email
              </button>
              
              <button
                onClick={handleReset}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
              >
                Back to Login
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 text-green-700 text-sm">
                <FaShieldAlt className="text-green-500" />
                <span>Your account security is our priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-300">
          <FaArrowLeft />
          <span>Back to Login</span>
        </button>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Animated Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <FaKey className="text-white text-2xl" />
              </div>
              
              {/* Floating Key Animation */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce">
                <div className="w-full h-full flex items-center justify-center text-white text-xs">🔑</div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-1000">
                <div className="w-full h-full flex items-center justify-center text-white text-xs">🔒</div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email}
              className={`w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 ${
                isLoading || !email
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:from-orange-600 hover:to-red-600 hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaPaperPlane className="mr-2" />
                  Send Reset Link
                </div>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-blue-500 text-xs" />
              </div>
              <span>Secure and encrypted process</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <FaRocket className="text-green-500 text-xs" />
              </div>
              <span>Reset link expires in 30 minutes</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <FaPalette className="text-purple-500 text-xs" />
              </div>
              <span>Check spam folder if you don't see it</span>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute top-10 left-10 w-6 h-6 bg-orange-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-red-300 rounded-full opacity-20 animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 bg-pink-300 rounded-full opacity-20 animate-float delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-rose-300 rounded-full opacity-20 animate-float delay-3000"></div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
        
        .delay-3000 {
          animation-delay: 3s;
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        
        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;