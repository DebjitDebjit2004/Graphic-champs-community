import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter project title'],
    trim: true,
    maxLength: [100, 'Project title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter project description']
  },
  category: {
    type: String,
    required: [true, 'Please select category for this project'],
    enum: {
      values: [
        'Web Development',
        'Mobile App',
        'UI/UX Design',
        'Graphic Design',
        '3D Modeling',
        'Animation',
        'Game Development',
        'Data Science',
        'Other'
      ],
      message: 'Please select correct category for project'
    }
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  teamMembers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        required: true
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      caption: String
    }
  ],
  demoUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  technologies: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled'],
    default: 'planning'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  tags: [String],
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  comments: [
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
      avatar: {
        public_id: String,
        url: String
      },
      text: {
        type: String,
        required: [true, 'Please enter your comment'],
        maxLength: [500, 'Comment cannot exceed 500 characters']
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
          }
        }
      ],
      replies: [
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
          avatar: {
            public_id: String,
            url: String
          },
          text: {
            type: String,
            required: [true, 'Please enter your reply'],
            maxLength: [500, 'Reply cannot exceed 500 characters']
          },
          createdAt: {
            type: Date,
            default: Date.now
          },
          likes: [
            {
              user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
              }
            }
          ]
        }
      ]
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting the number of likes
projectSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for getting the number of comments
projectSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

export default mongoose.model('Project', projectSchema);
