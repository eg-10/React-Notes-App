import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/styles/rsuite-dark.css';
// import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CustomNavbar from './components/Navbar';
import Login from './components/Login';
import MainContainer from './containers/MainContainer';
import Signup from './components/Signup';
import fire from './config/fire';


class App extends Component {

	state = {
		user: null,
	}

	componentDidMount() {
		this.authListener();
	}

	authListener = () => {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				this.setState({ user: user });
			}
			else {
				this.setState({ user: null });
			}
		})
	}

	logoutHandler = () => {
		fire.auth().signOut().then(() => {
			console.log('signOut');
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<CustomNavbar user={this.state.user} logout={this.logoutHandler} />
					<Switch>
						<Route path="/login">
							<Login user={this.state.user} />
						</Route>
						<Route path="/signup">
							<Signup user={this.state.user} />
						</Route>
						<Route path="/">
							<MainContainer user={this.state.user} logout={this.logoutHandler} />
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
