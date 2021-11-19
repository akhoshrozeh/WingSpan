import { Component } from "react";
import { Chart } from "react-google-charts";

import './graph.css';

//note: index of days corresponds to score for that day
//want to average and plot scores for each day
const days = [ //10 days
	'2021-11-11', '2021-11-12', '2021-11-13', 
	'2021-11-14','2021-11-15','2021-11-16',
	'2021-11-17', '2021-11-18', '2021-11-19', 
	'2021-11-20'];
	
	const scores= [ //20 scores
		50, 11, 20, 40, 100, 7, 30, 70, 0, 
		90];

	/*
	const data = [];
	data[0,0] = ["Hour", "Sentiment Value"];
 	for (var i =1; i < days.length+1; i++) {
		datas.push([days[i],scores[i]]);
	};
	*/
	/*
	for (var j=0; j< days.length; j++) {

		if days[j] = days[j+1] { //average the scores if they are for the same day
			scores[j] = (scores[j] + scores[j+1]) / 2;
	}
	*/

const data = [
	["Hour", "Sentiment Value"],
	[days[0], scores[0]],
	[days[1], scores[1]],
	[days[2], scores[2]],
	[days[3], scores[3]],
	[days[4], scores[4]],
	[days[5], scores[5]],
	[days[6], scores[6]],
	[days[7], scores[7]],
	[days[7], scores[8]],
	[days[9], scores[9]],
	[days[10], scores[10]],

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

class Graph extends Component {
	render() {
        return (	
			<div className = "chartcontainer">
					<Chart
						chartType = "LineChart"
						data = {data}
						width = "1200px"
						height = "600px"
						options={options}
						legendToggle
					/>
			</div>
		);
	}
}

export default Graph;
