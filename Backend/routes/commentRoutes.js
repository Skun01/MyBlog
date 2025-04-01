const {Router} = require('express');
const commentController = require('../controllers/commentController');
const router = Router();

router.get('/:postId/comments', commentController.getAllCommentByPostId);
router.post('/:postId/comments', commentController.createCommentForPost);
router.delete('/:postId/comments/:commentId', commentController.deleteComment);
module.exports = router;