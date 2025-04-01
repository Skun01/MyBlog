const db = require('../db/queries');

async function getAllCommentByPostId(req, res){
    const {postId} = req.params;
    const comments = await db.getAllCommentByPostId(postId);
    res.json(comments)
}

async function createCommentForPost(req, res){
    const {postId} = req.params;
    const{comment_text, user_id} = req.body;
    await db.createCommentForPost(postId, user_id, comment_text);
    res.json('create comment sucessfully!');
}

async function deleteComment(req, res){
    const {postId, commentId} = req.params;
    await db.deleteComment(postId, commentId);
    res.json(`You have deleted comment id = ${commentId} in post id = ${postId}`);
}

module.exports = {
    getAllCommentByPostId,
    createCommentForPost,
    deleteComment,
}