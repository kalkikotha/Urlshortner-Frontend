import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios';
import { useHistory } from 'react-router';
import FontAwesome from 'react-fontawesome'

export default function Login() {
    const history = useHistory();
    let [classname, setclassName] = useState("")
    let [Name, setName] = useState("")
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    let [passwordError, setpasswordError] = useState("")
    let [emailerror, setemailerror] = useState("")
    let [loginError, setLoginError] = useState("")
    let [userlist, setuserlist] = useState([])

    return (<>
        <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
        <div className={`container ${classname}`} id="container">
            <div className="form-container sign-up-container">
                <form action="#" onSubmit={async (e) => {
                    e.preventDefault();

                    if (validator.isEmail(email)) {
                        setemailerror("Valid email :)")
                    } else {
                        return setemailerror("Enter valid email!")
                    }

                    if (validator.isStrongPassword(password)) {
                        setpasswordError("Valid password")
                    } else {
                        return setpasswordError("Invalid password")
                    }
                    // }
                    let data = {
                        email: email, password: password
                    }
                    axios.post("https://urlshortnerdemo.herokuapp.com/register", data).then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err)
                    });
                }}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" value={Name} required onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="email" value={email} required onChange={(e) => setemail(e.target.value)} />
                    <span>{emailerror}</span>
                    <input type="password" placeholder="password" value={password} required onChange={(e) => setpassword(e.target.value)} />
                    <span>{passwordError}</span>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#" onSubmit={async (e) => {
                    e.preventDefault();
                    if (validator.isEmail(email)) {
                        setemailerror("Valid email :)")
                    } else {
                        return setemailerror("Enter valid email!")
                    }
                    let data = { email: email, password: password };
                    axios.post("https://urlshortnerdemo.herokuapp.com/login", data)
                        .then((response) => {
                            console.log(response)
                            setuserlist(response.data)
                            window.localStorage.setItem("app_token", response.data.token)
                            if (response.data.message === "Allow") {
                                history.push(`/dashboard/${response.data.id}`);
                            }
                            else {
                                setLoginError("Incorrect Emailid or Password")
                                history.push("/login");
                            }
                        }).catch((err) => console.log(err))
                }}>

                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="email" value={email} required onChange={(e) => setemail(e.target.value)} />
                    <span>{emailerror}</span>
                    <input type="password" placeholder="password" value={password} required onChange={(e) => setpassword(e.target.value)} />
                    <span>{loginError}</span>
                    <a href="#">Forgot your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={() => { setclassName("") }}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={() => { setclassName("right-panel-active") }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
