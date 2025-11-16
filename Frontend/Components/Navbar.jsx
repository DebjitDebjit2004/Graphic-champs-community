import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaBook,
  FaUsers,
  FaUserTie,
  FaQuestionCircle,
  FaSignInAlt,
  FaUserPlus,
  FaPalette,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Course', path: '/courses', icon: FaBook },
    { name: 'Team', path: '/team', icon: FaUsers },
    { name: 'Mentor', path: '/mentors', icon: FaUserTie },
    { name: 'FAQ', path: '/faq', icon: FaQuestionCircle },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={() => setActiveLink('Home')}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <FaPalette className="text-white text-xl" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 -z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Graphic Champs
                </span>
              </div>
            </Link>
            <span className="text-xs text-gray-500 -mt-1">Creative Community</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-md border border-gray-100">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 group ${isActive(link.path)
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-blue-600'
                    }`}
                  onClick={() => setActiveLink(link.name)}
                >
                  <IconComponent className={`mr-2 transition-all duration-300 ${activeLink === link.name ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                  {link.name}
                  {!isActive(link.path) && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Login / Register */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="group flex items-center px-4 py-2 text-gray-700 font-medium rounded-full hover:text-blue-600 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FaSignInAlt className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                Login
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 opacity-10"></span>
            </Link>

            <Link
              to="/register"
              className="group flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FaUserPlus className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                Register
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              {isOpen ? (
                <FaTimes className="text-lg transform rotate-180 transition-transform duration-300" />
              ) : (
                <FaBars className="text-lg transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
          <div className="bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${isActive(link.path)
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform scale-105'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'
                      }`}
                    onClick={() => {
                      setActiveLink(link.name);
                      setIsOpen(false);
                    }}
                  >
                    <IconComponent className={`mr-3 text-lg transition-transform duration-300 ${isActive(link.path) ? 'scale-110' : 'group-hover:scale-110'
                      }`} />
                    {link.name}
                    <span className={`ml-auto transform transition-transform duration-300 ${isActive(link.path) ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}>
                      →
                    </span>
                  </Link>
                );
              })}

              {/* Mobile Login/Register */}
              <div className="pt-4 border-t border-gray-200/50 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-white/50 transition-all duration-300 group"
                >
                  <FaSignInAlt className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
                >
                  <FaUserPlus className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`}</style>

    </nav>
  );
};

export default Navbar;
