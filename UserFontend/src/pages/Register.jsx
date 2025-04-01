import { Link , useNavigate} from 'react-router-dom';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Register() {
    // State cho giá trị input
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [age, setAge] = useState('');
    const [submit, setSubmit] = useState(false);
    // State để theo dõi trường nào đã được chạm vào
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        passwordConfirm: false,
        age: false,
    });
    useEffect(()=>{
        async function fetchRegister(){
            try{
                const response = await axios.post(`http://localhost:3000/myblog/register`, {
                    username,
                    email,
                    password,
                    age,
                });
                console.log(response);
                navigate('/login');
            
            }catch(err){
                console.log('There is an error', err);
            }
            
        }
        if(submit){
            fetchRegister();
            setSubmit(false);
        }
    }, [submit]);
    

    // Hàm xử lý khi input thay đổi và đánh dấu là đã chạm
    const handleChange = (field) => (e) => {
        if (field === 'username') setUsername(e.target.value);
        if (field === 'email') setEmail(e.target.value);
        if (field === 'password') setPassword(e.target.value);
        if (field === 'passwordConfirm') setPasswordConfirm(e.target.value);
        if (field === 'age') setAge(e.target.value);
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // Hàm xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({
            username: true,
            email: true,
            password: true,
            passwordConfirm: true,
            age: true,
        }); 
        const isValid =
            isUsernameValid(username) === '' &&
            isEmailValid(email) === '' &&
            isPasswordValid(password) === '' &&
            isPasswordMatch(password, passwordConfirm) === '' &&
            isAgeValid(age) === '';
        
        if (isValid) {
            setSubmit(true);
        }
    };

    return (
        <div className="auth-form">
            <div className="auth-header">
                <div className="auth-title">Hello there</div>
                <div className="auth-desc">Create an account and you can read my mind</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="label-input">
                        <input
                            onBlur={handleChange('username')}
                            type="text"
                            name="username"
                            id="username"
                            className="input-text"
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="username">Enter your name</label>
                    </div>
                    <p className="error-message">{touched.username ? isUsernameValid(username) : ''}</p>
                </div>
                <div className="form-group">
                    <div className="label-input">
                        <input
                            onBlur={handleChange('email')}
                            type="text"
                            name="email"
                            id="email"
                            className="input-text"
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="email">Enter your email</label>
                    </div>
                    <p className="error-message">{touched.email ? isEmailValid(email) : ''}</p>
                </div>
                <div className="form-group">
                    <div className="label-input">
                        <input
                            onBlur={handleChange('password')}
                            type="password"
                            name="password"
                            id="password"
                            className="input-text"
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="password">Enter your password</label>
                    </div>
                    <p className="error-message">{touched.password ? isPasswordValid(password) : ''}</p>
                </div>
                <div className="form-group">
                    <div className="label-input">
                        <input
                            onBlur={handleChange('passwordConfirm')}
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            className="input-text"
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="passwordConfirm">Confirm your password</label>
                    </div>
                    <p className="error-message">{touched.passwordConfirm ? isPasswordMatch(password, passwordConfirm) : ''}</p>
                </div>
                <div className="form-group">
                    <div className="label-input">
                        <input
                            onBlur={handleChange('age')}
                            type="number"
                            name="age"
                            id="age"
                            className="input-text"
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="age">Your age</label>
                    </div>
                    <p className="error-message">{touched.age ? isAgeValid(age) : ''}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="checkbox">
                        <input type="checkbox" name="checkbox" id="checkbox" /> Check this to prove you are not gay
                    </label>
                </div>
                <button type="submit">Sign up</button>
                <div className="auth-swap-page">
                    <p className="auth-swap-content">Already have an account?</p>
                    <Link to="/login" className="auth-link">Sign in</Link>
                </div>
            </form>
            <Footer />
        </div>
    );
}

// Hàm validation trả về chuỗi lỗi ('' nếu hợp lệ)
function isUsernameValid(name) {
    name = name.trim();
    return name.length === 0 ? "Your name must not be empty!" : '';
}

function isEmailValid(email) {
    email = email.trim();
    const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return emailRegex.test(email) ? '' : 'Email is not valid';
}

function isAgeValid(age) {
    age = age.trim();
    if (age === '') return 'Age is required';
    const regex = /^[0-9]+$/;
    return regex.test(age) && Number(age) > 0 ? '' : 'Age must be a positive number';
}

function isPasswordValid(password) {
    password = password.trim();
    return password.length >= 8 ? '' : 'Password must be at least 8 characters';
}

function isPasswordMatch(password, confirmPassword) {
    return password === confirmPassword ? '' : "Passwords don't match";
}

export default Register;