import React, { Component } from 'react'
import AuthContext from './auth-context.js'
import { Link } from 'react-router-dom'
export default class NewUser extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            username: "",
            password: "",
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
        var url = 'http://13.229.31.156/signup'
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then(res => {
                if (res.status == 409) {
                    throw new Error('Username already existed'),
                    alert('Username already existed')
                } else {
                    alert('User added!')
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
                        <br/>
                        <input type="text" className="rounded-pill" id="username" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange.bind(this)} />
                        <input type="password" className="rounded-pill" id="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange.bind(this)} />
                        <button type="submit"  className="rounded-pill btn-block z-depth-0 my-4 waves-effect btn-success"  onClick={this.save.bind(this)}>Sign up</button>
                        <Link to="/changePassword" className="link">Change user password</Link> <br/>
                        <Link to="/users" className="link">View user list</Link>
                </form>
                </div>  
            </div>
        )
    }
}