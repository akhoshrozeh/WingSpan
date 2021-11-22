import { Component } from 'react';
import TweetEmbed from 'react-tweet-embed';

import "./toptweets.css";

class TopTweets extends Component {
    showTweets(ids) {
        let tweets = JSON.parse(JSON.stringify(ids));  // Deep copy
        tweets.sort((a,b) => b.engagement - a.engagement);
        return tweets.map((tweet) => <TweetEmbed id={tweet.tid} key={tweet.tid} />);
    }

    render() {
        return (
            <div>
                {this.showTweets(this.props.ids)}
            </div>
        );
    }
}
export default TopTweets;
