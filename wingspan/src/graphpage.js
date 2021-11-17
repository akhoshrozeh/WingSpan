import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import SearchBar from './searchbar.js';
import Logo from './logo.js';
import Header from './header.js';
import Graph from './graph.js';
import './graphpage.css';
import './background.css';

class GraphPage extends React.Component 
{
	/* Render the graph page, add page url with query once data is retrieved form Express server */
	render() 
	{
		return (
				<div>
					<nav className = "querysearchbarcontainer">
						<SearchBar/>
					</nav>
					<div className = "logocontainer">
						<Logo/> 
					</div>
					<div className = "headercontainer">
						<Header/> 
					</div>
					<div className = "graphcontainer">
						<Graph/>
					</div>
					<Route exact path='/query'/>
				</div>
		);
	}
}

export default GraphPage;