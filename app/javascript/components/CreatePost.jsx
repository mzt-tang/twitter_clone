import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    const [post, setPost] = useState("");

    const submitPost = () => {
        // Todo: add a toast or alert for tweet being too short or long!
        if (post.length === 0 || post.length > 500) {
            return;
        }

        const url = "/api/v1/posts/create";
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, { method: 'POST', headers: { "X-CSRF-Token": token, 'Content-Type': 'application/json'}, body: JSON.stringify({tweet: post})})

        window.location.href="/";
    }

    return (
        <div>
            <div>
                <textarea id="post" name="post" rows="6" required onChange={(e) => setPost(e.target.value)}/>
            </div>
            <div>
                <Link to="/">back to all posts</Link>
                <button class="btn btn-primary" onClick={submitPost} >post</button>
            </div>
        </div>
    );
};

export default CreatePost;