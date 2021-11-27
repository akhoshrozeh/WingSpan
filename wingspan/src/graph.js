import React, { Component, useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import './graph.css';

class Graph extends Component {    
    constructor(props){
        /* Calls the Component constructor */
        super(props);
        
        /* Sets values to a list of [timestamp, score] and sorts by earliest date (Used for averages) */
        this.state = {
            curr_pos : 0,
            values : (props.data.map((scores) => {return [scores.timestamp, scores.score]})),
        };
    }
    
    /* For averages graph, creates hashmap with data and averages score per day */
    setAverages(values){
        let avgBucket = new Map();
        
        let dateSum = new Map();
        let dateCount = new Map();  
        for (var i = 0; i < values.length; i++){
            var date = new Date((values[i][0]).replace('T', ' '));
            var dateStr = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();

            if(!dateSum.has(dateStr)){
                dateSum.set(dateStr, values[i][1]);
                dateCount.set(dateStr, 1);
            }
            else {
                var sum = dateSum.get(dateStr) + values[i][1];
                var count = dateCount.get(dateStr) + 1;
                dateSum.set(dateStr, sum);
                dateCount.set(dateStr, count)
            }
      
        }
        for (let key of dateSum.keys()) {
            if(dateCount.get(key) === 0){
                continue;
            }
            avgBucket.set(key, dateSum.get(key) / dateCount.get(key))
        }

        return avgBucket;
    }
    
    /* For histogram graph, creates a hashmap with Tweet # and Sentiment value */
    setHistories(values){
        let histBucket = new Map();
        
        for (var i = 0; i < values.length; i++){
            histBucket.set("Tweet " + (i).toString(), values[i][1]);
        }
        
        return histBucket;
    }
    
    /* For positive negative sentiment value graph */
    setPosNeg(values){
        const posData = [];
        const negData = [];
        const chartData = [];
        for (var i = 0; i < values.length; i++){
            if (values[i][1] > 0){
                posData.push(values[i]);
            }
            else{
                negData.push(values[i]);
            }
        }
        
        let posHash = this.setAverages(posData);
        let negHash = this.setAverages(negData);
        
        let posSentiments = this.createGraphData(posHash);
        let negSentiments = this.createGraphData(negHash);
        
        for (var i = 0; i < posSentiments.length; i++){
            chartData.push([i, posSentiments[i][1], negSentiments[i][1]]);
        }
        
        return chartData.sort(function(a, b){return a[0] - b[0]});
    }
    
    /* Utility function that converts Hashmap of data into graph data */
    createGraphData(bucket){
        const chartData = [];
        for (const [key, value] of bucket.entries()){
            chartData.push([key, value]);
        }
        
        return chartData.sort(function(a, b){return a[0] - b[0]});
    }
    
    /* Draws the average chart */
    drawAvgsChart(values){   
        const chartHeader = [["Date", "Sentiment Value"]];
        var data = chartHeader.concat(this.createGraphData(this.setAverages(values)));
        if(values.length === 0){
            data = chartHeader.concat([[0, NaN]]);
            alert("No tweets with this query");
        }
        
        var options = {
           height: window.innerHeight * 0.7,
           width: window.innerWidth * 0.7,
	       hAxis: {
                title: 'Date',
	       },
	       vAxis: {
                title: 'Sentiment Value',
	       },
	       title: "Sentiment Analysis Averages",
	       legend: { position: "none" },
           backgroundColor: {fill: 'transparent'},
        };
        return (<Chart className = "chart"
                    chartType = "LineChart" 
                    data = {data} 
                    options = {options} 
                    legendToggle 
                />);
    }
    
    /* Draws the histogram chart */
    drawHistogramChart(values){
        const chartHeader = [['Tweets', 'Sentiment Value']];
        var data = chartHeader.concat(this.createGraphData(this.setHistories(values)));
        if (values.length === 0){
            data = chartHeader.concat([[0, NaN]]);
            alert("No tweets with this query");
        }
        
        var options = {
           height: window.innerHeight * 0.7,
           width: window.innerWidth * 0.7,
	       hAxis: {
                title: 'Sentiment Value',
	       },
	       vAxis: {
                title: 'Tweets',
	       },
	       title: "Sentiment Analysis Histogram",
           legend: {position: "none"},
           backgroundColor: {fill: 'transparent'},
        };
        return (<Chart className = "chart"
                    chartType = "Histogram" 
                    data = {data} 
                    options = {options} 
                    legendtoggle
                />);
    }
    
    /* Draws the positive negative chart */
    drawPosNegChart(values){
        const chartHeader = [["Date", "Positive Sentiment Value", "Negative Sentiment Value"]];
        var data = chartHeader.concat(this.setPosNeg(values));
        if(values.length === 0){
            data = chartHeader.concat([[0, NaN, NaN]]);
            alert("No tweets with this query");
        }
        
        var options = {
           height: window.innerHeight * 0.7,
           width: window.innerWidth * 0.7,
	       hAxis: {
                title: 'Date',
	       },
	       vAxis: {
                title: 'Sentiment Value',
	       },
	       title: "Sentiment Positive and Negative Averages",
	       legend: { position: "bottom" },
           backgroundColor: {fill: 'transparent'},
        };
        return (<Chart className = "chart"
                    chartType = "LineChart" 
                    data = {data} 
                    options = {options} 
                    legendToggle 
                />);        
    }
    
    /* Handles the on click position */
    handleClick(position){
        if(position === 0){
            this.setState({
                curr_pos: 1
            });
        }
        else if(position === 1){
            this.setState({
               curr_pos: 2 
            });
            

        }
        else if(position === 2){
            this.setState({
                curr_pos: 0
            });
        }
    }
    
    /* Calls the proper graph based on the current position */
    handleGraph(values){
        if (this.state.curr_pos === 0){
            return this.drawAvgsChart(values);
        }
        else if (this.state.curr_pos === 1){
            return this.drawHistogramChart(values);
        }
        else if (this.state.curr_pos === 2){        
            return this.drawPosNegChart(values);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({ 
                curr_pos : 0,
                values : (nextProps.data.map((scores) => {return [scores.timestamp, scores.score]})),
            });
        }
    }
    
    /* The chartData creates the data for the graph */
	render() {
        return (	
                <div className = "chartcontainer">
                    {this.handleGraph(this.state.values)}
                    <button className = "graphButton" type = "submit" onClick={(e) => this.handleClick(this.state.curr_pos)}/>
                </div> 
		);
	}
}

export default Graph;
