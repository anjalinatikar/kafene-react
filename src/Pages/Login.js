import React from 'react';
import {useState} from 'react'
import './Login.css'
import {withRouter, Link}  from 'react-router-dom'
import {browserHistory} from 'react-router'

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirectUrl, setRedirectUrl] = useState("")

    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const handleLogin = (e) => {
        e.preventDefault()
        if(username  ===  "test-admin" && password === "test-admin"){
           props.history.push("/admin/landing")
        }
        else if(username === "test-sales" && password === "test-sales"){
            props.history.push("/sales/landing")
        }
    }
    return ( 
        <>
            <main>
                <form className="login-form">
                    <h1>Sign In</h1>
                    <input type="text" placeholder="Enter Username" className="input-field" value = {username} onChange = {handleUsernameChange} required/>
                    <input type="password" placeholder = "Enter Password" className="input-field" value={password} onChange = {handlePasswordChange} required/>
                    {/* <Link to =  {redirectUrl} className="submit-btn" onClick = {handleLogin} style={{textDecoration : "none"}}>Login</Link> */}
                    <input type="submit" value="Login" className="submit-btn" onClick  = {handleLogin}/>
                </form>
            </main>
        </>
     );
}
 
export default withRouter(Login);