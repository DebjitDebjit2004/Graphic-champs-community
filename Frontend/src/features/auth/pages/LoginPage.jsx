import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPalette, FaRocket, FaChevronLeft } from 'react-icons/fa';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile view
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-8 px-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Go back"
          >
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
        <LoginForm isMobile={true} />

        {/* Mobile Graphics */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center animate-float">
              <FaPalette className="text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center animate-float delay-1000">
              <FaRocket className="text-white" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Join our community of creative champs</p>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Login Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaPalette className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GraphixChamps
                </h1>
              </div>
              <p className="text-gray-600">Sign in to access your creative workspace</p>
            </div>
            
            <LoginForm />
          </div>
        </div>

        {/* Right side - Illustration & Info */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -top-20 right-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Unlock Your Creative Potential</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">Access exclusive design resources</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">Connect with creative professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">Showcase your portfolio</span>
                </li>
              </ul>
              
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-gray-800 mb-2">New to GraphixChamps?</h3>
                <p className="text-gray-600 text-sm mb-4">Join our community of creative professionals today!</p>
                <Link 
                  to="/register" 
                  className="inline-block w-full text-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
