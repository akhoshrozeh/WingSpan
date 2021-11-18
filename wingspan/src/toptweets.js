import React from 'react';
import "./toptweets.css";
import TweetEmbed from 'react-tweet-embed';

class TopTweets extends React.Component {
    constructor(props) {
        /* Calls React Component Constructor */
        super(props);

        props.ids.sort((a,b) => b.engagement - a.engagement);
        this.tweets = props.ids.map((tweet) => <TweetEmbed id={tweet.id} />);
    }

    render() {
        return (
            <div class="tweetcontainer">
                    {this.tweets}
            </div>
        );
    }
}
export default TopTweets;
