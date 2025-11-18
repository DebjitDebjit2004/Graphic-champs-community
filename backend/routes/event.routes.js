import express from 'express';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', (req, res) => {
    res.json({ message: 'Get all events' });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', (req, res) => {
    res.json({ message: `Get event ${req.params.id}` });
});

// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
router.post('/', isAuthenticated, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Create event' });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
router.put('/:id', isAuthenticated, authorizeRoles('admin'), (req, res) => {
    res.json({ message: `Update event ${req.params.id}` });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), (req, res) => {
    res.json({ message: `Delete event ${req.params.id}` });
});

export default router;
