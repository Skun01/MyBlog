const db = require('../db/queries');

async function getAllPosts(req, res){
    const posts = await db.getAllPosts();
    res.json(posts);
}
async function createPost(req, res){
    const {title, content, user_id} = req.body;
    await db.createPost(title, content, user_id);
    res.json({message: 'create successfully'});
}

async function getPostById(req, res){
    const {postId} = req.params;
    const post = await db.getPostById(postId);
    res.json(post);
}

async function updatePost(req, res){
    const {postId} = req.params;
    const {title, content} = req.body;
    await db.updatePost(postId, title, content);
    res.json({message: 'update sucessfully!'});
}
async function deletePost(req, res){
    const {postId} = req.params;
    await db.deletePostById(postId);
    res.json({message: `you had deleted post id = ${postId}`});
}
module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
}