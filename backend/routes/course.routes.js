import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Get all courses
router.get('/', (req, res) => {
    res.json({ message: 'Get all courses' });
});

// @desc    Get single course
router.get('/:id', (req, res) => {
    res.json({ message: `Get course ${req.params.id}` });
});

// @desc    Create course
router.post('/', isAuthenticated, (req, res) => {
    res.json({ message: 'Create course' });
});

// @desc    Update course
router.put('/:id', isAuthenticated, (req, res) => {
    res.json({ message: `Update course ${req.params.id}` });
});

// @desc    Delete course
router.delete('/:id', isAuthenticated, (req, res) => {
    res.json({ message: `Delete course ${req.params.id}` });
});

export default router;
