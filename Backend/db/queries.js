const pool = require('./pool');

// Users table query
async function createUser(username, password, email, age, admin){
    await pool.query(
        "INSERT INTO users (username, password, email, age, admin) VALUES($1, $2, $3, $4, $5)",
        [username, password, email, +age, admin]
    )
}

async function getUserByEmail(email){
    const {rows} = await pool.query(
        "SELECT * FROM users WHERE email = $1", 
        [email]
    )
    return rows[0];
}

async function getUserById(userId){
    const {rows} = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [userId]
    )
    return rows[0];
}
// Post query
async function getAllPosts(){
    const {rows} = await pool.query('SELECT * FROM posts');
    return rows;
}

async function getPostById(postId){
    const {rows} = await pool.query(
        'SELECT * FROM posts WHERE id = $1', 
        [+postId]
    )
    return rows[0];
}

async function createPost(title, content, user_id){
    await pool.query(
        'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)',
        [title, content, +user_id]
    )
}

async function updatePost(postId, title, content){
    await pool.query(
        'UPDATE posts SET title = $1, content = $2 WHERE id = $3',
        [title, content, postId]
    )
}

async function deletePostById(postId){
    await pool.query(
        'DELETE FROM posts WHERE id = $1',
        [postId]
    )
}

// Comment query
async function getAllCommentByPostId(postId) {
    const {rows} = await pool.query(
        "SELECT * FROM comments WHERE post_id = $1",
        [postId]
    )
    return rows;
}

async function createCommentForPost(postId, userId, content){
    await pool.query(
        "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)",
        [postId, userId, content]
    )
}

async function deleteComment(postId, commentId){
    await pool.query(
        "DELETE FROM comments WHERE post_id = $1 AND id = $2",
        [postId, commentId]
    )
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePostById,
    getAllCommentByPostId,
    createCommentForPost,
    deleteComment
}