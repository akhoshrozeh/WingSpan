import { Component } from "react";
import { Chart } from "react-google-charts";

import './graph.css';

const options = {
    width: "1200px",
    height:  "600px",
	hAxis: {
		title: 'Seconds',
	},
	vAxis: {
		title: 'Sentiment Value',
	},
	title: "Sentiment Analysis",
	curveType: "function",
	legend: { position: "bottom" },
};

class Graph extends Component {    
    constructor(props){
        /* Calls the Component constructor */
        super(props);
        
        /* Sets values to a list of [timestamp, score] and sorts by earliest date */
        this.values = (props.data.map((scores) => {return [scores.timestamp, scores.score]})).sort();
        this.averagesBucket = this.setAverages();
    }
    
    /* For default averages graph, creates hashmap with data and averages score per day */
    setAverages(){
        let avgBucket = new Map();
        var counter = 0;
        var sum = 0;
        for (var i = 0; i < this.values.length; i++){
            var date = new Date((this.values[i][0]).replace('T', ' '));
            /*var monthDay = (date.getMonth() + 1).toString() + '/' + (date.getDate()).toString();*/
            var secs = date.getSeconds();
            if(!avgBucket.has(secs)){
                avgBucket.set(secs, this.values[i][1]);
            }
            else{
                sum = (avgBucket.get(secs)) + this.values[i][1];
                counter++;
                
                if (i+1 < this.values.length){
                    var aheadDate = new Date(this.values[i+1][0]);
                    /*var aheadMonthDay = (aheadDate.getMonth() + 1).toString() + '/' + (aheadDate.getDate()).toString();*/
                    var aheadSecs = aheadDate.getSeconds();
                    if (secs != aheadSecs){
                        avgBucket.set(secs, (sum/counter));
                        counter = 0;
                        sum = 0;
                    }
                }
                else{
                    avgBucket.set(secs, (sum/counter));
                    counter = 0;
                    sum = 0;
                }
            }            
        }
        console.log(avgBucket);
        return avgBucket;
    }
    
    /* Converts Hashmap of data into graph data */
    createGraphData(){
        const chartHeader = [["Seconds", "Sentiment Value"]];
        const chartData = [];
        for (const [date, value] of this.averagesBucket.entries()){
            chartData.push([date, value]);
        }
        
        return chartHeader.concat(chartData.sort(function(a, b){return a[0] - b[0]}));
    }
    
    /* The chartData creates the data for the graph */
	render() {
        var chartData = this.createGraphData();
        if(chartData.length == 1){
            chartData = [["Seconds", "Sentiment Value"], [0,0]];
        }
        
        console.log(chartData);
        return (	
                <div className = "chartcontainer">
					<Chart 
						chartType = "LineChart"
						data = {chartData}
						options={options}
						legendToggle
					/>
			     </div>
		);
	}
}

export default Graph;
