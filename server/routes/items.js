import express from 'express';
import Joi from 'joi';
import Item from '../models/Item.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const itemSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(500).required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional()
});

// @route   GET /api/items
// @desc    Get all items for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { search, status, priority } = req.query;

        // Build query
        let query = { user: req.user._id };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        const items = await Item.find(query).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/items/:id
// @desc    Get single item
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Make sure user owns item
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/items
// @desc    Create new item
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        // Validate request body
        const { error } = itemSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const item = await Item.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        // Validate request body
        const { error } = itemSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Make sure user owns item
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Make sure user owns item
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await item.deleteOne();

        res.json({ message: 'Item removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
