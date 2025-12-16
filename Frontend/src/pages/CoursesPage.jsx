import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaStar, FaRegStar, FaStarHalfAlt, FaEye, FaClock, FaUsers } from 'react-icons/fa';
import { getCourses } from '../features/courses/coursesService';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">Loading amazing courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium mb-4 text-sm md:text-base">
            Our Courses
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative Skills</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive courses designed to transform you into a creative professional and help you master industry-leading skills
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={course.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Course Image */}
                <div className="relative overflow-hidden h-48 md:h-56">
                  <img 
                    src={course.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs md:text-sm font-medium rounded-full">
                      {course.category || "Design"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs md:text-sm font-medium rounded-full">
                      {course.level || "Intermediate"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Price and Rating */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
                    <div className="flex items-center flex-wrap gap-2">
                      {course.price && (
                        <>
                          <span className="text-2xl font-bold text-blue-600">₹{course.price.toLocaleString()}</span>
                          {course.originalPrice && (
                            <>
                              <span className="text-lg text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded">
                                {Math.round((1 - course.price/course.originalPrice) * 100)}% OFF
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    {course.rating && (
                      <div className="flex items-center space-x-1">
                        {renderStars(course.rating)}
                        <span className="text-sm text-gray-600 ml-1">({course.rating})</span>
                      </div>
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Meta */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs md:text-sm text-gray-500 mb-4 gap-2">
                    <div className="flex items-center space-x-4 flex-wrap">
                      {course.duration && (
                        <div className="flex items-center whitespace-nowrap">
                          <FaClock className="mr-1 text-blue-500" />
                          <span>{course.duration}</span>
                        </div>
                      )}
                      {course.students && (
                        <div className="flex items-center whitespace-nowrap">
                          <FaUsers className="mr-1 text-purple-500" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    {course.author && (
                      <span className="text-blue-600 font-medium">By {course.author}</span>
                    )}
                  </div>

                  {/* See Details Button */}
                  <button className="group/btn w-full flex items-center justify-center py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold rounded-lg hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 border border-gray-200">
                    <FaEye className="mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                    See Details
                    <FaArrowRight className="ml-2 opacity-0 group-hover/btn:opacity-100 transform group-hover/btn:translate-x-1 transition-all duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses available at the moment. Check back soon!</p>
          </div>
        )}

        {/* Load More Button for Mobile */}
        {courses.length > 6 && (
          <div className="text-center mt-12 lg:hidden">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full border border-blue-200 hover:bg-blue-50 transition-all duration-300">
              Load More Courses
            </button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
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

export default CoursesPage;
