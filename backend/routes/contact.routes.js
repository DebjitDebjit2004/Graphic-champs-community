import express from 'express';

const router = express.Router();

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
router.post('/', (req, res) => {
    // In a real app, you would save this to a database
    console.log('Contact form submission:', req.body);
    res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
    });
});

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', (req, res) => {
    res.json({ message: 'Get all contact messages' });
});

export default router;
