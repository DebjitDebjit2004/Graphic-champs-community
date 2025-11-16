import React from 'react';

const MentorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Mentors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mentor cards will go here */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h2>
              <p className="text-purple-600 mb-2">Senior UI/UX Designer</p>
              <p className="text-gray-600">Specializes in user-centered design and prototyping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
