import { Component } from "react";
import { Route } from 'react-router-dom';

import SearchBar from './searchbar.js';
import Logo from './logo.js';
import Header from './header.js';
import Graph from './graph.js';
import TopTweets from './toptweets.js';

import './graphpage.css';
import './background.css';

const result2 = {
                top_tweets: [{id:"20", engagement:10}, 
                             {id:"1460657276142895123", engagement:20}],
                scores: [{timestamp: '2021-11-11T12:34:56Z', score: 50}, 
                         {timestamp: '2021-11-12T12:34:56Z', score: 11},
                         {timestamp: '2021-11-18T18:53:26Z', score: 20},
                         {timestamp: '2021-11-14T18:53:26Z', score: 40},
                         {timestamp: '2021-11-15T18:53:26Z', score: 100},
                         {timestamp: '2021-11-16T18:53:26Z', score: 7},
                         {timestamp: '2021-11-17T18:53:26Z', score: 30},
                         {timestamp: '2021-11-19T19:53:26Z', score: 70},
                         {timestamp: '2021-11-19T18:53:26Z', score: 0},
                         {timestamp: '2021-11-19T18:55:26Z', score: 90}]
                };

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
        let graph, tweets;
        if (result) {
            graph = <div className = "graphcontainer"><Graph data={result.scores}/></div>;
            tweets =<div className = "tweetcontainer"><TopTweets ids={result.top_tweets}/></div>;
        } else {
            graph = "";
            tweets = "";
        }

		return (
				<div>
					<nav className = "querysearchbarcontainer">
						<SearchBar handleSubmit={this.handleSubmit}/>
					</nav>
					<div className = "logocontainer">
                            <Logo/>
					</div>
					<div className = "headercontainer">
						<Header/> 
					</div>
                    { graph }
                    { tweets }
					<Route exact path='/query'/>
				</div>
		);
	}
}

export default GraphPage;
