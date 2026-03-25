import express from 'express';
import Article from '../models/Article.js';
import Tag from '../models/Tag.js';

const router = express.Router();

// CREATE ARTICLE
router.post('/', async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json(article);
});

// GET ALL + tags
router.get('/', async (req, res) => {
  const articles = await Article.find().populate('tags');
  res.json(articles);
});

// ADD TAG TO ARTICLE
router.post('/:id/tags/:tagId', async (req, res) => {
  const article = await Article.findById(req.params.id);
  const tag = await Tag.findById(req.params.tagId);

  article.tags.push(tag._id);
  await article.save();

  // (опционально) двусторонняя связь
  tag.articles.push(article._id);
  await tag.save();

  res.json(article);
});

export default router;