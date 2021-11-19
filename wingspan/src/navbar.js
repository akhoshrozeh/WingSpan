import React, { Component } from 'react';
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
		/* Calls React Component Constructor */
        super(props);
		
		/* Constructor */
        this.state = {
            value: '',
        }
		
		/* Binds function names to their respective functions */
        this.handleInputChange = this.handleInputChange.bind(this);
		this.handleNavSubmit = this.handleNavSubmit.bind(this);
    }

	/* Updates this.state.value whenever new character is input/deleted */
    handleInputChange(e) {
        this.setState({value: e.target.value});
    }
	
	/* When submit button is clicked, this.state.value contains data from search box */
	handleNavSubmit(){
		fetch("http://localhost:3001/main", {
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

	/* Class navbar container that holds all front end elements */
	/* Class searchBar contains  */
	/* Class form-inline shapes search box*/
	/* Class searchButton contains image of search button, redirect back to main once submitted query */
    render() {
        return (
            <nav className = "navbar">WINGSPAN
                <form className = "form-inline">
                    <input className = "form-control mr-sm-2" type = "search" placeholder = "Search..." aria-label="Search" value = {this.state.value} onChange = {this.handleInputChange}/>	
                    <button className = "searchButton" type = "submit" onClick={(e) => {this.handleNavSubmit(); window.location.href = '/main';}}/>
				</form>
            </nav>
        );
    }
}
export default NavBar;