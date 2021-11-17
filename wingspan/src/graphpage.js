import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import SearchBar from './searchbar.js';
import Logo from './logo.js';
import Header from './header.js';
import Graph from './graph.js';
import TopTweets from './toptweets.js';
import './graphpage.css';
import './background.css';

const ids = ["20", "1460657276142895123"]

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
                    <div className = "tweetcontainer">
                        <TopTweets ids={ids}/>
                    </div>
					<Route exact path='/query'/>
				</div>
		);
	}
}

export default GraphPage;
