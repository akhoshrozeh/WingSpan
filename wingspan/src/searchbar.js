import { Component } from "react";

import './searchbar.css';

class SearchBar extends Component{
	constructor(props) {
		/* Calls React Component Constructor */
		super(props);
		
		/* Constructor */
		this.state = {
			value: '',
		}
		
		/* Binds function names to their respective functions */
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = props.handleSubmit.bind(this);
	}
	
	/* Updates this.state.value whenever new character is input/deleted */
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	
	/* When submit button is clicked, this.state.value contains data from search box */
	handleSubmit2() {
		fetch("http://localhost:3001/", {
			method: 'POST',
			mode: 'cors',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				query : this.state.value
			})
		})
			.then(function(response){ localStorage.setItem('result', JSON.stringify(response.json())) })
			.catch(error=>console.log(error))
	}
	
	/* Creates text box that updates value for every keystroke */
	/* Submit handles when button is clicked and query is sent to Express server */
	/* Input and button bundled in div to position together as one unit */
	render()
	{
		return (
			<div className = "searchBar">
				<input type = "text" placeholder = "Search.." value = {this.state.value} onChange = {this.handleChange}/>
				<button className = "searchButton" type = "submit" onClick={(e) => {this.handleSubmit(this.state.value); this.state.value=""}}/>
			</div>
		);
	}
}

export default SearchBar;
