import React from 'react'
import NewProject from './NewProject.jsx'
import Project from './Project.jsx'
import Detail from './Detail.jsx'
import Navbar from './Navbar.js'
import NewUser from './NewUser.jsx'
import Auth from './Auth.jsx'
import AuthContext from './auth-context.js'
import ChangePassword from './ChangePassword.jsx'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export default class App extends React.Component {
	state = {
		token: null,
		userID: null
	}
	login = (token, userID, tokenExpiration) => {
		this.setState({ token: token, userID: userID })
	}
	logout = () => {
		this.setState({ token: null, userID: null })
	}
	render() {
		return (
			<Router>
				<React.Fragment>
					<AuthContext.Provider value={{
						token: this.state.token,
						userID: this.state.userID,
						login: this.login,
						logout: this.logout
					}}>
						<Navbar />
						<Switch>
							<Route exact path="/" component={Project} />
							<Route exact path="/project" component={Project} />
							{!this.state.token && <Redirect from='/newProject' to='/login' exact />}
							<Route path="/newProject" component={NewProject} />
							{this.state.token && <Redirect from='/login' to='/newProject' exact />}
							<Route path="/login" component={Auth} />
							{!this.state.token && <Redirect from='/newUser' to='/login' exact />}
							{this.state.token && <Route path="/newUser" component={NewUser} />}
							{!this.state.token && <Redirect from='/changePassword' to='/login' exact />}
							{this.state.token && <Route path="/changePassword" component={ChangePassword} />}
							<Route path={""} component={Detail} />
						</Switch>
					</AuthContext.Provider>
					<br />
				</React.Fragment>
			</Router>
		);
	}
}