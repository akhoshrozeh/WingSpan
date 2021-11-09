import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Main from './main.js';
import Signin from './signin.js';
import Profile from './Profile.js';



class Home extends React.Component
{	

	render()
	{		
		return (		
			<BrowserRouter>
				<div>
					<Switch>	
						<Route exact path="/" component={Signin}/>	
						<Route path="/signin" component={Signin}/>
						<Route path="/main" component = {Main}/>
            			<Route path="/profile" component={Profile}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render( <Home />, document.getElementById('root'));
