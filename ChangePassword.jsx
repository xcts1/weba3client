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
        const token = this.context.token
        var url = 'http://13.229.31.156/change-password'
        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password, newPassword: this.state.newPassword})
        })
            .then(res => {
                if (res.status == 401) {
                    throw new Error('No such username'),
                    alert('Username or password is incorrect')
                } else {
                    alert('Password changed!')
                }
            })
    }
    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className='login-form'>
                        <h4 className="text-center">
                            ADD NEW ADMIN USER
                        </h4>
                        <br />
                        <input type="text" className="rounded-pill" id="username" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange.bind(this)} />
                        <input type="password" className="rounded-pill" id="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange.bind(this)} />
                        <input type="password" className="rounded-pill" id="newPassword" name="newPassword" value={this.state.newPassword} placeholder="New password" onChange={this.handleChange.bind(this)} />
                        <button type="submit" className="rounded-pill btn-block z-depth-0 my-4 waves-effect btn-success" onClick={this.save.bind(this)}>Save</button>
                        <Link to="/newUser" className="link" >Add new user</Link>
                    </form>
                </div>
            </div>
        )
    }
}
