import React, { Component } from "react";
import ReactDOM from 'react-dom';

import Header from './header.js';
import SearchBar from './searchbar.js';
import Logo from './logo.js';
import './frontpage.css';
import './background.css';

class FrontPage extends React.Component
{
	render()
	{
		return (
		<div>
			<div className = "frontsearchbarcontainer">
				<SearchBar/> 
			</div>
			<div className = "logocontainer">
				<Logo/> 
			</div>
			<div className = "headercontainer">
				<Header/> 
			</div>
		</div>
		);
	}
}

export default FrontPage;
