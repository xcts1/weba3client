import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class ChangePassword extends Component {
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
                        <button type="submit" className="rounded-pill btn-block z-depth-0 my-4 waves-effect btn-success">Save</button>
                        <Link to="/newUser" className="link">Add new user</Link>
                        
                    </form>
                </div>
            </div>
        )
    }
}
