const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const checkAuth = require('../middlewares/auth');

router.post('/', checkAuth, commentController.addComment);
router.delete('/:id', checkAuth, commentController.deleteComment);

module.exports = router;