const {Router} = require('express');
const router = Router();
const postController = require('../controllers/postController');
const commentRouter = require('./commentRoutes');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.use('/', commentRouter);

module.exports = router;
