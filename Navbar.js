import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './auth-context.js'

const Navbar = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <nav className="navbar navbar-expand-sm navbar-dark px-sm-5" style={{ backgroundColor: 'rgb(0, 0, 83)' }}>
                    <Link to='/' className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-list-2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item ml-5 justify-content-left">
                                <Link to="/project" className="nav-link">Project</Link>
                            </li>
                            {context.token && <li className="nav-item ml-5 justify-content-left">
                                <Link to="/newProject" className="nav-link">Management</Link>
                            </li>}
                            {context.token && <li className="nav-item ml-5 justify-content-left">
                                <Link to="/newUser" className="nav-link">Admin</Link>
                            </li>}
                            {context.token && <li className="nav-item ml-5 justify-content-left">
                                <a type="button" className="nav-link" onClick={context.logout}>Logout</a>
                            </li>}
                            {!context.token && <li className="nav-item ml-5 justify-content-left">
                                <Link to="/login" className="nav-link">Log in</Link>
                            </li>}
                        </ul>
                    </div>
                </nav>
            )
        }}
    </AuthContext.Consumer>
);
export default Navbar;