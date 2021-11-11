import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './frontpage.css';

class FrontPage extends React.Component
{
	constructor(props) {
		/* Calls React Component Constructor */
		super(props);
		
		/* Constructor */
		this.state = {
			value: '',
		}
		
		/* Binds function names to their respective functions */
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/* Updates this.state.value whenever new character is input/deleted */
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	/* When submit button is clicked, this.state.value contains data from search box */
	handleSubmit() {
		fetch("http://localhost:3001/", {
			method: 'POST',
			mode: 'cors',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				query : this.state.value
			})
		})
			.then(function(response){return response.json()})
			.catch(error=>console.log(error))
	}
	
	/* Container holds front end elements */
	/* FrontBG contains Top color block with WINGSPAN text */
	/* Front-window contains text box and search button image */
	/* Label to separate entity of textbox and search button */
	/* Button runs two functions, one to handleSubmit and one to redirect to '/main' */
	render()
	{
		return (
			<div className = "container">
				<div className = "frontBG">WINGSPAN</div>
				<div className = "front-window"></div>
				<label>
					<input type = "text" placeholder = "Search.." value = {this.state.value} onChange = {this.handleChange}/>
				</label>
				<button className = "front_searchButton" type = "submit" onClick={(e) => {this.handleSubmit(); window.location.href = '/main';}}/>
			</div>
		);
	}
}

export default FrontPage;
