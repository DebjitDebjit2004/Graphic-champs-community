import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
router.get('/', (req, res) => {
    res.json({ message: 'Get all team members' });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public  
router.get('/:id', (req, res) => {
    res.json({ message: `Get team member ${req.params.id}` });
});

// @desc    Create team member
// @route   POST /api/team
// @access  Private/Admin
router.post('/', isAuthenticated, (req, res) => {
    res.json({ message: 'Create team member' });
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
router.put('/:id', isAuthenticated, (req, res) => {
    res.json({ message: `Update team member ${req.params.id}` });
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
router.delete('/:id', isAuthenticated, (req, res) => {
    res.json({ message: `Delete team member ${req.params.id}` });
});

export default router;
