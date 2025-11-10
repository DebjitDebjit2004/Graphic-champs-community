import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaLightbulb, FaUsers, FaRocket, FaPalette } from 'react-icons/fa';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "What is GraphixChamps and who can join?",
      answer: "GraphixChamps is a creative community for students passionate about design, development, and digital arts. Any student from our college can join regardless of their experience level.",
      category: "General",
      icon: FaQuestionCircle,
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      id: 2,
      question: "Do I need prior experience in design to join?",
      answer: "No prior experience required! We welcome beginners and provide learning resources, workshops, and mentorship to help you get started on your creative journey.",
      category: "Membership",
      icon: FaUsers,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      id: 3,
      question: "What kind of events and workshops do you organize?",
      answer: "We organize UI/UX design workshops, web development bootcamps, design thinking sessions, portfolio reviews, hackathons, and creative challenges throughout the semester.",
      category: "Events",
      icon: FaRocket,
      gradient: "from-orange-400 to-red-400"
    },
    {
      id: 4,
      question: "How can I become a mentor in GraphixChamps?",
      answer: "Students with significant experience in design/development can apply for mentorship roles. Contact our team leads with your portfolio and we'll guide you through the process.",
      category: "Mentorship",
      icon: FaLightbulb,
      gradient: "from-green-400 to-teal-400"
    },
    {
      id: 5,
      question: "What tools and software do you work with?",
      answer: "We work with industry-standard tools including Figma, Adobe Creative Suite, VS Code, React, Tailwind CSS, Blender, and many more creative software.",
      category: "Tools",
      icon: FaPalette,
      gradient: "from-indigo-400 to-purple-400"
    },
    {
      id: 6,
      question: "Are there any membership fees?",
      answer: "GraphixChamps is completely free for all students! We believe in accessible education and community building without financial barriers.",
      category: "Membership",
      icon: FaUsers,
      gradient: "from-pink-400 to-rose-400"
    },
    {
      id: 7,
      question: "How often do you conduct meetings and sessions?",
      answer: "We have weekly knowledge sharing sessions, bi-weekly workshops, monthly design challenges, and special events every semester. All schedules are shared in our community groups.",
      category: "Events",
      icon: FaRocket,
      gradient: "from-cyan-400 to-blue-400"
    },
    {
      id: 8,
      question: "Can I get certificates for participation?",
      answer: "Yes! We provide participation certificates for workshops, completion certificates for courses, and recognition certificates for outstanding contributions to the community.",
      category: "General",
      icon: FaQuestionCircle,
      gradient: "from-yellow-400 to-orange-400"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Group FAQs by category for better organization
  const faqCategories = {
    "General": faqData.filter(faq => faq.category === "General"),
    "Membership": faqData.filter(faq => faq.category === "Membership"),
    "Events": faqData.filter(faq => faq.category === "Events"),
    "Mentorship": faqData.filter(faq => faq.category === "Mentorship"),
    "Tools": faqData.filter(faq => faq.category === "Tools")
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full font-medium mb-4 border border-blue-200">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about GraphixChamps community, events, and membership
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(faqCategories).map((category, index) => (
              <button
                key={category}
                className="px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-medium text-gray-700 hover:text-blue-600"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <div
                  key={faq.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 transition-all duration-500 overflow-hidden group ${
                    activeIndex === index 
                      ? 'shadow-2xl scale-105 border-blue-200' 
                      : 'shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  }`}
                >
                  {/* FAQ Question */}
                  <button
                    className="w-full px-6 py-6 text-left flex items-center justify-between group-hover:bg-blue-50/50 transition-all duration-300"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 bg-gradient-to-r ${faq.gradient} rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-lg" />
                      </div>
                      
                      {/* Question Text */}
                      <div className="text-left">
                        <h3 className={`text-lg font-semibold transition-all duration-300 ${
                          activeIndex === index ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {faq.question}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>

                    {/* Chevron Icon */}
                    <div className={`transform transition-transform duration-500 ${
                      activeIndex === index ? 'rotate-180 text-blue-600' : 'text-gray-400'
                    }`}>
                      {activeIndex === index ? (
                        <FaChevronUp className="w-5 h-5" />
                      ) : (
                        <FaChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* FAQ Answer */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="pl-16 border-l-2 border-blue-200">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Additional Info */}
                        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                          <span>📚 Related to: {faq.category}</span>
                          <span>⭐ Helpful for beginners</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${faq.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              );
            })}
          </div>

          {/* Still Have Questions CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
                <FaQuestionCircle />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-6">Can't find the answer you're looking for? Please reach out to our team!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Contact Our Team
                </button>
                <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-blue-200 hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                  Join Community Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-blue-300 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-4 h-4 bg-purple-300 rounded-full opacity-20 animate-float delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-pink-300 rounded-full opacity-20 animate-float delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-cyan-300 rounded-full opacity-20 animate-float delay-3000"></div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        /* Smooth accordion transition */
        .transition-max-height {
          transition: max-height 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;