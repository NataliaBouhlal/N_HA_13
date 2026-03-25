import express from 'express';
import Publisher from '../models/Publisher.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const publisher = await Publisher.create(req.body);
    res.status(201).json(publisher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  const publishers = await Publisher.find();
  res.json(publishers);
});

// GET ONE
router.get('/:id', async (req, res) => {
  const publisher = await Publisher.findById(req.params.id);
  res.json(publisher);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Publisher.findByIdAndDelete(req.params.id);
  res.json({ message: 'Publisher deleted' });
});

export default router;