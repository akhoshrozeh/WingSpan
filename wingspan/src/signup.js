import React, { Component } from 'react';
import "./post.css";
import 'bootstrap/dist/css/bootstrap.css';
import Logo from "./SignBG.png";
import ReactDOM from 'react-dom';

class Post extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			text: '',
            self: {search: ''},
            curPost: {},
		};
		this.handleChange = this.handleChange.bind(this);
	}

    retrieveSelf() {
        fetch("http://localhost:3000/self")
			.then(response => response.json())
			.then(response => this.setState({ self: response }))
    }

    componentDidMount() {
        this.retrieveSelf();
    }

	handleChange(e) {
		this.setState({text: e.target.value})
	}
    

	addNewPost() {
		var text = {
			text: this.state.text,
            search: this.state.self.search,

            time: Date().toLocaleString(),
		}
		fetch("http://localhost:3000/posts", {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(text)
		})
            .then(res => res.json())

        fetch("http://localhost:3000/profiles", {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({search: this.state.self.search, post: text})
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
