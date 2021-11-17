import React, { Component } from "react";
import ReactDOM from 'react-dom';

import './header.css';

class Header extends React.Component 
{
	/* Header class forms the words and blue border */
	render() 
	{
		return (
			<header className = "header"> 
				<h1> WINGSPAN </h1>
			</header>
		);
	}
}

export default Header;