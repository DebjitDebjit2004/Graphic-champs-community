import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaHeart,
  FaRocket,
  FaPalette,
  FaUsers,
  FaQuestionCircle,
  FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
  // Social Media Links
  const socialLinks = [
    {
      icon: FaFacebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600 hover:bg-blue-50",
      border: "hover:border-blue-200"
    },
    {
      icon: FaTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-cyan-500 hover:bg-cyan-50",
      border: "hover:border-cyan-200"
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600 hover:bg-pink-50",
      border: "hover:border-pink-200"
    },
    {
      icon: FaLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500 hover:bg-blue-50",
      border: "hover:border-blue-200"
    },
    {
      icon: FaGithub,
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-800 hover:bg-gray-50",
      border: "hover:border-gray-200"
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-600 hover:bg-red-50",
      border: "hover:border-red-200"
    }
  ];

  // Navigation Links
  const navLinks = [
    { icon: FaRocket, href: "#home", label: "Home" },
    { icon: FaPalette, href: "#course", label: "Courses" },
    { icon: FaUsers, href: "#team", label: "Team" },
    { icon: FaHeart, href: "#mentor", label: "Mentors" },
    { icon: FaQuestionCircle, href: "#faq", label: "FAQ" }
  ];

  // Contact Information
  const contactInfo = [
    {
      icon: FaPhone,
      text: "+91 98765 43210",
      href: "tel:+919876543210",
      color: "hover:text-green-600"
    },
    {
      icon: FaEnvelope,
      text: "hello.graphixchamps@gmail.com",
      href: "mailto:hello.graphixchamps@gmail.com",
      color: "hover:text-red-500"
    },
    {
      icon: FaMapMarkerAlt,
      text: "GraphixChamps Community, College Campus",
      href: "#",
      color: "hover:text-blue-600"
    },
    {
      icon: FaGlobe,
      text: "www.graphixchamps.com",
      href: "#",
      color: "hover:text-purple-600"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 md:w-80 h-40 md:h-80 bg-pink-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Left Column - Social Media */}
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-3 mb-6">
              <div className="w-16 h-16 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaPalette className="text-white text-2xl md:text-xl" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-2xl font-bold text-white">GraphixChamps</h3>
                <p className="text-gray-400 text-sm">Creative Community</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm md:text-base max-w-md mx-auto md:mx-0">
              Join India's fastest growing creative community of designers, developers, and digital artists. 
              Let's create something amazing together!
            </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-2 md:space-x-3 flex-wrap">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`group relative w-10 h-10 md:w-12 md:h-12 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-500 transform hover:scale-110 ${social.color} ${social.border} mb-2`}
                    aria-label={social.label}
                  >
                    <IconComponent className="text-base md:text-lg" />
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Middle Column - Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center justify-center md:justify-start">
              <FaRocket className="mr-2 text-blue-400" />
              Quick Links
            </h3>
            
            <div className="grid grid-cols-2 gap-2 md:gap-3 md:block">
              {navLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-center md:justify-start space-x-2 md:space-x-3 text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 md:hover:translate-x-2 py-2 md:py-0"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                      <IconComponent className="text-xs md:text-sm" />
                    </div>
                    <span className="font-medium text-sm md:text-base">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10">
              <h4 className="text-white font-semibold mb-2 md:mb-3 text-sm md:text-base">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="text-center md:text-left lg:text-right">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center justify-center lg:justify-end">
              <FaMapMarkerAlt className="mr-2 text-green-400" />
              Get In Touch
            </h3>
            
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={contact.text}
                    href={contact.href}
                    className={`group flex items-center justify-center lg:justify-end space-x-2 md:space-x-3 text-gray-400 ${contact.color} transition-all duration-300 transform hover:translate-x-[-3px] text-sm md:text-base`}
                  >
                    <IconComponent className="text-base md:text-lg flex-shrink-0" />
                    <span className="text-left lg:text-right">{contact.text}</span>
                  </a>
                );
              })}
            </div>

            {/* Community Stats */}
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4 max-w-xs mx-auto md:mx-0 lg:ml-auto">
              <div className="p-3 md:p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xl md:text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-xs text-gray-400">Active Members</div>
              </div>
              <div className="p-3 md:p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xl md:text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-xs md:text-sm flex items-center flex-col md:flex-row text-center md:text-left">
              <span>© 2024 GraphixChamps. Made with</span>
              <FaHeart className="text-red-400 mx-2 animate-pulse my-1 md:my-0" />
              <span>by our creative community</span>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300 mb-2 md:mb-0">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300 mb-2 md:mb-0">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Code of Conduct</a>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-sm"
            >
              <span>Back to Top</span>
              <FaArrowUp className="transform group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-5px) rotate(120deg); }
          66% { transform: translateY(3px) rotate(240deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;