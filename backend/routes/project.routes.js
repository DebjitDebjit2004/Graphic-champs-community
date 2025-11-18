import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', (req, res) => {
    res.json({ message: 'Get all projects' });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', (req, res) => {
    res.json({ message: `Get project ${req.params.id}` });
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
router.post('/', isAuthenticated, (req, res) => {
    res.json({ message: 'Create project' });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', isAuthenticated, (req, res) => {
    res.json({ message: `Update project ${req.params.id}` });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', isAuthenticated, (req, res) => {
    res.json({ message: `Delete project ${req.params.id}` });
});

export default router;
