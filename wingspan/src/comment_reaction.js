import React, { Component } from 'react';
import "./comment_reaction.css";
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';

function Comment(props) {
    return(
        <div class="comment_post"  style={{visibility: 'visible'}} >
            <img class="picture2" width="30" height="30" alt="" />
            <div class="name2">{props.username}</div>
            {props.text}
        </div>
    );
}

class Comment_Reaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            comment: '',
            temp_comment: 'wow super cool!',
            style: 'visible',
            self: {username: ''},
        }
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    // retrieve post information
    /*retrievePost() {
        const postID = this.props.post.text;
        fetch(`http://localhost:3001/posts/${postID}`)
            .then(res => res.json())
            .then(res => this.setState({post: res}))
    }

    componentDidMount() {
        this.retrievePost();
    }*/

    retrieveSelf() {
        fetch("http://localhost:3001/self")
			.then(response => response.json())
			.then(response => this.setState({ self: response }))
    }

    componentDidMount() {
        this.retrieveSelf();
    }

    handleCommentChange(e) {
        this.setState({comment: e.target.value});

    }

    addNewComment() {
    	fetch('http://localhost:3001/posts', {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postID: this.state.post.text, comment: {username: this.state.self.username, text: this.state.comment}})
        })
    }

    // also patch post information to add thumbs up, heart, laugh, comments

    /*handleLike(e) {
        this.patchPost(likes, this.state.post.likes + 1)
        fetch('http://localhost:3001/posts', {
            method: 'PATCH',
            headers: {
				'Content-Type': 'application/json'
			},
			body: {likes: this.state.post.likes}
        })
    }

    handleHeart(e) {
        this.setState({hearts: this.state.post.hearts + 1});
    }

    handleLaughs(e) {
        this.setState({laughs: this.state.post.laughs + 1});
    }*/
    

    

    render() {
        if (this.props.noComments) {
            return (
                <div class='metacontainer'>
                    <img class="picture" width="60" height="60" alt="" />
                    <div class="name">{this.props.post.username}</div>
                    <div class="sample">{this.props.post.text}</div>
                </div>
            );
        }
        else {
            return (
                <div class='metacontainer'>
                    <img class="picture" width="60" height="60" alt="" />
                    <div class="name">{this.props.post.username}</div>
                    <div class="sample">{this.props.post.text}</div>
    
    
                    {/*<div class="comment_post"  style={{visibility: this.state.style}} >
                      <img class="picture2" width="30" height="30" alt="" />
                      <div class="name2">{this.props.post.username}</div>
                      {this.state.temp_comment}
                      </div>
                    <div class="comment_post"  style={{visibility: this.state.style}} >
                      <img class="picture2" width="30" height="30" alt="" />
                      <div class="name2">{this.props.post.username}</div>
                      {this.state.temp_comment}
                    </div>*/}
                    <div>
                        {this.props.post.comments.map(
                            comment => (<Comment username={comment.username} text={comment.text}></Comment>)
                            )}
                    </div>
                    <div class='container'>
                        <input type="text" placeholder= 'Type here...' value={this.state.comment} onChange={this.handleCommentChange}/>
                        <button type="reset" id='send'onClick={() => this.addNewComment()}></button>
                    </div>
                </div>
            );
        }
        
    }
}
export default Comment_Reaction;
