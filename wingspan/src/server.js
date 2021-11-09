//import { firebase, database } from './index.js';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const admin = require('firebase-admin');
const databasePassword = require('./firebase-password.json');

admin.initializeApp({
    credential: admin.credential.cert(databasePassword)
});

const db = admin.firestore();

const profiles = db.collection('profiles');
const posts = db.collection('posts');

const users = [
    {
        username: '',
        password: '',
        // followers and following can be arrays of usernames
        // will just have to deal with retrieval elsewhere
        followers: [],
        following: [],
        id: 0,
    }
];
let currentId = 1;

var self = {
	z : ""
};


app.post('/posts', async (request, response) => {
    const post = request.body;

    await posts.doc(post.text).set(post);

});

app.get('/posts', (request, response) => {
    db.collection("posts")
    .orderBy("time", "desc")
    .get()
    .then(function(querySnapshot) {
        response.send(querySnapshot.docs.map(doc => doc.data()));
    });
})

app.get('/posts/:username', (request, response) => {
    const username = request.params.username;
    db.collection("posts")
        .where("username", "==", username)
        .get()
        .then(function(querySnapshot) {
            //querySnapshot.
            //forEach(doc => { console.log(doc.data())});
            response.send(querySnapshot.docs.map(doc => doc.data()))
        })
});

app.patch('/posts', (request, response) => {
    const postID = request.body.postID;
    const comment = request.body.comment
    posts.doc(postID)
        .update({
            comments: admin.firestore.FieldValue.arrayUnion(comment)
        })
})

app.get('/profiles/:username', (request, response) => {
    const username = request.params.username;
    profiles.doc(username)
        .get()
        .then(snap => {
			if (snap.exists)
			{
				response.send(snap.data())
			}
			else
			{
				response.send(JSON.parse('{ "username":"richard", "password": "undefined"}'))
			}
        });
  });

// save self
app.post('/self', async (request, response) => {
    const username = request.body.username;

    if (username != "")
	{
		const profileRef = await profiles.doc(username).get();
		self = profileRef.data();
	}
    //response.send( { success: true });
});

// get self
app.get('/self', (request, response) => {
	const username = request.params.username;
    if (self) {
        profiles.doc(self.username)
            .get()
            .then(snap => {
                response.send(snap.data())
            });
    }
    
})

app.get('/profiles', (req, res) => {

})

app.post('/profiles', async (request, response) => {
    const user = request.body;
    user.id = currentId;
    currentId++;
    users.push(user);
    await profiles.doc(user.username).set(user);
    response.send({ success: true });
});

app.patch('/profiles', (request, response) => {
    const username = request.body.username;
    const post = request.body.post;
    profiles.doc(username)
        .update({
            posts: admin.firestore.FieldValue.arrayUnion(post)
        });
})


app.listen(3001, () => {
    console.log('Server has started');
});

module.exports = app;