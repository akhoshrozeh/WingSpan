import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class PostFeed extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  retrieveUsers() {
    fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .then(response => this.setState({posts: response}))
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  render() {
        return (
            <div className="landing-page">
              <div>
              </div>
              <div>
               </div>
            </div>
        );
    }
}

export default PostFeed; 