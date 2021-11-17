import React from 'react';
import "./toptweets.css";
import TweetEmbed from 'react-tweet-embed';

class TopTweets extends React.Component {
    constructor(props) {
        /* Calls React Component Constructor */
        super(props);

		/* Constructor */
            this.tweets = props.ids.map((tid) => <TweetEmbed id={tid} />);
    }

    render() {
        return (
            <div class="toptweets">
                    <h2> Top Tweets </h2>
            <div class="tweets">
                    {this.tweets}
            </div></div>
        );
    }
}
export default TopTweets;
