import express from 'express';
import Magazine from '../models/Magazine.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const magazine = await Magazine.create(req.body);
    res.status(201).json(magazine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL + publisher
router.get('/', async (req, res) => {
  const magazines = await Magazine.find().populate('publisher');
  res.json(magazines);
});

// GET ONE
router.get('/:id', async (req, res) => {
  const magazine = await Magazine.findById(req.params.id).populate('publisher');
  res.json(magazine);
});

export default router;