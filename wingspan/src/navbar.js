import React, { Component } from 'react';
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({search: e.target.value});
    }

    render() {
        return (
            <nav class="navbar">WINGSPAN
                <div class="searchHeader"></div>
                     <div class="searchBar">
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" 
                                value={this.state.search} onChange={this.handleInputChange} />	
                            <Link to={{pathname: `/main`, self: this.state.self}}>
                                <button class="searchButton" type="submit"> </button>
                            </Link>
						</form>
					</div>
            </nav>
        );
    }
}
export default NavBar;