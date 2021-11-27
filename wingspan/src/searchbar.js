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
	
	/* Creates text box that updates value for every keystroke */
	/* Submit handles when button is clicked and query is sent to Express server */
	/* Input and button bundled in div to position together as one unit */
	render()
	{
		return (
			<div className="searchBar">
				<input type="text" placeholder="Search.." value={this.state.value} onChange={this.handleChange}/>
				<button className="searchButton" type="submit" onClick={(e) => this.handleSubmit(this.state.value)}/>
			</div>
		);
	}
}

export default SearchBar;
