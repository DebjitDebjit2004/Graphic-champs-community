import React, { useState } from 'react';
import { FaArrowRight, FaStar, FaRegStar, FaStarHalfAlt, FaEye, FaClock, FaUsers } from 'react-icons/fa';

const CourseSection = () => {
  // Mock data for courses (will be replaced with API data)
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      title: "UI/UX Design Masterclass",
      description: "Learn modern UI/UX design principles and create stunning user interfaces",
      price: 2999,
      originalPrice: 4999,
      author: "Sarah Johnson",
      rating: 4.8,
      reviews: 1247,
      category: "Design",
      duration: "12 weeks",
      students: 3450,
      level: "Intermediate"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
      title: "Advanced React Development",
      description: "Master React with hooks, context API, and advanced patterns",
      price: 3499,
      originalPrice: 5999,
      author: "Mike Chen",
      rating: 4.9,
      reviews: 893,
      category: "Development",
      duration: "10 weeks",
      students: 2876,
      level: "Advanced"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400",
      title: "Motion Graphics & Animation",
      description: "Create stunning animations and motion graphics for web and mobile",
      price: 2799,
      originalPrice: 4499,
      author: "Emma Davis",
      rating: 4.7,
      reviews: 567,
      category: "Animation",
      duration: "8 weeks",
      students: 1890,
      level: "Beginner"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
      title: "Web Development Bootcamp",
      description: "Full-stack web development from scratch to advanced level",
      price: 3999,
      originalPrice: 6999,
      author: "Alex Rodriguez",
      rating: 4.6,
      reviews: 2103,
      category: "Development",
      duration: "16 weeks",
      students: 5120,
      level: "Beginner"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      title: "Digital Marketing Strategy",
      description: "Learn digital marketing strategies that drive real results",
      price: 2299,
      originalPrice: 3999,
      author: "Priya Patel",
      rating: 4.5,
      reviews: 892,
      category: "Marketing",
      duration: "6 weeks",
      students: 2345,
      level: "Intermediate"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      title: "Data Visualization Expert",
      description: "Master data visualization techniques and tools",
      price: 3199,
      originalPrice: 5499,
      author: "David Kim",
      rating: 4.8,
      reviews: 456,
      category: "Data Science",
      duration: "9 weeks",
      students: 1678,
      level: "Advanced"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
      title: "Mobile App Design",
      description: "Design beautiful and functional mobile applications",
      price: 2699,
      originalPrice: 4299,
      author: "Lisa Wang",
      rating: 4.7,
      reviews: 723,
      category: "Design",
      duration: "7 weeks",
      students: 2987,
      level: "Intermediate"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis and visualization",
      price: 2899,
      originalPrice: 4799,
      author: "Robert Brown",
      rating: 4.9,
      reviews: 1345,
      category: "Data Science",
      duration: "11 weeks",
      students: 3980,
      level: "Beginner"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      title: "Advanced JavaScript Patterns",
      description: "Deep dive into advanced JavaScript concepts and patterns",
      price: 3299,
      originalPrice: 5599,
      author: "Kevin Martinez",
      rating: 3.8,
      reviews: 678,
      category: "Development",
      duration: "8 weeks",
      students: 2450,
      level: "Advanced"
    }
  ]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <section id="course" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium mb-4">
              Our Courses
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Master Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative Skills</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover our comprehensive courses designed to transform you into a creative professional
            </p>
          </div>
          
          {/* See All Button */}
          <button className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            See All Courses
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={course.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                    {course.level}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Price and Rating */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">₹{course.price}</span>
                    <span className="text-lg text-gray-400 line-through">₹{course.originalPrice}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded">
                      {Math.round((1 - course.price/course.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(course.rating)}
                    <span className="text-sm text-gray-600 ml-1">({course.rating})</span>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">By {course.author}</span>
                </div>

                {/* See Details Button */}
                <button className="group w-full flex items-center justify-center py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold rounded-lg hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 border border-gray-200">
                  <FaEye className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  See Details
                  <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button for Mobile */}
        <div className="text-center mt-12 lg:hidden">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full border border-blue-200 hover:bg-blue-50 transition-all duration-300">
            Load More Courses
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CourseSection;