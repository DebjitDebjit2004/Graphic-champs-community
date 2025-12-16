import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{course.duration} • {course.level}</span>
          <Link 
            to={`/courses/${course.id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
