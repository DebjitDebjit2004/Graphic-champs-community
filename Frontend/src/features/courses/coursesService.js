// Mock data - in a real app, this would be an API call
const courses = [
  {
    id: 'graphic-design-fundamentals',
    title: 'Graphic Design Fundamentals',
    description: 'Learn the core principles of graphic design, including typography, color theory, and composition.',
    duration: '6 weeks',
    level: 'Beginner',
    image: '/images/courses/graphic-design.jpg'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Master user interface and experience design principles for web and mobile applications.',
    duration: '8 weeks',
    level: 'Intermediate',
    image: '/images/courses/ui-ux.jpg'
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    description: 'Create engaging animations and motion graphics using industry-standard tools.',
    duration: '10 weeks',
    level: 'Intermediate',
    image: '/images/courses/motion-graphics.jpg'
  }
];

export const getCourses = () => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => resolve(courses), 500);
  });
};

export const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    const course = courses.find(c => c.id === id);
    if (course) {
      resolve(course);
    } else {
      reject(new Error('Course not found'));
    }
  });
};
