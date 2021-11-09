import React, { Component } from 'react';
import "./post.css";
import 'bootstrap/dist/css/bootstrap.css';
import Logo from "./logo.JPG";
import ReactDOM from 'react-dom';

class Post extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			text: '',
            self: {username: ''},
            curPost: {},
		};
		this.handleChange = this.handleChange.bind(this);
	}

    retrieveSelf() {
        fetch("http://localhost:3001/self")
			.then(response => response.json())
			.then(response => this.setState({ self: response }))
    }

    componentDidMount() {
        this.retrieveSelf();
    }

	handleChange(e) {
		this.setState({text: e.target.value})
	}
    
    // keep an array of users who liked it?

	addNewPost() {
		var text = {
			text: this.state.text,
            username: this.state.self.username,
            numLikes: 0,
            numHearts: 0,
            numLaughs: 0,
            comments: [],
            time: Date().toLocaleString(),
		}
		fetch("http://localhost:3001/posts", {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(text)
		})
            .then(res => res.json())
            /*.then(res => fetch("http://localhost:3001/profiles", {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.state.self.username, post: res})
            }))*/
        //console.log(text);
        
        // update posts of self too
        fetch("http://localhost:3001/profiles", {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.self.username, post: text})
        })
	}

    render() {
        return (
            <div class='post'>
                    <form>
                    </form>
            </div>
        );
    }
}
export default Post;
