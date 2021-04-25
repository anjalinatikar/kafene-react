import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { setAuth } from '../../utils/auth';
import { LOGIN_ENDPOINT } from '../../utils/APIEndpoints';
import './Login.css';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = e => setUsername(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);

    const initiateLogin = async e =>  {
        e.preventDefault();
        if(!username)  {
            alert('username is required');
            return;
        }
        if(!password) {
            alert('password is required')
            return;
        }
        if(username!==password) {
            alert('Please enter valid credentials');
            return;
        }
        const { data } = await axios.post(LOGIN_ENDPOINT, {
            username: 'Qaifi', 
            password: 'Password'
        })
        if(data && data.username==='Qaifi') {
            setAuth(true);
            alert('Login Successful');
            props.history.push('/'); 
            return;
        } 
    }

    return (
        <Fragment>
            <main className="MainContainer">
            <div>
                <form className="LoginForm">
                    <h1>Sign In</h1>
                    <input 
                        className="InputField" 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter Username" />
                    <input 
                        className="InputField" 
                        type="password"
                         name="password" 
                         id="password" 
                         value={password}
                         onChange={handlePasswordChange}
                         placeholder="Enter Password" />
                    <button 
                        className="Button" 
                        id="login-btn"
                        onClick={initiateLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
            </main>
        </Fragment>
    )
}

export default Login;
