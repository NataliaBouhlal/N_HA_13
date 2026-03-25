import express from 'express';
import Tag from '../models/Tag.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  const tag = await Tag.create(req.body);
  res.status(201).json(tag);
});

// GET ALL + articles
router.get('/', async (req, res) => {
  const tags = await Tag.find().populate('articles');
  res.json(tags);
});

// ADD ARTICLE TO TAG
router.post('/:id/articles/:articleId', async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  tag.articles.push(req.params.articleId);
  await tag.save();

  res.json(tag);
});

export default router;