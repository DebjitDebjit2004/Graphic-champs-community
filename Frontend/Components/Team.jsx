import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaCrown, FaUserTie, FaCode, FaPalette, FaBullhorn, FaCalendarAlt } from 'react-icons/fa';

const TeamSection = () => {
  // Team data with hierarchy
  const teamData = [
    // Row 1: Leadership
    {
      row: 1,
      department: "Leadership",
      members: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          name: "Vaibhav Thakur",
          position: "LEAD & President",
          bio: "Leading the GraphixChamps community with vision and innovation",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaCrown,
          gradient: "from-yellow-400 to-orange-500",
          iconColor: "text-yellow-500"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
          name: "Shubham Jaiswal",
          position: "Mentor",
          bio: "Guiding students towards excellence in design and development",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaUserTie,
          gradient: "from-purple-400 to-pink-500",
          iconColor: "text-purple-500"
        }
      ]
    },
    // Row 2: Technical Department
    {
      row: 2,
      department: "Technical Department",
      members: [
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
          name: "Subhadeep Mondal",
          position: "Technical Head",
          bio: "Building robust technical solutions and frameworks",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaCode,
          gradient: "from-blue-400 to-cyan-500",
          iconColor: "text-blue-500"
        },
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
          name: "Manikant Kumar",
          position: "Technical Team",
          bio: "Passionate about cutting-edge technologies and innovation",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaCode,
          gradient: "from-green-400 to-teal-500",
          iconColor: "text-green-500"
        }
      ]
    },
    // Row 3: Creative Department
    {
      row: 3,
      department: "Creative Department",
      members: [
        {
          id: 5,
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
          name: "Aditya Kumar",
          position: "Creative Head",
          bio: "Transforming ideas into visually stunning experiences",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaPalette,
          gradient: "from-pink-400 to-rose-500",
          iconColor: "text-pink-500"
        },
        {
          id: 6,
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
          name: "Ayush Singh",
          position: "Creative Team",
          bio: "Bringing creativity and innovation to every project",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaPalette,
          gradient: "from-indigo-400 to-purple-500",
          iconColor: "text-indigo-500"
        }
      ]
    },
    // Row 4: PR & Outreach Department
    {
      row: 4,
      department: "PR & Outreach Department",
      members: [
        {
          id: 7,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          name: "Vasu Singh",
          position: "PR & Outreach Head",
          bio: "Building strong community relationships and partnerships",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaBullhorn,
          gradient: "from-orange-400 to-red-500",
          iconColor: "text-orange-500"
        },
        {
          id: 8,
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
          name: "Alok Kumar",
          position: "PR & Outreach Team",
          bio: "Connecting with communities and spreading our vision",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaBullhorn,
          gradient: "from-teal-400 to-blue-500",
          iconColor: "text-teal-500"
        }
      ]
    },
    // Row 5: Event & Workshop Department
    {
      row: 5,
      department: "Event & Workshop Department",
      members: [
        {
          id: 9,
          image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400",
          name: "Nancy",
          position: "Event & Workshop Head",
          bio: "Creating memorable learning experiences and events",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaCalendarAlt,
          gradient: "from-red-400 to-pink-500",
          iconColor: "text-red-500"
        },
        {
          id: 10,
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
          name: "Archi",
          position: "Event & Workshop Team",
          bio: "Organizing engaging workshops and community events",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaCalendarAlt,
          gradient: "from-purple-400 to-indigo-500",
          iconColor: "text-purple-500"
        },
        {
          id: 11,
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
          name: "Sakshi",
          position: "Event & Workshop Team",
          bio: "Ensuring smooth execution of all community events",
          linkedin: "#",
          github: "#",
          instagram: "#",
          icon: FaCalendarAlt,
          gradient: "from-cyan-400 to-blue-500",
          iconColor: "text-cyan-500"
        }
      ]
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full font-medium mb-4 border border-blue-200">
            Meet Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creative Minds</span> Behind GraphixChamps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate individuals working together to build an amazing creative community
          </p>
        </div>

        {/* Team Grid by Departments */}
        <div className="space-y-16">
          {teamData.map((department, deptIndex) => (
            <div key={department.row} className="relative">
              {/* Department Header */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200 shadow-lg">
                  {React.createElement(department.members[0].icon, { className: `text-2xl mr-3 ${department.members[0].iconColor}` })}
                  <h3 className="text-2xl font-bold text-gray-900">{department.department}</h3>
                </div>
              </div>

              {/* Team Members Grid */}
              <div className={`grid grid-cols-1 ${
                department.members.length === 2 ? 'md:grid-cols-2' : 
                department.members.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
              } gap-8`}>
                {department.members.map((member, index) => (
                  <div 
                    key={member.id}
                    className="group relative"
                    style={{ animationDelay: `${deptIndex * 200 + index * 100}ms` }}
                  >
                    {/* Animated Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-md opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                    
                    {/* Team Card */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl shadow-lg">
                      
                      {/* Department Icon - Now Visible! */}
                      <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          <member.icon className="text-2xl" />
                        </div>
                      </div>

                      {/* Profile Image */}
                      <div className="relative mb-6">
                        <div className="relative w-32 h-32 mx-auto">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover rounded-2xl border-4 border-gray-200 group-hover:border-blue-200 transition-all duration-500 group-hover:scale-110"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                          
                          {/* Position Badge */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg">
                              {member.position}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {member.bio}
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center space-x-3">
                          <a 
                            href={member.linkedin}
                            className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:scale-110 transform transition-all duration-300 group/linkedin border border-blue-200"
                          >
                            <FaLinkedin className="group-hover/linkedin:scale-110 transition-transform duration-300" />
                          </a>
                          <a 
                            href={member.github}
                            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:scale-110 transform transition-all duration-300 group/github border border-gray-200"
                          >
                            <FaGithub className="group-hover/github:scale-110 transition-transform duration-300" />
                          </a>
                          <a 
                            href={member.instagram}
                            className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:scale-110 transform transition-all duration-300 group/instagram border border-pink-200"
                          >
                            <FaInstagram className="group-hover/instagram:scale-110 transition-transform duration-300" />
                          </a>
                        </div>
                      </div>

                      {/* Hover Effect Elements */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
                      </div>

                      {/* Floating Animation */}
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 animate-float transition-all duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h3>
            <p className="text-gray-600 mb-6">We're always looking for passionate creatives to join our community</p>
            <button className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              <span className="flex items-center">
                Apply Now
                <FaCrown className="ml-2 group-hover:scale-110 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .group {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;