import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './profile.css';
import PostFeed from './PostFeed.js'
import Comment_Reaction from './comment_reaction';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //username: this.props.match.params.username,
            //user: {username: ''},
            //self: {username: ''},
            user: this.props.location.usezr, // user should have all of its posts
            self: this.props.location.self,
            /*testSelf: {username: ''},
            testUser: {username: ''},*/
            //posts: [{text: 'hello'}, {text: 'meow'}],
            posts: [],
        }
        /*if (this.state.user) {
            this.setState({posts: this.state.user.posts})
        }*/
    }
    // retrieve self and user here
    /*retrieveSelf() {
        fetch("http://localhost:3001/self")
			.then(response => response.json())
			.then(response => this.setState({ testSelf: response }))
            //.then(response => console.log(this.state.self));
    };
    retrieveUser() {
        const username = this.props.match.params.username;
        console.log(username);
        fetch(`http://localhost:3001/profiles/${username}`)
            .then(response => response.json())
            .then(response => this.setState({ testUser: response }))
            //.then(data => console.log(data));
    };*/
    /*componentDidMount() {
        //this.retrieveSelf();
        this.retrieveUser();
        //this.setState({user: {username: 'meowmeow'}});
        console.log(this.state.user);
        //console.log(this.state.self);
    };*/

    /*addFollower() {
        if (this.state.user.username === this.state.self.username) {
            return;
        }
        fetch('http://localhost:3001/profiles', {
            method: 'PUT',
            body: { user: this.state.user, self: this.state.self }
        })
        // call express patch function or whatever
    }*/

    retrievePosts() {
        /*for (let i = 0; i < this.state.user.posts.length; i++) {
            postID = this.state.user.posts[i];
            fetch(`http://localhost:3001/posts/${postID}`)
                .then(res => res.json())
                .then(res => this.setState({posts: posts.concat(res)}))
        }*/
        const username = this.state.user.username;
        fetch(`http://localhost:3001/posts/${username}`)
            .then(response => response.json())
            .then(response => this.setState({posts: response}))
    }

    componentDidMount() {
        /*this.retrieveUser();
        console.log(this.state.testUser);*/
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