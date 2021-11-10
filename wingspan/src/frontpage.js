import React from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './frontpage.css';

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
			}, () => { }));
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
			<div class = "container">
				<div class = "frontBG">WINGSPAN</div>
				<div class = "front-window"></div>
					<form>
					<div class = "search">
					<input type="text" name="search" placeholder="Search.." value={this.state.search} onChange={this.handleChange} onkeydown={() => this.reset_click}/>
						<Link type="submit_j" to = {"/main"}> 
							<button class="front_searchButton" type="submit"> </button>
						</Link>
					</div>	
					</form>
			</div>
		);
	}
}

export default Signin;
