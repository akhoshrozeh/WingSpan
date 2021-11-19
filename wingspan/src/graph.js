import { Component } from "react";
import { Chart } from "react-google-charts";

import './graph.css';

//note: index of days corresponds to score for that day
//want to average and plot scores for each day

const result = {top_tweets: [{id:"20", engagement:10}, {id:"1460657276142895123", engagement:20}],
	scores: [{timestamp: '2021-11-11T12:34:56Z', score: 50}, 
			{timestamp: '2021-11-12T12:34:56Z', score: 11},
			{timestamp: '2021-11-18T18:53:26Z', score: 20},
			{timestamp: '2021-11-14T18:53:26Z', score: 40},
			{timestamp: '2021-11-15T18:53:26Z', score: 100},
			{timestamp: '2021-11-16T18:53:26Z', score: 7},
			{timestamp: '2021-11-19T19:53:26Z', score: 79},
			{timestamp: '2021-11-19T19:53:26Z', score: 70},
			{timestamp: '2021-11-19T18:53:26Z', score: 0},
			{timestamp: '2021-11-19T18:55:26Z', score: 90}]};

result.scores.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
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

// const data = [
// 	["Hour", "Sentiment Value"],
// 	[result.scores[0].timestamp, result.scores[0].score]

// ];
// let data = [];
// data.push(["Hour", "Sentiment Value"]);
var columns = [["Hour", "Sentiment Value"]];
// data.push(result.scores.map(object => [object.timestamp, object.score]));
var temp = result.scores.map(object => [object.timestamp, object.score]);
var temp2 = [];
for (var i = 0; i < temp.length - 1; i++) {
	console.log("called");
	var currentDate = temp[i][0].slice(0, 10);
	var nextDate = temp[i + 1][0].slice(0, 10);
	if (currentDate != nextDate) {
		temp2.push([currentDate, temp[i][1]]);
	} else {
		// console.log(currentDate);
		var sum = (temp[i][1] + temp[i + 1][1]);
		// console.log(sum);
		var count = 2;
		// var sum = (temp[i][1] + temp[i + 1][1]);
		// temp2.push([currentDate, avgScore]);
		// var j = i + 2;
		// console.log("j" + j);
		// if (j < temp.length) {
		// while (j < temp.length) {
		// 	nextDate = temp[j][0].slice(0, 10);
		// 	// console.log(nextDate);
		// 	if (currentDate != nextDate) {
		// 		break;
		// 	}
		// 	sum += temp[j][1];
		// 	// console.log(sum);
		// 	count ++;
		// 	console.log(count);
		// 	// console.log(currentDate != nextDate);
		// 	j++;
		// }
		for (var j = i + 2; j < temp.length; j++) {
			nextDate = temp[j][0].slice(0, 10);
			// console.log(nextDate);
			if (currentDate === nextDate) {
				sum += temp[j][1];
				count ++;
				i = j+1;

			} else {
				break;
			}
		}
		// }
		console.log(sum);
		console.log(count);
		var avg = sum / count;
		temp2.push([currentDate, avg]);

	}
	// if (currentDate === nextDate) {
	// 	temp[i][1] = (temp[i][1] + temp[i + 1][1]) / 2;
	// 	temp.splice(i + 1, 1);
	// }
	// console.log(temp2);
}

const data = columns.concat(temp2);
// console.log(data[0].length);
// data = result.scores.map(object => [object.timestamp, object.score]);



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
