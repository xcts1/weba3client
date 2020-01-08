import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './auth-context.js'
export default class ChangePassword extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            username: "",
            password: "",
            newPassword: ""
        }
    }
    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    save(e) {
        e.preventDefault();
        if (this.state.username.trim().length === 0 || this.state.password.trim().length === 0 || this.state.newPassword.trim().length === 0) {
            if (this.state.username.trim().length === 0) {
                alert('Username must not be empty')
            }
            else if (this.state.password.trim().length === 0) {
                alert('Password must not be empty')
            }
            else if (this.state.newPassword.trim().length === 0) {
                alert('New Password must not be empty')
            }
            return;
        }
        const token = this.context.token
        const logout = this.context.logout
        var url = 'http://13.229.31.156/change-password'
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
        if (!this.state.newPassword.match(regex)) {
            alert('Password must has between 8 to 20 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
        }
        else {
            fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password, newPassword: this.state.newPassword })
            })
                .then(res => {
                    if (res.status == 401) {
                        throw new Error('Original password incorrect'),
                        alert('Username or password is incorrect')
                    }
                    else if (res.status == 400) {
                        throw new Error('No such username'),
                        alert('Username is not available')
                    }
                    else {
                        alert('Password changed! You are logging out...')
                    }
                })
                .then(logout)
        }

    }
    render() {

        return (
            <div className="login-page">
                <div className="form">
                    <form className='login-form'>
                        <h4 className="text-center">
                            CHANGE PASSWORD
                        </h4>
                        <br />
                        <input type="text" className="rounded-pill" id="username" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange.bind(this)} />
                        <input type="password" className="rounded-pill" id="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange.bind(this)} />
                        <input type="password" className="rounded-pill" id="newPassword" name="newPassword" value={this.state.newPassword} placeholder="New password" onChange={this.handleChange.bind(this)} title="- Password must has between 8 to 20 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"/>
                        <button type="submit" className="rounded-pill btn-block z-depth-0 my-4 btn-success" onClick={this.save.bind(this)} >Save</button>
                        <Link to="/newUser" className="link" >Add new user</Link> <br />
                        <Link to="/users" className="link">View user list</Link>
                    </form>
                </div>
            </div>
        )
    }
}
