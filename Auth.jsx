import React, { Component } from 'react'
import AuthContext from './auth-context.js'

export default class Auth extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.usernameEl = React.createRef()
        this.passwordEl = React.createRef()
    }

    submitHandler = (event) => {
        event.preventDefault();
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;
        if (username.trim().length === 0 || password.trim().length === 0) {
            if(username.trim().length === 0){
                alert('Username must not be empty')
            }
            else if (password.trim().length === 0){
                alert('Password must not be empty')
            }
            return;
        }
        console.log(username, password)
        fetch('http://13.229.31.156/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!'),
                    alert("Wrong username or password")
                }
                return res.json()
            })
            .then(resData => {
                console.log(resData)
                if (resData.token) {
                    this.context.login(resData.token, resData.userID, resData.tokenExpiration)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className='login-form' onSubmit={this.submitHandler}>
                        <h3 className="text-center">
                            LOG IN
                        </h3>
                        <br />
                        <input type="text" className="rounded-pill" name="username" id="username" ref={this.usernameEl} placeholder="Enter username" />
                        <input type="password" className="rounded-pill" name="password" id="password" ref={this.passwordEl} placeholder="Enter password" />
                        <button type='submit' className="rounded-pill btn-block z-depth-0 my-4 waves-effect" style={{ backgroundColor: 'rgb(202, 0, 0)' }}>Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}
