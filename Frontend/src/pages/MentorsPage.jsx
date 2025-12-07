import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaUserTie, FaStar, FaQuoteLeft } from 'react-icons/fa';

const MentorsPage = () => {
  // Mentors data
  const mentorsData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      name: "Sarah Johnson",
      position: "Senior UI/UX Designer",
      specialty: "User-Centered Design",
      bio: "With 8+ years of experience, Sarah specializes in creating intuitive and beautiful user interfaces. She's passionate about mentoring the next generation of designers.",
      expertise: ["UI/UX Design", "Figma", "User Research", "Design Systems"],
      rating: 4.9,
      reviews: 234,
      linkedin: "#",
      github: "#",
      instagram: "#",
      gradient: "from-blue-400 to-cyan-500",
      achievements: "Led 50+ successful design projects"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      name: "Mike Chen",
      position: "Full Stack Developer",
      specialty: "Web Development",
      bio: "A passionate developer with 7 years of experience in building scalable web applications. Mike loves helping students master modern web technologies.",
      expertise: ["React", "Node.js", "TypeScript", "Web Architecture"],
      rating: 4.8,
      reviews: 189,
      linkedin: "#",
      github: "#",
      instagram: "#",
      gradient: "from-purple-400 to-pink-500",
      achievements: "Built apps used by 100k+ users"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      name: "Emma Davis",
      position: "Motion Graphics Specialist",
      specialty: "Animation & Motion",
      bio: "Emmy-winning animator with expertise in motion graphics and 3D animation. She's dedicated to making complex animation concepts accessible to learners.",
      expertise: ["Adobe After Effects", "Blender", "Cinema 4D", "Motion Design"],
      rating: 4.95,
      reviews: 178,
      linkedin: "#",
      github: "#",
      instagram: "#",
      gradient: "from-orange-400 to-red-500",
      achievements: "Created animations for 20+ brands"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      name: "Alex Rodriguez",
      position: "Data Science Engineer",
      specialty: "Data Visualization",
      bio: "With a background in both design and data science, Alex creates stunning data visualizations that tell compelling stories with data.",
      expertise: ["Python", "Data Visualization", "D3.js", "Analytics"],
      rating: 4.7,
      reviews: 156,
      linkedin: "#",
      github: "#",
      instagram: "#",
      gradient: "from-green-400 to-teal-500",
      achievements: "Analyzed datasets from 50+ organizations"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400",
      name: "Priya Patel",
      position: "Brand Strategy Lead",
      specialty: "Branding & Marketing",
      bio: "Creative branding expert with 9 years of experience. Priya mentors students in building strong brand identities and marketing strategies.",
      expertise: ["Brand Strategy", "Logo Design", "Marketing", "Social Media"],
      rating: 4.85,
      reviews: 201,
      linkedin: "#",
      github: "#",
      instagram: "#",
      gradient: "from-pink-400 to-rose-500",
      achievements: "Helped 30+ startups build their brands"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      name: "David Kim",
      position: "UX Researcher",
      specialty: "User Research & Testing",
      bio: "Leading UX researcher focused on understanding user behavior. David teaches comprehensive user research methodologies and best practices.",
      expertise: ["User Research", "A/B Testing", "User Testing", "Analytics"],
      rating: 4.9,
      reviews: 167,
      linkedin: "#",
      github: "#",
      instagram: "#",
      gradient: "from-indigo-400 to-purple-500",
      achievements: "Conducted 100+ user research studies"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 text-sm" />);
      }
    }
    return stars;
  };

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
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
            Expert Mentors
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learn from Industry <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experts</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our experienced mentors are ready to guide you on your creative journey with personalized mentorship and industry insights
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentorsData.map((mentor, index) => (
            <div
              key={mentor.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-md opacity-0 group-hover:opacity-50 transition-all duration-500"></div>

              {/* Mentor Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl shadow-lg h-full flex flex-col">

                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover rounded-2xl border-4 border-gray-200 group-hover:border-blue-200 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${mentor.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                    
                    {/* Specialty Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <span className={`px-3 py-1 bg-gradient-to-r ${mentor.gradient} text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg`}>
                        {mentor.specialty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mentor Info */}
                <div className="text-center flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">{mentor.position}</p>

                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {renderStars(mentor.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({mentor.rating})</span>
                    <span className="text-xs text-gray-500">{mentor.reviews} reviews</span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {mentor.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {mentor.expertise.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 2 && (
                      <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                        +{mentor.expertise.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Achievement */}
                  <div className="bg-blue-50 rounded-lg p-2 mb-4">
                    <p className="text-xs text-blue-700 font-medium">
                      <FaQuoteLeft className="inline mr-1" />
                      {mentor.achievements}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200">
                    <a
                      href={mentor.linkedin}
                      className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:scale-110 transform transition-all duration-300 group/linkedin border border-blue-200"
                    >
                      <FaLinkedin className="group-hover/linkedin:scale-110 transition-transform duration-300" />
                    </a>
                    <a
                      href={mentor.github}
                      className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:scale-110 transform transition-all duration-300 group/github border border-gray-200"
                    >
                      <FaGithub className="group-hover/github:scale-110 transition-transform duration-300" />
                    </a>
                    <a
                      href={mentor.instagram}
                      className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:scale-110 transform transition-all duration-300 group/instagram border border-pink-200"
                    >
                      <FaInstagram className="group-hover/instagram:scale-110 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Mentored by Experts</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book a 1-on-1 session with any of our mentors to get personalized guidance and accelerate your learning journey
            </p>
            <button className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              <span className="flex items-center justify-center">
                Schedule a Session
                <FaLinkedin className="ml-2 group-hover:scale-110 transition-transform duration-300" />
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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
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

export default MentorsPage;
