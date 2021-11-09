import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './profile.css';
import PostFeed from './PostFeed.js'
import Comment_Reaction from './comment_reaction';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            user: this.props.location.usezr,
            self: this.props.location.self,

            posts: [],
        }
     
    }
 

    retrievePosts() {

        const username = this.state.user.username;
        fetch(`http://localhost:3000/posts/${username}`)
            .then(response => response.json())
            .then(response => this.setState({posts: response}))
    }

    componentDidMount() {

        this.retrievePosts();
    }

    render() {
        return (
            <div class="profile-page">
                <div class="user-info">
                    <div className="profile-picture" />
                    <h2>{this.state.user.username}'s posts</h2>
                </div>
                <div class="profPosts" >
                        {this.state.posts.map(post => (<Comment_Reaction post={post} noComments={false}></Comment_Reaction>))}
                     </div>
            </div>
            
        );
    }
}

/*function ProfilePic(props) {
    return (
        <img>{props}</img>
    );
}*/

/*function ProfileDescription(props) {
    return (
        <div>
            <p>{props.children}</p>
        </div>
    );
}*/



/*
Planning out how profiles are created/managed (if we have a creation feature)
upon sign up, put in a bunch of fields
add a Profile component to backend and somehow mark the profile as the user's?
when profile button at the top is clicked, send to that user's profile
*/
export default Profile;