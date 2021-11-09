import React from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './search.JPG'; 
import NavBar from './navbar.js';

import './signin.css';

class Signin extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			searching: '',
			click: false,
			tempu : '',
			tempp :'',
			warning: false,
			case1: false,
			clicked: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.state.clicked = false;
		this.setState({search: e.target.value})
	}
	
	saveSelf() {
		const data = {
			search: this.state.search,
		}

		fetch("http://localhost:3000/self", {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(res => console.log(res))
	}
	
	retrieveSearch() {
        const search = this.state.search;
        fetch(`http://localhost:3000/profiles/${search}`)
            .then(response => response.json())
            .then(response => 
			this.setState({ 
				searching: response.search, 
			}, () => { 

			}));
    }
	
	checkOnClick()
	{
		if ((this.state.searching == this.state.search) && this.state.searching != "") 
		{
                this.warning = false;
				this.handleSubmit()
				return "/main";

		} else if (this.state.search !== '') {
			this.state.warning = true;
			this.state.case1 = false;
			console.log(2);
		}
		return "/";
	}
	
	handleSubmit()
	{
		return this.saveSelf();
	}
	
	click()
	{
		this.retrieveSearch();
		this.state.clicked = true;
		//console.log(3);
	}

	reset_click() {
		this.state.clicked = false;
		this.state.warning = false;
	}

	render()
	{
		console.log(this.state.warning, "w");
		console.log(this.state.clicked, "c");
		const vis_style = (this.state.warning && this.state.clicked == true) ? 'visible' : 'hidden';
		const message = 'Your search sucks';
		var page = this.checkOnClick();
		return (
				<body class = "signin-container" >
					<NavBar />

					<div class = "signin-window"> 

						<form>
							<div class = "searchZ">
							<input type="text" name="search" placeholder="Search.." value={this.state.search} onChange={this.handleChange} onkeydown={() => this.reset_click}/>
							<Link type="submit_j" to = {"/main"} style={{color: '#00BFFF'}}> Go</Link>

							</div>
							

						</form>

					</div>

					<h5 id="warning" style={{visibility: vis_style}}> {message} </h5>
				</body>
		);
	}
}

export default Signin;
