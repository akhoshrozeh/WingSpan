import { Component } from 'react';
import TweetEmbed from 'react-tweet-embed';

class TopTweets extends Component {
    showTweets(ids) {
        let tweets = JSON.parse(JSON.stringify(ids));  // Deep copy
        tweets.sort((a,b) => b.engagement - a.engagement);
        tweets = tweets.slice(0, 20);
        return tweets.map((tweet) => <TweetEmbed id={tweet.tid} key={tweet.tid} />);
    }

    render() {
        return <>{this.showTweets(this.props.ids)}</>
    }
}
export default TopTweets;
