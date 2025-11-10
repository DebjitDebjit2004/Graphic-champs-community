import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please select a user to add to team']
  },
  name: {
    type: String,
    required: [true, 'Please enter team member name'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please enter team member position'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Please enter team member bio']
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  socialLinks: {
    website: String,
    github: String,
    twitter: String,
    linkedin: String,
    instagram: String,
    behance: String,
    dribbble: String
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'member'],
    default: 'member'
  },
  department: {
    type: String,
    enum: [
      'Design',
      'Development',
      'Marketing',
      'Content',
      'Management',
      'Other'
    ],
    required: [true, 'Please select department']
  },
  projects: [{
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project'
    },
    role: String,
    contribution: String
  }],
  showInTeam: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add text index for search functionality
teamMemberSchema.index({
  name: 'text',
  position: 'text',
  bio: 'text',
  'skills.name': 'text'
});

export default mongoose.model('Team', teamMemberSchema);
