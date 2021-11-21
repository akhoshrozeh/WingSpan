import { Component } from "react";
import { Chart } from "react-google-charts";

import './graph.css';

const options = {
    width: "1200px",
    height:  "600px",
	hAxis: {
		title: 'Time',
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
            const date = new Date(this.values[i][0]);
            const monthDay = (date.getMonth() + 1).toString() + '/' + (date.getDate()).toString();
            if(!avgBucket.has(monthDay)){
                avgBucket.set(monthDay, this.values[i][1]);
            }
            else{
                sum = (avgBucket.get(monthDay)) + this.values[i][1];
                counter++;
                
                if (i+1 < this.values.length){
                    const aheadDate = new Date(this.values[i+1][0]);
                    const aheadMonthDay = (aheadDate.getMonth() + 1).toString() + '/' + (aheadDate.getDate()).toString();
                    if (monthDay != aheadMonthDay){
                        avgBucket.set(monthDay, (sum/counter));
                        counter = 0;
                        sum = 0;
                    }
                }
                else{
                    avgBucket.set(monthDay, (sum/counter));
                    counter = 0;
                    sum = 0;
                }
            }            
        }
        
        return avgBucket;
    }
    
    /* Converts Hashmap of data into graph data */
    createGraphData(){
        const chartData = [["Date", "Sentiment Value"]];
        for (const [date, value] of this.averagesBucket.entries()){
            chartData.push([date, value]);
        }
        
        return chartData;
    }
    
    /* The chartData creates the data for the graph */
	render() {
        const chartData = this.createGraphData();
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
