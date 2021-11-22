import { Component } from 'react';
import TweetEmbed from 'react-tweet-embed';

import "./toptweets.css";

class TopTweets extends Component {
    constructor(props) {
        /* Calls React Component Constructor */
        super(props);

        props.ids.sort((a,b) => b.engagement - a.engagement);
        this.tweets = props.ids.map((tweet) => <TweetEmbed id={tweet.tid} key={tweet.tid} />);
    }

    render() {
        return (
            <div>
                {this.tweets}
            </div>
        );
    }
}
export default TopTweets;
