import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter event title'],
    trim: true,
    maxLength: [100, 'Event title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter event description']
  },
  date: {
    type: Date,
    required: [true, 'Please enter event date']
  },
  time: {
    type: String,
    required: [true, 'Please enter event time']
  },
  location: {
    type: String,
    required: [true, 'Please enter event location']
  },
  category: {
    type: String,
    required: [true, 'Please select category for this event'],
    enum: {
      values: [
        'Workshop',
        'Webinar',
        'Competition',
        'Conference',
        'Networking',
        'Other'
      ],
      message: 'Please select correct category for event'
    }
  },
  speaker: {
    name: {
      type: String,
      required: [true, 'Please enter speaker name']
    },
    designation: {
      type: String,
      required: [true, 'Please enter speaker designation']
    },
    bio: {
      type: String,
      required: [true, 'Please enter speaker bio']
    },
    avatar: {
      public_id: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      }
    }
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  maxParticipants: {
    type: Number,
    default: 50
  },
  registeredUsers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      registeredAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);
