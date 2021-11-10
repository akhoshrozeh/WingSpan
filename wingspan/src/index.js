import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Main from './main.js';
import FrontPage from './frontpage.js';

class Home extends React.Component
{	

	render()
	{		
		return (		
			<BrowserRouter>
				<div>
					<Switch>	
						<Route exact path="/" component={FrontPage}/>	
						<Route path="/main" component = {Main}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render( <Home />, document.getElementById('root'));
