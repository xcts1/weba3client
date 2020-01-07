import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './auth-context.js'
const url = 'http://13.229.31.156/users/'
const url1 = 'http://13.229.31.156/user/'
export default class Users extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            username: "",
        }
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        const token = this.context.token
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(res => res.json())
            .then(json => this.setState({ users: json }))
    }
    componentDidMount() {
        this.fetchData()
    }

    delete(id) {
        const token = this.context.token
        if (confirm('Do you want to delete '+ id + '?')) {
            fetch(url1 + id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            }).then(res => res.json())
                .then(json => this.fetchData())
            { console.log(url + id) }
        }
    }

    render() {
        const userID = this.context.userID
        return (
            <div className="login-page">
                <div className="form">
                    <form className='login-form'>
                        <h4 className="text-center">
                            USER LIST
                        </h4>
                        <br />
                        {console.log('user:' + this.state.users)}
                        <table className="table table-hover">
                            {this.state.users.map(s =>
                                <tbody>
                                    <td>
                                        {console.log(s)}
                                        Username : {s.username}
                                        
                                        <button type='button' className="btn btn-danger" onClick={this.delete.bind(this, s.username)}>Delete</button>
                                    </td>
                                    {console.log('users: ' + s)}
                                </tbody>)}
                        </table>
                        <Link to="/newUser" className="link" >Add new user</Link> <br />
                        <Link to="/changePassword" className="link">Change user password</Link>
                    </form>
                </div>
            </div>
        )
    }
}
