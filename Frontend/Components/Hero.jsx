import React from 'react';
import { FaPlay, FaArrowRight, FaStar, FaRocket, FaUsers, FaChalkboardTeacher, FaProjectDiagram } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Left Content */}
                    <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                        {/* Animated Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium mb-6 animate-pulse">
                            <FaRocket className="w-4 h-4 mr-2" />
                            Join the Creative Revolution
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Unleash Your{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Creative Potential
                            </span>{' '}
                            with GraphixChamps
                        </h1>

                        {/* Description */}
                        <p className="text-md md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                            Join our vibrant community of designers, developers, and creators.
                            Learn from industry experts, collaborate on real-world projects, and
                            transform your passion into a profession.
                        </p>

                        {/* Buttons with Icons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className="group flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                Get Started Free
                                <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <button className="group flex items-center justify-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                <FaPlay className="w-5 h-5 mr-2 text-blue-500" />
                                Watch Demo
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                                    <FaUsers className="mr-2" />
                                    500+
                                </div>
                                <div className="text-sm text-gray-500">Active Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                                    <FaChalkboardTeacher className="mr-2" />
                                    50+
                                </div>
                                <div className="text-sm text-gray-500">Expert Mentors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                                    <FaProjectDiagram className="mr-2" />
                                    100+
                                </div>
                                <div className="text-sm text-gray-500">Projects Completed</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Illustration */}
                    <div className="lg:w-1/2 relative">
                        {/* Main Illustration Container */}
                        <div className="relative z-10">
                            {/* Background Blob */}
                            <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                            {/* Main Illustration */}
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-500">
                                <div className="flex flex-col items-center">
                                    {/* Creative Elements */}
                                    <div className="flex space-x-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform rotate-12 animate-float flex items-center justify-center">
                                            <FaStar className="text-white text-lg" />
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg transform -rotate-12 animate-float animation-delay-1000 flex items-center justify-center">
                                            <FaRocket className="text-white text-lg" />
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg transform rotate-6 animate-float animation-delay-2000 flex items-center justify-center">
                                            <FaProjectDiagram className="text-white text-lg" />
                                        </div>
                                    </div>

                                    {/* Design Tools Illustration */}
                                    <div className="relative w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner p-6">
                                        {/* Monitor Screen */}
                                        <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 relative overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/20 rounded-full animate-ping"></div>
                                            </div>
                                            {/* Code Lines */}
                                            <div className="absolute bottom-2 left-4 right-4 space-y-1">
                                                <div className="h-1 bg-white/40 rounded"></div>
                                                <div className="h-1 bg-white/40 rounded w-3/4"></div>
                                                <div className="h-1 bg-white/40 rounded w-1/2"></div>
                                            </div>
                                        </div>

                                        {/* Design Tools */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                                <div
                                                    key={item}
                                                    className="h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-sm"
                                                >
                                                    <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Floating Elements */}
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                                            <FaStar className="text-white text-xs" />
                                        </div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce animation-delay-1000 flex items-center justify-center">
                                            <FaRocket className="text-white text-xs" />
                                        </div>
                                    </div>

                                    {/* Creative Text */}
                                    <div className="mt-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-800">Design • Create • Innovate</h3>
                                        <p className="text-gray-600 mt-2">Join our community of creative champions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements Around Illustration */}
                        <div className="absolute -top-4 -right-4 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-float"></div>
                        <div className="absolute top-1/2 -left-4 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float animation-delay-1500"></div>
                        <div className="absolute bottom-10 -right-6 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-float animation-delay-3000"></div>
                    </div>
                </div>
            </div>

            {/* Custom Animations for Tailwind */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    );
};

export default HeroSection;