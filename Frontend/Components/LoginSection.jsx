import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaRocket, 
  FaPalette,
  FaGoogle,
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaStar,
  FaHeart,
  FaChevronLeft
} from 'react-icons/fa';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
    }, 2000);
  };

  // Mobile simplified view
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-8 px-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 rounded-full bg-white shadow-lg">
            <FaChevronLeft className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FaPalette className="text-white" />
            </div>
            <span className="font-bold text-gray-900">GraphixChamps</span>
          </div>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>

        {/* Mobile Login Form */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 text-sm">Sign in to continue your creative journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700 hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative text-center">
              <span className="bg-white px-4 text-sm text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              <FaGoogle className="mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              <FaGithub className="mr-2" />
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Mobile Graphics - Simplified */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center animate-float">
              <FaPalette className="text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center animate-float delay-1000">
              <FaRocket className="text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Join 500+ creative champs</p>
        </div>
      </div>
    );
  }

  // Desktop View (Original with improvements)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Amazing Graphics with Sprite Animation */}
        <div className="relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center lg:text-left">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-500">
                <FaPalette className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GraphixChamps
                </h1>
                <p className="text-gray-600 text-sm">Creative Community</p>
              </div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              Welcome Back,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Creative Champ!
              </span>
            </h2>
            <p className="text-base lg:text-lg text-gray-600 mb-8 max-w-md">
              Ready to continue your creative journey? Sign in to access exclusive resources, community projects, and mentorship opportunities.
            </p>

            {/* Animated Graphics Section */}
            <div className="relative h-48 lg:h-64 mb-8">
              {/* Floating Design Elements */}
              <div className="absolute top-0 left-1/4 w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl transform rotate-12 animate-float flex items-center justify-center">
                <FaPalette className="text-white text-xl lg:text-2xl" />
              </div>
              
              <div className="absolute top-10 right-1/4 w-14 lg:w-16 h-14 lg:h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl transform -rotate-12 animate-float delay-1000 flex items-center justify-center">
                <FaRocket className="text-white text-lg lg:text-xl" />
              </div>
              
              <div className="absolute bottom-10 left-10 w-12 lg:w-14 h-12 lg:h-14 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl transform rotate-6 animate-float delay-2000 flex items-center justify-center">
                <FaStar className="text-white text-base lg:text-lg" />
              </div>
              
              <div className="absolute bottom-5 right-10 w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl transform -rotate-6 animate-float delay-3000 flex items-center justify-center">
                <FaHeart className="text-white text-base lg:text-lg" />
              </div>

              {/* Central Animated Character/Illustration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Character Body */}
                  <div className="w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-500">
                    <FaUser className="text-white text-2xl lg:text-4xl" />
                  </div>
                  
                  {/* Animation Rings */}
                  <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-4 border-4 border-purple-300 rounded-full animate-ping delay-1000 opacity-50"></div>
                  
                  {/* Floating Particles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 lg:w-3 h-2 lg:h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float-particle`}
                      style={{
                        left: `${Math.cos((i / 8) * 2 * Math.PI) * 40}px`,
                        top: `${Math.sin((i / 8) * 2 * Math.PI) * 40}px`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-6 lg:w-8 h-6 lg:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-green-500 text-xs lg:text-sm" />
                </div>
                <span className="text-sm lg:text-base">Access to exclusive design resources</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-6 lg:w-8 h-6 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaRocket className="text-blue-500 text-xs lg:text-sm" />
                </div>
                <span className="text-sm lg:text-base">Join community projects</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-6 lg:w-8 h-6 lg:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-purple-500 text-xs lg:text-sm" />
                </div>
                <span className="text-sm lg:text-base">Personalized mentorship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Sign In to Your Account</h3>
            <p className="text-gray-600 text-sm lg:text-base">Enter your credentials to access the community</p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
            <button className="flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 hover:bg-red-100 transform hover:scale-105 transition-all duration-300">
              <FaGoogle className="text-base lg:text-lg" />
            </button>
            <button className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              <FaGithub className="text-base lg:text-lg" />
            </button>
            <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 hover:bg-blue-100 transform hover:scale-105 transition-all duration-300">
              <FaLinkedin className="text-base lg:text-lg" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">Or continue with email</div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 scale-90 lg:scale-100" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 text-sm lg:text-base ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700 hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 lg:w-5 h-4 lg:h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign In
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4 lg:mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300">
                Sign up now
              </a>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2 text-blue-700 text-xs lg:text-sm">
              <FaLock className="text-blue-500" />
              <span>Your data is securely encrypted and protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          25% { 
            transform: translate(8px, -12px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translate(0, -20px) scale(1);
            opacity: 1;
          }
          75% { 
            transform: translate(-8px, -12px) scale(0.8);
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
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
      `}</style>
    </div>
  );
};

export default LoginPage;