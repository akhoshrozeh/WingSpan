import React, { Component } from 'react';
import "./navBar.css";
import 'bootstrap/dist/css/bootstrap.css';
import Logo from "./logo.JPG";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            userSearch: null,
            self: {username: ''},
            selfname: '',
            usersname: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


	callAPI() {
		fetch("http://localhost:3001/self")
			.then(response => response.json())
			.then(response => this.setState({ self: response, selfname: response.username }))
		//console.log(this.state.self);
	}

	componentDidMount() {
		this.callAPI();
	}

    handleInputChange(e) {
        this.setState({search: e.target.value});
    }

    async retrieveUser() {
        const username = this.state.search;
        fetch(`http://localhost:3001/profiles/${username}`)
            .then(response => response.json())
            .then(response => this.setState({userSearch: response, usersname: response.username}));

    }

    render() {
        return (
            <nav class="navbar">
                <div class="logoHeader">WINGSPAN</div>
                <div class="menu-options">
                     <div class="searchBar">
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" 
                                value={this.state.search} onChange={this.handleInputChange} />
                            <Link to={{pathname: `/profile/${this.state.usersname}`, user: this.state.userSearch, self: this.state.self}} onClick={() => this.retrieveUser()}>
                                <button class="searchButton" type="submit"> </button>
                            </Link>
                        </form>
                    </div>
                </div>
                
                <div class="clearfix"></div>
            </nav>
        );
    }
}
export default NavBar;