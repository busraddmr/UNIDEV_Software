const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkAuth = require('../middlewares/auth'); // Kimlik doğrulama katmanı

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Bu rotalar için giriş yapmış olmak (Token) zorunludur
router.post('/', checkAuth, postController.createPost);
router.put('/:id', checkAuth, postController.updatePost);
router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;