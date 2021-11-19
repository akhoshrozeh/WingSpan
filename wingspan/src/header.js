import { Component } from "react";

import './header.css';

class Header extends Component 
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
