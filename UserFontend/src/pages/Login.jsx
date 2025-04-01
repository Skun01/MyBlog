import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLogin = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(`http://localhost:3000/myblog/login`, {
                    email,
                    password,
                });
                setIsLoading(false);
                console.log(response);
                localStorage.setItem('token', response.data.token);
                navigate('/')
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
            }
        };

        if (submit) {
            fetchLogin();
            setSubmit(false); // Reset submit
        }
    }, [submit, email, password]);

    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate
        setTouched({
            email: true,
            password: true
        });

        // Kiểm tra điều kiện đăng nhập
        if (email && password) {
            setSubmit(true);
        } else {
            setError('Vui lòng nhập đầy đủ thông tin');
        }
    }
    function handleChange(field){
        return (e)=>{
            if(field === 'email') setEmail(e.target.value);
            else if(field === 'password') setPassword(e.target.value);
            setTouched((prev)=>({...prev, [field]: true}));
        }
    }

    return (
        <div className='auth-form'>
            <div className="auth-header">
                <div className="auth-title">Welcome to my blog</div>
                <div className="auth-desc">Please login to read my writes</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="label-input">
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            className="input-text" 
                            placeholder=" " 
                            value={email}
                            onChange={handleChange('email')}
                        />
                        <label className="form-label" htmlFor="email">Enter your email</label>
                    </div>
                    {touched.email && !email && (
                        <p className="error-message">Email không được để trống</p>
                    )}
                </div>
                <div className="form-group">
                    <div className="label-input">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="input-text" 
                            placeholder=" " 
                            value={password}
                            onChange={handleChange('password')}
                        />
                        <label className="form-label" htmlFor="password">Enter your password</label>
                    </div>
                    {touched.password && !password && (
                        <p className="error-message">Mật khẩu không được để trống</p>
                    )}
                </div>
                {error && (
                    <div className="error-message" style={{color: 'red'}}>
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="checkbox">
                        <input type="checkbox" name="checkbox" id="checkbox" /> 
                        Check this useless checkbox to sign in
                    </label>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang đăng nhập...' : 'Sign in'}
                </button>
                <div className="auth-swap-page">
                    <p className="auth-swap-content">Don't have an account?</p>
                    <Link to="/register" className="auth-link">Create new</Link>
                </div>
            </form>
            <Footer/>
        </div>
    );
}

export default Login;