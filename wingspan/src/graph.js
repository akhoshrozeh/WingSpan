import React, { Component } from "react";
import ReactDOM from 'react-dom';

import { Chart } from "react-google-charts";
import './graph.css';

const data = [
	["Hour", "Sentiment Value"],
	["1", 1000],
	["2", 1170],
	["3", 660],
	["4", 1030]
];

const options = {
	hAxis: {
		title: 'Time',
	},
	vAxis: {
		title: 'Sentiment Value',
	},
	title: "Sentiment Analysis",
	curveType: "function",
	legend: { position: "bottom" }
};

class Graph extends React.Component {
	render() {
        return (	
			<div className = "chartcontainer">
					<Chart
						chartType = "LineChart"
						data = {data}
						width = "1100px"
						height = "600px"
						options={options}
						legendToggle
					/>
			</div>
		);
	}
}

export default Graph;