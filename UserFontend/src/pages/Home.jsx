import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';
function Home(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            axios.get('http://localhost:3000/myblog/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res=>{
                setUser(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Auth error:', error);
                localStorage.removeItem('token'); // Remove invalid token
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }, [])
    useEffect(()=>{
        axios.get('http://localhost:3000/myblog/posts')
            .then(res=>{
                console.log(res);
                setPosts(res.data);
            })
    }, []);
    if(loading){
        return <div>Loading...</div>
    }
    const unAuth = (
        <>
            <p className="auth-btn"><Link to="/login">Login</Link></p>
            <p className="auth-btn"><Link to="/register">Register</Link></p>
        </>
    )
    const authed = (
        <>
            <p className="username">{user && `Hello ${user.username}`}</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
    )
    // ham xu ly dang xuat
    function handleLogout(){
        localStorage.removeItem('token');
        setUser(null);
    }
    return (
        <div className='homepage'>
            <div className="homepage-header">
                <div className="auth-section">
                    { user !== null ? authed: unAuth}
                </div>
                <div className="slogan-section">
                    <p className="slogan">WELCOME TO THAI TRUONG BLOG</p>
                    <div className="sub-slogan">Enjoy to read my article!</div>
                </div>
            </div>
            <div className="homepage-content">
                <div className="post-list">
                    { posts &&
                        posts.map(post=>(
                            <div className="post-card">
                                <div className="card-header">
                                    <div className="card-title">{post.title}</div>
                                    <div className="card-desc">
                                        <p className="created-by">Created by {post.username}</p>
                                        <p className="created-at">{timeAgo(post.created_at)}</p>
                                    </div>
                                </div>
                                <div className="card-content">
                                    {post.content}
                                </div>
                                <button className="comment-btn">Comment <MessageCircle /></button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
function timeAgo(date){
    const now = new Date();
    const diff = Math.floor((now - new Date(date))/1000);
    if(diff < 60) return `${diff} seconds ago`;
    if(diff < 3600) return `${Math.floor(diff/60)} minutes ago`;
    if(diff < 86400) return    `${Math.floor(diff/3600)} hours ago`;
    return `${Math.floor(diff/86400)} days ago`;
}
export default Home;