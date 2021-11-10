import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './navbar.js';
import Graph from './graphpage.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Main extends React.Component 
{
	constructor(props) {
		super(props);
		this.state = {
			apiResponse: "",
			self: null,
		};
	}
	render() 
	{
		return (
			<BrowserRouter>
				<div class="bodybackground">
					<NavBar />
					<Switch>
					<Route exact path='/main'>
						<Graph />
					</Route>
				</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default Main;