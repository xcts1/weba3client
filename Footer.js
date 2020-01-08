import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './auth-context.js'

const Footer = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <div>
                <section id="footer">
                    <div className="container">
                        <div className="row text-center text-xs-center text-sm-left text-md-left">
                            <div className="=col-sm-6 col-md-6">
                                <h5>Contact</h5>
                                <i className="fas fa-map-marker-alt h6" style={{color:'white', fontSize: 17 +'px'}}> 702 Nguyen Van Linh District 7, Ho Chi Minh City</i>  
                            </div>    
                            <div className="col-sm-6 col-md-6">
                                <h5>Quick links</h5>
                                <ul className="list-unstyled quick-links row">
                            

                                    <Link to="/project" className="nav-link">Project</Link>
                                
                                    {context.token && 
                                        <Link to="/newProject" className="nav-link">Management</Link>
                                    }
                                    {context.token && 
                                        <Link to="/newUser" className="nav-link">Admin</Link>
                                    }
                                    {context.token && 
                                        <a type="button" className="nav-link" onClick={context.logout}>Logout</a>
                                    }
                                    {!context.token && 
                                        <Link to="/login" className="nav-link">Log in</Link>
                                    }
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                                <p class="h6">© 2020 Copyright: RMIT University</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            )
        }}
    </AuthContext.Consumer>
);
export default Footer;