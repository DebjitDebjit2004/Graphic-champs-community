import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: [true, 'Please enter subject'],
    trim: true,
    maxLength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please enter your message'],
    trim: true,
    maxLength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'spam'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  response: {
    text: String,
    respondedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  source: {
    type: String,
    enum: ['contact_form', 'email', 'api', 'other'],
    default: 'contact_form'
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  tags: [String],
  relatedTo: {
    type: String,
    enum: ['general', 'support', 'feedback', 'partnership', 'other'],
    default: 'general'
  },
  files: [
    {
      name: String,
      url: String,
      type: String,
      size: Number
    }
  ]
}, {
  timestamps: true
});

// Add text index for search functionality
contactSchema.index({
  name: 'text',
  email: 'text',
  subject: 'text',
  message: 'text'
});

// Add compound index for better query performance
contactSchema.index({ status: 1, priority: -1, createdAt: -1 });

export default mongoose.model('Contact', contactSchema);
