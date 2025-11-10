import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter course title'],
    trim: true,
    maxLength: [100, 'Course title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter course description']
  },
  category: {
    type: String,
    required: [true, 'Please select category for this course'],
    enum: {
      values: [
        'Graphic Design',
        'UI/UX Design',
        'Web Development',
        'Mobile App Development',
        'Digital Marketing',
        '3D Modeling',
        'Animation',
        'Video Editing',
        'Photography',
        'Other'
      ],
      message: 'Please select correct category for course'
    }
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please enter course price'],
    default: 0
  },
  duration: {
    type: Number, // Duration in weeks
    required: [true, 'Please enter course duration in weeks']
  },
  level: {
    type: String,
    required: [true, 'Please select course level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  thumbnail: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  chapters: [
    {
      title: {
        type: String,
        required: true
      },
      description: String,
      video: {
        public_id: String,
        url: String
      },
      duration: Number, // in minutes
      resources: [
        {
          title: String,
          url: String,
          type: {
            type: String,
            enum: ['pdf', 'doc', 'ppt', 'zip', 'other']
          }
        }
      ]
    }
  ],
  studentsEnrolled: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      enrolledAt: {
        type: Date,
        default: Date.now
      },
      progress: {
        type: Number,
        default: 0
      },
      completedChapters: [
        {
          chapterId: mongoose.Schema.Types.ObjectId,
          completedAt: Date
        }
      ]
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = async function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numOfReviews = 0;
  } else {
    const total = this.reviews.reduce((acc, item) => item.rating + acc, 0);
    this.rating = total / this.reviews.length;
    this.numOfReviews = this.reviews.length;
  }
  await this.save({ validateBeforeSave: false });
};

export default mongoose.model('Course', courseSchema);
