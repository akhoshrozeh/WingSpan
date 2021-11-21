import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GraphPage from './graphpage.js';
import FrontPage from './frontpage.js';

class LandingPage extends React.Component
{	
	render()
	{		
		return (		
			<BrowserRouter>
				<div>
					<Switch>	
						<Route exact path="/" component={FrontPage}/>	
						<Route path="/query" component = {GraphPage}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render( <LandingPage />, document.getElementById('root'));
