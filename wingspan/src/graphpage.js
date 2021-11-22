import { Component } from "react";
import { Route } from 'react-router-dom';

import EmbedTweet from 'react-tweet-embed';

import SearchBar from './searchbar.js';
import Logo from './logo.js';
import Header from './header.js';
import Graph from './graph.js';
import TopTweets from './toptweets.js';

import './graphpage.css';
import './background.css';

class GraphPage extends Component
{
    constructor(props) {
        super(props)
        this.state = {result: null}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(query) {
            fetch('http://localhost:8000/api?query=' + query,
                    { method: 'GET', headers: {'Content-Type': '/application/json'} })
            .then(resp => resp.json())
            .then(data => this.setState({result: data}))
            .catch(err => console.log(err))
    }

	/* Render the graph page, add page url with query once data is retrieved form Express server */
	render()
	{
        const result = JSON.parse(this.state.result);
        // Not sure why we need to JSON.parse here, but it somehow became a string
        let display;
        if (result) {
            display = <><div className = "graphcontainer"><Graph data={result.scores}/></div>
                    <div className = "tweetcontainer"><TopTweets ids={result.top_tweets}/></div></>;
        } else {
                display = <div className = "graphcontainer"><h1>Welcome to Wingspan!</h1><h3>Please submit a query to receive Tweet analysis.</h3><EmbedTweet id="20" /></div>
        }

		return (
				<>
					<nav className = "querysearchbarcontainer">
						<SearchBar handleSubmit={this.handleSubmit}/>
					</nav>
					<div className = "logocontainer">
                            <Logo/>
					</div>
					<div className = "headercontainer">
						<Header/>
                    </div>
                    { display }
				</>
		);
	}
}

export default GraphPage;
