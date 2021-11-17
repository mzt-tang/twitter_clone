import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const CreatePost = () => {
    const [post, setPost] = useState("");

    const submitPost = () => {
        const url = "/api/v1/posts/create";
        const token = document.querySelector('meta[name="csrf-token"]').content;
        console.log("test")
        fetch(url, { method: 'POST', headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json'}, body: JSON.stringify({tweet: post})})
        .then(response => {
            if (response.ok) {
                // return response.json();
            }
        })
        // todo need to change so that it doesn't redirect if invalid tweet text.
        window.location.href="/";
    }

    return (
        <div>
            <div>
                <textarea id="post" name="post" rows="6" required onChange={(e) => setPost(e.target.value)}/>
            </div>
            <div>
                <Link to="/">back to all posts</Link>
                <Button onClick={submitPost} >post</Button>
            </div>
        </div>
    );
};

export default CreatePost;