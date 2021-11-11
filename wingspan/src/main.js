import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './navbar.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Main extends React.Component 
{
	render() 
	{
		return (
			<BrowserRouter>
				<div>
					<NavBar />
					<Switch>
					<Route exact path='/main'>
					</Route>
				</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default Main;